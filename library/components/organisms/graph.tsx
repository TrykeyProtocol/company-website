import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sept 1",
    price: 4000,
  },
  {
    name: "Sept 3",
    price: 3000,
  },
  {
    name: "Sept 5",
    price: 2000,
  },
  {
    name: "Sept 7",
    price: 2780,
  },
  {
    name: "Sept 9",
    price: 1890,
  },
  {
    name: "Sept 11",
    price: 2390,
  },
  {
    name: "Sept 13",
    price: 3490,
  },
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
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#f9733e" fill="#fcb091" />
        </AreaChart>
      </ResponsiveContainer>

    );
  }
}
