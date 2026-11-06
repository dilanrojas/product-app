import type { UpdateProductRequest } from "../models/request/Product";
import type { Product } from "../models/response/Product";
import { apiRequest } from "../../../shared/services/http";

export async function updateProduct(
  productResourceId: string,
  payload: UpdateProductRequest,
): Promise<Product> {
  return apiRequest<Product>(`/api/products/${productResourceId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
