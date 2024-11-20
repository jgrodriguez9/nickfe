import { useNavigate } from "react-router-dom";
import useAppTranslation from "../../hook/useAppTranslation";
import CardWithFooter from "../../components/Common/CardWithFooter";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import useGetCharacterQuery from "@/hook/Queries/useGetCharacterQuery";
import { Character as CharacterType } from "@/types/character";
import { useAppDispatch } from "@/hook/useRedux";
import { addCharacter } from "@/redux/orderSlice";

const Characters = () => {
  const { t } = useAppTranslation({ keyPrefix: "pages.character" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: characters } = useGetCharacterQuery();
  const handleNext = (id: string) => {
    const itemSelected: CharacterType & { _id: string } = characters.items.find(
      (it: CharacterType & { _id: string }) => it._id === id
    );
    dispatch(
      addCharacter({
        id: itemSelected._id,
        name: itemSelected.name,
        imageUrl: itemSelected.imageUrl,
      })
    );
    navigate(`/step-4/${itemSelected._id}`);
  };

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {characters?.items.map((it: CharacterType & { _id: string }) => (
          <CardWithFooter
            key={it._id}
            icon={
              <img
                src={it.imageUrl}
                alt={it.name}
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

export default Characters;
