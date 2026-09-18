import { db } from "@/lib/db";
import { PostClient } from "./components/post-client";

export const metadata = {
  title: "Posts | Admin",
};

export default async function PostsPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PostClient posts={posts} />
    </div>
  );
}
