/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Tab, { Tabs } from "../Common/Tab";
import SelectDesigns from "../Control/SelectDesigns";
import useGetDesignByCharacter from "@/hook/Queries/useGetDesignByCharacter";
import { DesignSchema } from "@/types/character";
import { useAppDispatch } from "@/hook/useRedux";
import { setValueOrder } from "@/redux/orderSlice";

type TabPersonalizeProps = {
  formik: any;
};

const TabPersonalize = ({ formik }: TabPersonalizeProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useAppDispatch();

  const { data: designs } = useGetDesignByCharacter(formik.values.character.id);

  const onHandleChangeSelect = (value: any, key: string) => {
    formik.setFieldValue(key, value);
    dispatch(
      setValueOrder({
        key: key,
        value: value,
      })
    );
  };

  const tab2 = (
    <div className="flex flex-col gap-1">
      <SelectDesigns
        id="design"
        label="Parches"
        value={""}
        designOptions={[]}
        onClick={(value: string) => onHandleChangeSelect(value, "design")}
      />
      <SelectDesigns
        id="design"
        label="Motif"
        value={""}
        designOptions={[]}
        onClick={(value: string) => onHandleChangeSelect(value, "design")}
      />
      <SelectDesigns
        id="design"
        label="Textos"
        value={""}
        designOptions={[]}
        onClick={(value: string) => onHandleChangeSelect(value, "design")}
      />
    </div>
  );
  const tabs: Tabs[] = [
    {
      title: "Diseño",
      children: (
        <SelectDesigns
          id="design"
          label="Diseños"
          value={formik.values.design.id}
          designOptions={(designs?.items ?? []).map(
            (it: DesignSchema & { _id: string }) => ({
              id: it._id,
              price: undefined,
              sku: it.sku,
              imageUrl: it.imageUrl,
            })
          )}
          onClick={(value: string) => onHandleChangeSelect(value, "design")}
        />
      ),
    },
    { title: "Adicionales", children: tab2 },
  ];

  return (
    <Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
  );
};

export default TabPersonalize;
