import type { RequestHandler } from "@sveltejs/kit";
import { blogRoomId } from "$lib/environment";
import { getMatrixClient } from "$lib/matrix";
import { convertToHtml } from "$lib/markdown";
import { BlogService } from "matrix-blog";
import { handleError } from "$lib/requests";

export const get: RequestHandler = async function () {
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);

  try {
    const posts = await blogService.getPosts(blogRoomId);
    return {
      body: [...posts].reverse(),
    };
  } catch (e) {
    return handleError(e);
  }
};

export const post: RequestHandler = async function (request) {
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);
  // request.body is parsed JSON, typings don't foresee that.
  const input = (request.body as unknown) as Record<string, string>;

  try {
    const post = await blogService.addPost(blogRoomId, {
      title: input.title,
      summary: input.summary,
      slug: input.slug,
      text: input.content,
      html: convertToHtml(input.content),
    });

    return {
      body: { post },
    };
  } catch (e) {
    return handleError(e);
  }
};
