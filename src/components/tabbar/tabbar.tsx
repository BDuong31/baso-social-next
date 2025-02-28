import { TabItem } from './tab-item';
import  TabBarItem from './tabbar-item';

interface TabBarProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (key: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <section className="w-full p-1 flex justify-between items-center dark:bg-neutral3-60 bg-[#F8F8F899] rounded-[100px]">
          {tabs.map((tab, index) => (
            <TabBarItem
              key={index}
              isActive={activeTab === tab.key}
              label={tab.label}
              onClick={() => onTabChange(tab.key)}
            />
          ))}
        </section>
    );
}

export default TabBar;