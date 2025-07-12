import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  DocumentTextIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: DocumentTextIcon,
    title: "Copyright Protection",
    description:
      "Prove and retain ownership, even when your work is copied or reshared.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Content Authentication",
    description:
      "Verify that files haven't been altered, ensuring authenticity.",
  },
  {
    icon: LightBulbIcon,
    title: "Source Tracking",
    description: "Identify the origin of leaks or illegal distribution.",
  },
  {
    icon: CheckCircleIcon,
    title: "Brand Attribution",
    description: "Ensure your name and brand stay connected to your content.",
  },
];

function AboutMarkProof() {
  return (
    <section
      id="about-markproof"
      className="relative isolate px-6 pt-24 lg:px-8 text-center min-h-[80vh] flex flex-col justify-start"
    >
      {/* Top Background */}
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

      {/* Content */}
      <div className="mx-auto max-w-3xl py-20 sm:py-24 lg:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
          Why Digital Watermarking <br />
          <span className="text-indigo-600">Matters Now More Than Ever</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          In an age of instant content sharing, watermarking ensures your
          ownership, attribution, and authenticity stay intact—even after
          duplication.
        </p>
      </div>

      {/* What is Digital Watermarking */}
      <section className="max-w-4xl mx-auto text-center py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          What is Digital Watermarking?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Digital watermarking embeds invisible information directly into
          images, videos, or documents. Whether visible or hidden, the data
          remains intact even through edits and resharing, acting as a permanent
          digital fingerprint.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14">
          Use Cases & Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/70 backdrop-blur-lg border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <Icon className="h-10 w-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-20">
        <Link
          to="/upload-section"
          className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get Started Now
        </Link>
      </div>

      {/* Bottom Background */}
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
    </section>
  );
}

export default AboutMarkProof;
