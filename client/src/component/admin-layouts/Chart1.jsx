"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", keyboard: 186, headset: 50 },
  { month: "February", keyboard: 305, headset: 50 },
  { month: "March", keyboard: 237, headset: 50 },
  { month: "April", keyboard: 73, headset: 50 },
  { month: "May", keyboard: 209, headset: 50 },
  { month: "June", keyboard: 214, headset: 50 },
];

const chartConfig = {
  keyboard: {
    label: "Keyboard",
    color: "#2563eb",
  },
  headset: {
    label: "Headset",
    color: "#60a5fa",
  },
};

const Chart1 = () => {
  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-h-[300px] lg:min-h-[400px]">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={400} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="keyboard"
              fill={chartConfig.keyboard.color}
              radius={4}
            />
            <Bar
              dataKey="headset"
              fill={chartConfig.headset.color}
              radius={4}
            />
             <Bar
              dataKey="mouse"
              fill={chartConfig.headset.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>

        <CardFooter className='flex gap-2 font-medium  flex-col items-start  text-sm'>
          <div className="flex gap-2 font-medium  leading-none ">
            Trending up by 80% last month <TrendingUp className="h-4 w-4"/>
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the month of June
          </div>

        </CardFooter>


      </CardContent>
    </Card>
  );
};

export default Chart1;
