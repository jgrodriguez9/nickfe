import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { cleanCart, toggleCart } from "../../redux/cartSlice";
import OrderCard from "../../components/Common/OrderCard";
import { formatNumber } from "../../utils/jsFormatNumber";
import Button from "../../components/Control/Button";
import { OrderCart } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/order";
import useBanner from "@/hook/useBanner";
import { ERROR_SERVER, ORDER_SUCCESS } from "@/constant/messages";
import { useNavigate } from "react-router-dom";
import { cleanOrder } from "@/redux/orderSlice";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const banner = useBanner();
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cart);

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (response) => {
      console.log(response);
      banner.simpleSuccess(ORDER_SUCCESS);
      dispatch(cleanOrder());
      dispatch(cleanCart());
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      banner.simpleError(ERROR_SERVER);
    },
  });

  useEffect(() => {
    dispatch(toggleCart(false));
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, curr) =>
        acc + (curr.technique.price + curr.product.price) * curr.qty,
      0
    );
  }, [cart]);

  const sendOrder = () => {
    const body = {
      code: "1",
      orders: cart,
      status: "Pending",
    };
    console.log(body);
    mutate(body);
  };

  return (
    <div className="relative mt-52 w-full">
      <div className="flex flex-col items-center  gap-8 mb-16">
        <h1 className="text-purple-800 text-6xl block font-semibold uppercase mb-5">
          Summary
        </h1>

        <div className="w-full md:w-2/3 pb-2">
          <div className="flex flex-col gap-4">
            <div className="border-b-site-primary border-b-2">
              {cart.map((product: OrderCart) => (
                <OrderCard key={product.code} product={product} />
              ))}
            </div>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-black text-lg">Total</h1>
              <h1 className="text-black text-2xl font-bold">
                {formatNumber(totalPrice)}
              </h1>
            </div>
            <div className="flex flex-row justify-end">
              <Button
                label="Enviar orden"
                importantClass="!w-[300px]"
                onClick={sendOrder}
                loading={isPending}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
