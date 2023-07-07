import { Link } from "react-router-dom";

export default function PageBanner({
  pageTitle = "title",
  toggleSearch,
  showSearch,
}) {
  const displayPageTitle =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  const buttonText = displayPageTitle.slice(0, pageTitle.length - 1);

  return (
    <h1 className="page-title">
      {displayPageTitle}
      <div className="title-btns">
        <button onClick={toggleSearch} className="btn secondary">
          {showSearch ? "Hide Search" : `Search ${displayPageTitle}`}
        </button>
        <Link to="new" className="btn">
          New {buttonText}
        </Link>
      </div>
    </h1>
  );
}
