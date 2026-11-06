import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import type { Product } from "../models/response/Product";
import { deleteProduct } from "../services/deleteProduct";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";

interface DeleteProductModalProps {
  product: Product | null;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteProductModal = ({
  product,
  onClose,
  onDeleted,
}: DeleteProductModalProps) => {
  const [deleting, setDeleting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!product || deleting) return;

    setDeleting(true);
    setRequestError(null);

    try {
      await deleteProduct(product.productResourceId);
      onDeleted();
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    if (!deleting) {
      onClose();
    }
  };

  return (
    <Modal
      open={Boolean(product)}
      onClose={handleClose}
      title="Eliminar producto"
      description="Esta acción no se puede deshacer."
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={deleting}>
            Cancelar
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            )}
            Eliminar
          </Button>
        </>
      }
    >
      <p className="text-sm leading-6 text-zinc-600">
        ¿Seguro que quieres eliminar{" "}
        <strong className="font-medium text-zinc-900">
          {product?.name ?? "este producto"}
        </strong>
        ?
      </p>

      {requestError ? (
        <p
          role="alert"
          className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
        >
          {requestError}
        </p>
      ) : null}
    </Modal>
  );
};

export default DeleteProductModal;
