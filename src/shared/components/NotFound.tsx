import { Link } from "react-router-dom";
import { buttonClassName } from "../components/buttonStyles";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center py-16 text-center sm:py-24">
      <p className="font-mono text-xs text-zinc-500">404</p>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
        Esta página no existe
      </h1>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
        La dirección puede haber cambiado o estar escrita incorrectamente.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonClassName({ size: "sm" })}>
          Volver al inicio
        </Link>

        <Link
          to="/products"
          className={buttonClassName({ variant: "secondary", size: "sm" })}
        >
          Ver productos
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
