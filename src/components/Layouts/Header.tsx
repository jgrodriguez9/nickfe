import { Link, useMatch } from "react-router-dom";
import SchemaDefault from "./SchemaDefault";

const Header = () => {
  const isHome = useMatch("/");

  if (isHome) {
    return (
      <>
        <Link to={"/"}>
          <img
            src="/icons/home-btn.avif"
            className="absolute top-10 left-20 w-[75px] z-10"
          />
        </Link>

        <img
          src="/icons/home-cart.avif"
          className="absolute top-10 right-20 w-[75px] z-10"
        />
        <SchemaDefault showPlastas={true} />
      </>
    );
  }

  return (
    <>
      <Link to={"/"}>
        <img
          src="/icons/home-2.png"
          className="absolute top-10 left-20 w-[75px] z-10"
        />
      </Link>

      <img
        src="/icons/cart-2.avif"
        className="absolute top-10 right-20 w-[75px] z-10"
      />
      <SchemaDefault />
    </>
  );
};

export default Header;
