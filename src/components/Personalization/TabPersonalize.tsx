/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Tab, { Tabs } from "../Common/Tab";
import SelectDesigns from "../Control/SelectDesigns";

type TabPersonalizeProps = {
  formik: any;
};

const TabPersonalize = ({ formik }: TabPersonalizeProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const tab2 = (
    <div className="flex flex-col gap-1">
      <SelectDesigns id="design" name="design" label="Parches" value={""} />
      <SelectDesigns id="design" name="design" label="Motif" value={""} />
      <SelectDesigns id="design" name="design" label="Textos" value={""} />
    </div>
  );
  const tabs: Tabs[] = [
    {
      title: "Diseño",
      children: (
        <SelectDesigns id="design" name="design" label="Diseños" value={""} />
      ),
    },
    { title: "Adicionales", children: tab2 },
  ];

  return (
    <Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
  );
};

export default TabPersonalize;
