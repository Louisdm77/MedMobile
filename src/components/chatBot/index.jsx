import React from "react";
import { TfiAngleRight } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Chatbot = () => {
  return (
    <div>
      <div>
        <h2 className="homee font-semibold mb-1 mt-2 p-1">
          AI Chatbot Assistant
        </h2>
        <Link className="flex justify-between items-center mt-4 p-1 bg-white rounded-lg p-2">
          <div>Ask the AI Chatbot</div>
          <div>
            <button>
              <TfiAngleRight />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Chatbot;
