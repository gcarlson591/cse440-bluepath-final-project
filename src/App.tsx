/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronLeft, ChevronRight, CheckSquare, Square, ExternalLink, User, Play, Info, ClipboardList, Building2, Map as MapIcon, Navigation } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Logo = () => {
  return (
    <div className="flex items-center gap-3 relative group cursor-pointer">
      <div className="flex items-baseline font-bold text-4xl tracking-tight relative">
        <span className="text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">B</span>
        <span className="text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] relative">
          lue
          {/* Curved Animated Arrow from B area towards A area */}
          <svg className="absolute -bottom-6 -left-4 w-32 h-8 pointer-events-none" viewBox="0 0 120 30">
            <motion.path
              d="M 10 10 Q 60 40 110 10"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="3"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M 10 10 L 18 14 L 18 6 Z"
              fill="url(#logo-gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              style={{ transform: 'rotate(180deg)', transformOrigin: '10px 10px' }}
            />
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">Path</span>
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full shadow-inner">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600 fill-current">
          <path d="M12,2c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,2,12,2z M19,13v-2c-1.54,0-3.11-0.3-4.54-0.84l-1.71-0.64 C12.28,9.33,11.76,9.17,11.23,9.17c-0.33,0-0.67,0.06-0.98,0.18L6.4,10.82C5.56,11.16,5,11.97,5,12.87V19h2v-5.13l2.25-0.9V22h2v-5h2 v5h2v-7.14l2.25,0.9V19h2v-6H19z" />
        </svg>
      </div>
    </div>
  );
};

