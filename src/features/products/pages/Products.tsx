import { AlertCircle, Package, Plus, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import ProductFormModal from "../components/ProductFormModal";
import ProductsTable from "../components/ProductsTable";
import { useProducts } from "../hooks/useProducts";

interface ProductsProps {
  showCreateModal?: boolean;
}

const ProductsSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <div className="hidden grid-cols-[minmax(0,1fr)_260px_32px] gap-4 border-b border-zinc-200 px-4 py-2.5 sm:grid">
        <span className="h-2.5 w-16 animate-pulse rounded bg-zinc-100" />
        <span className="h-2.5 w-24 animate-pulse rounded bg-zinc-100" />
      </div>

      <div>
        {rows.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-zinc-200 px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_260px_32px]"
          >
            <span className="h-3.5 w-40 max-w-full animate-pulse rounded bg-zinc-100" />
            <span className="hidden h-3 w-56 animate-pulse rounded bg-zinc-100 sm:block" />
            <span className="h-3 w-3 animate-pulse rounded bg-zinc-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Products = ({ showCreateModal = false }: ProductsProps) => {
  const navigate = useNavigate();
  const { products, loading, error, refetch } = useProducts();

  const openCreateModal = () => {
    navigate("/products/new");
  };

  const closeCreateModal = () => {
    navigate("/products", { replace: true });
  };

  const handleProductCreated = () => {
    navigate("/products", { replace: true });
  };

  return (
    <section aria-labelledby="products-title" className="space-y-8">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Catálogo
          </p>

          <div className="mt-2 flex items-baseline gap-3">
            <h1
              id="products-title"
              className="text-3xl font-semibold tracking-tight text-zinc-950"
            >
              Productos
            </h1>

            {!loading && !error ? (
              <span className="text-sm text-zinc-500">
                {products.length} {products.length === 1 ? "producto" : "productos"}
              </span>
            ) : null}
          </div>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
            Consulta, crea, edita y elimina los productos del catálogo.
          </p>
        </div>

        <Button onClick={openCreateModal} className="self-start sm:self-auto">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo producto
        </Button>
      </header>

      {loading ? <ProductsSkeleton /> : null}

      {!loading && error ? (
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
                No se pudieron cargar los productos.
              </p>
              <p className="mt-1 text-sm text-zinc-600">{error}</p>
            </div>
          </div>

          <Button variant="secondary" onClick={refetch}>
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </Button>
        </div>
      ) : null}

      {!loading && !error && products.length === 0 ? (
        <div className="flex flex-col items-center rounded-md border border-zinc-200 bg-white px-6 py-16 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 text-zinc-500">
            <Package className="h-5 w-5" aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-base font-semibold text-zinc-900">
            No hay productos
          </h2>

          <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-600">
            Agrega tu primer producto para comenzar a construir el catálogo.
          </p>

          <Button onClick={openCreateModal} className="mt-5">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nuevo producto
          </Button>
        </div>
      ) : null}

      {!loading && !error && products.length > 0 ? (
        <ProductsTable products={products} />
      ) : null}

      <ProductFormModal
        key={showCreateModal ? "create-open" : "create-closed"}
        open={showCreateModal}
        onClose={closeCreateModal}
        onSaved={handleProductCreated}
      />
    </section>
  );
};

export default Products;
