import { MatrixError } from "matrix-blog";

export function handleError(e: Error) {
  if (e instanceof MatrixError) {
    return {
      status: e.status,
      body: {
        error: {
          message: e.message,
          details: e.details,
        },
      },
    };
  }

  return {
    status: 500,
    body: {
      error: { message: e.message },
    },
  };
}
