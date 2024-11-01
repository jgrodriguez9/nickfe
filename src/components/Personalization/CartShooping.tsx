import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { formatNumber } from "../../utils/jsFormatNumber";
import { useNavigate } from "react-router-dom";
import { toggleCart } from "../../redux/cartSlice";
import CardImageCollage from "../../pages/Shop/Common/CardImageCollage";
import Button from "../Control/Button";

const CartShopping = () => {
  const dispatch = useAppDispatch();
  const { cart, openCart } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const toggle = () => {
    dispatch(toggleCart(!openCart));
  };

  console.log(openCart);

  return (
    <Dialog open={openCart} onClose={toggle} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={toggle}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <FaTimes aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <CardImageCollage
                              productClass="w-[160px] h-[160px] relative"
                              artClass="w-[50px] mt-10"
                              labelClass="max-w-[300px] break-words text-center uppercase text-sm font-semibold tracking-wide"
                              name={"test"}
                            />
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>Sudadera</h3>
                                  <p className="ml-4">{formatNumber(10)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  red
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty 1</p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-red-600 hover:text-red-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>$262.00</p>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-center rounded-md border">
                      <Button
                        label="Checkout"
                        fullWidth
                        importantClass="!bg-[#d6621b]"
                        onClick={() => navigate("/checkout")}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={toggle}
                        className="font-medium text-site-primary-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CartShopping;
