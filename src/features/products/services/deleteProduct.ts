import { apiRequest } from "../../../shared/services/http";

export async function deleteProduct(
  productResourceId: string,
): Promise<void> {
  await apiRequest<void>(`/api/products/${productResourceId}`, {
    method: "DELETE",
  });
}
