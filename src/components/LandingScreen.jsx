import React, { useEffect, useRef } from 'react';
import useVideoStore from '../store/useVideoStore';

const LandingScreen = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const containerRef = useRef(null);

    // Floating hearts effect
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
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
            <div ref={containerRef} className="floating-hearts-container" />

            <div className="w-full max-w-3xl mx-auto text-center relative z-10">
                {/* Badge */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        A Charitable Project
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 leading-tight">
                    The Wendy's Song
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-500 mb-6">
                    Project
                </h2>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
                    Create a heartfelt tribute video for Mom in minutes. Upload photos, sync to music, download your MP4.
                </p>

                {/* CTA */}
                <button
                    onClick={() => setScreen('storyboard')}
                    className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:-translate-y-0.5 mb-16"
                >
                    Create My Video
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">14 Photo Moments</h3>
                        <p className="text-sm text-gray-500">One for each lyric</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Synced to Music</h3>
                        <p className="text-sm text-gray-500">4:19 of Wendy's Song</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Download MP4</h3>
                        <p className="text-sm text-gray-500">Share anywhere</p>
                    </div>
                </div>

                {/* Privacy */}
                <p className="text-sm text-gray-400">
                    🔒 100% private — all processing happens in your browser
                </p>
            </div>
        </div>
    );
};

export default LandingScreen;
