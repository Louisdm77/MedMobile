import React from "react";

const SignUp = () => {
  return (
    <div className="md:hidden p-2">
      <div>
        <h1 className="font-bold text-start text-4xl">MedMobile</h1>
      </div>
      <div>
        <div className="bg-gray-100 h-[70%] w-full m-auto p-4 mt-4 rounded">
          <h2 className="text-center mt-3 mb-3 text-2xl font-bold">Sign Up</h2>
          <div>
            <form>
              <div className="grid">
                <label htmlFor="name" className="font-bold">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe Smith"
                  className="bg-gray-200 rounded w-full p-3"
                />
              </div>
              <div className="grid mt-2">
                <label htmlFor="phone-select" className="font-bold">
                  Phone Number
                </label>
                <div className="flex justify-between items-center">
                  <select
                    name="phone"
                    id="phone-select"
                    className="bg-gray-200 rounded w-[26%] font-bold p-3 text-md"
                  >
                    <option value="+234">+234</option>
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="123-456-7890"
                    className="bg-gray-200 rounded w-[73%] p-3 text-md"
                  />
                </div>
              </div>{" "}
              <div className="grid mt-2">
                <label htmlFor="email" className="font-bold">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-200 rounded w-full p-3"
                />
              </div>

              <button type="submit" className="w-full rounded text-center bg-white border border-2 border-black mt-4 p-2">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
