import { api } from '../../../../convex/_generated/api';
import PostCard from '@/components/PostCard';
import { convex } from '@/config/convex';

export default async function Home() {
  const posts = await convex.query(api.post.getAllPosts)

  return (
    <section className="flex justify-center items-center pb-20">
      <div className="flex flex-col gap-10 w-[500px]">
        {posts?.map((post, index) => <PostCard key={index} post={post} />)}
      </div>
    </section>
  );
}
