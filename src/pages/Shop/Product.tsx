import { FaTshirt } from "react-icons/fa";
import CardWithFooter from "../../components/Common/CardWithFooter";
import useAppTranslation from "../../hook/useAppTranslation";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { t } = useAppTranslation({ keyPrefix: "pages.product" });
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/step-3");
  };

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <CardWithFooter
          icon={<FaTshirt className="h-60 w-60 m-5 mx-10 text-gray-700" />}
          text="Camiseta"
          price={18}
          action={handleNext}
        />
        <CardWithFooter
          icon={<FaTshirt className="h-60 w-60 m-5 mx-10 text-gray-700" />}
          text="Sudadera"
          price={26}
          action={handleNext}
        />
      </div>
      <SchemaDefault2 />
    </div>
  );
};

export default Product;
