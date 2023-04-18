import * as prismic from "@prismicio/client";

export function getPrismicClient() {
  const endpoint = prismic.getEndpoint("ignews424242");
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  });

  return client;
}
