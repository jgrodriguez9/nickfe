type Props = {
  title: string;
  icon: React.ReactNode;
  total: string;
};

const CardSell = ({ title, icon, total }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="text-gray-500 text-sm font-medium uppercase mb-2">
        {title}
      </div>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-gray-700 text-xl font-semibold">{total}</span>
      </div>
    </div>
  );

  //   return (
  //     <div className="flex flex-col">
  //       <h6 className="font-[500] text-gray-400 mb-4 uppercase text-[13px]">
  //         {title}
  //       </h6>
  //       <div className="flex flex-row gap-2 items-center space-x-0">
  //         {icon}
  //         <span className="ps-3 text-gray-600 text-[1.65rem] font-[500] leading-[1.2]">
  //           {total}
  //         </span>
  //       </div>
  //     </div>
  //   );
};

export default CardSell;
