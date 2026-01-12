import React, { useEffect, useRef } from 'react';
import useVideoStore from '../store/useVideoStore';

const LandingScreen = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const containerRef = useRef(null);

    // Create floating hearts effect
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

        for (let i = 0; i < 8; i++) {
            setTimeout(createHeart, i * 500);
        }

        const interval = setInterval(createHeart, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative">
            {/* Floating hearts container */}
            <div ref={containerRef} className="floating-hearts-container" />

            {/* Hero Section - Full Width */}
            <div className="relative z-10 px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Top badge */}
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-full text-sm font-medium text-[#666]">
                            <span className="w-2 h-2 bg-[#E87B7B] rounded-full animate-pulse"></span>
                            A Charitable Project
                        </span>
                    </div>

                    {/* Main Title - Large */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center text-[#1a1a1a] mb-6 tracking-tight leading-[0.95]">
                        The Wendy's Song
                        <br />
                        <span className="text-[#E87B7B]">Project</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-center text-[#666] mb-12 max-w-2xl mx-auto">
                        Create a heartfelt tribute video for Mom in minutes. Upload photos, sync to music, download your MP4.
                    </p>

                    {/* CTA Button - Large */}
                    <div className="flex justify-center mb-16">
                        <button
                            onClick={() => setScreen('storyboard')}
                            className="btn btn-primary text-lg px-10 py-5"
                        >
                            Create My Video
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#1a1a1a] mb-1">14 Photo Moments</h3>
                            <p className="text-sm text-[#666]">One for each lyric in the song</p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#1a1a1a] mb-1">Synced to Music</h3>
                            <p className="text-sm text-[#666]">4:19 of Wendy's Song</p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#1a1a1a] mb-1">Download MP4</h3>
                            <p className="text-sm text-[#666]">Share anywhere, forever</p>
                        </div>
                    </div>

                    {/* Privacy note */}
                    <p className="text-center text-sm text-[#999] mt-12">
                        🔒 100% private — all processing happens in your browser. Photos never leave your device.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingScreen;
