import { blogRoomId } from "$lib/environment";
import { getMatrixClient } from "$lib/matrix";
import { BlogService } from "matrix-blog";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(_request) {
  const client = getMatrixClient(fetch);
  const blogService = new BlogService(client);

  const posts = await blogService.getPosts(blogRoomId);
  return {
    body: posts,
  };
}
