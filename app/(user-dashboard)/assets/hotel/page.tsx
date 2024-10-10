""
import React from "react";
import Image from "next/image";
import Graph from "@/library/components/organisms/graph";
import AccessRooms from "@/library/components/organisms/access-rooms";

const Page = () => {
  const generatedYield = 100000;
  const expectedYield = 500000;

  const percentage = (generatedYield / expectedYield) * 100;

  return (
    <div className="lg:flex h-full">
      <div className="bg-lightMode-background-main dark:bg-darkMode-background-main border-r border-gray-200 dark:border-gray-800 lg:w-2/5 pt-8 px-8 lg:h-full flex flex-col gap-4">
        <div className="flex gap-5 items-center">
          <div className="rounded-2xl px-6 font-semibold py-4 text-lightMode-text-accent dark:text-darkMode-text-accent bg-lightMode-button-background/10 dark:bg-darkMode-button-background/10 text-sm">
            Assets &gt; Hotels
          </div>
        </div>
        <Image
          src="/images/dashboard/hotel/hotel.png"
          alt=""
          width={327}
          height={180}
          className="w-full rounded-3xl h-[180px]"
        />

        <div className="flex flex-col pt-2 items-center gap-2">
          <h1 className="text-lg font-semibold">D ROCK HOTELS</h1>

          <div className="bg-lightMode-brand-primary/10 dark:bg-darkMode-brand-primary/10 flex flex-col gap-2.5 rounded-3xl w-full py-3 px-6 mx-3.5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm">Yield Generated</p>
                <p className="font-semibold">
                  ₦{generatedYield.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm">Expected Yield</p>
                <p className="font-semibold">
                  ₦{expectedYield.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="relative w-full pt-5">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-lightMode-brand-accent dark:bg-darkMode-brand-accent rounded-l-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div
                className="absolute top-0 text-xs font-semibold text-orange-500"
                style={{
                  left: `${percentage}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {percentage.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className=" border-t-2  border-gray-200 dark:border-gray-800 w-full rounded-3xl h-64 pt-4 mt-6">
            <div className=" flex justify-between px-5 pb-4">
              <p className=" text-sm">Manage Utilities</p>
              <p className=" text-sm">September </p>
            </div>
            <Graph />
          </div>
        </div>



      </div>

      <div className="lg:w-3/5 pt-12 px-8">
      <AccessRooms />
      </div>
    </div>
  );
};

export default Page;
