import React from 'react';
import useVideoStore from '../store/useVideoStore';

const LandingScreen = () => {
    const setScreen = useVideoStore((state) => state.setScreen);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-5 py-16">
            {/* Main card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-md w-full text-center">
                {/* Heart icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#F67280] to-[#E8A87C] flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Title - unified styling */}
                <h1 className="text-3xl md:text-4xl font-serif text-[#2D2A26] mb-2 leading-tight">
                    The Wendy's Song Project
                </h1>

                <p className="text-[#8A847E] mb-8">
                    Create a tribute video for Mom in minutes
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => setScreen('storyboard')}
                    className="w-full bg-gradient-to-r from-[#F67280] to-[#E8A87C] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all mb-6"
                >
                    Start My Video →
                </button>

                {/* Features row */}
                <div className="flex justify-center gap-6 text-sm text-[#8A847E] mb-6">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#E8A87C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        14 Photos
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#E8A87C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                        </svg>
                        Music Synced
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#E8A87C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        MP4
                    </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs text-[#8A847E]">
                        🔒 All processing happens in your browser. Photos never leave your device.
                    </p>
                </div>
            </div>

            {/* Charitable note - outside card */}
            <p className="mt-6 text-sm text-[#8A847E] text-center">
                A charitable project celebrating mothers everywhere
            </p>
        </div>
    );
};

export default LandingScreen;
