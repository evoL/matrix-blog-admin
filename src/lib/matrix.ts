import { MatrixClient } from "matrix-blog";
import { homeserverUrl, accessToken } from "./environment";

export function getMatrixClient(fetch: any) {
  const client = new MatrixClient(homeserverUrl, fetch);
  client.setAccessToken(accessToken);
  return client;
}
