'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dotRefs = useRef<HTMLDivElement[]>([])

  // GSAP Floating Dot Animations
  useEffect(() => {
    dotRefs.current.forEach((dot, index) => {
      gsap.to(dot, {
        x: 'random(-30, 30)', 
        y: 'random(-30, 30)',
        duration: 2 + index * 0.2, // Slower speed adjustment
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        opacity: 0.8,
      })
    })
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0014] text-white">
      {/* Background with Gradient + Noise Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black to-[#10002b]"></div> {/* More black at the top */}

      {/* Large Dim Circle */}
      <div className="absolute w-[550px] h-[550px] bg-gradient-to-br from-violet-600 to-transparent rounded-full blur-3xl opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Floating Dots */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => { if (el) dotRefs.current.push(el); }} // Updated ref function
          className={`absolute w-${index + 3} h-${index + 3} bg-gradient-to-br from-purple-400 to-violet-700 rounded-full`}
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
          }}
        ></div>
      ))}

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="white" />
            <path d="M2 23L16 30L30 23V9L16 16L2 9V23Z" fill="white" fillOpacity="0.5" />
          </svg>
          <span className="text-xl font-bold">Catasp</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {['How it works', 'Features', 'Pricing', 'Integrations', 'Resources'].map((item) => (
            <Button key={item} variant="ghost">{item}</Button>
          ))}
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost" className="text-white hover:bg-transparent hover:border hover:border-gray-500 hover:text-white">Login</Button>
          <Button variant="default" className="bg-white text-black hover:bg-white/90">Start for free →</Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#20003a] p-4"
        >
          <div className="flex flex-col space-y-2">
            {['How it works', 'Features', 'Pricing', 'Integrations', 'Resources'].map((item) => (
              <Button key={item} variant="ghost">{item}</Button>
            ))}
            <Button variant="ghost">Login</Button>
            <Button variant="default" className="w-full bg-white text-black hover:bg-white/90">Start for free →</Button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex flex-col   sm:flex-row items-center justify-center space-x-2">
            <span className="bg-purple-400 text-black text-xs font-bold px-2 py-1 rounded-full sm:mb-0 mb-4">NEW</span>
            <span className="text-gray-300">Discover our latest AI-powered feature</span>
          </div>

          {/* Gradient Clipped Text */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-violet-700 bg-clip-text text-transparent">
            Transform
            </span>{' '}
            your <span className="text-purple-400  ">Experience</span > with AI Innovation
          </h1>

          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
           Crafts engaging captions and automates your posting schedule clearly states the features.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-purple-800 hover:bg-purple-700 text-white px-8 w-full sm:w-auto hover:scale-105 transition-all ease-in-out">
              Start for free
            </Button>
            <Button size="lg" variant="ghost" className="px-8 w-full sm:w-auto border border-gray-500 hover:scale-105 transition-all ease-in-out">
              How it works
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
        
      </section>
         
     
    </div>
  )
}
