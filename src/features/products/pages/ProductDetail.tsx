import { useState } from "react";
import { AlertCircle, ArrowLeft, Pencil, RotateCw, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { buttonClassName } from "../../../shared/components/buttonStyles";
import DeleteProductModal from "../components/DeleteProductModal";
import ProductFormModal from "../components/ProductFormModal";
import { useProduct } from "../hooks/useProduct";

const ProductDetailSkeleton = () => {
  return (
    <div aria-hidden="true">
      <div className="h-3 w-32 animate-pulse rounded bg-zinc-100" />
      <div className="mt-8 h-8 w-64 max-w-full animate-pulse rounded bg-zinc-100" />
      <div className="mt-8 overflow-hidden rounded-md border border-zinc-200 bg-white">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="grid gap-2 border-b border-zinc-200 px-4 py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-4"
          >
            <span className="h-3 w-24 animate-pulse rounded bg-zinc-100" />
            <span className="h-3 w-56 max-w-full animate-pulse rounded bg-zinc-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetailView = ({
  productResourceId,
}: {
  productResourceId: string | undefined;
}) => {
  const navigate = useNavigate();
  const { product, loading, error, notFound, refetch, setProduct } =
    useProduct(productResourceId);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const backLink = (
    <Link
      to="/products"
      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Volver a productos
    </Link>
  );

  if (loading) {
    return (
      <section aria-label="Cargando producto" className="space-y-8">
        {backLink}
        <ProductDetailSkeleton />
      </section>
    );
  }

  if (notFound) {
    return (
      <section className="space-y-8">
        {backLink}

        <div className="rounded-md border border-zinc-200 bg-white px-6 py-16 text-center">
          <p className="font-mono text-xs text-zinc-500">404</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
            Producto no encontrado
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-600">
            El producto que buscas no existe o ya fue eliminado.
          </p>
          <Link
            to="/products"
            className={buttonClassName({ className: "mt-6" })}
          >
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="space-y-8">
        {backLink}

        <div
          role="alert"
          className="flex flex-col gap-4 rounded-md border border-zinc-200 bg-white px-5 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex gap-3">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-medium text-zinc-900">
                No se pudo cargar el producto.
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {error ?? "El producto no está disponible."}
              </p>
            </div>
          </div>

          <Button variant="secondary" onClick={refetch}>
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="product-title" className="space-y-8">
      {backLink}

      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Producto
          </p>

          <h1
            id="product-title"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950"
          >
            {product.name || "Sin nombre"}
          </h1>
        </div>

        <div className="flex gap-2 self-start">
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Editar
          </Button>

          <Button variant="danger" onClick={() => setIsDeleting(true)}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Eliminar
          </Button>
        </div>
      </header>

      <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
        <dl>
          <div className="grid gap-1 border-b border-zinc-200 px-4 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="text-sm text-zinc-500">Nombre</dt>
            <dd className="text-sm text-zinc-900">
              {product.name || "Sin nombre"}
            </dd>
          </div>

          <div className="grid gap-1 px-4 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="text-sm text-zinc-500">Resource ID</dt>
            <dd className="break-all font-mono text-xs leading-5 text-zinc-700">
              {product.productResourceId}
            </dd>
          </div>
        </dl>
      </div>

      <ProductFormModal
        key={isEditing ? "edit-open" : "edit-closed"}
        open={isEditing}
        product={product}
        onClose={() => setIsEditing(false)}
        onSaved={(savedProduct) => {
          setProduct(savedProduct);
          setIsEditing(false);
        }}
      />

      <DeleteProductModal
        key={isDeleting ? "delete-open" : "delete-closed"}
        product={isDeleting ? product : null}
        onClose={() => setIsDeleting(false)}
        onDeleted={() => navigate("/products", { replace: true })}
      />
    </section>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  return <ProductDetailView key={id ?? "not-found"} productResourceId={id} />;
};

export default ProductDetail;
