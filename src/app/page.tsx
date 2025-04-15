"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 1000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900 text-white">

      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-4">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-[url('/pill-bg.png')] bg-repeat opacity-3 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10"></div>

          <motion.div
            className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-red-800/15 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          ></motion.div>

          <motion.div
            className="absolute -bottom-10 right-0 w-2/5 h-2/5 rounded-full bg-red-900/20 blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>

          <motion.div
            className="absolute top-1/4 right-1/4 w-1/4 h-1/4 rounded-full bg-red-800/10 blur-[80px]"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
              delay: 4
            }}
          ></motion.div>
        </motion.div>

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            className="space-y-6 sm:space-y-8 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="flex items-center justify-center space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <h3 className="text-red-500 font-semibold tracking-widest uppercase text-xs sm:text-sm">
                Washington Crisis Alert
              </h3>
            </motion.div>

            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mx-auto ${glitchActive ? 'glitch' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                textShadow: glitchActive ? '2px 2px #ff073a, -2px -2px #0e9fff' : 'none',
                position: 'relative',
              }}
              data-text={`The Opioid Epidemic`}
            >
              <span className="block sm:inline">The</span>{" "}
              <span className="text-red-600 relative inline-block">
                Opioid{" "}
                <span className="sm:hidden">
                  <br />
                </span>
                Epidemic
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 bg-red-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 1 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl font-light leading-relaxed mx-auto text-center italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Raising awareness. Protecting families. Understanding the data that matters in the fight against Washington&apos;s deadliest drug crisis.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={scrollToNextSection}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="w-[26px] sm:w-[30px] h-[40px] sm:h-[50px] rounded-full border-2 border-white/20 flex justify-center p-1 sm:p-2 backdrop-blur-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
      <section className="h-screen flex lg:flex-row flex-col items-center justify-center relative p-16">
        <div>
          <h2>Overdose Trends</h2>
        </div>
        <div>

        </div>
      </section>
      <section className="min-h-sccreen bg-gray-900 text-white relative py-20 px-4">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset=0 bg-[url('/pill-bg.png')] bg-repeat opacity-2 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/4 w-1/3 h-1/3 rounded-full bg-red-800/15 blur-[150px]"></div>
          <div className="absolute top-1/4 right-1/3 w-1/4 h-1/4 rounded-full bg-red-900/14 blur-[120px]"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-red-600">Real Stories</span> of Addiction
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg italic">
              Behind every statistic is a human story. These are the voices that remind us why this fight matters.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/PfwO4rrd5CM"
                  title="Opioid Addiction Story #1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">The Human Cost of Opioids</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  A raw glimpse into how opioid addiction destroys lives and tears families aprt,
                  revealing the true human cost behind Washington&apos;s deadliest drug crisis.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/N9ZKNyyWjDk"
                  title="Journey to Recovery"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">From Addiction to Recovery</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  A powerful account of strength and resilience in the face of opioid addiction,
                  showing that recovery is possible with proper support and treatment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}