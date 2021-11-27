import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className="container">
      <div className="row">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="col">
            <div>
              <PostHome key={index} post={post} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const PostHome = ({ post }) => {
  const { frontmatter } = post;
  return (
    <div className="col-12 d-flex flex-column align-items-start justify-content-center pt-3 post-tile">
      <h5 className="text-primary">{frontmatter?.title}</h5>
      <small className="text-muted">Published on {frontmatter?.date}</small>
      <p className="pt-2 text-truncate post-excerpt text-dark">
        {frontmatter.excerpt || ""}
      </p>
    </div>
  );
};

export const getStaticProps = async () => {
  /**
   * Data can come from anywhere
   * We can get the posts and Images from S3
   * For now we will fetch/read the posts from posts folder
   * The images are stored in images/posts in public
   */
  const files = fs.readdirSync(path.join("posts"));
  console.log("Files", files);
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const markDownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );

    const { data: frontmatter } = matter(markDownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  // console.log(posts);
  return {
    props: {
      posts,
    },
  };
};
