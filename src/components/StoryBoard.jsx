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
        <div className="min-h-screen">
            {/* Header - Full Width */}
            <div className="bg-white border-b border-[#eee] sticky top-0 z-20">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setScreen('landing')}
                                className="w-10 h-10 rounded-full bg-[#f5f5f5] hover:bg-[#eee] flex items-center justify-center transition-colors"
                            >
                                <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-[#1a1a1a]">Story Board</h1>
                                <p className="text-sm text-[#666]">Add a photo for each moment</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-2xl font-extrabold text-[#1a1a1a]">
                                    {uploadedCount}<span className="text-[#999] font-normal">/{TOTAL_SLOTS}</span>
                                </div>
                            </div>
                            <div className="w-24 h-2 bg-[#f5f5f5] rounded-full overflow-hidden hidden sm:block">
                                <div
                                    className="h-full bg-[#E87B7B] rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Slots Grid - 2 columns on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    {lyricSlots.map((slot, index) => (
                        <LyricSlot key={slot.id} slot={slot} index={index} />
                    ))}
                </div>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] p-4 z-20">
                <div className="max-w-4xl mx-auto flex gap-4">
                    <button
                        onClick={() => setScreen('preview')}
                        disabled={!hasAnyPhotos}
                        className="flex-1 btn btn-outline"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Preview
                    </button>

                    <button
                        onClick={() => setScreen('rendering')}
                        disabled={!hasAllPhotos}
                        className="flex-1 btn btn-primary"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Generate Video
                    </button>
                </div>

                {!hasAllPhotos && (
                    <p className="text-center text-xs text-[#999] mt-2">
                        {hasAnyPhotos
                            ? `${TOTAL_SLOTS - uploadedCount} more photos needed`
                            : 'Add photos to continue'
                        }
                    </p>
                )}
            </div>

            {/* Spacer for fixed bottom */}
            <div className="h-24" />
        </div>
    );
};

export default StoryBoard;
