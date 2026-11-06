import type { Product } from "../models/response/Product";
import { apiRequest } from "../../../shared/services/http";

export async function getProduct(
  productResourceId: string,
  signal?: AbortSignal,
): Promise<Product> {
  return apiRequest<Product>(`/api/products/${productResourceId}`, { signal });
}
