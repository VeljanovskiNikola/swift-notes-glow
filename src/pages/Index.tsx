import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

const Index = () => (
  <>
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Swift Notes</h1>
        <p className="text-muted-foreground">Thoughts on iOS development, Swift, and the craft of building software.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </main>
    <Footer />
  </>
);

export default Index;
