import React from "react";
import Layout from "../../components/layout";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import Faq from "../../components/faq";
import ContactSupport from "../../components/contactSupport";
import Chatbot from "../../components/chatBot";

const Help = () => {
  return (
    <Layout>
      <div>
        <div>
          <div className="p-4 grid grid-cols-[55%_30%_10%] gap-4 items-center mt-2">
            <div>
              <h1 className="font-bold text-2xl">Help</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="rounded-full w-full h-10 p-2 color border-none"
              />
              <button className="absolute right-3 top-3 text-xl ">
                <IoSearchOutline />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-gray-300 rounded-full p-4 text-lg color">
                <FaRegBell />
              </button>
              <button className="bg-gray-300 rounded-full p-4 text-lg color">
                <FaRegUser />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 p-6 gap-8 font-normal">
          <div className="w-[75%] justify-center">
            <Faq />
            <ContactSupport />
            <Chatbot />
          </div>

          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
