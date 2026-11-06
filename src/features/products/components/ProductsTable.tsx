import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <div className="hidden grid-cols-[minmax(0,1fr)_260px_32px] gap-4 border-b border-zinc-200 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:grid">
        <span>Nombre</span>
        <span>Resource ID</span>
        <span className="sr-only">Abrir</span>
      </div>

      <ul>
        {products.map((product) => (
          <li
            key={product.productResourceId}
            className="border-b border-zinc-200 last:border-b-0"
          >
            <Link
              to={`/products/${product.productResourceId}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 transition-colors hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none sm:grid-cols-[minmax(0,1fr)_260px_32px]"
            >
              <span className="truncate text-sm font-medium text-zinc-900">
                {product.name || "Sin nombre"}
              </span>

              <span className="hidden truncate font-mono text-xs text-zinc-500 sm:block">
                {product.productResourceId}
              </span>

              <ChevronRight
                className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsTable;
