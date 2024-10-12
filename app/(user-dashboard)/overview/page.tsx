"use client";
import Graph from "@/library/components/organisms/graph";
import {
  Bell,
  CircleDollarSign,
  Coins,
  Download,
  WalletCards,
} from "lucide-react";
import { GaugeChart } from "@/library/components/organisms/goal-chart";
import { useQuery } from "@tanstack/react-query";
import { axiosAuth } from "@/library/api/axios";

interface Category {
  name: string;
  amount: number;
  color: string;
}

interface Asset {
  asset_number: string;
  asset_type: string;
  asset_name: string;
  location: string;
  total_revenue: string;
  details: string;
  account_number: string;
  bank: string;
  user_role: string;
  sub_asset_count: number;
}

const Dashboard = () => {
  const goalAmount = 100000;
  const currentAmount = 70000;
  const categories: Category[] = [
    { name: "Hotel", amount: 5000, color: "bg-purple-500" },
    { name: "Logistics", amount: 5000, color: "bg-blue-500" },
    { name: "Medical", amount: 5000, color: "bg-green-500" },
    { name: "Agriculture", amount: 5000, color: "bg-blue-400" },
  ];

  const { data: assets, isLoading: assetsLoading, isError: assetsError } = useQuery<Asset[], Error>({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axiosAuth.get<Asset[]>("/assets/");
      return data;
    },
  });

  return (
    <div>
      <main className="flex-1 overflow-x-hidden overflow-y-auto flex flex-col md:flex-row">
        <div className="container mx-auto p-4 md:p-8 w-full md:w-3/4">
          {/* Assets Overview */}
          <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-3xl shadow-2xl shadow-[#4c67641f] mb-6">
            <div className=" flex justify-between mb-8 items-center">
              <div>
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className=" text-lightMode-text-main dark:text-darkMode-text-main text-sm mt-3">
                Summary of your performing assets
                </p>
              </div>
              <button className=" py-2.5 px-4 rounded-lg border border-lightMode-text-main flex items-center gap-2">
                <Download width={16} height={16} />
                <p>Export</p>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-100 dark:bg-purple-500 p-4 rounded-3xl flex flex-col items-start border-l-[4px] border-purple-500 dark:border-purple-900">
                <div className=" p-3 rounded-full bg-purple-500 dark:bg-purple-700 mb-3">
                  <WalletCards
                    width={24}
                    height={24}
                    color="white"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="text-2xl font-bold">{assets?.length}</p>
                <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-heading">
                  Total assets
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-500 p-4 rounded-3xl flex flex-col items-start border-l-[4px] border-blue-500 dark:border-blue-900">
                <div className=" p-3 rounded-full bg-blue-500 dark:bg-blue-700 mb-3">
                  <CircleDollarSign
                    width={24}
                    height={24}
                    color="white"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="text-2xl font-bold">20,000</p>
                <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-heading">
                  Yield generated
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-400 p-4 rounded-3xl flex flex-col items-start border-l-[4px] border-green-500 dark:border-green-900">
                <div className=" p-3 rounded-full bg-green-500 dark:bg-green-600 mb-3">
                  <Coins
                    width={24}
                    height={24}
                    color="white"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="text-2xl font-bold">100,000</p>
                <p className="text-sm text-lightMode-text-main dark:text-darkMode-text-heading">
                  Expected Yield
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-3xl shadow-2xl shadow-[#4c67641f] w-full h-96">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>

            <Graph />
          </div>
        </div>

        {/* second screen */}
        <div className=" w-full md:w-1/4 container mx-auto flex flex-col gap-8 p-4 md:p-0">
          {/* <div className="bg-lightMode-background-main dark:bg-darkMode-background-main p-6 rounded-bl-3xl w-full h-[40vh] border-b border-l border-gray-200 dark:border-gray-800  hidden md:flex flex-col">
            <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <>Notifications</>{" "}
              <Bell
                width={18}
                height={18}
                className=" text-lightMode-brand-accent"
              />
            </h2>
            <p className=" text-sm text-lightMode-text-main dark:text-darkMode-text-main">
              Nothing to show
            </p>
          </div> */}

          {/* graph here */}
          {/* <div className=" w-full rounded-3xl md:rounded-r-none bg-lightMode-background-main dark:bg-darkMode-background-main p-6 border border-gray-200 dark:border-gray-800">
            <GaugeChart
              goal={goalAmount}
              current={currentAmount}
              categories={categories}
            />
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
