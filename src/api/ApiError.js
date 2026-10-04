export class ApiError extends Error {
  constructor(status, code, message, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static fromBody(status, body) {
    const error = body?.error;
    return new ApiError(
      status,
      error?.code ?? "unknown_error",
      error?.message ?? "Ocurrió un error inesperado.",
      error?.details ?? null
    );
  }

  /** { campo: "mensaje" } para pintar bajo cada input */
  get fieldErrors() {
    if (!this.details || typeof this.details !== "object") return {};
    return Object.fromEntries(
      Object.entries(this.details).map(([campo, msgs]) => [
        campo,
        Array.isArray(msgs) ? msgs.join(" ") : String(msgs),
      ])
    );
  }
}