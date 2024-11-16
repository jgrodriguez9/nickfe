import { PiPrinter } from "react-icons/pi";
import CardWithFooter from "../../components/Common/CardWithFooter";
import useAppTranslation from "../../hook/useAppTranslation";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import { useNavigate } from "react-router-dom";
import useGetTechniqueQuery from "@/hook/Queries/useGetTechniqueQuery";
import { Technique as TechniqueType } from "@/types/technique";
import { useAppDispatch } from "@/hook/useRedux";
import { addTechnique } from "@/redux/orderSlice";

const Technique = () => {
  const { language, t } = useAppTranslation({ keyPrefix: "pages.technique" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: techniques } = useGetTechniqueQuery();
  const handleNext = (id: string) => {
    const technique: TechniqueType & { _id: string } = techniques.items.find(
      (it: TechniqueType & { _id: string }) => it._id === id
    );
    dispatch(
      addTechnique({
        id: technique._id,
        name: language === "es" ? technique.name : technique.nameEng,
        price: technique.price,
        imageUrl: technique.imageUrl,
      })
    );
    navigate("/step-2");
  };

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {techniques?.items.map((it: TechniqueType & { _id: string }) => (
          <CardWithFooter
            key={`technique-${it._id}`}
            icon={
              <img
                src={it.imageUrl}
                alt={it.nameEng}
                className="h-60 w-60 m-5 mx-10"
              />
            }
            text={language === "es" ? it.name : it.nameEng}
            price={it.price}
            action={() => handleNext(it._id)}
          />
        ))}
        {/* <CardWithFooter
          icon={<PiPrinter className="h-60 w-60 m-5 mx-10 text-gray-700" />}
          text={t("straightToGarments")}
          price={18}
          action={handleNext}
        />
        <CardWithFooter
          icon={
            <GiSewingMachine className="h-60 w-60 m-5 mx-10 text-gray-700" />
          }
          text={t("embroidery")}
          price={26}
          action={handleNext}
        /> */}
      </div>
      <SchemaDefault2 />
    </div>
  );
};

export default Technique;
