import React from "react";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload Your Image",
      description:
        "Go to the 'Watermark Tools' section and use the Upload button to select a JPEG or PNG image you’d like to secure.",
      image: "/image1.png",
    },
    {
      number: "2",
      title: "Embed Authentication Data",
      description:
        "Input your desired watermark data — like name, copyright ID, or timestamp. Our Gen AI invisibly embeds this data into your image.",
      image: "/image2.png",
    },
    {
      number: "3",
      title: "Download & Verify Anytime",
      description:
        "Download your secured image and verify it any time using our AI detection system to confirm its authenticity and integrity.",
      image: "/image3.png",
    },
  ];

  return (
    <div className="relative isolate px-6 py-24 lg:px-8 font-inter bg-gray-50 text-gray-900 min-h-screen">
      {/* Background blur divs from HeroSection */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          How MarkProof Works
        </h1>
        <p className="text-lg text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Secure your content in just three easy steps with AI-powered
          watermarking.
        </p>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-white ${
                // Removed 'shadow-lg'
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Content */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {" "}
                    {/* Removed 'shadow' */}
                    {step.number}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 ml-4">
                    {step.title}
                  </h2>
                </div>
                <p className="text-gray-700 text-lg">{step.description}</p>
              </div>

              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full rounded-xl" // Removed 'shadow-md'
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24">
          <p className="text-xl text-gray-800 font-medium mb-6">
            Ready to secure your digital assets?
          </p>
          <Link
            to="/upload-section"
            className="inline-block rounded-full bg-indigo-600 px-8 py-3 text-lg font-semibold text-white hover:bg-indigo-700 transition duration-300" // Removed 'shadow'
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
