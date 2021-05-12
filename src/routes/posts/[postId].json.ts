import type { RequestHandler } from "@sveltejs/kit";
import { getMatrixClient } from "$lib/matrix";
import { BlogService } from "matrix-blog";
import { handleError } from "$lib/requests";
import { convertToHtml } from "$lib/markdown";
import { DateTime } from "luxon";

export const get: RequestHandler = async function ({ params }) {
  const { postId } = params;
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);

  try {
    const post = await blogService.getPost(postId);
    return {
      body: {
        id: post.id,
        title: post.title,
        summary: post.summary,
        slug: post.slug,
        content: post.text,
        created_at: DateTime.fromMillis(post.created_ms, {
          zone: "UTC",
        }).toISO(),
        edited_at:
          post.edited_ms &&
          DateTime.fromMillis(post.edited_ms, { zone: "UTC" }).toISO(),
      },
    };
  } catch (e) {
    return handleError(e);
  }
};

export const put: RequestHandler = async function (request) {
  const { postId } = request.params;
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);
  // request.body is parsed JSON, typings don't foresee that.
  const input = (request.body as unknown) as Record<string, string>;

  try {
    await blogService.editPost(postId, {
      title: input.title,
      summary: input.summary,
      slug: input.slug,
      text: input.content,
      html: convertToHtml(input.content),
    });
    return {
      body: {
        id: postId,
        title: input.title,
        summary: input.summary,
        slug: input.slug,
        content: input.content,
      },
    };
  } catch (e) {
    return handleError(e);
  }
};

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
    return handleError(e);
  }
};
