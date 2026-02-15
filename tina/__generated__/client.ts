import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '505db432cacb65cd9bd5f8a3760775f5011e29af', queries,  });
export default client;
  