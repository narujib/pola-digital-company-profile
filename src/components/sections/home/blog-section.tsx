import { SectionTitle } from "@/components/ui/section-title";
import { blogPosts } from "@/content/blog";
import { BlogCard } from "@/components/ui/blog-card";

export function BlogSection() {
  // Only show the first 3 posts on home
  const homePosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="pub-container">
        <div data-aos="fade-up" data-aos-delay="200">
          <SectionTitle
            subtitle="artikel terbaru"
            title="Temukan wawasan terbaru di blog kami"
            align="center"
            className="mb-12 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homePosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} delayIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
