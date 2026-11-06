import { useId, useState } from "react";
import type { FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import type { Product } from "../models/response/Product";
import { createProduct } from "../services/createProduct";
import { updateProduct } from "../services/updateProduct";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import TextField from "../../../shared/components/TextField";

const MAX_NAME_LENGTH = 50;

interface ProductFormModalProps {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSaved: (product: Product) => void;
}

const ProductFormModal = ({
  open,
  product,
  onClose,
  onSaved,
}: ProductFormModalProps) => {
  const formId = useId();
  const [name, setName] = useState(product?.name ?? "");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(product);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setFieldError("El nombre es obligatorio.");
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      setFieldError(`El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`);
      return;
    }

    setFieldError(null);
    setRequestError(null);
    setSaving(true);

    try {
      const savedProduct = product
        ? await updateProduct(product.productResourceId, { name: trimmedName })
        : await createProduct({
            productResourceId: crypto.randomUUID(),
            name: trimmedName,
          });

      onSaved(savedProduct);
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el producto.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar producto" : "Nuevo producto"}
      description={
        isEditing
          ? "Actualiza el nombre del producto."
          : "Agrega un producto al catálogo."
      }
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>

          <Button type="submit" form={formId} disabled={saving}>
            {saving ? (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            {isEditing ? "Guardar cambios" : "Crear producto"}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Nombre"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setFieldError(null);
          }}
          placeholder="Ej. Teclado mecánico"
          maxLength={MAX_NAME_LENGTH}
          hint={`Máximo ${MAX_NAME_LENGTH} caracteres.`}
          error={fieldError ?? undefined}
          disabled={saving}
          data-autofocus
        />

        {requestError ? (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
          >
            {requestError}
          </p>
        ) : null}
      </form>
    </Modal>
  );
};

export default ProductFormModal;
