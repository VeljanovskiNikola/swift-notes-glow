import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, formatDate } from "@/data/posts";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { getTagStyle } from "@/lib/tagColors";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/MdxComponents";
import NewsletterSignup from "@/components/NewsletterSignup";

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

  const { Content } = post;

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
              <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={getTagStyle(tag)}>
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
          <div className="prose-swift">
            <MDXProvider components={mdxComponents}>
              <Content />
            </MDXProvider>
          </div>
          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PostDetail;
