import { PiPrinter } from "react-icons/pi";
import CardWithFooter from "../../components/Common/CardWithFooter";
import useAppTranslation from "../../hook/useAppTranslation";
import { GiSewingMachine } from "react-icons/gi";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";

const Technique = () => {
  const { t } = useAppTranslation({ keyPrefix: "pages.technique" });

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <CardWithFooter
          icon={<PiPrinter className="h-60 w-60 m-5 mx-10 text-gray-700" />}
          text="Directo a las prendas"
          price={18}
        />
        <CardWithFooter
          icon={
            <GiSewingMachine className="h-60 w-60 m-5 mx-10 text-gray-700" />
          }
          text="Bordado"
          price={26}
        />
      </div>
      <SchemaDefault2 />
    </div>
  );
};

export default Technique;
