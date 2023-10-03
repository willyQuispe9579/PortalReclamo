import { useState } from "react";
import styles from "./Tabs.module.scss";

interface Tab {
  id: number;
  title: JSX.Element;
  content: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabMenu}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.content} ${activeTab === tab.id ? styles.active : "" }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
