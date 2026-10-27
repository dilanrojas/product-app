import { Package } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <nav aria-label='Navegación principal'>
        <Link to='/'>
          <span>Home</span>
        </Link>

        <div>
          <span>
            <Package size={22} aria-hidden='true' />
          </span>

          <span>
            Product<span>Hub</span>
          </span>

          <NavLink to='/products' end>
            Productos
          </NavLink>

          <NavLink to='/products/new' end>
            Nuevo Producto
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
