'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sword, Shield, Zap, Heart } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  role: string;
  rarity: string;
  avatar: string;
  description: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
    hp: number;
  };
}

interface CharacterCardProps {
  character: Character;
  index: number;
}

export default function CharacterCard({ character, index }: CharacterCardProps) {
  const router = useRouter();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'from-yellow-500 to-orange-500';
      case 'Epic': return 'from-purple-500 to-pink-500';
      case 'Rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'border-yellow-500/50';
      case 'Epic': return 'border-purple-500/50';
      case 'Rare': return 'border-blue-500/50';
      default: return 'border-gray-500/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => router.push(`/character/${character.id}`)}
      className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 ${getRarityBorder(character.rarity)} cursor-pointer group relative`}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(character.rarity)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

      {/* Rarity badge */}
      <div className={`absolute top-3 right-3 bg-gradient-to-r ${getRarityColor(character.rarity)} px-3 py-1 rounded-full z-10`}>
        <span className="text-white font-bold text-xs">{character.rarity}</span>
      </div>

      {/* Character Avatar */}
      <div className="relative p-6 pb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4"
        >
          <span className="text-6xl">{character.avatar}</span>
        </motion.div>

        <h3 className="text-white text-xl font-bold text-center mb-1">
          {character.name}
        </h3>
        <p className="text-purple-300 text-sm text-center mb-3">
          {character.role}
        </p>

        {/* Mini Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <Sword className="text-red-400 mx-auto mb-1" size={14} />
            <span className="text-white text-xs font-bold">{character.stats.attack}</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <Shield className="text-blue-400 mx-auto mb-1" size={14} />
            <span className="text-white text-xs font-bold">{character.stats.defense}</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <Zap className="text-yellow-400 mx-auto mb-1" size={14} />
            <span className="text-white text-xs font-bold">{character.stats.speed}</span>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <Heart className="text-pink-400 mx-auto mb-1" size={14} />
            <span className="text-white text-xs font-bold">{character.stats.hp}</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6"
      >
        <p className="text-purple-200 text-sm leading-relaxed">
          {character.description.length > 100
            ? character.description.substring(0, 100) + '...'
            : character.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
