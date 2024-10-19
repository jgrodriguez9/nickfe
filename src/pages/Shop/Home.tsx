import { useNavigate } from "react-router-dom";
import Button from "../../components/Control/Button";
import useAppTranslation from "../../hook/useAppTranslation";

const Home = () => {
  const { t, changeLanguage } = useAppTranslation({ keyPrefix: "pages.home" });
  const navigate = useNavigate();

  const handleLanguage = (lng: string) => {
    changeLanguage(lng);
    navigate("/step-1");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8">
      <h1 className="text-purple-800 text-4xl block font-semibold uppercase">
        {t("selectYouLanguage")}
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          label="ENGLISH"
          importantClass="!w-[250px] !text-2xl"
          onClick={() => handleLanguage("en")}
        />
        <Button
          label="ESPAÑOL"
          importantClass="!w-[250px] !text-2xl"
          onClick={() => handleLanguage("es")}
        />
      </div>
    </div>
  );
};

export default Home;
