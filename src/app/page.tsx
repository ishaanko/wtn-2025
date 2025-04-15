"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function PillyModel() {
  const { scene } = useGLTF("/pilly.glb");
  return (
    <primitive
      object={scene}
      scale={[window.innerWidth / 600, window.innerWidth / 600, window.innerWidth / 600]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}
function Pilly2Model() {
  const { scene } = useGLTF("/pilly2.glb");
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      const scrollY = window.scrollY || 0;
      modelRef.current.rotation.x = scrollY * 0.0015 + 0.2;
      modelRef.current.rotation.y += 0.003 * delta * 60; // Rotate on y-axis based on frame time
      modelRef.current.position.y = -scrollY * 0.01; // Adjust position based on scroll

      // Apply random shaking effect
      modelRef.current.position.x = (Math.random() - 0.5) * 0.04;
      modelRef.current.position.z = (Math.random() - 0.5) * 0.04;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[window.innerWidth / 600, window.innerWidth / 600, window.innerWidth / 600]}
      rotation={[0, 0.2, 0.2]}
      position={[0, 0, 0]}
    />
  );
}


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
    }, 2000 + Math.random() * 3000);

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
            className="space-y-6 sm:space-y-8 mx-auto pb-32"
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
        <div className="w-full absolute h-full z-0 blur-xs">
            <Canvas className="">
            <ambientLight intensity={2} color="#ff2200" />
            <directionalLight position={[5, 5, 5]} intensity={3} color="blue" />
            <Pilly2Model />
            {/* <OrbitControls enableZoom={false} /> */}
            </Canvas>
        </div>
      </section>

      <section className="h-[80vh] flex lg:flex-row flex-col bg-gray-950 relative p-32">
        <div className="flex flex-col justify-center items-start w-full lg:w-1/2 h-full lg:px-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold pb-8">Overdose Trends</h2>
          <p>According to Washington Tracking Network, all SURDORS (State Unintentional Drug Overdoes Reporting System) counties of any opioid-related overdose deaths have increased approximately 250% from 2020 to 2023. With there over 2,000 Washingtonians died from opioids every year, many due to fentanyl. Both urban and rural areas are effect with some counties in Washington seeing overdose dates way above the state average. </p>
        </div>
        <div className="w-1/2">
          <Canvas className="h-full">
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={3} />
            <PillyModel />
            <OrbitControls enableZoom={false} />
          </Canvas>
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
          </div>
        </div>
      </section>
    </div>
  );
}

useGLTF.preload('/pilly.glb');
useGLTF.preload('/pilly2.glb');
// Ensure to install the required dependencies:
// npm install @react-three/fiber @react-three/drei three