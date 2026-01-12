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
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-lg mx-auto">
                {/* Header - compact */}
                <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <button
                                onClick={() => setScreen('landing')}
                                className="text-[#8A847E] hover:text-[#2D2A26] text-sm mb-1 flex items-center gap-1"
                            >
                                ← Back
                            </button>
                            <h1 className="text-xl font-serif text-[#2D2A26]">
                                Story Board
                            </h1>
                        </div>

                        {/* Progress */}
                        <div className="text-right">
                            <div className="text-2xl font-serif text-[#E8A87C]">
                                {uploadedCount}<span className="text-sm text-[#8A847E] font-sans">/{TOTAL_SLOTS}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#F67280] to-[#E8A87C] transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Slots list - compact spacing */}
                <div className="space-y-2 mb-4">
                    {lyricSlots.map((slot, index) => (
                        <LyricSlot key={slot.id} slot={slot} index={index} />
                    ))}
                </div>

                {/* Actions - sticky */}
                <div className="sticky bottom-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setScreen('preview')}
                            disabled={!hasAnyPhotos}
                            className="flex-1 py-3 px-4 border-2 border-[#C38D94] text-[#C38D94] rounded-xl font-semibold hover:bg-[#C38D94] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Preview
                        </button>

                        <button
                            onClick={() => setScreen('rendering')}
                            disabled={!hasAllPhotos}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-[#F67280] to-[#E8A87C] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Generate
                        </button>
                    </div>

                    {!hasAllPhotos && (
                        <p className="text-center text-xs text-[#8A847E] mt-3">
                            {hasAnyPhotos
                                ? `${TOTAL_SLOTS - uploadedCount} more photos needed`
                                : 'Add photos to each moment'
                            }
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryBoard;
