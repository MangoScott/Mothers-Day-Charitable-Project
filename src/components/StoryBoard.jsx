import React from 'react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots, TOTAL_SLOTS } from '../utils/lyricsData';
import LyricSlot from './LyricSlot';

const StoryBoard = () => {
    const { setScreen, photos } = useVideoStore();

    const uploadedCount = Object.values(photos).filter(Boolean).length;
    const progressPercent = (uploadedCount / TOTAL_SLOTS) * 100;
    const hasAnyPhotos = uploadedCount > 0;
    const hasAllPhotos = uploadedCount === TOTAL_SLOTS;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setScreen('landing')}
                            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 hover:text-gray-900 text-gray-500 flex items-center justify-center transition-all border border-transparent hover:border-gray-200"
                            title="Go Back"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Your Storyboard</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <span className="text-sm font-semibold text-gray-500 mr-2">Progress</span>
                            <span className="text-xl font-bold text-gray-900">
                                {uploadedCount}<span className="text-gray-300 font-normal">/</span>{TOTAL_SLOTS}
                            </span>
                        </div>
                        {/* Circular Progress (Mobile) / Bar (Desktop) */}
                        <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div
                                className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="w-full max-w-6xl mx-auto px-6 py-8 pb-32 flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lyricSlots.map((slot, index) => (
                        <LyricSlot key={slot.id} slot={slot} index={index} />
                    ))}
                </div>
            </main>

            {/* Fixed Bottom */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                <div className="w-full max-w-4xl mx-auto flex gap-4">
                    <button
                        onClick={() => setScreen('preview')}
                        disabled={!hasAnyPhotos}
                        className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        Preview Video
                    </button>

                    <button
                        onClick={() => setScreen('rendering')}
                        disabled={!hasAllPhotos}
                        className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Generate & Download
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default StoryBoard;
