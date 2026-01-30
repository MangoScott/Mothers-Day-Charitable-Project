import { Heart, Music, Download, Upload, Sparkles, Play, Shield, Star, Zap } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';
import { useState, useEffect } from 'react';

export default function LandingScreen() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleStartClick = () => {
        useVideoStore.setState({ currentScreen: 'storyboard' });
    };

    return (
        <div className="landing-container">
            {/* Animated gradient background */}
            <div className="gradient-bg" />

            {/* Floating orbs with parallax */}
            <div
                className="floating-orb orb-1"
                style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
            />
            <div
                className="floating-orb orb-2"
                style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)` }}
            />
            <div
                className="floating-orb orb-3"
                style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)` }}
            />
            <div
                className="floating-orb orb-4"
                style={{ transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)` }}
            />

            {/* Floating hearts */}
            <div className="floating-elements">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-heart-element"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    >
                        <Heart size={12 + Math.random() * 16} />
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className={`landing-content ${isLoaded ? 'loaded' : ''}`}>
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-inner">
                        {/* Animated badge */}
                        <div className="hero-badge">
                            <div className="badge-glow" />
                            <Heart className="badge-icon pulse" size={16} fill="#ec4899" />
                            <span>A Mother's Day Charitable Project</span>
                            <Sparkles className="badge-icon sparkle" size={16} />
                        </div>

                        {/* Animated title */}
                        <h1 className="hero-title">
                            <span className="title-line-1">A Mother's Day</span>
                            <span className="title-line-2">
                                <span className="gradient-text-animated">Story Card</span>
                            </span>
                            <span className="title-subtitle">made especially for <em>YOU</em></span>
                        </h1>

                        {/* Subtitle with animation */}
                        <p className="hero-subtitle">
                            Create a heartfelt tribute video for Mom in minutes
                        </p>
                        <p className="hero-tagline">
                            Upload your favorite photos, sync them to a beautiful song, and share the love
                            <span className="heart-emoji"> ❤️</span>
                        </p>

                        {/* Premium CTA button */}
                        <button onClick={handleStartClick} className="cta-button">
                            <span className="cta-bg" />
                            <span className="cta-content">
                                <Play size={20} fill="white" />
                                <span>Start Creating</span>
                                <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <span className="cta-shimmer" />
                        </button>

                        {/* Trust badges */}
                        <div className="trust-badges">
                            <div className="trust-badge">
                                <span className="trust-dot green" />
                                <span>100% Free</span>
                            </div>
                            <div className="trust-badge">
                                <span className="trust-dot green" />
                                <span>No Sign-up Required</span>
                            </div>
                            <div className="trust-badge">
                                <span className="trust-dot green" />
                                <span>Processed Locally</span>
                            </div>
                            <div
                                className="trust-badge clickable"
                                onClick={() => useVideoStore.setState({ currentScreen: 'sync' })}
                            >
                                <span className="trust-dot pink" />
                                <span>Sync Lyrics</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preview mockup section */}
                <section className="preview-section">
                    <div className="preview-container">
                        <div className="preview-glow" />
                        <div className="preview-card">
                            <div className="preview-header">
                                <div className="preview-dots">
                                    <span className="dot red" />
                                    <span className="dot yellow" />
                                    <span className="dot green" />
                                </div>
                                <span className="preview-title">Your Video Preview</span>
                            </div>
                            <div className="preview-content">
                                <div className="preview-video-area">
                                    <div className="preview-placeholder">
                                        <div className="placeholder-icon">
                                            <Heart size={48} />
                                        </div>
                                        <p>Your memories, beautifully stitched together</p>
                                    </div>
                                </div>
                                <div className="preview-timeline">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.1}s` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="steps-section">
                    <div className="steps-inner">
                        <div className="section-header">
                            <div className="section-badge">
                                <Zap size={14} />
                                <span>Simple Process</span>
                            </div>
                            <h2 className="section-title">How It Works</h2>
                            <p className="section-subtitle">
                                Create your personalized tribute in three simple steps
                            </p>
                        </div>

                        {/* Connecting line */}
                        <div className="steps-connector" />

                        <div className="cards-grid">
                            {/* Step 1 */}
                            <div className="step-card" style={{ '--delay': '0s' }}>
                                <div className="card-glow" />
                                <div className="card-number">1</div>
                                <div className="card-icon-wrapper pink">
                                    <Upload size={28} />
                                </div>
                                <h3 className="card-title">Upload Photos</h3>
                                <p className="card-text">
                                    Add 21 of your favorite moments to match each lyric of the song
                                </p>
                                <div className="card-accent" />
                            </div>

                            {/* Step 2 */}
                            <div className="step-card" style={{ '--delay': '0.1s' }}>
                                <div className="card-glow" />
                                <div className="card-number purple">2</div>
                                <div className="card-icon-wrapper purple">
                                    <Music size={28} />
                                </div>
                                <h3 className="card-title">Preview & Arrange</h3>
                                <p className="card-text">
                                    Watch your photos sync perfectly to Wendy's Song with smooth transitions
                                </p>
                                <div className="card-accent purple" />
                            </div>

                            {/* Step 3 */}
                            <div className="step-card" style={{ '--delay': '0.2s' }}>
                                <div className="card-glow" />
                                <div className="card-number orange">3</div>
                                <div className="card-icon-wrapper orange">
                                    <Download size={28} />
                                </div>
                                <h3 className="card-title">Download & Share</h3>
                                <p className="card-text">
                                    Get a high-quality MP4 video ready to share with Mom on her special day
                                </p>
                                <div className="card-accent orange" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial/Emotional section */}
                <section className="emotional-section">
                    <div className="emotional-container">
                        <div className="quote-marks">"</div>
                        <p className="emotional-quote">
                            Because every mom deserves to know how much she means to you
                        </p>
                        <div className="emotional-stars">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill="#fbbf24" className="star" style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Privacy Section */}
                <section className="privacy-section">
                    <div className="privacy-card">
                        <div className="privacy-icon-wrapper">
                            <Shield size={28} className="privacy-icon" />
                            <div className="privacy-icon-ring" />
                        </div>
                        <div className="privacy-content">
                            <h3 className="privacy-title">Your Privacy is Protected</h3>
                            <p className="privacy-text">
                                All processing happens in your browser — your photos never leave your device
                            </p>
                        </div>
                        <div className="privacy-badge">
                            <span>🔒 100% Secure</span>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .landing-container {
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #fdf2f8 0%, #ffffff 30%, #fce7f3 60%, #fff1f2 100%);
                }

                /* Animated gradient background */
                .gradient-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        45deg,
                        rgba(236, 72, 153, 0.03) 0%,
                        rgba(244, 114, 182, 0.05) 25%,
                        rgba(251, 191, 36, 0.03) 50%,
                        rgba(167, 139, 250, 0.04) 75%,
                        rgba(236, 72, 153, 0.03) 100%
                    );
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                    pointer-events: none;
                }

                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                /* Floating orbs */
                .floating-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(60px);
                    pointer-events: none;
                    transition: transform 0.3s ease-out;
                }

                .orb-1 {
                    top: 5%;
                    left: 10%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
                    animation: float1 20s ease-in-out infinite;
                }

                .orb-2 {
                    top: 20%;
                    right: 5%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
                    animation: float2 25s ease-in-out infinite;
                }

                .orb-3 {
                    bottom: 20%;
                    left: 20%;
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%);
                    animation: float3 22s ease-in-out infinite;
                }

                .orb-4 {
                    bottom: 5%;
                    right: 15%;
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, transparent 70%);
                    animation: float1 18s ease-in-out infinite reverse;
                }

                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.05); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }

                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-40px, 30px) scale(1.1); }
                }

                @keyframes float3 {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(25px, 25px); }
                    75% { transform: translate(-25px, -15px); }
                }

                /* Floating hearts */
                .floating-elements {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    overflow: hidden;
                }

                .floating-heart-element {
                    position: absolute;
                    bottom: -50px;
                    color: rgba(236, 72, 153, 0.15);
                    animation: floatUp linear infinite;
                }

                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg) scale(1);
                        opacity: 0;
                    }
                }

                /* Main content */
                .landing-content {
                    position: relative;
                    z-index: 10;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .landing-content.loaded {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Hero Section */
                .hero-section {
                    padding: 80px 24px 60px;
                    text-align: center;
                }

                .hero-inner {
                    max-width: 900px;
                    margin: 0 auto;
                }

                /* Badge */
                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 28px;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    border-radius: 100px;
                    box-shadow: 
                        0 4px 24px rgba(236, 72, 153, 0.1),
                        0 1px 2px rgba(0, 0, 0, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
                    border: 1px solid rgba(236, 72, 153, 0.15);
                    margin-bottom: 48px;
                    position: relative;
                    overflow: hidden;
                    animation: badgePulse 3s ease-in-out infinite;
                }

                .badge-glow {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    animation: shimmer 3s ease-in-out infinite;
                }

                @keyframes shimmer {
                    0%, 100% { left: -100%; }
                    50% { left: 100%; }
                }

                @keyframes badgePulse {
                    0%, 100% { box-shadow: 0 4px 24px rgba(236, 72, 153, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05); }
                    50% { box-shadow: 0 4px 32px rgba(236, 72, 153, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); }
                }

                .hero-badge span {
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                }

                .badge-icon {
                    color: #ec4899;
                }

                .badge-icon.pulse {
                    animation: heartbeat 1.5s ease-in-out infinite;
                }

                .badge-icon.sparkle {
                    color: #f59e0b;
                    animation: sparkleRotate 3s linear infinite;
                }

                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }

                @keyframes sparkleRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Title */
                .hero-title {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    margin-bottom: 28px;
                }

                .title-line-1 {
                    display: block;
                    color: #1f2937;
                    animation: slideIn 0.8s ease-out 0.2s both;
                }

                .title-line-2 {
                    display: block;
                    margin-top: 8px;
                    animation: slideIn 0.8s ease-out 0.4s both;
                }

                .gradient-text-animated {
                    background: linear-gradient(
                        135deg,
                        #ec4899 0%,
                        #f43f5e 25%,
                        #f97316 50%,
                        #ec4899 75%,
                        #a855f7 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradientFlow 4s linear infinite;
                }

                @keyframes gradientFlow {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }

                .title-subtitle {
                    display: block;
                    font-size: 0.4em;
                    font-weight: 400;
                    color: #6b7280;
                    margin-top: 20px;
                    animation: slideIn 0.8s ease-out 0.6s both;
                }

                .title-subtitle em {
                    font-style: italic;
                    color: #ec4899;
                    font-weight: 600;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Subtitle */
                .hero-subtitle {
                    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
                    color: #4b5563;
                    max-width: 600px;
                    margin: 0 auto 12px;
                    line-height: 1.6;
                    animation: fadeIn 0.8s ease-out 0.7s both;
                }

                .hero-tagline {
                    font-size: 1.1rem;
                    color: #6b7280;
                    margin-bottom: 48px;
                    animation: fadeIn 0.8s ease-out 0.8s both;
                }

                .heart-emoji {
                    display: inline-block;
                    animation: heartbeat 1.5s ease-in-out infinite;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* CTA Button */
                .cta-button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    padding: 22px 52px;
                    border: none;
                    border-radius: 18px;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: fadeIn 0.8s ease-out 0.9s both;
                }

                .cta-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%);
                    transition: all 0.4s ease;
                }

                .cta-button:hover .cta-bg {
                    transform: scale(1.02);
                }

                .cta-content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    color: white;
                    font-size: 1.15rem;
                    font-weight: 700;
                    z-index: 1;
                }

                .cta-shimmer {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: ctaShimmer 2.5s ease-in-out infinite;
                    z-index: 2;
                }

                @keyframes ctaShimmer {
                    0%, 100% { left: -100%; }
                    50% { left: 150%; }
                }

                .cta-button {
                    box-shadow: 
                        0 20px 50px rgba(236, 72, 153, 0.35),
                        0 10px 20px rgba(244, 63, 94, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                .cta-button:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 
                        0 28px 60px rgba(236, 72, 153, 0.4),
                        0 15px 30px rgba(244, 63, 94, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                .cta-button:active {
                    transform: translateY(-1px) scale(1);
                }

                .arrow-icon {
                    transition: transform 0.3s ease;
                }

                .cta-button:hover .arrow-icon {
                    transform: translateX(4px);
                }

                /* Trust badges */
                .trust-badges {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 28px;
                    margin-top: 48px;
                    flex-wrap: wrap;
                    animation: fadeIn 0.8s ease-out 1s both;
                }

                .trust-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    color: #6b7280;
                    padding: 8px 16px;
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(8px);
                    border-radius: 100px;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .trust-badge:hover {
                    background: rgba(255, 255, 255, 0.9);
                    transform: translateY(-2px);
                }

                .trust-badge.clickable {
                    cursor: pointer;
                }

                .trust-badge.clickable:hover {
                    border-color: rgba(236, 72, 153, 0.3);
                    color: #ec4899;
                }

                .trust-badge.clickable span:last-child {
                    text-decoration: underline;
                }

                .trust-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: pulse 2s ease-in-out infinite;
                }

                .trust-dot.green {
                    background: linear-gradient(135deg, #34d399, #10b981);
                    box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
                }

                .trust-dot.pink {
                    background: linear-gradient(135deg, #f43f5e, #ec4899);
                    box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(0.9); }
                }

                /* Preview Section */
                .preview-section {
                    padding: 40px 24px 80px;
                }

                .preview-container {
                    max-width: 700px;
                    margin: 0 auto;
                    position: relative;
                }

                .preview-glow {
                    position: absolute;
                    inset: -20px;
                    background: radial-gradient(circle at center, rgba(236, 72, 153, 0.15) 0%, transparent 70%);
                    filter: blur(40px);
                    animation: previewGlow 4s ease-in-out infinite;
                }

                @keyframes previewGlow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }

                .preview-card {
                    position: relative;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 
                        0 30px 60px rgba(0, 0, 0, 0.1),
                        0 10px 20px rgba(0, 0, 0, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                }

                .preview-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 20px;
                    background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }

                .preview-dots {
                    display: flex;
                    gap: 8px;
                }

                .preview-dots .dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .dot.red { background: #ef4444; }
                .dot.yellow { background: #f59e0b; }
                .dot.green { background: #22c55e; }

                .preview-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #6b7280;
                }

                .preview-content {
                    padding: 24px;
                }

                .preview-video-area {
                    aspect-ratio: 16/9;
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fff1f2 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    border: 2px dashed rgba(236, 72, 153, 0.2);
                }

                .preview-placeholder {
                    text-align: center;
                    color: #9ca3af;
                }

                .placeholder-icon {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 16px;
                    background: rgba(236, 72, 153, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ec4899;
                    animation: placeholderPulse 2s ease-in-out infinite;
                }

                @keyframes placeholderPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .preview-placeholder p {
                    font-size: 14px;
                    font-weight: 500;
                }

                .preview-timeline {
                    display: flex;
                    gap: 8px;
                }

                .timeline-item {
                    flex: 1;
                    height: 8px;
                    background: linear-gradient(135deg, #ec4899, #f472b6);
                    border-radius: 4px;
                    opacity: 0;
                    animation: timelineLoad 0.5s ease-out forwards;
                }

                @keyframes timelineLoad {
                    from {
                        opacity: 0;
                        transform: scaleX(0);
                    }
                    to {
                        opacity: 0.6;
                        transform: scaleX(1);
                    }
                }

                /* Steps Section */
                .steps-section {
                    padding: 80px 24px 100px;
                    position: relative;
                }

                .steps-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    position: relative;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 70px;
                }

                .section-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.1));
                    border-radius: 100px;
                    color: #ec4899;
                    font-size: 13px;
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .section-title {
                    font-size: clamp(1.75rem, 3vw, 2.75rem);
                    font-weight: 800;
                    color: #111827;
                    margin-bottom: 16px;
                    letter-spacing: -0.02em;
                }

                .section-subtitle {
                    font-size: 1.15rem;
                    color: #6b7280;
                    max-width: 500px;
                    margin: 0 auto;
                }

                /* Connecting line */
                .steps-connector {
                    display: none;
                }

                @media (min-width: 900px) {
                    .steps-connector {
                        display: block;
                        position: absolute;
                        top: 280px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 60%;
                        height: 3px;
                        background: linear-gradient(90deg, #ec4899, #a855f7, #f59e0b);
                        opacity: 0.2;
                        border-radius: 2px;
                    }
                }

                .cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 36px;
                }

                .step-card {
                    position: relative;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    border-radius: 28px;
                    padding: 48px 32px 36px;
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 
                        0 10px 40px rgba(0, 0, 0, 0.04),
                        0 4px 12px rgba(0, 0, 0, 0.02);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    animation: cardSlideIn 0.6s ease-out both;
                    animation-delay: var(--delay);
                }

                @keyframes cardSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .step-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 
                        0 30px 60px rgba(236, 72, 153, 0.12),
                        0 10px 20px rgba(0, 0, 0, 0.06);
                }

                .card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at center, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .step-card:hover .card-glow {
                    opacity: 1;
                }

                .card-number {
                    position: absolute;
                    top: -18px;
                    left: 32px;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 800;
                    font-size: 17px;
                    background: linear-gradient(135deg, #ec4899, #f43f5e);
                    box-shadow: 0 8px 24px rgba(236, 72, 153, 0.35);
                }

                .card-number.purple {
                    background: linear-gradient(135deg, #a855f7, #7c3aed);
                    box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35);
                }

                .card-number.orange {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
                }

                .card-icon-wrapper {
                    width: 72px;
                    height: 72px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                    transition: all 0.3s ease;
                }

                .card-icon-wrapper.pink {
                    background: linear-gradient(135deg, #fdf2f8, #fce7f3);
                    color: #db2777;
                }

                .card-icon-wrapper.purple {
                    background: linear-gradient(135deg, #faf5ff, #f3e8ff);
                    color: #9333ea;
                }

                .card-icon-wrapper.orange {
                    background: linear-gradient(135deg, #fffbeb, #fef3c7);
                    color: #d97706;
                }

                .step-card:hover .card-icon-wrapper {
                    transform: scale(1.1) rotate(-3deg);
                }

                .card-title {
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 14px;
                }

                .card-text {
                    font-size: 1rem;
                    color: #6b7280;
                    line-height: 1.7;
                    margin: 0;
                }

                .card-accent {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #ec4899, #f43f5e);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s ease;
                }

                .card-accent.purple {
                    background: linear-gradient(90deg, #a855f7, #7c3aed);
                }

                .card-accent.orange {
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                }

                .step-card:hover .card-accent {
                    transform: scaleX(1);
                }

                /* Emotional Section */
                .emotional-section {
                    padding: 60px 24px 80px;
                }

                .emotional-container {
                    max-width: 700px;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;
                }

                .quote-marks {
                    font-size: 120px;
                    font-family: Georgia, serif;
                    color: rgba(236, 72, 153, 0.1);
                    line-height: 1;
                    margin-bottom: -40px;
                }

                .emotional-quote {
                    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
                    font-weight: 600;
                    color: #374151;
                    line-height: 1.6;
                    font-style: italic;
                    margin-bottom: 24px;
                }

                .emotional-stars {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                }

                .star {
                    color: #fbbf24;
                    animation: starPop 0.5s ease-out both;
                }

                @keyframes starPop {
                    from {
                        opacity: 0;
                        transform: scale(0) rotate(-20deg);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) rotate(0deg);
                    }
                }

                /* Privacy Section */
                .privacy-section {
                    padding: 20px 24px 100px;
                }

                .privacy-card {
                    max-width: 700px;
                    margin: 0 auto;
                    background: linear-gradient(135deg, rgba(236, 253, 245, 0.9), rgba(240, 253, 250, 0.9));
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 28px 36px;
                    border: 1px solid rgba(167, 243, 208, 0.5);
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                    justify-content: center;
                    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.08);
                }

                .privacy-icon-wrapper {
                    position: relative;
                    width: 56px;
                    height: 56px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 16px rgba(5, 150, 105, 0.15);
                }

                .privacy-icon {
                    color: #059669;
                }

                .privacy-icon-ring {
                    position: absolute;
                    inset: -4px;
                    border: 2px solid rgba(5, 150, 105, 0.2);
                    border-radius: 50%;
                    animation: ringPulse 2s ease-in-out infinite;
                }

                @keyframes ringPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.5; }
                }

                .privacy-content {
                    flex: 1;
                    min-width: 200px;
                }

                .privacy-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #111827;
                    margin: 0 0 6px 0;
                }

                .privacy-text {
                    font-size: 0.95rem;
                    color: #4b5563;
                    margin: 0;
                }

                .privacy-badge {
                    padding: 8px 16px;
                    background: rgba(5, 150, 105, 0.1);
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #059669;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 60px 20px 40px;
                    }

                    .trust-badges {
                        gap: 12px;
                    }

                    .trust-badge {
                        padding: 6px 12px;
                        font-size: 12px;
                    }

                    .preview-section {
                        padding: 20px 20px 60px;
                    }

                    .steps-section {
                        padding: 60px 20px 80px;
                    }

                    .cards-grid {
                        gap: 28px;
                    }

                    .step-card {
                        padding: 40px 24px 28px;
                    }

                    .privacy-card {
                        flex-direction: column;
                        text-align: center;
                        padding: 24px;
                    }
                }
            `}</style>
        </div>
    );
}
