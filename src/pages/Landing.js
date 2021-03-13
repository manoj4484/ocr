import React from "react";
import { BackTop, Divider } from "antd";
import image from "../assets/767036.jpg";

const Landing = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col">
          <div className="child-cont lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0">
            <div className="mob-img-cont">
              <img
                className="object-cover-mob object-center rounded"
                alt="hero"
                src={image}
                style={{ display: "none" }}
              />
            </div>
            <h1 className="title-font sm:text-4xl text-2xl mb-4 font-medium text-gray-900">
              OCR based food recommender to make sure you eat good!
            </h1>
            <p className="mb-8 leading-relaxed">
              Tesseract based OCR Engine to scan nutrition labels to know whether a food is recommended or not.
	      No need to worry before you eat. Open your phone, scan the label and you are ready to go. 
            </p>
            <div className="flex justify-center mob-btn">
              <button
                id="price"
                style={{
                  backgroundColor: "#ffffff",
                  border: "solid #1890ff 2px",
                  color: "#1890ff",
                }}
                className="inline-flexpy-2 px-6 py-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                <a href="/scan">Scan Now</a>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover-des object-center rounded"
              alt="hero"
              src={image}
            />
          </div>
        </div>
      </section>
      <section className="text-gray-700 body-font">
        <Divider></Divider>

        <div className="mx-auto flex pt-10 pb-6 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Let us recommend a food based on your disease
            </h1>
            <p className="mb-8 leading-relaxed">
              Don't know what to eat ? Here's how we can help you. Get foods 
	      based on your disease. Know which food is healthy for you and
	      foods that may not be safe.
            </p>
            <div className="flex justify-center">
              <a href="/">
                <button
                  id="price"
                  style={{ backgroundColor: "#1890ff" }}
                  className="inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  <a href="/food-recommender" style={{ color: "white" }}>
                    See the Recommendations
                  </a>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* pricing */}
      {/* footer */}
      <footer className="text-gray-700 body-font mt-5">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Nutrition Recommender</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2020-2021 Nutrition Recommender
          </p>
        </div>
      </footer>
      <>
        <BackTop />
      </>
      ,
    </>
  );
};

export default Landing;
