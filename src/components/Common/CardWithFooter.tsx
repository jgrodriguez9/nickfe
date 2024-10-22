import Card from "./Card";
import { formatNumber } from "../../utils/jsFormatNumber";

type CardWithFooterProps = {
  icon: React.ReactNode;
  text?: string;
  price?: number;
  action: () => void;
  showFooter?: boolean;
};

const CardWithFooter = ({
  icon,
  text,
  price,
  action,
  showFooter = true,
}: CardWithFooterProps) => {
  const style = {
    backgroundImage: "url(/card/card-bg-footer.avif)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="mb-60 cursor-pointer" onClick={action}>
      <Card extraClasses={"!p-0 border border-gray-700 rounded-sm"}>
        <div className="flex flex-col">
          <div className="flex justify-center items-center p-2">{icon}</div>
          {showFooter && (
            <div
              style={style}
              className="flex flex-row items-center justify-between py-4 px-1"
            >
              <h3 className="text-white text-2xl font-semibold">{text}</h3>
              <h3 className="text-white text-2xl font-semibold">
                {formatNumber(price)}
              </h3>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardWithFooter;
