import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Download } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots, getCurrentSlot, getSlotProgress, SONG_DURATION } from '../utils/lyricsData';

/**
 * Word-wrap a single line of text to fit within `maxWidth`. Returns array of lines.
 * Uses the canvas context's currently-set font for measurement.
 */
function wrapSingleLine(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = '';
    for (const w of words) {
        const next = line ? line + ' ' + w : w;
        if (ctx.measureText(next).width <= maxWidth) {
            line = next;
        } else {
            if (line) lines.push(line);
            line = w;
        }
    }
    if (line) lines.push(line);
    return lines;
}

/**
 * Split text on explicit \n then word-wrap each segment.
 * Returns an array of display lines.
 */
function wrapLines(ctx, text, maxWidth) {
    return text
        .split('\n')
        .flatMap((segment) => wrapSingleLine(ctx, segment.trim(), maxWidth));
}

/**
 * Draw centered, vertically-balanced multi-line text. (cx, cy) is the center
 * of the rendered block. Respects current font, fillStyle and textAlign.
 */
function drawWrappedText(ctx, text, cx, cy, maxWidth, lineHeight) {
    const lines = wrapLines(ctx, text, maxWidth);
    const startY = cy - ((lines.length - 1) * lineHeight) / 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    lines.forEach((line, i) => {
        ctx.fillText(line, cx, startY + i * lineHeight);
    });
}

