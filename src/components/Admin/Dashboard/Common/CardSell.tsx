import Spinner from "@/components/Loader/Spinner";

type Props = {
  title: string;
  icon: React.ReactNode;
  total: string;
  isLoading: boolean;
};

const CardSell = ({ title, icon, total, isLoading }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="text-gray-500 text-sm font-medium uppercase mb-2">
        {title}
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-gray-700 text-xl font-semibold">{total}</span>
        </div>
      )}
    </div>
  );
};

export default CardSell;
