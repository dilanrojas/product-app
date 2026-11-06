import type { CreateProductRequest } from "../models/request/Product";
import type { Product } from "../models/response/Product";
import { apiRequest } from "../../../shared/services/http";

export async function createProduct(
  payload: CreateProductRequest,
): Promise<Product> {
  return apiRequest<Product>("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
