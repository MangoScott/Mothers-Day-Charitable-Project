import React from 'react';
import useVideoStore from './store/useVideoStore';
import LandingScreen from './components/LandingScreen';
import StoryBoard from './components/StoryBoard';
import VideoPreview from './components/VideoPreview';
import VideoRenderer from './components/VideoRenderer';
import './index.css';

function App() {
  const currentScreen = useVideoStore((state) => state.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen />;
      case 'storyboard':
        return <StoryBoard />;
      case 'preview':
        return <VideoPreview />;
      case 'rendering':
        return <VideoRenderer />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main content */}
      <main className="relative z-10">
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 animate-gentle-pulse" />
          <p className="text-sm font-medium text-gray-600">
            Made with love for moms everywhere
          </p>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 animate-gentle-pulse" />
        </div>
        <p className="text-xs text-gray-500 font-medium">
          The Wendy's Song Project — A Charitable Initiative • <a href="https://sglasgow.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">Designed by Scott Glasgow</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
