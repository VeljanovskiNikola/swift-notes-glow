import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";
import { getTagStyle } from "@/lib/tagColors";

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

const Index = () => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => post.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, selectedTags]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 gradient-text">
            Swift Notes
          </h1>
          <p className="text-muted-foreground">
            Thoughts on iOS development, Swift, and the craft of building software.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
          />
        </div>

        {/* Tag filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => {
            const active = selectedTags.includes(tag);
            const style = getTagStyle(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="text-xs font-medium px-3 py-1 rounded-full border transition-all"
                style={
                  active
                    ? { backgroundColor: style.color, color: "#fff", borderColor: style.color }
                    : { backgroundColor: "transparent", color: style.color, borderColor: style.color }
                }
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Post grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-16">
            No posts found.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Index;
