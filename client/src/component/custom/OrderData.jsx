import React from "react";
import { Card } from "../ui/card";
import { ArrowDownToLine, IndianRupee } from "lucide-react";

const OrderData = ({
  amount = 100,
  address = "123, abc street, xyz city",
  status = "pending",
  createdAt = "2021-09-01",
  updatedAt = "2021-09-01",
}) => {
  return (
    <Card className=" grid gap-2 p-2 ">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center border p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
        <div className="flex items-center gap-2 ">
          <img
            src="https://images.pexels.com/photos/30780540/pexels-photo-30780540/free-photo-of-misty-urban-skyline-of-bursa-turkiye.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="w-20 h-20 rounded-lg"
          />

          <div className="grid gap-1">
            <h1 className="font-semibold text-sm sm:text-lg">
              Mechanical Keybord with Ghosting keys
            </h1>
            <p className="flex text-xs sm:text-sx sm:test-md gap-2 sm:gap-2 text-gray-500 my-2 sm:my-0 ">
              <span className="font-semibold">
                Color:{" "}
                <span style={{ backgroundColor: "white" }}>{"white"}</span>
              </span>
              <span className="hidden sm:block">|</span>
              <span className="font-semibold">
                Price:{" "}
                <span className="font-medium text-customYellow">₹599</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col gap-3  sm:gap-0 mt-2 sm:mt-0 sm:items-center">
          <h2 className=" text-md sm:text-xl font-bolt flex items-center dark:text-customYello ">
            <IndianRupee size={18} />
            499
          </h2>
          <p className="dark:text-customYello text-end">Qty: 1 </p>
        </div>
      </div>
      <div className="flex  flex-col sm:flex-row justify-between sm:items-center ">
        <span >
          Order on: <span className="capitalize">01 jan 2025</span>
        </span>
        <span className="hover:underline text-sm cursor-pointer flex items-center gap-1 dark:text-customYello">
          <ArrowDownToLine size = {10} />
          Downlord Invoice
        </span>
      </div>
      <hr />
      <span>Delivery At: <span className="capitalize">O5 Jan 2025</span> </span>
    </Card>
  );
};

export default OrderData;
