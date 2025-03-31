import React from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { starGenerator } from "../constants/Helper";

const Review = () => {
  return (
    <div className="my-10  sm:my-15 w-[93vw] lg:w-[70vw] mx-auto ">

<h3 className="flex items-center gap-3 font-extrabold text-2xl text-gray-800 dark:text-white mb-8 text-center">
  <hr className="flex-grow border-t-2 border-zinc-600" />
  <span>Reviews</span>
  <hr className="flex-grow border-t-2 border-zinc-600" />
</h3>



      {/* Write reviw section */}
      <div className="rounded-lg">
        <h4 className="font-semibold text-lg text-gray-700  dark:text-customIsabelline mb-4">
          Write a review
        </h4>
        <Textarea
          placeholder="Write your review here"
          className="mb-4 "
        ></Textarea>
        <div className="flex gap-5"></div>
        <Input
          typy="number"
          placeholder="Ratings(1-5)"
          max="5"
          min="1"
          className="mb-4 w-[10rem]  "
        />
        <Button className=" bg-[#A6121E] text-white  hover:text-black">Submit review</Button>
      </div>

      {/* Reviws list  */}
      <div className="space-y-6 my-10">
        <div className="bg-white border-gray-200 px-6  rounded-xl shadow-lg dark:bg-zinc-900 dark:border-none  py-2">
          {/* Reviewer info */}
          <div className="flex items-center mb-4">
            <img
              src="http://via.placeholder.com/40"
              alt=""
              className="w-8  h-8 rounded-full  border border-gray-300"
            />

            <div className="ml-2">
              <h4>Chinamy Dhal</h4>
              <div className="flex items-center mt-1">
                {starGenerator(5, "0", 15)}
              </div>
            </div>
          </div>

          {/* Review content */}
          <p className="tex-gray-600 text-sm dark:text-customGray">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reiciendis, suscipit!
          </p>

          {/* Reply Section Actions */}
          <div className="mt-5 bg-gray-50 p-4  rounded-lg border dark:bg-zinc-800 ">
            <h5 className="font-bolt text-sm text-gray-700 mb-3 dark:text-customYello">
              {" "}
              Replies(2)
            </h5>

            <div className="space-y-4">
             <div className="flex items-center space-x-4 border-b pb-3 last:border-none">
             <img
                src="http://via.placeholder.com/40"
                alt=""
                className="w-8  h-8 rounded-full  border border-gray-300"
              />
              <div>
                <h6 className="font-medium text-gray-800 text-sm dark:text-customIsabelline ">
                   Coder-29 </h6>
                <p className="text-gray-600 text-sm dark:text-customGray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, nesciunt!</p>
              </div>
             </div>

            </div>
          </div>

          <div className="mt-4">
            <Textarea placeholder="Write your reply...." />
            <Button size ="sm" className="mt-4"> Reply </Button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Review;
