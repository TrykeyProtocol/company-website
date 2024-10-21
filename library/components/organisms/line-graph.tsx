import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

interface DailyStats {
  date: string;
  [key: string]: number | string;
}

interface GraphData {
  total_rooms: number;
  total_active_rooms: number;
  total_occupied_rooms: number;
  expected_yield: number;
  daily_stats: DailyStats[];
}

interface GraphProps {
  data: GraphData;
  xAxisDataKey: string;
  yAxisDataKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  areaColor?: string;
  areaFillColor?: string;
  totalRooms: number;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short', day: 'numeric' });
};

const LineGraph: React.FC<GraphProps> = ({ 
  data, 
  xAxisDataKey, 
  yAxisDataKey, 
  xAxisLabel, 
  yAxisLabel,
  areaColor = "#f9733e",
  areaFillColor = "#fcb091",
  totalRooms
}) => {
  const chartData = data.daily_stats.map(item => ({
    ...item,
    [xAxisDataKey]: xAxisDataKey === 'date' ? formatDate(item.date) : item[xAxisDataKey]
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fontSize: 10 }}
          height={40}
        >
          <Label 
            value={xAxisLabel} 
            position="bottom" 
            style={{ textAnchor: 'middle', fontSize: 10 }}
          />
        </XAxis>
        <YAxis 
          tick={{ fontSize: 10 }}
          width={60}
          domain={[0, totalRooms]}
          allowDecimals={false}
        >
          <Label 
            value={yAxisLabel} 
            angle={-90} 
            position="insideLeft" 
            style={{ textAnchor: 'middle', fontSize: 10 }}
          />
        </YAxis>
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey={yAxisDataKey} 
          stroke={areaColor} 
          fill={areaFillColor} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;