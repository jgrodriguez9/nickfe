import { useNavigate } from "react-router-dom";
import useAppTranslation from "../../hook/useAppTranslation";
import CardWithFooter from "../../components/Common/CardWithFooter";
import { FaImage } from "react-icons/fa";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import useGetDesignQuery from "@/hook/Queries/useGetDesignQuery";
import { DesignSchema } from "@/types/character";
import { useAppDispatch } from "@/hook/useRedux";
import { addDesign } from "@/redux/orderSlice";

const Design = () => {
  const { t } = useAppTranslation({ keyPrefix: "pages.design" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: designs } = useGetDesignQuery();
  const handleNext = (id: string) => {
    const itemSelected: DesignSchema & { _id: string } = designs.items.find(
      (it: DesignSchema & { _id: string }) => it._id === id
    );
    dispatch(
      addDesign({
        id: itemSelected._id,
        name: itemSelected.name,
        imageUrl: itemSelected.imageUrl,
        sku: itemSelected.sku,
      })
    );
    navigate("/personalize");
  };

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {designs?.items.map((it: DesignSchema & { _id: string }) => (
          <CardWithFooter
            key={it._id}
            icon={
              <img
                src={it.imageUrl}
                alt={it.sku}
                className="h-60 w-60 m-5 mx-10"
              />
            }
            action={() => handleNext(it._id)}
            showFooter={false}
          />
        ))}
      </div>
      <SchemaDefault2 />
    </div>
  );
};

export default Design;
