import { useState } from "react";
import Button from "../Control/Button";
import { GiHamburgerMenu } from "react-icons/gi";

export type Tabs = {
  title: string;
  children?: React.ReactNode;
};

type TabProps = {
  tabs: Tabs[];
  currentTab: number;
  setCurrentTab: (value: number) => void;
};

const TabMobile = ({ tabs, currentTab, setCurrentTab }: TabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggleDropdown} type="button">
          <GiHamburgerMenu className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className=" flex flex-col">
            {tabs.map((tab, index) => (
              <div key={`tab-${index}`}>
                <Button
                  label={tab.title}
                  variant="light"
                  onClick={() => {
                    setCurrentTab(index);
                    toggleDropdown();
                  }}
                  importantClass={`!p-2 text-sm font-medium rounded-b-none !justify-start ${
                    index === currentTab
                      ? " !bg-primary-light"
                      : " text-gray-600"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Tab = ({ tabs, currentTab, setCurrentTab }: TabProps) => {
  return (
    <>
      <div className="lg:hidden">
        <div className="flex flex-row justify-between py-3 px-2 border border-bg-300 bg-primary-light">
          <div className="text-[#282828] font-[500]">
            {tabs[currentTab].title}
          </div>
          <div className="relative inline-block text-left">
            <TabMobile
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab: Tabs, index: number) => (
            <div key={`tab-${index}`} className="grow">
              <Button
                label={tab.title}
                variant="light"
                fullWidth
                onClick={() => setCurrentTab(index)}
                importantClass={`!py-2 text-sm font-medium rounded-b-none ${
                  index === currentTab
                    ? "!bg-site-primary-300"
                    : "text-gray-600"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {tabs.map((tab, index) => (
        <div
          key={`tab-${index}`}
          className={`${index === currentTab ? "block" : "hidden"}`}
        >
          {tab.children}
        </div>
      ))}
    </>
  );
};

export default Tab;
