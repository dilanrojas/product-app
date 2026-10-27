import { Route, Routes } from "react-router-dom"
import Layout from "../shared/layout/Layout"
import ProductDetail from "../features/products/pages/ProductDetail"
import CreateProduct from "../features/products/pages/CreateProduct"
import NotFound from "../shared/components/NotFound"
import Products from "../features/products/pages/Products"
import Home from "../shared/layout/Home"

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/new" element={<CreateProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
