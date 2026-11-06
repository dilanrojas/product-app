import { useCallback, useEffect, useState } from "react";
import type { Product } from "../models/response/Product";
import { getProducts } from "../services/getProducts";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch((requestError: unknown) => {
        if (!active) return;

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No se pudieron obtener los productos.",
        );
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [refreshIndex]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshIndex((current) => current + 1);
  }, []);

  return { products, loading, error, refetch };
}
