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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
                <div className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setScreen('landing')}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Story Board</h1>
                            <p className="text-sm text-gray-500">Add a photo for each lyric</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                            {uploadedCount}<span className="text-gray-400 font-normal">/{TOTAL_SLOTS}</span>
                        </span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-pink-500 rounded-full transition-all"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content - takes remaining space and centers */}
            <main className="w-full max-w-5xl mx-auto px-6 py-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lyricSlots.map((slot, index) => (
                        <LyricSlot key={slot.id} slot={slot} index={index} />
                    ))}
                </div>
            </main>

            {/* Fixed Bottom */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
                <div className="w-full max-w-5xl mx-auto flex gap-3">
                    <button
                        onClick={() => setScreen('preview')}
                        disabled={!hasAnyPhotos}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-900"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        Preview
                    </button>

                    <button
                        onClick={() => setScreen('rendering')}
                        disabled={!hasAllPhotos}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Generate Video
                    </button>
                </div>

                {!hasAllPhotos && (
                    <p className="text-center text-xs text-gray-400 mt-2">
                        {hasAnyPhotos ? `${TOTAL_SLOTS - uploadedCount} more needed` : 'Add photos to continue'}
                    </p>
                )}
            </footer>
        </div>
    );
};

export default StoryBoard;
