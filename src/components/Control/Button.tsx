import { useMemo } from "react";
import Spinner from "../Loader/Spinner";

type ButtonProps = {
  label?: string;
  type?: "button" | "submit";
  variant?: string;
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
        return "bg-white border border-[#E8E9EA] text-[#282828] text-[12px] font-[500]";
      case "link":
        return "bg-white text-primary text-[12px]";
      case "danger":
        return "bg-red-500 text-white text-[16px] font-[600]";
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
