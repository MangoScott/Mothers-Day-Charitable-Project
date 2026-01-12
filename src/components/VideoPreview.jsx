import React, { useRef, useEffect, useState, useCallback } from 'react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots, getCurrentSlot, getSlotProgress, SONG_DURATION } from '../utils/lyricsData';

const VideoPreview = () => {
    const { setScreen, photos } = useVideoStore();
    const canvasRef = useRef(null);
    const audioRef = useRef(null);
    const animationRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});

    // Preload all images
    useEffect(() => {
        const imageCache = {};
        const loadPromises = lyricSlots.map(async (slot) => {
            const photoDataUrl = photos[slot.id];
            if (photoDataUrl) {
                const img = new Image();
                img.src = photoDataUrl;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
                imageCache[slot.id] = img;
            }
        });

        Promise.all(loadPromises).then(() => {
            setLoadedImages(imageCache);
        });
    }, [photos]);

    const drawFrame = useCallback((time) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Get current slot
        const slot = getCurrentSlot(time);
        const slotIndex = lyricSlots.findIndex((s) => s.id === slot.id);
        setCurrentSlotIndex(slotIndex);

        // Clear canvas
        ctx.fillStyle = '#FFF8E7';
        ctx.fillRect(0, 0, width, height);

        // Draw image if available
        const img = loadedImages[slot.id];
        if (img) {
            // Calculate fade progress for transitions
            const slotProgress = getSlotProgress(time, slot);
            let opacity = 1;

            // Fade in at start of slot
            if (slotProgress < 0.1) {
                opacity = slotProgress / 0.1;
            }
            // Fade out at end of slot
            else if (slotProgress > 0.9) {
                opacity = (1 - slotProgress) / 0.1;
            }

            ctx.globalAlpha = opacity;
            ctx.drawImage(img, 0, 0, width, height);
            ctx.globalAlpha = 1;
        } else {
            // Draw placeholder
            ctx.fillStyle = '#F8E1E7';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#D4A5A5';
            ctx.font = '24px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('No photo for this slot', width / 2, height / 2);
        }

        // Draw lyric text overlay
        const lyric = slot.lyric;

        // Semi-transparent background bar for text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, height - 100, width, 100);

        // Draw text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'italic 28px Playfair Display, Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Word wrap if needed
        const maxWidth = width - 80;
        const words = lyric.split(' ');
        let line = '';
        let y = height - 60;
        const lineHeight = 36;
        const lines = [];

        for (const word of words) {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && line !== '') {
                lines.push(line.trim());
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());

        // Center lines vertically
        const totalHeight = lines.length * lineHeight;
        y = height - 50 - totalHeight / 2;

        for (const text of lines) {
            ctx.fillText(`"${text}"`, width / 2, y);
            y += lineHeight;
        }
    }, [loadedImages]);

    const animate = useCallback(() => {
        if (!audioRef.current) return;

        const time = audioRef.current.currentTime;
        setCurrentTime(time);
        drawFrame(time);

        if (isPlaying && time < SONG_DURATION) {
            animationRef.current = requestAnimationFrame(animate);
        }
    }, [isPlaying, drawFrame]);

    useEffect(() => {
        if (isPlaying) {
            animationRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, animate]);

    // Initial draw
    useEffect(() => {
        if (Object.keys(loadedImages).length > 0) {
            drawFrame(0);
        }
    }, [loadedImages, drawFrame]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch((e) => {
                console.warn('Audio playback failed:', e);
                // Continue without audio
            });
            setIsPlaying(true);
        }
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        const time = percent * SONG_DURATION;

        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
        setCurrentTime(time);
        drawFrame(time);
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentTime(0);
        drawFrame(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentSlot = lyricSlots[currentSlotIndex];

    return (
        <div className="min-h-screen px-4 py-6 md:py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="glass-card rounded-2xl p-4 md:p-6 mb-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => setScreen('storyboard')}
                                className="text-accent hover:text-warm transition-colors text-sm flex items-center gap-1 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Story Board
                            </button>
                            <h1 className="text-2xl md:text-3xl font-serif text-warm">
                                Preview Your Video
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Video canvas */}
                <div className="glass-card rounded-2xl p-4 md:p-6 mb-6 animate-slide-up">
                    <div className="aspect-video bg-cream-100 rounded-xl overflow-hidden shadow-lg">
                        <canvas
                            ref={canvasRef}
                            width={1280}
                            height={720}
                            className="video-canvas w-full h-full"
                        />
                    </div>

                    {/* Current lyric indicator */}
                    <div className="mt-4 text-center">
                        <span className="text-xs text-accent font-medium">Now showing:</span>
                        <p className="font-serif text-lg text-warm italic mt-1">
                            "{currentSlot?.lyric}"
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="glass-card rounded-2xl p-4 md:p-6 animate-slide-up">
                    {/* Progress bar */}
                    <div
                        className="h-2 bg-white/70 rounded-full overflow-hidden cursor-pointer mb-4"
                        onClick={handleSeek}
                    >
                        <div
                            className="progress-bar"
                            style={{ width: `${(currentTime / SONG_DURATION) * 100}%` }}
                        />
                    </div>

                    {/* Time display */}
                    <div className="flex justify-between text-sm text-warm/70 mb-4">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(SONG_DURATION)}</span>
                    </div>

                    {/* Control buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleReset}
                            className="p-3 rounded-full bg-white/70 text-warm hover:bg-white transition-colors"
                            title="Reset"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>

                        <button
                            onClick={handlePlayPause}
                            className="p-4 rounded-full bg-gradient-to-r from-highlight to-accent text-white hover:shadow-lg transition-all"
                        >
                            {isPlaying ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={() => setScreen('rendering')}
                            className="p-3 rounded-full bg-accent text-white hover:bg-accent/80 transition-colors"
                            title="Generate Video"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Hidden audio element */}
                <audio
                    ref={audioRef}
                    src="/audio/wendys_song.mp3"
                    onEnded={handleReset}
                    onTimeUpdate={() => {
                        if (audioRef.current) {
                            const time = audioRef.current.currentTime;
                            setCurrentTime(time);
                            drawFrame(time);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default VideoPreview;
