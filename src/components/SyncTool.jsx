import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Save, RotateCcw, Check } from 'lucide-react';
const audioFile = import.meta.env.BASE_URL + 'audio/wendys_song.mp3';

// The lyrics to sync - must match lyricSlots structure in lyricsData.js
const LYRICS_TO_SYNC = [
    { type: 'intro', text: "A Mother's Day Story Card" },
    { type: 'narrative', text: "Hi, mom, it's me" },
    { type: 'narrative', text: "I couldn't find the words to say" },
    { type: 'narrative', text: 'just how much you mean to me' },
    { type: 'narrative', text: 'so I wrote down how I feel in this song' },
    { type: 'verse', text: 'For my hurt feelings, she offered sympathy' },
    { type: 'verse', text: 'Through both the good times and the bad' },
    { type: 'verse', text: 'She was the one true friend I always had' },
    { type: 'verse', text: 'When I was sick, she stayed up through the night' },
    { type: 'verse', text: 'She kissed my sores and my tears away' },
    { type: 'verse', text: 'Made time for me during her busy day' },
    { type: 'verse', text: 'She sheltered me from all harm' },
    { type: 'verse', text: 'Through the years' },
    { type: 'verse', text: 'She kept me safe and warm' },
    { type: 'verse', text: 'When I was growing up' },
    { type: 'verse', text: 'She was always there' },
    { type: 'verse', text: 'When I was bad, she was firm but fair' },
    { type: 'verse', text: 'She did her best' },
    { type: 'verse', text: 'To teach me right from wrong' },
    { type: 'verse', text: 'And now my heart' },
    { type: 'verse', text: 'Carries her loving song' },
    { type: 'verse', text: 'My heart carries her loving song' },
    { type: 'verse', text: 'Her loving song...' },
    { type: 'outro', text: "Happy Mother's Day, Mom" }
];

export default function SyncTool({ onBack }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [timings, setTimings] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const audioRef = useRef(null);
    const startTimeRef = useRef(null);

    // Audio setup
    useEffect(() => {
        audioRef.current = new Audio(audioFile);
        audioRef.current.onended = finishRecording;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Keyboard listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                if (!isPlaying && !isFinished && currentIndex === -1) {
                    startRecording();
                } else if (isPlaying) {
                    recordTimestamp();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, currentIndex, isFinished]);

    const startRecording = () => {
        if (!audioRef.current) return;
        setTimings([]);
        setCurrentIndex(0); // Set to first slide (Title Card) immediately at 0
        setIsFinished(false);

        // Record 0.00 for the first slide (Intro)
        setTimings([{ index: 0, time: 0, lyric: LYRICS_TO_SYNC[0] }]);

        audioRef.current.play();
        setIsPlaying(true);
        startTimeRef.current = Date.now();
    };

    const recordTimestamp = () => {
        if (currentIndex >= LYRICS_TO_SYNC.length - 1) {
            finishRecording();
            return;
        }

        const currentTime = audioRef.current.currentTime;
        const nextIndex = currentIndex + 1;

        // Add new timing
        setTimings(prev => [...prev, {
            index: nextIndex,
            time: currentTime,
            lyric: LYRICS_TO_SYNC[nextIndex]
        }]);

        setCurrentIndex(nextIndex);
    };

    const finishRecording = () => {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
        setIsFinished(true);
    };

    const generateCode = () => {
        const slots = timings.map((t, i) => {
            const nextTime = timings[i + 1] ? timings[i + 1].time : 124.87;
            const slot = {
                id: i + 1,
                type: t.lyric.type,
                lyric: t.lyric.text,
                startTime: parseFloat(t.time.toFixed(2)),
                endTime: parseFloat(nextTime.toFixed(2)),
                displayDuration: parseFloat((nextTime - t.time).toFixed(2))
            };

            // Add special properties for intro
            if (t.lyric.type === 'intro') {
                slot.subLyric = 'made especially for YOU';
                slot.editable = true;
            }

            // Add special properties for outro
            if (t.lyric.type === 'outro') {
                slot.endTime = 130;
                slot.displayDuration = 6;
                slot.isGenerated = true;
            }

            return slot;
        });

        return `export const lyricSlots = ${JSON.stringify(slots, null, 4)};`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 font-sans">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <RotateCcw className="w-5 h-5 text-gray-400 cursor-pointer" onClick={onBack} />
                        Lyric Synchronizer
                    </h1>
                    <div className="text-sm font-mono opacity-70">
                        {currentIndex >= 0 ? `${(currentIndex + 1)} / ${LYRICS_TO_SYNC.length}` : 'Ready'}
                    </div>
                </div>

                <div className="p-12 flex flex-col items-center text-center">
                    {!isFinished ? (
                        <>
                            <div className="mb-12 min-h-[160px] flex flex-col justify-center items-center">
                                <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">Current Slide</p>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 transition-all duration-200">
                                    {currentIndex === -1
                                        ? "Press START to Begin"
                                        : LYRICS_TO_SYNC[currentIndex]?.text}
                                </h2>
                                {currentIndex >= 0 && (
                                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-500">
                                        {LYRICS_TO_SYNC[currentIndex]?.type}
                                    </span>
                                )}
                                {currentIndex >= 0 && (
                                    <div className="mt-8 pt-8 border-t border-gray-100 w-full animate-pulse opacity-60">
                                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Next Up</p>
                                        <p className="text-xl text-gray-500 font-medium">
                                            {LYRICS_TO_SYNC[currentIndex + 1]?.text || "(End of Song)"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={isPlaying ? recordTimestamp : startRecording}
                                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-2xl ${isPlaying
                                    ? 'bg-rose-500 hover:bg-rose-600 active:scale-95 ring-8 ring-rose-100'
                                    : 'bg-emerald-500 hover:bg-emerald-600 hover:scale-105 ring-8 ring-emerald-100'
                                    }`}
                            >
                                {isPlaying ? (
                                    <>
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/90 mb-1">Tap for</span>
                                        <span className="text-2xl font-black text-white">NEXT</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-10 h-10 text-white ml-2 mb-1" />
                                        <span className="text-sm font-bold text-white uppercase">Start</span>
                                    </>
                                )}
                            </button>

                            <p className="mt-8 text-gray-400 text-sm">
                                {isPlaying ? "Press SPACEBAR exactly when the line changes!" : "Turn up your volume. Press Spacebar or Click button."}
                            </p>
                        </>
                    ) : (
                        <div className="w-full text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Check className="w-6 h-6 text-green-500" />
                                complete! Copy this code:
                            </h3>
                            <textarea
                                className="w-full h-96 font-mono text-xs bg-slate-50 border border-slate-200 p-4 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none resize-none text-slate-700"
                                readOnly
                                value={generateCode()}
                                onClick={(e) => e.target.select()}
                            />
                            <div className="mt-6 flex gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        setTimings([]);
                                        setCurrentIndex(-1);
                                        setIsFinished(false);
                                    }}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(generateCode())}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors flex items-center gap-2 shadow-lg"
                                >
                                    <Save className="w-4 h-4" />
                                    Copy to Clipboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
