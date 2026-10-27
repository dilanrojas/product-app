import { useEffect, useState } from "react";
import type { Product } from "../models/response/Product";
import { getProducts } from "../services/getProducts";

const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Error al obtener los productos'
        )
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [])

  if (error) {
    return (
      <div role='alert'>
        {error}
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <span>{loading}</span>
      </div>
    )
  }

  return (
    <div>
      <h2>Lista de productos</h2>

      <div>
        <table>
          <thead>
            <tr>
              <th>Product Resource</th>
              <th>Nombre</th>
            </tr>
          </thead>

          <tbody>
            <>
              {
                products.map((product) => (
                  <tr key={product.productResourceId}>
                    <td>{product.productResourceId}</td>
                    <td>{product.name}</td>
                  </tr>
                ))
              }
            </>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsTable
