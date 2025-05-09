"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Washington from "@/components/Washington";
import deathData from "@/components/death_data.json";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function PillyModel() {
  const { scene } = useGLTF("/pilly.glb");
  const modelRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    const handleResize = () => {
      if (modelRef.current) {
        const scaleFactor = Math.min(window.innerWidth, window.innerHeight) / Math.max(window.innerWidth, window.innerHeight) * 3;
        modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame((_state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.z += 0.007 * delta * 60;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      rotation={[Math.PI / 2 - 0.3, 0, 0]}
    />
  );
}

function Pilly2Model() {
  const { scene } = useGLTF("/pilly2.glb");
  const modelRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    const handleResize = () => {
      if (modelRef.current) {
        const scaleFactor = 2
        modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame((_state, delta) => {
    if (modelRef.current) {
      const scrollY = window.scrollY || 0;
      modelRef.current.rotation.x = scrollY * 0.0015 + 0.2;
      modelRef.current.rotation.y += 0.003 * delta * 60;
      modelRef.current.position.y = -scrollY * 0.01;
      modelRef.current.position.x = (Math.random() - 0.5) * 0.04;
      modelRef.current.position.z = (Math.random() - 0.5) * 0.04;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      rotation={[0, 0.2, 0.2]}
      position={[0, 0, 0]}
    />
  );
}

function OpioidOverdoseChart() {
  const [selectedYear, setSelectedYear] = useState<ChartData | null>(null);
  const chartData = [
    { Year: 2019, Female: 35.75, Male: 64.25, Total: 100.0 },
    { Year: 2020, Female: 26.2, Male: 73.8, Total: 100.0 },
    { Year: 2021, Female: 28.23, Male: 71.77, Total: 100.0 },
    { Year: 2022, Female: 25.26, Male: 74.74, Total: 100.0 },
    { Year: 2023, Female: 24.06, Male: 75.94, Total: 100.0 },
  ];

  interface ChartData {
    Year: number;
    Female: number;
    Male: number;
    Total: number;
  }

  const handleBarClick = (data: ChartData) => {
    setSelectedYear(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 w-full lg:w-2/3">
        <h3 className="text-xl font-bold mb-6 text-white">
          Opioid & Stimulant Overdose Deaths by Sex (2019–2023)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="Year" stroke="#888" />
            <YAxis unit="%" stroke="#888" />
            <Tooltip
              formatter={(value) => (typeof value === 'number' ? `${value.toFixed(2)}%` : value)}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #333' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="Female" fill="#ff4d4d" name="Female" onClick={handleBarClick} />
            <Bar dataKey="Male" fill="#ff8080" name="Male" onClick={handleBarClick} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 w-full lg:w-1/3">
        <h3 className="text-xl font-bold mb-4 text-white">Year Details</h3>
        {selectedYear ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Year:</span>
              <span className="text-white font-semibold">{selectedYear.Year}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Female Deaths:</span>
              <span className="text-red-400 font-semibold">{selectedYear.Female.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Male Deaths:</span>
              <span className="text-red-300 font-semibold">{selectedYear.Male.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total:</span>
              <span className="text-white font-semibold">{selectedYear.Total}%</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400">Click a bar in the chart to view detailed information for that year.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const [glitchActive, setGlitchActive] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [countyData, setCountyData] = useState({
    name: "King",
    stats2020: {
      population: "2,269,673",
      crudeDeathRate: "21.24",
      relativeDeathRate: "19.86",
    },
    stats2023: {
      population: "2,347,800",
      crudeDeathRate: "50.77",
      relativeDeathRate: "46.07",
    },
    relativeChange: "+131.97%",
  });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 1000 + Math.random() * 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  function changeData(pathId: keyof typeof deathData): void {
    const data = deathData[pathId];

    if (data) {
      const stats2020 = data["2020"];
      const stats2023 = data["2023"];
      const relativeChange = (
        ((stats2023["Adjusted Death Rate"] - stats2020["Adjusted Death Rate"]) /
          stats2020["Adjusted Death Rate"]) *
        100
      ).toFixed(2);

      setCountyData({
        name: pathId,
        stats2020: {
          population: stats2020["Population"].toLocaleString(),
          crudeDeathRate: stats2020["Crude Death Rate"].toString(),
          relativeDeathRate: stats2020["Adjusted Death Rate"].toString(),
        },
        stats2023: {
          population: stats2023["Population"].toLocaleString(),
          crudeDeathRate: stats2023["Crude Death Rate"].toString(),
          relativeDeathRate: stats2023["Adjusted Death Rate"].toString(),
        },
        relativeChange: `${Number(relativeChange) > 0 ? "+" : ""}${relativeChange}%`,
      });

      setAnimationKey((prevKey) => prevKey + 1);
    } else {
      setCountyData({
        name: "No data",
        stats2020: {
          population: "No data",
          crudeDeathRate: "No data",
          relativeDeathRate: "No data",
        },
        stats2023: {
          population: "No data",
          crudeDeathRate: "No data",
          relativeDeathRate: "No data",
        },
        relativeChange: "No data",
      });

      setAnimationKey((prevKey) => prevKey + 1);
    }
  }

  const [svgPaths, setSvgPaths] = useState<{ path: HTMLElement | null; relativeChange: number }[]>([]);

  useEffect(() => {
    const paths = Object.keys(deathData).map(county => {
      const path = document.getElementById(county);
      const stats2020 = deathData[county as keyof typeof deathData]["2020"];
      const stats2023 = deathData[county as keyof typeof deathData]["2023"];
      const relativeChange = ((stats2023["Adjusted Death Rate"] - stats2020["Adjusted Death Rate"]) / stats2020["Adjusted Death Rate"]) * 100;
      return { path, relativeChange };
    });
    setSvgPaths(paths);
  }, []);

  useEffect(() => {
    svgPaths.forEach(({ path, relativeChange }) => {
      if (path) {
        const color = relativeChange < 0
          ? `rgba(125, 125, 255, ${Math.abs(relativeChange) / 50})`
          : `rgba(255,40,40, ${Math.abs(relativeChange) / 200})`;
        path.setAttribute('fill', color);
      }
    });
  }, [svgPaths]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900 text-white">

      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-4">
        <motion.div
          className="absolute inset-0"
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              By: Inesh Dey, Iris Dey, and Ishaan Kothari
            </motion.p>

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
        <motion.div
          className="w-full absolute h-full z-0 blur-xs"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Canvas className="">
            <ambientLight intensity={2} color="#ff2200" />
            <directionalLight position={[5, 5, 5]} intensity={3} color="blue" />
            <Pilly2Model />
            {/* <OrbitControls enableZoom={false} /> */}
          </Canvas>
        </motion.div>
      </section>

      <section className="min-h-[80vh] flex lg:flex-row items-center item flex-col bg-gray-950 relative lg:p-32 p-16 gap-16">
        <motion.div
          className="flex flex-col justify-center items-start w-full lg:w-1/2 h-full lg:px-24 h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold pb-8"><span className="text-red-600">Overdose</span> Trends</h2>
          <p>
            According to Washington Tracking Network's Drug and Overdose data, all SURDORS (State Unintentional Drug Overdose Reporting System) counties of any opioid-related overdose deaths have increased approximately <span className="font-bold">250% from 2020 to 2023.</span> With there over <span className="font-bold">2,000 Washingtonians</span> dying from opioids every year, many due to fentanyl. Both urban and rural areas are affected, with some counties in Washington seeing overdose rates way above the state average.
          </p>
        </motion.div>
        <motion.div
          className="lg:w-1/2 w-full h-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ height: '450px' }}
          viewport={{ once: true }}
        >
          <Canvas className="h-full w-full">
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={3} />
            <PillyModel />
            {/* <OrbitControls enableZoom={false} /> */}
          </Canvas>
        </motion.div>
      </section>
      <section className="min-h-screen bg-black text-white relative py-20 px-4">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950"></div>
          <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-red-800/10 blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-red-900/10 blur-[120px]"></div>
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
              Families at <span className="text-red-600">Risk</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg italic">
              Parents and teens both face unique challenges in the opioid crisis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-red-500">For Parents</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                Parents struggling with opioid use may face shame, fear, or lack of access to support, but getting
                help is possible and recovery is real (FindTreatment.gov).
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                At the same time, parents should be aware of their children&apos;s risk of exposure to opioids, even
                if it&apos;s unintentional. Safe storage and open conversations save lives.
              </p>
            </motion.div>

            <motion.div
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-red-500">For Teens</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                Teens today face immense stress, anxiety and pressure. Some turn to opioids to cope, whether to
                relieve pain or escape unwanted emotions.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                But what seems like a quick fix can turn deadly fast. One laced pill can be fatal. We want you to
                have the knowledge and tools to protect yourself and your friends (Teen Newsletter, 2022).
              </p>
            </motion.div>
          </div>

          <motion.div
            className="text-center my-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              What are the <span className="text-red-600">signs?</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Physical changes",
                "Mood swings",
                "Secretive behavior",
                "Sleep changes",
                "Financial issues",
                "School/work problems"
              ].map((sign, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gray-800 flex items-center justify-center transition-colors duration-300 hover:border-red-600 hover:bg-black/50 cursor-pointer"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="text-gray-300 text-center">{sign}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="my-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="text-red-600">TAKE ACTION!</span>
            </h3>
            <p className="text-center text-gray-300 mb-10 max-w-3xl mx-auto">
              What you can do to be one step closer to solving the opioid crisis in Washington
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3">Talk early and often</h4>
                <p className="text-gray-300 text-sm sm:text-base mt-auto">
                  Have open and judgment-free conversations about drug usage
                </p>
              </motion.div>

              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3">Lock up medications</h4>
                <p className="text-gray-300 text-sm sm:text-base mt-auto">
                  Keep prescription medications secure and out of reach
                </p>
              </motion.div>

              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3">Dispose safely</h4>
                <p className="text-gray-300 text-sm sm:text-base mt-auto">
                  Use medication drop boxes or disposal pouches
                </p>
              </motion.div>

              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3">Know the signs</h4>
                <p className="text-gray-300 text-sm sm:text-base mt-auto">
                  Changes in mood, sleep or appearance can signal misuse
                </p>
              </motion.div>

              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3">Carry naloxone</h4>
                <p className="text-gray-300 text-sm sm:text-base mt-auto">
                  This is LIFE-SAVING medication that reverses overdoses
                </p>
              </motion.div>

              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3">Seek Help</h4>
                <p className="text-gray-300 text-sm sm:text-base mt-auto">
                  Resources exist to help both youth and adults
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ y: 0 }}
                whileInView={{
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                  },
                }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center"
              >
                {["Save.", "A.", "Life.", "Today."].map((word, i) => (
                  <motion.span
                    key={i}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mx-2 my-1 inline-block"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.6, 0.05, -0.01, 0.9],
                    }}
                    viewport={{ once: true }}
                  >
                    <span className={i % 2 === 0 ? "text-red-500" : "text-white"}>
                      {word}
                    </span>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="min-h-screen bg-black text-white relative py-20 px-4">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950"></div>
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-800/10 blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full bg-red-900/15 blur-[100px]"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="lg:w-2/3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  The Rise of <span className="text-red-600">Fentanyl</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Fentanyl has been the biggest game-changer in Washington&apos;s overdose trends. The Washington State Department of Health (DOH) reported that fentanyl-related deaths have increased from <span className="font-bold">224 deaths in 2019</span> to over <span className="font-bold text-red-500">2,300 deaths in 2023</span>.
                </p>
                <p className="text-gray-300 text-lg mt-4 leading-relaxed">
                  What makes fentanyl so dangerous is how easily it can be hidden and pressed into counterfeit pills or mixed with powder without the victim realizing it. These pills often look identical to well-known medication like Xanax, Percocet, or Oxycodone, but even a single pill may contain a lethal dose (NIDA, 2024).
                </p>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <motion.div
                  className="relative w-48 h-48 rounded-full bg-red-900/20 flex items-center justify-center"
                  animate={{
                    boxShadow: ["0 0 20px 5px rgba(204, 0, 0, 0.2)", "0 0 40px 10px rgba(204, 0, 0, 0.4)", "0 0 20px 5px rgba(204, 0, 0, 0.2)"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="text-6xl font-bold text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-red-500">10x</span>
                    <div className="text-sm font-normal mt-2 text-gray-300">Increase since 2019</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Regional <span className="text-red-600">Disparities</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-500">Urban Impact</h3>
                  <p className="text-gray-300">
                    Based on WSDOH data, Counties such as King, Pierce, Snohomish, and Spokane report the highest total number of opioid-related deaths due to population size (each having more than 200 deaths).
                  </p>
                  <div className="flex justify-between mt-6">
                    <motion.div
                      className="text-center"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <p className="text-3xl font-bold text-white">King</p>
                      <p className="text-sm text-gray-400">Highest total deaths</p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <p className="text-3xl font-bold text-white">Pierce</p>
                      <p className="text-sm text-gray-400">High urban concentration</p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <p className="text-3xl font-bold text-white">Spokane</p>
                      <p className="text-sm text-gray-400">Eastern WA hotspot</p>
                    </motion.div>
                  </div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-500">Rural Challenge</h3>
                  <p className="text-gray-300">
                    Rural areas such as Grays Harbor, Clallam, and Mason counties have some of the highest per capita overdose rates in the state. These regions often lack treatment centers, access to naloxone, or even primary care.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <p className="text-gray-300">Limited treatment facilities</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <p className="text-gray-300">Restricted access to naloxone</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <p className="text-gray-300">Insufficient healthcare infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                Who&apos;s Being <span className="text-red-600">Affected?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Previously, based on WSDOH data, opioid misuse was most prevalent among adults aged 25 to 54. Now it increasingly affects both elders and teenagers, with alarming increases across racial demographics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                  className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h4 className="text-xl font-bold mb-2 text-white">White</h4>
                  <p className="text-5xl font-bold text-red-500 mb-1">+219%</p>
                  <p className="text-sm text-gray-400">Increase from 2020 to 2023</p>
                </motion.div>
                <motion.div
                  className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h4 className="text-xl font-bold mb-2 text-white">African American</h4>
                  <p className="text-5xl font-bold text-red-500 mb-1">+410%</p>
                  <p className="text-sm text-gray-400">Increase from 2020 to 2023</p>
                </motion.div>
                <motion.div
                  className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h4 className="text-xl font-bold mb-2 text-white">Hispanic</h4>
                  <p className="text-5xl font-bold text-red-500 mb-1">+230%</p>
                  <p className="text-sm text-gray-400">Increase from 2020 to 2023</p>
                </motion.div>
              </div>
              <p className="text-gray-300 text-lg">
                This is often due to systemic barriers in accessing healthcare and culturally responsive treatment. The overdose crisis highlights issues of equity and access, not just substance availability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                Polysubstance Use: <span className="text-red-600">A Dangerous Trend</span>
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-2/3">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Another factor in overdose trends is polysubstance use—where people consume multiple drugs simultaneously, often unknowingly. Many fentanyl overdoses are connected with other stimulants such as methamphetamine or cocaine.
                  </p>
                  <p className="text-gray-300 text-lg mt-4 leading-relaxed">
                    According to WSDOH, <span className="font-bold">nearly half of opioid-involved deaths in 2022</span> also involved another substance, and many users did not realize fentanyl was present. This makes education and awareness of naloxone even more important, as the traditional warning signs of opioid use may be masked by another drug.
                  </p>
                </div>
                <div className="lg:w-1/3">
                  <motion.div
                    className="w-full aspect-square relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-red-900/10 flex items-center justify-center backdrop-blur-md">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-white">~50%</p>
                          <p className="text-sm text-gray-300 mt-2">of opioid deaths involve multiple substances</p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        boxShadow: ["inset 0 0 20px rgba(204, 0, 0, 0.3)", "inset 0 0 40px rgba(204, 0, 0, 0.5)", "inset 0 0 20px rgba(204, 0, 0, 0.3)"]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="min-h-screen bg-gray-950 text-white relative py-20 px-4">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-900"></div>
          <div className="absolute top-1/3 right-1/4 w-1/2 h-1/2 rounded-full bg-red-800/10 blur-[150px]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1/3 h-1/3 rounded-full bg-red-900/15 blur-[120px]"></div>
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
              The <span className="text-red-600">Data</span> Behind the Crisis
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg italic pb-2">
              Understanding the statistics helps us target our efforts where they&apos;re needed most
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg italic">
              Data retrieved and calculated from Drug and Overdose data collected by the Washington Tracking Network.
            </p>
          </motion.div>
          <motion.p
            className="text-3xl font-bold pt-24 text-center pb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Per county drug deaths from 2020 to 2023
          </motion.p>
          <motion.p
            className="text-2xl font-normal text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            In this time, nearly <span className="font-bold text-red-600">every</span> recorded county has seen an increase in drug related deaths
          </motion.p>
          <motion.div
            className="flex flex-col lg:flex-row-reverse py-16 gap-16 lg:items-center lg:justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-full lg:w-1/2 px-16"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Washington onPathClick={(pathId) => changeData(pathId as keyof typeof deathData)} />
              <motion.p
                className="text-center font-bold text-xl pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Click on a county to see its data.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-lg:text-center lg:w-1/3"
            >
              <motion.h3
                key={animationKey}
                className="text-5xl font-bold py-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="county-name">{countyData.name}</span>
                <p className="font-normal text-4xl">County</p>
              </motion.h3>
              <motion.p
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                2020
              </motion.p>
              <motion.div
                className="text-xl pb-4 stats-2020"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>Population: <span className="font-light">{countyData.stats2020.population}</span></p>
                <p>Crude Death Rate: <span className="font-light">{countyData.stats2020.crudeDeathRate}</span></p>
                <p>Relative Death Rate: <span className="font-light">{countyData.stats2020.relativeDeathRate}</span></p>
              </motion.div>
              <motion.p
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                2023
              </motion.p>
              <motion.div
                className="text-xl stats-2023"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p>Population: <span className="font-light">{countyData.stats2023.population}</span></p>
                <p>Crude Death Rate: <span className="font-light">{countyData.stats2023.crudeDeathRate}</span></p>
                <p>Relative Death Rate: <span className="font-light">{countyData.stats2023.relativeDeathRate}</span></p>
              </motion.div>
              <motion.div
                className="text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl pt-4">Change in <span className="font-bold">Statistics</span></h3>
                Relative Death Rate Changed by <motion.p key={animationKey + 3} initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} className="text-5xl font-bold relative-change text-red-600">{countyData.relativeChange}</motion.p> from 2020 to 2023.
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="text-white py-10 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-5xl font-semibold text-center pb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              And in 2023...
            </motion.h3>
            <motion.div
              className="flex justify-center items-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                src={"./opioidgraph.svg"}
                alt="Opioid Graph"
                className="w-[50%] h-auto max-w-md"
              />
              <motion.p
                className="absolute text-8xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                81%
              </motion.p>
            </motion.div>
            <motion.p
              className="px-24 text-center text-xl font-light italic text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-red-600">2819</span> out of{" "}
              <span className="font-bold text-red-600">3458</span> drug deaths
              were caused by <span className="font-bold text-red-600">opioids</span>.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <OpioidOverdoseChart />
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-gray-900 text-white relative py-20 px-4">
        <motion.div
          className="absolute inset-0 z-0 opacity-0"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[url('/pill-bg.png')] bg-repeat opacity-2 mix-blend-overlay"></div>
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
                  A raw glimpse into how opioid addiction destroys lives and tears families apart,
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
      <section className="py-16 bg-black text-white relative px-4">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
          <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 rounded-full bg-red-800/10 blur-[130px]"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-red-600">Resources</span> & Information
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
              Learn more about opioid addiction, prevention, and recovery
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-red-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-red-800 p-6 flex flex-col h-full col-span-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-2xl font-bold mb-3 text-white">Emergency Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-white font-bold">Washington Poison Center</p>
                  <a href="tel:18002221222" className="text-red-400 text-lg font-bold">1 (800) 222-1222</a>
                  <p className="text-gray-400 text-sm mt-1">Available 24/7 for poisoning emergencies & overdoses</p>
                </div>
                <div>
                  <p className="text-white font-bold">National Overdose Helpline</p>
                  <a href="tel:18004841731" className="text-red-400 text-lg font-bold">1 (800) 484-1731</a>
                  <p className="text-gray-400 text-sm mt-1">Immediate support during an overdose emergency</p>
                </div>
                <div>
                  <p className="text-white font-bold">988 Suicide & Crisis Lifeline</p>
                  <a href="tel:988" className="text-red-400 text-lg font-bold">988</a>
                  <p className="text-gray-400 text-sm mt-1">24/7 support for anyone experiencing mental health distress</p>
                </div>
              </div>
            </motion.div>

            {[
              {
                title: "SAMHSA National Helpline",
                url: "https://www.samhsa.gov/find-help/helplines/national-helpline",
                description: "1-800-662-HELP (4357) - 24/7 treatment referral and information service for substance use disorders"
              },
              {
                title: "Washington Recovery Helpline",
                url: "https://www.warecoveryhelpline.org/",
                description: "24/7 helpline for substance use, problem gambling and mental health (1-866-789-1511)"
              },
              {
                title: "Seattle ARP - Donate",
                url: "https://seattlearp.salvationarmy.org/seattle_adult_rehabilitation_program/",
                description: "Support recovery programs by donating to Salvation Army's Adult Rehabilitation Program"
              },
              {
                title: "Naloxone Finder",
                url: "https://stopoverdose.org/find-naloxone-near-me-washington-state/",
                description: "Where to get naloxone (Narcan) in Washington to prevent overdose deaths"
              },
              {
                title: "Washington Opioid Settlements",
                url: "https://waportal.org/partners/washington-state-opioid-settlements",
                description: "Learn about how settlement funds are being used to address the crisis"
              },
              {
                title: "SAMHSA Treatment Locator",
                url: "https://findtreatment.samhsa.gov/",
                description: "Find substance use treatment facilities and programs in your area"
              },
              {
                title: "Crisis Text Line",
                url: "https://www.crisistextline.org/",
                description: "Text HOME to 741741 for crisis support from trained counselors"
              },
              {
                title: "National Institute on Drug Abuse",
                url: "https://nida.nih.gov/",
                description: "National research organization dedicated to advancing addiction science"
              },
              {
                title: "NIDA Opioid Research",
                url: "https://nida.nih.gov/research-topics/opioids",
                description: "Research findings and resources about opioid use and addiction"
              },
              {
                title: "WA State Overdose Dashboard",
                url: "https://doh.wa.gov/data-and-statistical-reports/washington-tracking-network-wtn/opioids/overdose-dashboard",
                description: "Current data and statistics on overdoses in Washington State"
              }
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 p-6 flex flex-col h-full hover:border-red-800 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold mb-3 text-white">{link.title}</h3>
                <p className="text-gray-400 text-sm flex-grow mb-4">{link.description}</p>
                <div className="flex items-center text-red-500 text-sm font-semibold mt-auto">
                  <span>Visit Resource</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="bg-black py-6 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} The Opioid Epidemic | By Ishaan Kothari, Inesh Dey, and Iris Dey
              </p>
            </div>
            <div className="flex items-center gap-8">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <p className="text-gray-500 text-sm">Science Communication Project</p>
              </motion.div>
              <a href="/Bibliography.pdf" className="text-sm">Works Cited</a>
              <a href="/ProjectPaper.pdf" className="text-sm">Project Paper</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

useGLTF.preload('/pilly.glb');
useGLTF.preload('/pilly2.glb');