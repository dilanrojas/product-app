import { Package, Plus } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { buttonClassName } from "../components/buttonStyles";

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "flex h-16 items-center border-b-2 px-2 text-sm font-medium transition-colors",
    isActive
      ? "border-zinc-900 text-zinc-950"
      : "border-transparent text-zinc-500 hover:text-zinc-900",
  ].join(" ");

const Navbar = () => {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-zinc-950"
          >
            <Package className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            ProductHub
          </Link>

          <nav
            aria-label="Navegación principal"
            className="flex h-16 items-center gap-4 sm:gap-6"
          >
            <div className="hidden h-16 items-center sm:flex">
              <NavLink to="/" end className={getNavLinkClassName}>
                Inicio
              </NavLink>
            </div>

            <NavLink to="/products" className={getNavLinkClassName}>
              Productos
            </NavLink>
          </nav>
        </div>

        <Link
          to="/products/new"
          className={buttonClassName({ size: "sm", className: "shrink-0" })}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Nuevo producto</span>
          <span className="sr-only sm:hidden">Nuevo producto</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
