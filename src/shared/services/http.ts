import { config } from "../../config";

interface ProblemDetails {
  title?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function getErrorMessage(response: Response): Promise<string> {
  if (response.status === 404) {
    return "El producto solicitado no existe.";
  }

  try {
    const body = (await response.json()) as ProblemDetails;
    const validationMessages = body.errors
      ? Object.values(body.errors).flat().filter(Boolean)
      : [];

    if (validationMessages.length > 0) {
      return validationMessages.join(" ");
    }

    if (body.title) {
      return body.title;
    }
  } catch {
    // The response did not contain a JSON error body.
  }

  return "No se pudo completar la solicitud.";
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(`${config.api.url}${path}`, {
      ...init,
      headers,
    });
  } catch {
    throw new ApiError("No se pudo conectar con el servidor.", 0);
  }

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