const VideoPreview = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const photos = useVideoStore((state) => state.photos);
    const customTitle = useVideoStore((state) => state.customTitle);
    const canvasRef = useRef(null);
    const audioRef = useRef(null);
    const animationRef = useRef(null);
    const isPlayingRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});

    // Derived: which slot is currently showing. Always consistent with
    // currentTime so the "Now playing" text and the canvas overlay can never
    // disagree at slot boundaries.
    const currentSlot = getCurrentSlot(currentTime);

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

        const slot = getCurrentSlot(time);

        // Clear canvas with gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#fdf2f8');
        gradient.addColorStop(1, '#fce7f3');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 1. Title Slide - Premium Design
        if (slot.id === 1) {
            const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.7);
            bgGradient.addColorStop(0, 'rgba(252, 231, 243, 0.6)');
            bgGradient.addColorStop(0.5, 'rgba(253, 242, 248, 0.4)');
            bgGradient.addColorStop(1, 'rgba(255, 241, 242, 0.3)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            const heartPositions = [
                { x: 120, y: 150, size: 40, opacity: 0.15, rotation: -15 },
                { x: width - 150, y: 180, size: 35, opacity: 0.12, rotation: 20 },
                { x: 200, y: height - 200, size: 30, opacity: 0.1, rotation: -25 },
                { x: width - 200, y: height - 180, size: 45, opacity: 0.15, rotation: 15 },
                { x: width / 2 - 350, y: height / 2 - 100, size: 25, opacity: 0.08, rotation: 10 },
                { x: width / 2 + 380, y: height / 2 + 50, size: 28, opacity: 0.1, rotation: -10 },
            ];

            heartPositions.forEach(heart => {
                ctx.save();
                ctx.translate(heart.x, heart.y);
                ctx.rotate(heart.rotation * Math.PI / 180);
                ctx.globalAlpha = heart.opacity;
                ctx.fillStyle = '#ec4899';
                ctx.beginPath();
                const s = heart.size;
                ctx.moveTo(0, -s * 0.3);
                ctx.bezierCurveTo(s * 0.5, -s * 0.8, s, -s * 0.3, 0, s * 0.5);
                ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.8, 0, -s * 0.3);
                ctx.fill();
                ctx.restore();
            });
            ctx.restore();

            const accentGradient = ctx.createLinearGradient(width / 2 - 150, 0, width / 2 + 150, 0);
            accentGradient.addColorStop(0, 'transparent');
            accentGradient.addColorStop(0.2, '#ec4899');
            accentGradient.addColorStop(0.5, '#f472b6');
            accentGradient.addColorStop(0.8, '#ec4899');
            accentGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = accentGradient;
            ctx.fillRect(width / 2 - 150, 80, 300, 4);

            ctx.textAlign = 'center';

            ctx.fillStyle = '#9ca3af';
            ctx.font = '500 20px Inter, sans-serif';
            ctx.fillText('✦  A Charitable Project  ✦', width / 2, height / 2 - 130);

            ctx.fillStyle = '#be185d';
            ctx.font = 'bold 72px Inter, sans-serif';
            ctx.fillText("A Mother's Day", width / 2, height / 2 - 50);

            const titleGradient = ctx.createLinearGradient(width / 2 - 200, 0, width / 2 + 200, 0);
            titleGradient.addColorStop(0, '#ec4899');
            titleGradient.addColorStop(0.5, '#f43f5e');
            titleGradient.addColorStop(1, '#ec4899');
            ctx.fillStyle = titleGradient;
            ctx.font = 'bold 88px Inter, sans-serif';
            ctx.fillText('Story Card', width / 2, height / 2 + 50);

            ctx.fillStyle = '#6b7280';
            ctx.font = '400 28px Inter, sans-serif';
            ctx.fillText('made especially for', width / 2 - 40, height / 2 + 120);
            ctx.fillStyle = '#ec4899';
            ctx.font = 'italic 600 32px Inter, sans-serif';
            ctx.fillText('YOU', width / 2 + 115, height / 2 + 120);

            ctx.fillStyle = accentGradient;
            ctx.fillRect(width / 2 - 100, height - 100, 200, 3);

            ctx.textAlign = 'center';
            ctx.fillStyle = '#9ca3af';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText("The Wendy's Song Project  •  © 1986/2026 Kim Coleman Uhlik and Wendy Emerick", width / 2, height - 55);
            ctx.font = '13px Inter, sans-serif';
            ctx.fillStyle = '#b4b4b4';
            ctx.fillText('Designed by Scott Glasgow', width / 2, height - 32);
            return;
        }

        // 2. Narrative Slides
        if (slot.type === 'narrative') {
            const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.7);
            bgGradient.addColorStop(0, 'rgba(252, 231, 243, 0.6)');
            bgGradient.addColorStop(0.5, 'rgba(253, 242, 248, 0.4)');
            bgGradient.addColorStop(1, 'rgba(255, 241, 242, 0.3)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            const heartPositions = [
                { x: 150, y: 180, size: 30, opacity: 0.1, rotation: -10 },
                { x: width - 180, y: 200, size: 25, opacity: 0.08, rotation: 15 },
                { x: 180, y: height - 220, size: 22, opacity: 0.08, rotation: -20 },
                { x: width - 160, y: height - 200, size: 28, opacity: 0.1, rotation: 10 },
            ];

            heartPositions.forEach(heart => {
                ctx.save();
                ctx.translate(heart.x, heart.y);
                ctx.rotate(heart.rotation * Math.PI / 180);
                ctx.globalAlpha = heart.opacity;
                ctx.fillStyle = '#ec4899';
                ctx.beginPath();
                const s = heart.size;
                ctx.moveTo(0, -s * 0.3);
                ctx.bezierCurveTo(s * 0.5, -s * 0.8, s, -s * 0.3, 0, s * 0.5);
                ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.8, 0, -s * 0.3);
                ctx.fill();
                ctx.restore();
            });
            ctx.restore();

            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
            ctx.font = 'bold 200px Georgia, serif';
            ctx.fillText('"', width / 2 - 300, height / 2 - 20);

            ctx.fillStyle = '#374151';
            ctx.font = 'italic 44px Georgia, serif';
            drawWrappedText(ctx, slot.lyric, width / 2, height / 2, width - 240, 56);

            ctx.fillStyle = '#9ca3af';
            ctx.font = '18px Inter, sans-serif';
            ctx.fillText('— spoken intro —', width / 2, height - 80);

            return;
        }

        // 3. Finale Slide
        if (slot.isGenerated) {
            const finaleGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);
            finaleGradient.addColorStop(0, 'rgba(254, 205, 211, 0.5)');
            finaleGradient.addColorStop(0.5, 'rgba(252, 231, 243, 0.4)');
            finaleGradient.addColorStop(1, 'rgba(253, 242, 248, 0.2)');
            ctx.fillStyle = finaleGradient;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.translate(width / 2, height / 2 - 30);
            ctx.globalAlpha = 0.08;
            ctx.fillStyle = '#ec4899';
            ctx.beginPath();
            const heartSize = 250;
            ctx.moveTo(0, -heartSize * 0.3);
            ctx.bezierCurveTo(heartSize * 0.5, -heartSize * 0.8, heartSize, -heartSize * 0.3, 0, heartSize * 0.5);
            ctx.bezierCurveTo(-heartSize, -heartSize * 0.3, -heartSize * 0.5, -heartSize * 0.8, 0, -heartSize * 0.3);
            ctx.fill();
            ctx.restore();

            const finaleHearts = [
                { x: 180, y: 200, size: 25, opacity: 0.2 },
                { x: width - 200, y: 220, size: 30, opacity: 0.18 },
                { x: 250, y: height - 180, size: 22, opacity: 0.15 },
                { x: width - 250, y: height - 200, size: 28, opacity: 0.2 },
                { x: 120, y: height / 2, size: 18, opacity: 0.12 },
                { x: width - 130, y: height / 2 + 50, size: 20, opacity: 0.15 },
            ];

            finaleHearts.forEach(heart => {
                ctx.save();
                ctx.translate(heart.x, heart.y);
                ctx.globalAlpha = heart.opacity;
                ctx.fillStyle = '#f472b6';
                ctx.beginPath();
                const s = heart.size;
                ctx.moveTo(0, -s * 0.3);
                ctx.bezierCurveTo(s * 0.5, -s * 0.8, s, -s * 0.3, 0, s * 0.5);
                ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.8, 0, -s * 0.3);
                ctx.fill();
                ctx.restore();
            });

            ctx.textAlign = 'center';

            ctx.fillStyle = '#be185d';
            ctx.font = '500 48px Inter, sans-serif';
            ctx.fillText('Happy', width / 2, height / 2 - 80);

            const finaleTextGradient = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
            finaleTextGradient.addColorStop(0, '#ec4899');
            finaleTextGradient.addColorStop(0.5, '#f43f5e');
            finaleTextGradient.addColorStop(1, '#ec4899');
            ctx.fillStyle = finaleTextGradient;
            ctx.font = 'bold 80px Inter, sans-serif';
            ctx.fillText("Mother's Day", width / 2, height / 2 + 10);

            ctx.fillStyle = '#6b7280';
            ctx.font = '400 36px Inter, sans-serif';
            ctx.fillText('to the best Mom ever', width / 2, height / 2 + 80);

            ctx.font = '32px Inter, sans-serif';
            ctx.fillText('❤️  💕  ❤️', width / 2, height / 2 + 140);

            const bottomAccent = ctx.createLinearGradient(width / 2 - 80, 0, width / 2 + 80, 0);
            bottomAccent.addColorStop(0, 'transparent');
            bottomAccent.addColorStop(0.3, '#f472b6');
            bottomAccent.addColorStop(0.7, '#f472b6');
            bottomAccent.addColorStop(1, 'transparent');
            ctx.fillStyle = bottomAccent;
            ctx.fillRect(width / 2 - 80, height - 60, 160, 3);
            return;
        }

        // 4. Standard Photo Slots
        const img = loadedImages[slot.id];
        if (img) {
            const slotProgress = getSlotProgress(time, slot);
            let opacity = 1;

            if (slotProgress < 0.1) {
                opacity = slotProgress / 0.1;
            } else if (slotProgress > 0.9) {
                opacity = (1 - slotProgress) / 0.1;
            }

            ctx.globalAlpha = opacity;

            const imgAspect = img.width / img.height;
            const canvasAspect = width / height;
            let drawWidth, drawHeight, drawX, drawY;

            if (imgAspect > canvasAspect) {
                drawHeight = height;
                drawWidth = height * imgAspect;
                drawX = (width - drawWidth) / 2;
                drawY = 0;
            } else {
                drawWidth = width;
                drawHeight = width / imgAspect;
                drawX = 0;
                drawY = (height - drawHeight) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            ctx.globalAlpha = 1;
        } else {
            ctx.fillStyle = '#d1d5db';
            ctx.font = 'bold 24px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No photo for this scene', width / 2, height / 2);
        }

        // Lyric overlay (with auto word-wrap for long lines)
        if (slot.lyric) {
            ctx.font = 'italic 32px Georgia, serif';
            const lines = wrapLines(ctx, slot.lyric, width - 120);
            const lineHeight = 40;
            const padding = 24;
            const barHeight = padding * 2 + lineHeight * lines.length;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fillRect(0, height - barHeight, width, barHeight);

            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const startY = height - barHeight + padding + lineHeight / 2;
            lines.forEach((line, i) => {
                ctx.fillText(line, width / 2, startY + i * lineHeight);
            });
        }
    }, [loadedImages, customTitle]);

    const animate = useCallback(() => {
        if (!audioRef.current || !isPlayingRef.current) return;

        if (audioRef.current.paused) {
            isPlayingRef.current = false;
            setIsPlaying(false);
            return;
        }

        const time = audioRef.current.currentTime;
        setCurrentTime(time);
        drawFrame(time);

        if (time < SONG_DURATION) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            isPlayingRef.current = false;
            setIsPlaying(false);
        }
    }, [drawFrame]);

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    useEffect(() => {
        if (Object.keys(loadedImages).length > 0) {
            drawFrame(0);
        }
    }, [loadedImages, drawFrame]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlayingRef.current) {
            audioRef.current.pause();
            isPlayingRef.current = false;
            setIsPlaying(false);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        } else {
            const startPlayback = () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                    animationRef.current = null;
                }
                isPlayingRef.current = true;
                setIsPlaying(true);
                animationRef.current = requestAnimationFrame(animate);
            };

            const audio = audioRef.current;
            if (audio.readyState >= 4) {
                audio.play().then(startPlayback).catch((e) => {
                    console.warn('Audio playback failed:', e);
                });
            } else {
                setIsPlaying(true);
                const onReady = () => {
                    audio.removeEventListener('canplaythrough', onReady);
                    audio.play().then(startPlayback).catch((e) => {
                        console.warn('Audio playback failed:', e);
                        isPlayingRef.current = false;
                        setIsPlaying(false);
                    });
                };
                audio.addEventListener('canplaythrough', onReady);
                audio.load();
            }
        }
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        const time = percent * SONG_DURATION;

        if (audioRef.current) audioRef.current.currentTime = time;
        setCurrentTime(time);
        drawFrame(time);
    };

    const handleReset = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        isPlayingRef.current = false;
        setIsPlaying(false);
        setCurrentTime(0);
        drawFrame(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const audioPath = import.meta.env.BASE_URL + 'audio/wendys_song.mp3';
    const progressPercent = (currentTime / SONG_DURATION) * 100;

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FFF8FA] via-white to-[#FFF1F2] pb-16 text-ink-900">
            <div className="aurora opacity-50" aria-hidden />

            <div className="relative z-10 mx-auto max-w-5xl px-5 pt-10 sm:px-8 sm:pt-14">
                {/* Header */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => setScreen('storyboard')}
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-ink-200 bg-white/80 px-4 text-sm font-semibold text-ink-700 backdrop-blur hover:border-ink-300 hover:bg-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to storyboard
                    </button>
                    <div className="text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                            Preview
                        </p>
                        <h1 className="text-2xl font-extrabold tracking-display text-ink-900 sm:text-3xl">
                            Watch your tribute
                        </h1>
                    </div>
                </div>

                {/* Player card */}
                <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-card backdrop-blur-xl animate-scale-in">
                    {/* Video frame */}
                    <div className="relative bg-ink-900">
                        <div className="aspect-video w-full">
                            <canvas
                                ref={canvasRef}
                                width={1280}
                                height={720}
                                className="h-full w-full"
                            />
                        </div>

                        {/* Floating play button overlay when paused */}
                        {!isPlaying && (
                            <button
                                onClick={handlePlayPause}
                                className="absolute inset-0 grid place-items-center bg-black/0 hover:bg-black/10"
                                aria-label="Play"
                            >
                                <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-brand-600 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.45)] backdrop-blur transition-spring hover:scale-105">
                                    <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Now playing strip */}
                    <div className="flex items-center gap-3 border-b border-ink-100 bg-ink-50/50 px-6 py-4">
                        <span className="grid h-2 w-2 place-items-center">
                            <span className={`h-2 w-2 rounded-full bg-brand-500 ${isPlaying ? 'animate-ping' : ''}`} />
                        </span>
                        <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
                            Now playing
                        </p>
                        <p className="whitespace-pre-line font-display text-[15px] italic text-ink-800">
                            “{currentSlot?.editable ? customTitle : currentSlot?.lyric}”
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="px-6 py-5 sm:px-8 sm:py-6">
                        {/* Progress */}
                        <div
                            className="group relative h-2 cursor-pointer rounded-full bg-ink-100"
                            onClick={handleSeek}
                            role="slider"
                            aria-valuemin={0}
                            aria-valuemax={SONG_DURATION}
                            aria-valuenow={currentTime}
                        >
                            <div
                                className="relative h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500"
                                style={{ width: `${progressPercent}%` }}
                            >
                                <span className="absolute -right-1.5 top-1/2 grid h-4 w-4 -translate-y-1/2 place-items-center rounded-full bg-white shadow ring-2 ring-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[13px] font-medium tabular text-ink-500">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(SONG_DURATION)}</span>
                        </div>

                        {/* Buttons */}
                        <div className="mt-5 flex items-center justify-center gap-4">
                            <button
                                onClick={handleReset}
                                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50"
                                title="Reset"
                                aria-label="Reset"
                            >
                                <RotateCcw className="h-5 w-5" />
                            </button>

                            <button
                                onClick={handlePlayPause}
                                className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-orange-500 text-white shadow-glow-brand transition-spring hover:scale-105 active:scale-100"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <Pause className="h-7 w-7" fill="currentColor" />
                                ) : (
                                    <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
                                )}
                            </button>

                            <button
                                onClick={() => setScreen('rendering')}
                                className="grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-[0_10px_30px_-10px_rgba(5,150,105,0.5)] hover:scale-105"
                                title="Generate video"
                                aria-label="Generate video"
                            >
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Helper text */}
                <p className="mt-6 text-center text-[13px] text-ink-500">
                    Tip — you can scrub the timeline to jump to any moment.
                </p>

                <audio
                    ref={audioRef}
                    src={audioPath}
                    preload="auto"
                    onEnded={handleReset}
                />
            </div>
        </div>
    );
};

export default VideoPreview;
