import { useMemo } from "react";
import Spinner from "../Loader/Spinner";

type ButtonProps = {
  label?: string;
  type?: "button" | "submit";
  variant?:
    | "primary"
    | "light"
    | "link"
    | "danger"
    | "none"
    | "dark"
    | "dark-light";
  startIcon?: React.ReactNode | null;
  fullWidth?: boolean;
  importantClass?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  label = "Aceptar",
  type = "button",
  variant = "primary",
  startIcon = null,
  fullWidth = false,
  importantClass = "",
  onClick = () => {},
  loading = false,
  disabled = false,
}: ButtonProps) => {
  const variantClassName = useMemo(() => {
    switch (variant) {
      case "primary":
        return "bg-site-primary text-white text-[16px] font-[600]";
      case "light":
        return "bg-white border  text-black py-[5px] px-[11px] text-base font-semibold hover:bg-gray-100 rounded-lg";
      case "link":
        return "bg-white text-primary text-[12px]";
      case "danger":
        return "bg-red-500 text-white text-base font-semibold font-[600] hover:bg-red-400";
      case "dark":
        return "bg-black py-[5px] px-[11px] border text-base font-semibold text-white hover:bg-gray-900 rounded-lg";
      case "dark-light":
        return "bg-gray-400 py-[5px] px-[11px] border text-base font-semibold text-white hover:bg-gray-300 rounded-lg";
      case "none":
        return "!bg-transparent !p-0 !w-auto";
      default:
        break;
    }
  }, [variant]);

  if (loading) {
    return (
      <button
        type={type}
        className={`${variantClassName}  ${importantClass} py-[14px] ${
          fullWidth ? "w-full" : "w-full lg:w-2/4"
        } rounded flex items-center justify-center disabled:opacity-55 disabled:cursor-not-allowed`}
        onClick={onClick}
        disabled={disabled}
      >
        <Spinner />
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${variantClassName} py-[14px] ${
        fullWidth ? "w-full" : "w-full lg:w-2/4"
      } rounded flex gap-2 items-center justify-center disabled:opacity-55 disabled:cursor-not-allowed ${importantClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && startIcon} {label}
    </button>
  );
};

export default Button;
