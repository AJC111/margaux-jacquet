import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {/* Header desktop*/}
      <header className="bg-beige text-bleu shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" data-cursor="hover" className="flex items-center space-x-2">
            <div className="relative w-32 h-20 md:w-48 md:h-32">
              <Image
                src="/logo.png"
                alt="Logo Margaux Jacquet"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-14 font-semibold self-end mb-4">
            <Link href="/a-propos" data-cursor="hover">À propos de moi</Link>
            <Link href="/prestations" data-cursor="hover">Prestations proposées</Link>
            <Link href="/reservation" data-cursor="hover">Prendre rendez-vous</Link>
            <Link href="/contact" data-cursor="hover">Demande de contact</Link>
          </nav>

          {/* Menu Burger */}
          <motion.button
            className="md:hidden z-60 p-2 rounded-lg transition-colors duration-200"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ 
              backgroundColor: isMenuOpen ? '#FFD700' : 'transparent',
              color: '#101F44'
            }}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 block transform transition-all duration-300"
                style={{ backgroundColor: '#101F44' }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 block mt-1.5 transform transition-all duration-300"
                style={{ backgroundColor: '#101F44' }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 block mt-1.5 transform transition-all duration-300"
                style={{ backgroundColor: '#101F44' }}
              />
            </motion.div>
          </motion.button>
        </div>
      </header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: 'rgba(16, 31, 68, 0.7)' }}
              onClick={toggleMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 z-50 md:hidden shadow-2xl"
              style={{ backgroundColor: '#FAF9F3' }}
            >
              <div className="flex flex-col h-full pt-24 px-8">
                <nav className="flex flex-col space-y-6">
                  {[
                    { href: "/a-propos", label: "À propos de moi" },
                    { href: "/prestations", label: "Prestations proposées" },
                    { href: "/reservation", label: "Prendre rendez-vous" },
                    { href: "/contact", label: "Demande de contact" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      custom={index}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="block py-4 px-2 text-lg font-semibold"
                        style={{ 
                          color: '#101F44'
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}