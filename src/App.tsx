import React, { useState, useEffect } from 'react';
import { Sword, Settings, Users, Power, Volume2, VolumeX, Save, FileText, Star } from 'lucide-react';

interface GameSave {
  id: number;
  name: string;
  level: number;
  location: string;
  timestamp: string;
}

function App() {
  const [currentMenu, setCurrentMenu] = useState<'main' | 'settings' | 'load' | 'credits'>('main');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [graphics, setGraphics] = useState('High');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const gameSaves: GameSave[] = [
    { id: 1, name: "Epic Adventure", level: 42, location: "Dragon's Lair", timestamp: "2025-01-15 14:30" },
    { id: 2, name: "Mystic Quest", level: 28, location: "Enchanted Forest", timestamp: "2025-01-14 09:15" },
    { id: 3, name: "Shadow Realm", level: 15, location: "Dark Castle", timestamp: "2025-01-13 20:45" },
  ];

  useEffect(() => {
    // Generate floating particles
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  const MainMenu = () => (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4 tracking-wider">
          MYSTIC
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-purple-300 mb-2 tracking-wide">
          REALMS
        </h2>
        <p className="text-lg text-gray-400 italic">Enter a world of magic and mystery</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <MenuButton 
          icon={<Sword className="w-6 h-6" />} 
          text="New Adventure" 
          onClick={() => alert('Starting new adventure...')}
          primary 
        />
        <MenuButton 
          icon={<Save className="w-6 h-6" />} 
          text="Continue Journey" 
          onClick={() => setCurrentMenu('load')} 
        />
        <MenuButton 
          icon={<Settings className="w-6 h-6" />} 
          text="Settings" 
          onClick={() => setCurrentMenu('settings')} 
        />
        <MenuButton 
          icon={<Users className="w-6 h-6" />} 
          text="Credits" 
          onClick={() => setCurrentMenu('credits')} 
        />
        <MenuButton 
          icon={<Power className="w-6 h-6" />} 
          text="Exit Game" 
          onClick={() => alert('Thanks for playing!')} 
        />
      </div>
    </div>
  );

  const SettingsMenu = () => (
    <div className="space-y-8 max-w-lg mx-auto">
      <h2 className="text-4xl font-bold text-center text-amber-400 mb-8">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Sound Effects</label>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isMuted ? 'Muted' : 'On'}
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-gray-300">Master Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none slider"
              />
              <span className="text-amber-400 text-sm">{volume}%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Graphics Quality</h3>
          <div className="grid grid-cols-3 gap-2">
            {['Low', 'Medium', 'High'].map((quality) => (
              <button
                key={quality}
                onClick={() => setGraphics(quality)}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  graphics === quality
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/50'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentMenu('main')}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Back to Main Menu
      </button>
    </div>
  );

  const LoadGameMenu = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-amber-400 mb-8">Continue Journey</h2>
      
      <div className="space-y-4">
        {gameSaves.map((save) => (
          <div 
            key={save.id}
            className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-amber-500/50 transition-all duration-300 cursor-pointer group"
            onClick={() => alert(`Loading ${save.name}...`)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-purple-300 group-hover:text-amber-400 transition-colors">
                {save.name}
              </h3>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">Lv.{save.level}</span>
              </div>
            </div>
            <p className="text-gray-400 mb-2">{save.location}</p>
            <p className="text-sm text-gray-500">{save.timestamp}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentMenu('main')}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Back to Main Menu
      </button>
    </div>
  );

  const CreditsMenu = () => (
    <div className="space-y-8 max-w-lg mx-auto text-center">
      <h2 className="text-4xl font-bold text-amber-400 mb-8">Credits</h2>
      
      <div className="space-y-6 bg-black/30 backdrop-blur-md rounded-xl p-8 border border-purple-500/30">
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Game Director</h3>
          <p className="text-gray-400">Alex Stormweaver</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Art Director</h3>
          <p className="text-gray-400">Luna Moonshadow</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Lead Developer</h3>
          <p className="text-gray-400">Marcus Codeforge</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Music Composer</h3>
          <p className="text-gray-400">Seraphina Melodyheart</p>
        </div>
        <div className="pt-4 border-t border-purple-500/30">
          <p className="text-amber-400 font-medium">© 2025 Mystic Realms Studio</p>
          <p className="text-gray-500 text-sm mt-1">All rights reserved</p>
        </div>
      </div>

      <button
        onClick={() => setCurrentMenu('main')}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Back to Main Menu
      </button>
    </div>
  );

  const MenuButton: React.FC<{
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
    primary?: boolean;
  }> = ({ icon, text, onClick, primary = false }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
        primary
          ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black shadow-amber-500/30'
          : 'bg-gradient-to-r from-purple-600/80 to-indigo-600/80 hover:from-purple-700/90 hover:to-indigo-700/90 text-white backdrop-blur-sm border border-purple-500/30'
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{text}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {currentMenu === 'main' && <MainMenu />}
          {currentMenu === 'settings' && <SettingsMenu />}
          {currentMenu === 'load' && <LoadGameMenu />}
          {currentMenu === 'credits' && <CreditsMenu />}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

export default App;