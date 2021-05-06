import type { RequestHandler } from "@sveltejs/kit";
import { blogRoomId } from "$lib/environment";
import { getMatrixClient } from "$lib/matrix";
import { convertToHtml } from "$lib/markdown";
import { BlogService } from "matrix-blog";
import slug from "slug";

export const get: RequestHandler = async function () {
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);

  const posts = await blogService.getPosts(blogRoomId);
  return {
    body: [...posts].reverse(),
  };
};

export const post: RequestHandler = async function (request) {
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);
  // request.body is parsed JSON, typings don't foresee that.
  const input = (request.body as unknown) as Record<string, string>;

  const post = await blogService.addPost(blogRoomId, {
    title: input.title,
    summary: input.summary,
    slug: input.slug || slug(input.title),
    text: input.content,
    html: convertToHtml(input.content),
  });

  return {
    body: { post },
  };
};
