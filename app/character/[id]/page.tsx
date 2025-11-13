'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sword, Shield, Heart, Zap, Star, Image as ImageIcon } from 'lucide-react';
import { characters } from '@/data/characters';
import Header from '@/components/Header';

export default function CharacterDetail() {
  const params = useParams();
  const router = useRouter();
  const character = characters.find(c => c.id === params.id);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">Character not found</p>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'from-yellow-500 to-orange-500';
      case 'Epic': return 'from-purple-500 to-pink-500';
      case 'Rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Characters
          </motion.button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Character Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(character.rarity)} opacity-20 blur-3xl rounded-3xl`}></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                  <span className="text-9xl">{character.avatar}</span>
                </div>
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${getRarityColor(character.rarity)} px-4 py-2 rounded-full`}>
                  <span className="text-white font-bold text-sm">{character.rarity}</span>
                </div>
              </div>
            </motion.div>

            {/* Character Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">{character.name}</h1>
                <p className="text-purple-300 text-xl">{character.role}</p>
              </div>

              <p className="text-purple-200 text-lg leading-relaxed">
                {character.description}
              </p>

              {/* Stats */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-4">Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300 flex items-center gap-2">
                        <Sword size={16} />
                        Attack
                      </span>
                      <span className="text-white font-bold">{character.stats.attack}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                        style={{ width: `${character.stats.attack}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300 flex items-center gap-2">
                        <Shield size={16} />
                        Defense
                      </span>
                      <span className="text-white font-bold">{character.stats.defense}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${character.stats.defense}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300 flex items-center gap-2">
                        <Zap size={16} />
                        Speed
                      </span>
                      <span className="text-white font-bold">{character.stats.speed}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${character.stats.speed}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-300 flex items-center gap-2">
                        <Heart size={16} />
                        HP
                      </span>
                      <span className="text-white font-bold">{character.stats.hp}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${character.stats.hp}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-4">Abilities</h3>
                <div className="space-y-3">
                  {character.abilities.map((ability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <h4 className="text-purple-300 font-semibold mb-1">{ability.name}</h4>
                      <p className="text-purple-200 text-sm">{ability.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Guide Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">How to Play {character.name}</h2>
            <div className="prose prose-invert max-w-none">
              <div className="text-purple-200 leading-relaxed space-y-4">
                <p><strong className="text-white">Early Game:</strong> {character.guide.earlyGame}</p>
                <p><strong className="text-white">Mid Game:</strong> {character.guide.midGame}</p>
                <p><strong className="text-white">Late Game:</strong> {character.guide.lateGame}</p>
                <div>
                  <strong className="text-white">Tips:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {character.guide.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fan Art Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Fan Art Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {character.fanArt.map((art, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex flex-col items-center justify-center border border-white/20 cursor-pointer overflow-hidden"
                >
                  <ImageIcon className="text-purple-300 mb-2" size={32} />
                  <p className="text-white text-sm font-semibold">{art.artist}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="text-yellow-400" size={14} fill="currentColor" />
                    <span className="text-purple-200 text-xs">{art.likes}</span>
                  </div>
                </motion.div>
              ))}

              {/* Upload placeholder */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-purple-400 cursor-pointer"
              >
                <ImageIcon className="text-purple-400 mb-2" size={32} />
                <p className="text-purple-300 text-sm font-semibold">Upload Art</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
