import { Link } from "react-router-dom";
import { formatDate, type BlogPost } from "@/data/posts";

const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <Link
    to={`/post/${post.slug}`}
    className="block bg-card rounded-lg p-5 card-hover opacity-0 animate-fade-up border border-border"
    style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
  >
    <div className="flex flex-wrap gap-2 mb-3">
      {post.tags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-primary/15 text-primary"
        >
          {tag}
        </span>
      ))}
    </div>
    <h2 className="text-lg font-semibold text-foreground mb-1 leading-snug">{post.title}</h2>
    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span>{formatDate(post.date)}</span>
      <span>·</span>
      <span>{post.readingTime}</span>
    </div>
  </Link>
);

export default PostCard;
