import React from 'react';
import useVideoStore from '../store/useVideoStore';

const LandingScreen = () => {
    const setScreen = useVideoStore((state) => state.setScreen);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="card p-10 md:p-14 max-w-lg w-full text-center animate-in">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#E8B4B4] flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl md:text-5xl text-[#3D3D3D] mb-3 font-medium">
                    The Wendy's Song Project
                </h1>

                <p className="text-[#9A9A9A] text-lg mb-10">
                    Create a heartfelt tribute video for Mom
                </p>

                {/* CTA */}
                <button
                    onClick={() => setScreen('storyboard')}
                    className="btn-primary w-full text-lg mb-8"
                >
                    Create My Video
                </button>

                {/* Features */}
                <div className="flex justify-center gap-8 text-sm text-[#9A9A9A] mb-8">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#D4A5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        14 Photos
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#D4A5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                        </svg>
                        4:19 Song
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#D4A5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        MP4 Video
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#F0E8E5] mb-6" />

                {/* Privacy */}
                <p className="text-sm text-[#9A9A9A]">
                    <span className="inline-block w-4 h-4 mr-1 align-middle">🔒</span>
                    100% private — processing happens in your browser
                </p>
            </div>
        </div>
    );
};

export default LandingScreen;
