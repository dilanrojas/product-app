import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section>
      <span aria-hidden="true">404</span>

      <p>Error 404 | Fuera de ruta</p>

      <h1 id="not-found-title">Esta página no existe</h1>

      <p>
        La dirección puede haber cambiado o estar escrita incorrectamente.
      </p>

      <div>
        <Link to='/'><span>Volver al inicio</span></Link>

        <Link to='/products'>
          <span>Volver a productos</span>
        </Link>
      </div>
    </section>
  )
}

export default NotFound
