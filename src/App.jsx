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
      <footer className="relative z-10 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E8A87C]" />
          <p className="text-sm text-[#8A847E]">
            Made with love for moms everywhere
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C38D94]" />
        </div>
        <p className="text-xs text-[#8A847E]/70">
          The Wendy's Song Project — A Charitable Initiative
        </p>
      </footer>
    </div>
  );
}

export default App;
