const ButtonOrder = () => {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <button className="bg-gray-500 text-white px-4 py-2 text-lg font-bold">
        −
      </button>

      <div className="w-12 text-center border-gray-300 focus:outline-none grow">
        1
      </div>

      <button className="bg-site-primary text-white px-4 py-2 text-lg font-bold">
        +
      </button>
    </div>
  );
};

export default ButtonOrder;
