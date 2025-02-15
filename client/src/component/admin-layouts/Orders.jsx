import React from "react";
import OrderProductTitle from "../admin-layouts/OrderProductTitle";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"


const Orders = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col  gap-5 mx-auto my-auto">
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>

            <div className="grid space-y-1 gap-2 sm:w-[78vw] ">
              <Card className="space-y-2 p-3 shadow-md">
                <div className="grid sm:grid-cols-3 gap-2">
                  {/*multiple ordered product will diaplay here  */}
                  <OrderProductTitle />
                  <OrderProductTitle />
                  <OrderProductTitle />
                </div>
                <hr />
                <div>
                  <p className="flex justify-between sm:justify-start items-center gap-2 px-3">
                    <span className="font-bold ">Total:</span>
                    <span className="text-sm text-CuustomGray">₹560</span>
                  </p>
                  <p className="flex justify-between sm:justify-start items-center gap-2 px-3">
                    <span className="font-bold ">Address:</span>
                    <span className="text-sm text-CuustomGray">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Obcaecati, nisi?
                    </span>
                  </p>
                  <p className="flex justify-between sm:justify-start items-center gap-2 px-3">
                    <span className="font-bold ">Name:</span>
                    <span className="text-sm text-CuustomGray">
                      Chinmay Dhal
                    </span>
                  </p>
                  <p className="flex justify-between sm:justify-start items-center gap-2 px-3">
                    <span className="font-bold ">Email:</span>
                    <span className="text-sm text-CuustomGray">
                      chinmaydhal6370@gmail.com
                    </span>
                  </p>
                  <p className="flex justify-between sm:justify-start items-center gap-2 px-3">
                    <span className="font-bold ">Payment Id:</span>
                    <span className="text-sm text-CuustomGray">
                      hgjkld98jfjjfkj
                    </span>
                  </p>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="pending" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="packed">packed</SelectItem>
                    <SelectItem value="in transit"> in transit</SelectItem>
                    <SelectItem value="comleted">completed</SelectItem>
                    <SelectItem value="failed">failed</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>
          </div>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Orders;
