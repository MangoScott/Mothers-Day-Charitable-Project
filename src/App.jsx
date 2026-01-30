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
      case 'landing':
        return <LandingScreen />;
      case 'storyboard':
        return <StoryBoard />;
      case 'preview':
        return <VideoPreview />;
      case 'rendering':
        return <VideoRenderer />;
      case 'sync':
        return <SyncTool onBack={() => useVideoStore.setState({ currentScreen: 'landing' })} />;
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

      {/* Premium Footer */}
      <footer className="relative z-10">
        <style>{`
          .footer-container {
            position: relative;
            padding: 48px 24px 32px;
            background: linear-gradient(180deg, transparent 0%, rgba(253, 242, 248, 0.8) 100%);
          }
          
          .footer-accent-line {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 3px;
            background: linear-gradient(90deg, #ec4899, #f472b6, #fbbf24);
            border-radius: 2px;
            opacity: 0.6;
          }
          
          .footer-content {
            max-width: 700px;
            margin: 0 auto;
            text-align: center;
          }
          
          .footer-main-text {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            margin-bottom: 20px;
          }
          
          .footer-heart-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ec4899, #f472b6);
            box-shadow: 0 0 12px rgba(236, 72, 153, 0.4);
            animation: footerPulse 2s ease-in-out infinite;
          }
          
          .footer-heart-dot:nth-child(3) {
            animation-delay: 0.3s;
          }
          
          @keyframes footerPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }
          
          .footer-tagline {
            font-size: 15px;
            font-weight: 600;
            color: #4b5563;
            margin: 0;
            letter-spacing: 0.01em;
          }
          
          .footer-credits {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 13px;
            color: #9ca3af;
          }
          
          .footer-credits span {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .footer-separator {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #d1d5db;
          }
          
          .footer-link {
            color: #9ca3af;
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .footer-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: linear-gradient(90deg, #ec4899, #f472b6);
            transition: width 0.3s ease;
          }
          
          .footer-link:hover {
            color: #ec4899;
          }
          
          .footer-link:hover::after {
            width: 100%;
          }
          
          .footer-project-name {
            font-weight: 600;
            color: #6b7280;
          }
          
          @media (max-width: 600px) {
            .footer-credits {
              flex-direction: column;
              gap: 6px;
            }
            .footer-separator {
              display: none;
            }
          }
        `}</style>

        <div className="footer-container">
          <div className="footer-accent-line" />
          <div className="footer-content">
            <div className="footer-main-text">
              <div className="footer-heart-dot" />
              <p className="footer-tagline">Made with love for moms everywhere</p>
              <div className="footer-heart-dot" />
            </div>
            <div className="footer-credits">
              <span className="footer-project-name">The Wendy's Song Project</span>
              <div className="footer-separator" />
              <span>A Charitable Initiative</span>
              <div className="footer-separator" />
              <span>© 1986/2026 Kim Coleman Uhlik and Wendy Emerick</span>
              <div className="footer-separator" />
              <a href="https://sglasgow.com" target="_blank" rel="noopener noreferrer" className="footer-link">
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
