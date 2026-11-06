import type { Product } from "../models/response/Product";
import { apiRequest } from "../../../shared/services/http";

const PRODUCTS_PATH = "/api/products";

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return apiRequest<Product[]>(PRODUCTS_PATH, { signal });
}
