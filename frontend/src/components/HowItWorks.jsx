// src/components/HowItWorks.jsx
import React from "react";

function HowItWorks() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-20">
      {" "}
      {/* mt-20 for spacing below fixed header */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        How MarkProof Works: Your Simple Guide to Digital Authentication
      </h1>
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0 size-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            1
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Step 1: Get Started / Upload Your Image
            </h2>
            <p className="text-lg text-gray-700">
              Begin by navigating to the "Watermark Tools" section of our
              website. Here, you'll find a straightforward "Upload Image"
              button. Click it and select the digital image (e.g., JPEG, PNG)
              from your device that you wish to secure with our advanced
              watermarking.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0 size-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            2
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Step 2: Embed Your Authentication Data
            </h2>
            <p className="text-lg text-gray-700">
              Once your image is uploaded, you'll be prompted to enter the
              specific information you want to embed. This can include your
              name, organization, a unique copyright ID, creation timestamps, or
              any custom metadata crucial for proving authenticity. Our
              sophisticated Gen AI hybrid technology will then invisibly and
              robustly embed this data into your image.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0 size-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            3
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Step 3: Review and Download Your MarkProof Image
            </h2>
            <p className="text-lg text-gray-700">
              In just a few moments, your image will be processed. You'll see a
              preview of your watermarked image – rest assured, the embedded
              signature is imperceptible to the naked eye. Download this
              "MarkProofed" image, which now carries an indelible digital
              signature ready for distribution or archiving.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0 size-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            4
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Step 4: Verify Content Authenticity (As Needed)
            </h2>
            <p className="text-lg text-gray-700">
              Whenever you, or anyone, needs to confirm the authenticity or
              origin of an image, simply return to our "Watermark Tools"
              section. Upload the image in question, and our AI-powered detector
              will swiftly scan it for the hidden watermark. The system will
              then display the embedded authentication data, confirming the
              image's legitimacy and provenance. If no valid watermark is
              detected or if tampering is found, you will be promptly notified.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-800 font-semibold mb-6">
            Ready to secure your digital assets?
          </p>
          <a
            href="/upload-section"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
