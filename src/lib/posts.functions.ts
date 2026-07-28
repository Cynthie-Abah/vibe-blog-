import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getAllPosts as _getAllPosts, getPostBySlug as _getPostBySlug } from "./posts.server";

export const getAllPosts = createServerFn({ method: "GET" }).handler(async () => {
  return _getAllPosts();
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return z.object({ slug: z.string() }).parse(data);
  })
  .handler(async ({ data }) => {
    return _getPostBySlug(data.slug);
  });

