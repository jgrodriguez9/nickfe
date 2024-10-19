import { useMemo } from "react";
type BannerProps = {
  variant?: string;
  text: string;
  extraClass?: string;
};
const Banner = ({ variant, text, extraClass = "" }: BannerProps) => {
  const variantClassName = useMemo(() => {
    switch (variant) {
      case "error":
        return "bg-red-400 text-white border";
      case "info":
        return "bg-blue-400 text-white border";
      case "success":
        return "bg-green-500 text-white border";
      default:
        return "bg-white text-black";
    }
  }, [variant]);

  return (
    <div
      className={`px-4 py-3 my-2 text-[13px] font-[400] ${variantClassName} ${extraClass}`}
    >
      {text}
    </div>
  );
};

export default Banner;
