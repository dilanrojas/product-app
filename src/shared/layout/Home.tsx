import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonClassName } from "../components/buttonStyles";

const Home = () => {
  return (
    <section className="py-10 sm:py-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Catálogo
      </p>

      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
        Gestiona tu catálogo de productos.
      </h1>

      <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
        Una interfaz simple para consultar, crear, actualizar y eliminar los
        productos de tu catálogo.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/products" className={buttonClassName()}>
          Ver productos
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Link
          to="/products/new"
          className={buttonClassName({ variant: "secondary" })}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo producto
        </Link>
      </div>
    </section>
  );
};

export default Home;
