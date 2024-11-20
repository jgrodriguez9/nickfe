type Props = {
  handleChangeQty: (qty: number) => void;
  qty: number;
};

const ButtonOrder = ({ handleChangeQty, qty }: Props) => {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <button
        className="bg-gray-500 text-white px-4 py-2 text-lg font-bold"
        onClick={qty > 1 ? () => handleChangeQty((qty -= 1)) : () => {}}
      >
        −
      </button>

      <div className="w-12 text-center border-gray-300 focus:outline-none grow">
        {qty}
      </div>

      <button
        className="bg-site-primary text-white px-4 py-2 text-lg font-bold"
        onClick={() => handleChangeQty((qty += 1))}
      >
        +
      </button>
    </div>
  );
};

export default ButtonOrder;
