"use client"
import React, { PureComponent } from "react";
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

const data = [
  { name: "Sep 1", price: 4000 },
  { name: "Sep 3", price: 3000 },
  { name: "Sep 5", price: 2000 },
  { name: "Sep 7", price: 2780 },
  { name: "Sep 9", price: 1890 },
  { name: "Sep 11", price: 2390 },
  { name: "Sep 13", price: 3490 },
];

export default class Graph extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10 }}
            height={40}
          >
            <Label 
              value="Date" 
              position="bottom" 
              style={{ textAnchor: 'middle', fontSize: 10 }}
            />
          </XAxis>
          <YAxis 
            tick={{ fontSize: 10 }}
            width={60}
          >
            <Label 
              value="Revenue" 
              angle={-90} 
              position="insideLeft" 
              style={{ textAnchor: 'middle', fontSize: 10 }}
            />
          </YAxis>
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#f9733e" fill="#fcb091" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}