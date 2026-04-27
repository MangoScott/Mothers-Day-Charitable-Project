import React from 'react';
import useVideoStore from './store/useVideoStore';
import LandingScreen from './components/LandingScreen';
import StoryBoard from './components/StoryBoard';
import VideoPreview from './components/VideoPreview';
import VideoRenderer from './components/VideoRenderer';
import SyncTool from './components/SyncTool';
import './index.css';

function App() {
  const currentScreen = useVideoStore((state) => state.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':    return <LandingScreen />;
      case 'storyboard': return <StoryBoard />;
      case 'preview':    return <VideoPreview />;
      case 'rendering':  return <VideoRenderer />;
      case 'sync':
        return <SyncTool onBack={() => useVideoStore.setState({ currentScreen: 'landing' })} />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <main className="relative z-10">
        {renderScreen()}
      </main>

      <footer className="relative z-10 border-t border-ink-100 bg-gradient-to-b from-transparent to-[#FFF5F7]/70">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
              <p className="text-[13px] font-semibold text-ink-700">
                Made with love for moms everywhere
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12px] text-ink-400">
              <span className="font-semibold text-ink-500">The Wendy's Song Project</span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-ink-300 sm:inline-block" />
              <span>A charitable initiative</span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-ink-300 sm:inline-block" />
              <span>© 1986 / 2026 Kim Coleman Uhlik &amp; Wendy Emerick</span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-ink-300 sm:inline-block" />
              <a
                href="https://sglasgow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink-500 hover:text-brand-600"
              >
                Designed by Scott Glasgow
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
