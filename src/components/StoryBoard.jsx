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
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="card p-6 mb-6 animate-in">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <button
                                onClick={() => setScreen('landing')}
                                className="text-[#9A9A9A] hover:text-[#3D3D3D] text-sm font-medium flex items-center gap-1 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>
                            <h1 className="font-display text-3xl text-[#3D3D3D]">
                                Your Story Board
                            </h1>
                        </div>

                        <div className="text-right">
                            <div className="font-display text-4xl text-[#D4A5A5]">
                                {uploadedCount}
                                <span className="text-xl text-[#9A9A9A]">/{TOTAL_SLOTS}</span>
                            </div>
                            <p className="text-sm text-[#9A9A9A]">photos added</p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Instruction */}
                <p className="text-center text-[#9A9A9A] mb-6">
                    Add a photo for each lyric moment in the song
                </p>

                {/* Slots */}
                <div className="space-y-3 mb-6">
                    {lyricSlots.map((slot, index) => (
                        <div key={slot.id} className="animate-in" style={{ animationDelay: `${index * 30}ms` }}>
                            <LyricSlot slot={slot} index={index} />
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="card p-5 sticky bottom-4">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setScreen('preview')}
                            disabled={!hasAnyPhotos}
                            className="flex-1 btn-outline disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:color-[#D4A5A5]"
                        >
                            Preview
                        </button>

                        <button
                            onClick={() => setScreen('rendering')}
                            disabled={!hasAllPhotos}
                            className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Generate Video
                        </button>
                    </div>

                    {!hasAllPhotos && (
                        <p className="text-center text-sm text-[#9A9A9A] mt-4">
                            {hasAnyPhotos
                                ? `Add ${TOTAL_SLOTS - uploadedCount} more photos to generate`
                                : 'Start by adding photos above'
                            }
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryBoard;
