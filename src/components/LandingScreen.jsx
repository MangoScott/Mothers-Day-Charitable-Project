import React, { useEffect, useRef } from 'react';
import useVideoStore from '../store/useVideoStore';

const LandingScreen = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (15 + Math.random() * 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            const size = 10 + Math.random() * 20;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 25000);
        };

        for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 500);
        const interval = setInterval(createHeart, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative">
            <div ref={containerRef} className="floating-hearts-container" />

            <div className="w-full max-w-4xl mx-auto text-center relative z-10">
                {/* Badge */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                        A Charitable Project
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    The Wendy's Song
                </h1>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-pink-500 mb-8 tracking-tight">
                    Project
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Create a heartfelt tribute video for Mom in minutes.<br className="hidden md:block" /> Upload photos, sync to music, and share the love.
                </p>

                {/* Steps Visual */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16 text-left">
                    <div className="relative pl-8">
                        <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                        <h3 className="font-bold text-gray-900 mb-2">Upload Photos</h3>
                        <p className="text-sm text-gray-500">Add 14 favorite moments to match the lyrics.</p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                        <h3 className="font-bold text-gray-900 mb-2">Preview Audio</h3>
                        <p className="text-sm text-gray-500">Watch your photos sync perfectly to Wendy's Song.</p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                        <h3 className="font-bold text-gray-900 mb-2">Download Video</h3>
                        <p className="text-sm text-gray-500">Get a high-quality MP4 to share with Mom.</p>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={() => setScreen('storyboard')}
                    className="group inline-flex items-center gap-3 bg-gray-900 text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl ring-offset-2 focus:ring-2 ring-gray-900"
                >
                    Start Creating
                    <span className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                        <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </button>

                {/* Privacy */}
                <p className="text-sm text-gray-400 mt-12 w-full text-center">
                    🔒 100% private — all processing happens in your browser
                </p>
            </div>
        </div>
    );
};

export default LandingScreen;
