'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sword, Shield, Sparkles, Heart, Users } from 'lucide-react';
import CharacterCard from '@/components/CharacterCard';
import Header from '@/components/Header';
import { characters } from '@/data/characters';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedRarity, setSelectedRarity] = useState<string>('All');

  const roles = ['All', 'Tank', 'DPS', 'Support', 'Mage', 'Assassin'];
  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];

  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          character.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || character.role === selectedRole;
      const matchesRarity = selectedRarity === 'All' || character.rarity === selectedRarity;
      return matchesSearch && matchesRole && matchesRarity;
    });
  }, [searchTerm, selectedRole, selectedRarity]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Master Your <span className="gradient-text">Heroes</span>
          </h1>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Discover in-depth character guides, strategies, and community fan art to dominate the battlefield
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
            >
              <Users className="text-purple-400" size={24} />
              <span className="text-white font-semibold">{characters.length} Characters</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
            >
              <Sparkles className="text-yellow-400" size={24} />
              <span className="text-white font-semibold">Expert Guides</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full"
            >
              <Heart className="text-red-400" size={24} />
              <span className="text-white font-semibold">Fan Art Gallery</span>
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-purple-300/30 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <Filter size={18} className="text-purple-300" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                {roles.map(role => (
                  <option key={role} value={role} className="bg-slate-800">{role}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <Sparkles size={18} className="text-purple-300" />
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity} className="bg-slate-800">{rarity}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Characters Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCharacters.map((character, index) => (
              <CharacterCard key={character.id} character={character} index={index} />
            ))}
          </motion.div>

          {filteredCharacters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-purple-300">No characters found</p>
              <p className="text-purple-400 mt-2">Try adjusting your filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
