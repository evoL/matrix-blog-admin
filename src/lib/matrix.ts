import { MatrixClient } from "matrix-blog";
import { homeserverUrl, serverName, accessToken } from "./environment";

export function getMatrixClient(fetch: any) {
  const client = new MatrixClient(serverName, homeserverUrl, fetch);
  client.setAccessToken(accessToken);
  return client;
}
