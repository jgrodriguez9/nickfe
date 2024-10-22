import { useNavigate } from "react-router-dom";
import useAppTranslation from "../../hook/useAppTranslation";
import CardWithFooter from "../../components/Common/CardWithFooter";
import { FaImage } from "react-icons/fa";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";

const Characters = () => {
  const { t } = useAppTranslation({ keyPrefix: "pages.character" });
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/step-4");
  };

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <CardWithFooter
          icon={<FaImage className="h-60 w-60 m-5 mx-10 text-gray-700" />}
          action={handleNext}
          showFooter={false}
        />
      </div>
      <SchemaDefault2 />
    </div>
  );
};

export default Characters;
