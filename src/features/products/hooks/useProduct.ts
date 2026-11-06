import { useCallback, useEffect, useState } from "react";
import type { Product } from "../models/response/Product";
import { getProduct } from "../services/getProduct";
import { ApiError } from "../../../shared/services/http";

export function useProduct(productResourceId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(Boolean(productResourceId));
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(!productResourceId);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    if (!productResourceId) return;

    let active = true;
    const controller = new AbortController();

    getProduct(productResourceId, controller.signal)
      .then((data) => {
        if (active) {
          setProduct(data);
        }
      })
      .catch((requestError: unknown) => {
        if (!active) return;

        if (requestError instanceof ApiError && requestError.status === 404) {
          setNotFound(true);
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No se pudo obtener el producto.",
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
  }, [productResourceId, refreshIndex]);

  const refetch = useCallback(() => {
    if (!productResourceId) return;

    setLoading(true);
    setError(null);
    setNotFound(false);
    setRefreshIndex((current) => current + 1);
  }, [productResourceId]);

  return {
    product,
    loading,
    error,
    notFound,
    refetch,
    setProduct,
  };
}
