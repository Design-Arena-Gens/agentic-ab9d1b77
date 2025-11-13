'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="text-purple-400" size={28} />
          <span className="text-2xl font-bold text-white">Character Hub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-purple-200 hover:text-white transition-colors">
            Characters
          </Link>
          <Link href="/#guides" className="text-purple-200 hover:text-white transition-colors">
            Guides
          </Link>
          <Link href="/#fanart" className="text-purple-200 hover:text-white transition-colors">
            Fan Art
          </Link>
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Submit Art
        </motion.button>
      </div>
    </motion.header>
  );
}
