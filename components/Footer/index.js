import Link from "next/link";
const Footer = () => {
  return (
    <div className="w-100 d-flex align-items-center justify-content-center blog-footer">
      <div className="blog-navigation p-2">
        <Link href="/">
          <span className="p-1 blog-navigation-title">Home </span>
        </Link>
        <Link href="/about">
          <span className="p-1 blog-navigation-title">About Me</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
