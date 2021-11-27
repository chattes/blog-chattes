import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-0 col-sm-2"></div>
        <div className="col-xs-12 col-sm-8 d-flex flex-column">
          <div className="text-center">
            <h2 className="text-primary">{title}</h2>
            <small>{date}</small>
          </div>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>;
        </div>
        <div className="col-xs-0 col-sm-2"></div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

export default PostPage;
