import React from "react";
import { SidebarInset } from "../ui/sidebar";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import Chart1 from "./Chart1";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Analytics = () => {
  return (
    <div className="w-full md:w-[78vw] xl:w-[78vw] max-w-full min-w-0 flex justify-center items-center p-2 sm:p-4">
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {/* Total Sales */}
            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Total Sales</h3>
                <DollarSign size={16} />
              </div>
              <div className="grid mt-3">
                <span className="text-2xl font-bold">₹4500</span>
                <span className="text-xs font-semibold text-gray-400">
                  +80% last month
                </span>
              </div>
            </div>

            {/* Users */}
            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Users</h3>
                <Users size={16} />
              </div>
              <div className="grid mt-3">
                <span className="text-2xl font-bold">+5</span>
                <span className="text-xs font-semibold text-gray-400">
                  +80% last month
                </span>
              </div>
            </div>

            {/* Sales */}
            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Sales</h3>
                <CreditCard size={16} />
              </div>
              <div className="grid mt-3">
                <span className="text-2xl font-bold">₹5500</span>
                <span className="text-xs font-semibold text-gray-400">
                  +90% last month
                </span>
              </div>
            </div>

            {/* Active Now */}
            <div className="h-fit rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold">Active Now</h3>
                <Activity size={16} />
              </div>
              <div className="grid mt-3">
                <span className="text-2xl font-bold">2</span>
                <span className="text-xs font-semibold text-gray-400">
                  +30% last month
                </span>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Chart1 />
            <div className="p-5 bg-muted/50 rounded-lg">
              <h3 className="font-bold text-xl">Recent Sales</h3>
              <p className="text-sm mt-1 my-8">
                You may make 40 sales in this month.
              </p>
              <div className="flex flex-1 flex-col gap-4">
                <div className="h-fit py-1 w-full xl:w-[30rem] rounded-lg flex justify-between items-center">
                  <div className="flex gap-4" >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-md font-semibold capitalize">
                        <h3>Chinmay Dhal</h3>
                        <p className="text-sm text-gray-400">chinmaydhal6370@gmail.com</p>
                    </div>
                    <h3 className="font-bold"></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default Analytics;
