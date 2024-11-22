import { Link, useMatch } from "react-router-dom";
import SchemaDefault from "./SchemaDefault";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { toggleCart } from "../../redux/cartSlice";
import CartShopping from "../Personalization/CartShooping";

const Header = () => {
  const isHome = useMatch("/");
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  if (isHome) {
    return (
      <>
        <Link to={"/"}>
          <img
            src="/icons/home-btn.avif"
            className="absolute top-10 left-20 w-[75px] z-10"
          />
        </Link>

        <div
          className="absolute top-10 right-20 w-[75px] z-10 cursor-pointer"
          onClick={
            cart.length > 0 ? () => dispatch(toggleCart(true)) : () => {}
          }
        >
          <img src="/icons/home-cart.avif" className="w-full h-full" />
          {cart.length > 0 && (
            <span
              className="bg-site-primary h-6 w-6 flex justify-center items-center 
            text-[10px] font-bold rounded-full absolute -top-1 right-1 text-white"
            >
              {cart.length}
            </span>
          )}
        </div>
        {/* <img
          src="/icons/home-cart.avif"
          className="absolute top-10 right-20 w-[75px] z-10 "
          onClick={cart.length > 0 ? () => dispatch(toggleCart(true)) : () => {}}
        /> */}
        <SchemaDefault showPlastas={true} />
        <CartShopping />
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

      <div
        className="absolute top-10 right-20 w-[75px] z-10"
        onClick={cart.length > 0 ? () => dispatch(toggleCart(true)) : () => {}}
      >
        <img src="/icons/cart-2.avif" className="w-full h-full" />
        {cart.length > 0 && (
          <span className="bg-white h-4 w-4 flex justify-center items-center text-[10px] font-bold rounded-full absolute top-6 right-4">
            {cart.length}
          </span>
        )}
      </div>
      <CartShopping />
      <SchemaDefault />
    </>
  );
};

export default Header;
