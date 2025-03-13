import React from "react";
import { TfiAngleRight } from "react-icons/tfi";
import { Link } from "react-router-dom";

const ContactSupport = () => {
  return (
    <div>
      <section className="">
        <h2 className="text-start font-semibold mt-4">Contact Support</h2>
        <div className="w-full">
          <div className="mx-auto w-full max-w-5xl border p-4 text-sm rounded-lg bg-white">
            <Link className="flex justify-between items-center p-1">
              <div>Live Chat with Support</div>
              <div>
                {" "}
                <button>
                  <TfiAngleRight />
                </button>
              </div>
            </Link>
            <Link className="flex justify-between items-center mt-4 p-1">
              <div>Submit a Support Ticket</div>
              <div>
                <button>
                  <TfiAngleRight />
                </button>
              </div>
            </Link>
            <Link className="flex justify-between items-center mt-4 p-1">
              <div>Emergency Contact</div>
              <div>
                <button>
                  <TfiAngleRight />
                </button>
              </div>
            </Link>
            <Link className="flex justify-between items-center mt-4 p-1">
              <div>Report a Problem</div>
              <div>
                <button>
                  <TfiAngleRight />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSupport;
