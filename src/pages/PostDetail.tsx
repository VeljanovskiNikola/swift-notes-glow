import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, formatDate } from "@/data/posts";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/" className="text-primary hover:underline">Back to blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <article className="max-w-[680px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} />
            Back to blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-primary/15 text-primary">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="prose-swift" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        </article>
      </main>
      <Footer />
    </>
  );
};

function renderMarkdown(content: string): string {
  return content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^(?!<[hupbl]|$)(.+)$/gm, '<p>$1</p>')
    .replace(/<\/blockquote>\n<blockquote>/g, '')
    .replace(/\n{2,}/g, '\n');
}

export default PostDetail;
