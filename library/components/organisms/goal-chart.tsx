import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

interface DataEntry {
  name: string;
  value: number;
  color: string;
}

interface Category {
  name: string;
  amount: number;
  color: string;
}

interface GaugeChartProps {
  goal: number;
  current: number;
  categories: Category[];
}

const data: DataEntry[] = [
  { name: "Progress", value: 70, color: "#f97316" },
  { name: "Remaining", value: 30, color: "#e5e7eb" },
];

export const GaugeChart: React.FC<GaugeChartProps> = ({
  goal,
  current,
  categories,
}) => {
  const cx = 125;
  const cy = 100;
  const iR = 60;
  const oR = 80;

  const needle = (
    value: number,
    data: DataEntry[],
    cx: number,
    cy: number,
    iR: number,
    oR: number,
    color: string
  ) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const ang = 180 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const x0 = cx;
    const y0 = cy;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return (
      <path
        d={`M${x0},${y0}L${xp},${yp}`}
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    );
  };

  return (
    <div className=" container mx-auto h-[40vh] text-lightMode-text-heading dark:text-darkMode-text-heading">
      <h2 className=" text-center font-semibold text-lightMode-text-main dark:text-darkMode-text-main">
        Goal: ₦{goal.toLocaleString()}
      </h2>
        <ResponsiveContainer width="100%" height="33%">
          <PieChart width={300}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={iR}
              outerRadius={oR}
              fill="#8884d8"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {needle(data[0].value, data, cx, cy, iR, oR, "#f97316")}
          </PieChart>
        </ResponsiveContainer>

      <div className="text-center mb-4">
        <span className="text-xl font-bold">
          {current.toLocaleString()}
        </span>
        <p className="text-xs text-lightMode-text-main dark:text-darkMode-text-main pt-2">
          Total Amount So Far
        </p>
      </div>

      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${category.color}`} />
              <span className="text-xs">
                {category.name}
              </span>
            </div>
            <span className="text-xs font-semibold ">
              ₦{category.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
