import type { RequestHandler } from "@sveltejs/kit";
import { getMatrixClient } from "$lib/matrix";
import { BlogService, MatrixError } from "matrix-blog";

export const del: RequestHandler = async function ({ params }) {
  const { postId } = params;
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);

  try {
    await blogService.deletePost(postId);
    return {
      body: {},
    };
  } catch (e) {
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
};