const GradientArrow = ({ className }: { className?: string }) => (
  <svg className={cn("w-12 h-12", className)} viewBox="0 0 48 48">
    <path d="M24 4L24 44M24 44L12 32M24 44L36 32" fill="none" stroke="url(#arrow-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'problem', id: 'problem' },
    { name: 'solution', id: 'solution' },
    { name: 'design process', id: 'design-process' },
    { name: 'acknowledgment sources', id: 'sources' },
    { name: 'the people who paved BluePath', id: 'team' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors capitalize"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-4 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-2 text-lg font-medium text-gray-800 hover:text-blue-600 capitalize"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="text-4xl font-bold text-gray-900 mb-8 capitalize scroll-mt-24">
    {children}
  </h2>
);

const Carousel = ({ images, onImageClick }: { images: string[]; onImageClick?: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="relative group max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-gray-100 aspect-[4/3]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          onClick={() => onImageClick?.(currentIndex)}
          className="w-full h-full object-contain cursor-zoom-in"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === i ? "bg-blue-600 w-4" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
};

const ClipboardWidget = ({ items, xed = false }: { items: string[]; xed?: boolean }) => (
  <div className="bg-[#fdf6e3] p-8 rounded-lg shadow-inner border-l-8 border-blue-600 max-w-2xl mx-auto">
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="mt-1">
            {xed ? (
              <X className="w-6 h-6 text-red-500 stroke-[3]" />
            ) : (
              <CheckSquare className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <p className="text-gray-700 font-medium">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

const SpeechBubble = ({ quote, participant, align = 'left' }: { quote: string; participant: string; align?: 'left' | 'right' }) => (
  <div className={cn("flex flex-col gap-2 mb-8", align === 'right' ? "items-end" : "items-start")}>
    <div className={cn(
      "relative p-6 rounded-2xl max-w-lg shadow-md",
      align === 'left' ? "bg-blue-50 text-blue-900 rounded-tl-none" : "bg-emerald-50 text-emerald-900 rounded-tr-none"
    )}>
      <p className="italic leading-relaxed">"{quote}"</p>
      <div className={cn(
        "absolute top-0 w-4 h-4",
        align === 'left' ? "-left-4 bg-blue-50 [clip-path:polygon(100%_0,0_0,100%_100%)]" : "-right-4 bg-emerald-50 [clip-path:polygon(0_0,100%_0,0_100%)]"
      )} />
    </div>
    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{participant}</span>
  </div>
);

const PROTOTYPING_IMAGES = [
  { title: "Smart watch app for campus insight and custom routes", img: "/image1.png" },
  { title: "Phone app for accessible features and reporting issues", img: "/image2.png" },
  { title: "Smart glasses app for real-time alerts and parking", img: "/image3.png" },
];

const PAPER_PROTOTYPE_IMAGES = [
  { title: "Paper Prototype: Home & Navigation", img: "/caro1.png" },
  { title: "Paper Prototype: Search & Filters", img: "/caro2.png" },
  { title: "Paper Prototype: Building Details", img: "/caro3.png" },
  { title: "Paper Prototype: Route Selection", img: "/caro4.png" },
  { title: "Paper Prototype: Accessibility Reports", img: "/caro5.png" },
];

// --- Main App ---

export default function App() {
  const [lightbox, setLightbox] = useState<{ images: { title: string; img: string }[]; index: number } | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox) {
      setLightbox({
        ...lightbox,
        index: (lightbox.index + 1) % lightbox.images.length
      });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox) {
      setLightbox({
        ...lightbox,
        index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length
      });
    }
  };

  const currentImage = lightbox ? lightbox.images[lightbox.index] : null;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-bold z-10"
              >
                <X className="w-8 h-8" /> Close
              </button>

              {/* Navigation Arrows */}
              {lightbox.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                </>
              )}

              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={lightbox.index}
                    src={currentImage.img} 
                    alt={currentImage.title} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-white text-2xl font-bold">{currentImage.title}</h3>
                <p className="text-gray-400 mt-2">Image {lightbox.index + 1} of {lightbox.images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
            <div className="relative overflow-hidden group">
              <img 
                src="/complete.png" 
                alt="Modern building interior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
                <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter text-center">
                  Complete the <span className="text-blue-400">picture</span>
                </h2>
              </div>
            </div>
            <div className="relative overflow-hidden group">
              <img 
                src="/erase.png" 
                alt="Person in wheelchair near stairs" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
                <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">
                  Erase <span className="text-blue-400">doubts</span> you have about going to class
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading>Problem</SectionHeading>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Students with physical disabilities often face challenges with planning out the process of going to class. 
                Contingencies have to be accounted for, accessibility needs have to be met, all the while there are 
                disconnects between schedule information and building/classroom information. 
                The actual experience of going to class might differ drastically from expectations set by the information gathering process.
              </p>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <img 
                src="/cse440poster1.png" 
                alt="BluePath Poster" 
                className="w-full h-auto rounded-2xl shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-24 bg-gray-50 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading>Solution</SectionHeading>
            <p className="text-2xl text-gray-700 mb-16 max-w-3xl">
              BluePath is an accessibility tool that helps guide users to the right path, whether that be a physical path or a path to their desired information. Through its interface, users can:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
              {[                
                { title: "Add or upload class schedules for a particular day of the week", icon: <ClipboardList className="w-16 h-16 text-blue-600" /> },
                { title: "Get specific information about the building that a class is located in", icon: <Building2 className="w-16 h-16 text-blue-600" /> },
                { title: "Curate custom routing profiles to a specific building", icon: <Navigation className="w-16 h-16 text-blue-600" /> },
                { title: "Check the locations of accessible features around campus", icon: <CheckSquare className="w-16 h-16 text-blue-600" /> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-24 h-24 rounded-2xl bg-blue-50 flex items-center justify-center shadow-inner">
                    {item.icon}
                  </div>
                  <p className="font-bold text-gray-800 leading-tight">{item.title}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative group">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/-_h86dxBwjg"
                  title="BluePath Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-center text-gray-500 font-medium italic">Find out more about BluePath!</p>
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <section id="design-process" className="py-24 px-4 max-w-7xl mx-auto">
          <SectionHeading>Design Process</SectionHeading>
          
          {/* User Research */}
          <div className="mb-32">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-widest">User Research</h3>
            <p className="text-lg text-gray-600 mb-12 max-w-4xl">
              In order to get a diverse set of perspectives on the experience of students with physical disabilities extracting information about and navigating to their classes, we decided to pull from firsthand accounts online, as well as an autoethnographic study completed by one of our team members who has a physical disability and a survey completed by another student with a physical disability. Here’s some of what they had to say about their experiences:
            </p>

            <div className="grid gap-8 mb-16 relative">
              <div className="flex flex-col items-start">
                <SpeechBubble 
                  quote="I have taken orientation and mobility training to know my way around campus…[but] depending on the weather, brightness outside, activity of people around, or if I'm distracted in the slightest, I struggle to find my way around"
                  participant="Participant 1: college student with progressive vision loss"
                />
                <GradientArrow className="ml-12 -mt-4 mb-4 rotate-0" />
              </div>
              <div className="flex flex-col items-end">
                <SpeechBubble 
                  quote="Going through the library is super easy because of the accessible buttons. Some of them like this [button with a motion sensor] simply require you to waive your hand over a sensor rather than push an actual button, which is awesome…since I have extreme hand weakness"
                  participant="Participant 2: college student with Charcot-Marie-Tooth disease"
                  align="right"
                />
                <GradientArrow className="mr-12 -mt-4 mb-4 rotate-0" />
              </div>
              <div className="flex flex-col items-start">
                <SpeechBubble 
                  quote="Just the physical act of getting to my classes proved to be a challenge, particularly on a relatively older campus like [alma mater’s]. I needed to schedule my time appropriately to make sure that I can get everywhere I needed to go in a reasonable timeframe. I also needed to become a good self-advocate when something was wrong"
                  participant="Participant 3: college student with cerebral palsy"
                />
                <GradientArrow className="ml-12 -mt-4 mb-4 rotate-0" />
              </div>
            </div>

            <div className="relative p-12 bg-white rounded-[2rem] shadow-xl border-2 border-blue-100">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-emerald-400 mb-2" />
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Students with physical disabilities need to be able to access very specific information about physical features on campus (i.e. it’s not enough to know where something is; its classification and the experience of interacting with it are also important)
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-emerald-400 mb-2" />
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Students with physical disabilities need to be able to respond to dynamic challenges and changing circumstances
                  </p>
                </div>
              </div>
              <p className="mt-12 pt-8 border-t border-gray-100 text-gray-500 italic text-center">
                Although the specific challenges and scenarios faced by each of our participants varied based on their disability and environment, we were able to glean high-level themes common to every participant that could inform the tasks accomplished by our interface.
              </p>
            </div>
          </div>

          {/* Task Analysis */}
          <div className="mb-32">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-widest">Task Analysis</h3>
            <p className="text-lg text-gray-600 mb-12">
              With the aforementioned themes in mind, we came up with a list of tasks that we thought would be important for students with physical disabilities to be able to accomplish via our interface which includes:
            </p>
            <ClipboardWidget items={[
              "Locating the building that houses a classroom and identifying accessible features within buildings",
              "Checking the amount of foot traffic in a campus building at a given time",
              "Generating personalized, accessible routes between locations on campus",
              "Locating accessible parking spots closest to a given classroom",
              "Reporting accessibility issues to campus disability services",
              "Receiving real time alerts about accessibility disruptions along a route"
            ]} />
          </div>

          {/* Prototyping */}
          <div className="mb-32">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-widest">Prototyping</h3>
            <p className="text-lg text-gray-600 mb-12">
              With a list of potential tasks for our interface in mind, we began generating potential design ideas including:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {PROTOTYPING_IMAGES.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLightbox({ images: PROTOTYPING_IMAGES, index: i })}
                    className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-full cursor-zoom-in group"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img src={item.img} alt={item.title} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center" />
                    </div>
                    <p className="text-sm font-bold text-gray-700 text-center">{item.title}</p>
                  </motion.div>
                  <GradientArrow className="mt-4" />
                </div>
              ))}
            </div>

            <div className="bg-blue-600 text-white p-12 rounded-[2rem] shadow-2xl mb-16">
              <p className="text-xl leading-relaxed font-medium">
                After evaluating the feasibility and relevance of each task and the form factor of each design idea, we settled on a phone app that would primarily focus on the tasks of locating buildings that house a classroom, identifying accessible features within buildings, checking the amount of foot traffic in a building, and generating personalized, accessible routes between locations on campus. We figured that both smart watches and smart glasses would prevent students with visionary problems from accessing our interface, and the aforementioned tasks best exemplified our research themes.
              </p>
            </div>

            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 mb-8">
                We began developing a paper prototype of a phone app that would help accomplish our chosen tasks. This is what it looked like:
              </p>
              <Carousel 
                images={PAPER_PROTOTYPE_IMAGES.map(img => img.img)} 
                onImageClick={(index) => setLightbox({ images: PAPER_PROTOTYPE_IMAGES, index })}
              />
            </div>
          </div>

          {/* Testing */}
          <div className="mb-32">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-widest">Testing</h3>
            <p className="text-lg text-gray-600 mb-12">
              In order to test the learnability and usability of our interface, we conducted heuristic testing, usability testing, and UI inspections on our paper prototype. This process of testing revealed key problems with our design:
            </p>
            <ClipboardWidget xed items={[
              "The homepage for our interface was a schedule view of a student’s schedule and we figured that due to FERPA regulations, outside parties would not have access to individual schedule data",
              "The routing feature on our interface was inconsistent with the routing feature of a common navigation app like Google Maps, as it was activated via a standalone button and wasn't embedded within a tab for a location. It was also unintuitive and hard to use, as users had to press a button and tap two locations on screen and there was no option to navigate from a user’s current location.",
              "The base map for our interface was too cluttered with markers for accessible features and there was no option within the legend to toggle off markers. The legend was also hard to access and there were no options to bring it back once it was closed."
            ]} />
          </div>

          {/* Final Overview */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-widest">Final Overview</h3>
            <p className="text-lg text-gray-600 mb-12">
              Cleaning up the aforementioned issues and transferring from paper to digital led to this final design:
            </p>
            <div className="max-w-[320px] mx-auto aspect-[9/19.5] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10" />
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                <video 
                  src="/bluepathanimation.mp4" 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
                <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Acknowledgment of Sources */}
        <section id="sources" className="py-24 bg-gray-900 text-white px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading>Acknowledgment of Sources</SectionHeading>
            <p className="text-xl text-gray-400 mb-12">We used and borrowed UI elements and concepts from a variety of sources including:</p>
            <ul className="grid md:grid-cols-2 gap-6 text-lg">
              {[
                { text: "The schedule view on myUW", link: "https://my.uw.edu/", label: "myUW" },
                { text: "UW’s Access Guide", link: "https://gis.maps.uw.edu/portal/apps/experiencebuilder/experience/?id=04387e256c7d436cb61cda1dcd63fce4", label: "UW’s Access Guide" },
                { text: "Google Maps’ routing and navigation features" },
                { text: "Google Maps’ tab feature for individual locations" },
                { text: "Google Maps’ popular times feature for select locations" },
                { text: "Timetable (app)’s home screen" },
                { text: "AccessMap", link: "https://www.accessmap.app/?region=wa.seattle&lon=-122.334298&lat=47.606386&z=13", label: "AccessMap" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item.link ? (
                    <span>
                      {item.text.split(item.label || '').map((part, index, arr) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < arr.length - 1 && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 transition-colors">
                              {item.label}
                            </a>
                          )}
                        </React.Fragment>
                      ))}
                    </span>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 px-4 max-w-7xl mx-auto">
          <SectionHeading>The people who paved BluePath</SectionHeading>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { name: "Gianna Carlson", role: "Designer & Developer", img: "/gianna.png" },
              { name: "Wenting Zhang", role: "Designer & Developer", img: "/wenting.png" },
              { name: "Ian Limasi", role: "Designer & Developer", img: "/ian.png" },
              { name: "Yuta Fukazawa", role: "Designer & Developer", img: "/yuta.png" },
            ].map((person, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <p className="text-lg font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{person.name}</p>
                <div className="relative w-48 h-48 mb-4">
                  {/* Worker Icon Background (Vest/Body) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32 bg-orange-500 rounded-t-[4rem] flex flex-col items-center pt-4">
                    <div className="w-8 h-full bg-white/30 absolute left-8 top-0" />
                    <div className="w-8 h-full bg-white/30 absolute right-8 top-0" />
                  </div>
                  
                  {/* Face (Oval Crop) */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-36 bg-gray-200 rounded-[50%] overflow-hidden border-4 border-white shadow-md z-10">
                    <img 
                      src={person.img} 
                      alt={person.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <p>© 2026 BluePath Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
