import CardWithFooter from "../../components/Common/CardWithFooter";
import useAppTranslation from "../../hook/useAppTranslation";
import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import { useNavigate } from "react-router-dom";
import useGetProductsQuery from "@/hook/Queries/useGetProductsQuery";
import { Product as ProductType } from "@/types/product";
import { useAppDispatch } from "@/hook/useRedux";
import { addProduct } from "@/redux/orderSlice";

const Product = () => {
  const { t } = useAppTranslation({ keyPrefix: "pages.product" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: products } = useGetProductsQuery();

  const handleNext = (id: string) => {
    const itemSelected: ProductType & { _id: string } = products.items.find(
      (it: ProductType & { _id: string }) => it._id === id
    );
    dispatch(
      addProduct({
        id: itemSelected._id,
        name: itemSelected.name,
        price: itemSelected.price,
        imageUrl: itemSelected.imageUrl,
        tallas: itemSelected.tallas,
      })
    );
    navigate("/step-3");
  };

  return (
    <div className="relative flex flex-col items-center mt-52 w-full gap-8">
      <h1 className="text-purple-800 text-6xl block font-semibold uppercase">
        {t("title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {products?.items.map((it: ProductType & { _id: string }) => (
          <CardWithFooter
            key={it._id}
            icon={
              <img
                src={it.imageUrl}
                alt={it.name}
                className="h-60 w-60 m-5 mx-10"
              />
            }
            text={it.name}
            price={it.price}
            action={() => handleNext(it._id)}
          />
        ))}

        {/* <CardWithFooter
          icon={<FaTshirt className="h-60 w-60 m-5 mx-10 text-gray-700" />}
          text="Sudadera"
          price={26}
          action={handleNext}
        /> */}
      </div>
      <SchemaDefault2 />
    </div>
  );
};

export default Product;
