import type { Blog } from "./blog.hooks";
import type { BlogPost } from "@/content/blog";

/**
 * Maps a Blog object from the API/Hook to the BlogPost format expected by UI components.
 */
export function mapBlogToPost(blog: Blog): BlogPost {
  // Format date to "DD MMM YYYY" equivalent in ID
  const dateObj = new Date(blog.createdAt);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];
  const dateStr = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

  return {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    // Use placeholder if thumbnail is null
    image: blog.thumbnail || "/images/blog/1.jpg",
    date: dateStr,
    author: {
      name: blog.author?.name || "Admin",
      avatar: "/images/testimonials/1.jpg", // Placeholder avatar
    },
    // Join all category names with a comma, or default to "Technology"
    category: blog.categories && blog.categories.length > 0 
      ? blog.categories.map(c => c.name).join(", ")
      : "Technology",
    commentsCount: 0,
  };
}

