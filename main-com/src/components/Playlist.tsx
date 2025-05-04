// src/components/Playlist.tsx
import React, { useRef, useState } from 'react';
import { Heart } from 'lucide-react';

// Import two local songs
import song1 from '../music/musicc.mp3';
import song2 from '../music/perfect.mp3';

const Playlist = () => {
  const [currentSong, setCurrentSong] = useState<string>('');
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);

  const togglePlay = (
    audioRef: React.RefObject<HTMLAudioElement>,
    songName: string
  ) => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        // Pause the other song if playing
        if (audioRef === audioRef1 && audioRef2.current && !audioRef2.current.paused) {
          audioRef2.current.pause();
        }
        if (audioRef === audioRef2 && audioRef1.current && !audioRef1.current.paused) {
          audioRef1.current.pause();
        }
        audioRef.current.play();
        setCurrentSong(songName);
      } else {
        audioRef.current.pause();
        setCurrentSong('');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#E373FF]">
      <div className="w-full max-w-3xl space-y-10 animate-fade-in rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white flex items-center justify-center gap-3">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          Songs
        </h2>

        {/* Glassmorphism overlay for current playing song */}
        {currentSong && (
          <div className="mx-auto max-w-md bg-white/30 backdrop-blur-lg p-4 rounded-xl shadow-lg text-center">
            <p className="text-white font-semibold">Now Playing:</p>
            <p className="text-white">{currentSong}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold text-[#E373FF] mb-3">
              Pal Pal Dil Ke Paas
            </h3>
            <p className="text-gray-600 mb-6">by Me</p>
            <audio ref={audioRef1} src={song1} preload="auto"></audio>
            <button
              className="px-6 py-3 bg-[#E373FF] text-white rounded-full hover:bg-[#d44dff] transition-all transform hover:scale-105 shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
              onClick={() => togglePlay(audioRef1, 'Main Koi Aisa Geet Gaon')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Play
            </button>
          </div>
          <div className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold text-[#E373FF] mb-3">Perfect</h3>
            <p className="text-gray-600 mb-6">by Me</p>
            <audio ref={audioRef2} src={song2} preload="auto"></audio>
            <button
              className="px-6 py-3 bg-[#E373FF] text-white rounded-full hover:bg-[#d44dff] transition-all transform hover:scale-105 shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
              onClick={() => togglePlay(audioRef2, 'Tum Se Hi')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Play
            </button>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-xl font-medium text-white inline-flex items-center gap-2">
            Made with <Heart className="w-6 h-6 text-white animate-pulse" /> For You!
          </p>
        </div>
        <div className="text-center mt-16">
          <a 
            href="https://love-hearts.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block px-8 py-3 bg-white text-[#E373FF] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
          >
            See the special message
          </a>
        </div>
      </div>

      {/* Inline CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Playlist;
