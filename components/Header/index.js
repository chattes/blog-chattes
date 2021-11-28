import Link from "next/link";
const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-center blog-header">
      <Link href="/">
        <div className="d-flex flex-row">
          <h2 className="blog-name">Tech Stacked</h2>
          <small className="text-muted p-2">by Sourav Chatterjee</small>
        </div>
      </Link>
    </header>
  );
};

export default Header;
