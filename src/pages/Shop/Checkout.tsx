import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { toggleCart } from "../../redux/cartSlice";
import OrderCard from "../../components/Common/OrderCard";
import { formatNumber } from "../../utils/jsFormatNumber";
import Button from "../../components/Control/Button";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(toggleCart(false));
  }, [dispatch]);

  return (
    <div className="relative mt-52 w-full">
      <div className="flex flex-col items-center  gap-8 mb-16">
        <h1 className="text-purple-800 text-6xl block font-semibold uppercase mb-5">
          Summary
        </h1>

        <div className="w-full md:w-2/3 pb-2">
          <div className="flex flex-col gap-4">
            <div className="border-b-site-primary border-b-2">
              <OrderCard />
              <OrderCard />
            </div>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-black text-lg">Total</h1>
              <h1 className="text-black text-2xl font-bold">
                {formatNumber(43)}
              </h1>
            </div>
            <div className="flex flex-row justify-end">
              <Button label="Enviar orden" importantClass="!w-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
