import React, { useRef, useEffect, useState, useCallback } from 'react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots, getCurrentSlot, getSlotProgress, SONG_DURATION } from '../utils/lyricsData';

const VideoPreview = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const photos = useVideoStore((state) => state.photos);
    const customTitle = useVideoStore((state) => state.customTitle);
    const canvasRef = useRef(null);
    const audioRef = useRef(null);
    const animationRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});

    const styles = {
        container: {
            minHeight: '100vh',
            padding: '24px 16px',
            background: 'linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%)',
        },
        inner: {
            maxWidth: '900px',
            margin: '0 auto',
        },
        header: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '20px 24px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f3f4f6',
        },
        backButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '8px',
            padding: 0,
        },
        title: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
        },
        videoCard: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f3f4f6',
        },
        canvasWrapper: {
            aspectRatio: '16 / 9',
            background: '#fdf2f8',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        },
        canvas: {
            width: '100%',
            height: '100%',
            display: 'block',
        },
        lyricIndicator: {
            marginTop: '16px',
            textAlign: 'center',
        },
        lyricLabel: {
            fontSize: '0.75rem',
            color: '#9ca3af',
            fontWeight: '500',
        },
        lyricText: {
            fontSize: '1.125rem',
            color: '#374151',
            fontStyle: 'italic',
            marginTop: '4px',
        },
        controlsCard: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f3f4f6',
        },
        progressBar: {
            height: '8px',
            background: '#f3f4f6',
            borderRadius: '9999px',
            overflow: 'hidden',
            cursor: 'pointer',
            marginBottom: '16px',
        },
        progressFill: {
            height: '100%',
            background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
            borderRadius: '9999px',
            transition: 'width 0.1s ease',
        },
        timeRow: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '20px',
        },
        buttonRow: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
        },
        controlButton: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'white',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        playButton: {
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
            transition: 'all 0.2s ease',
        },
        generateButton: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.2s ease',
        },
    };

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
        const slotIndex = lyricSlots.findIndex((s) => s.id === slot.id);
        setCurrentSlotIndex(slotIndex);

        // Clear canvas with gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#fdf2f8');
        gradient.addColorStop(1, '#fce7f3');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

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

            // Cover the canvas while maintaining aspect ratio
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

        // Draw lyric overlay - use customTitle for editable slots
        const lyric = slot.editable ? customTitle : slot.lyric;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, height - 100, width, 100);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'italic 28px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const maxWidth = width - 80;
        const words = lyric.split(' ');
        let line = '';
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

        const totalHeight = lines.length * lineHeight;
        let y = height - 50 - totalHeight / 2;

        for (const text of lines) {
            ctx.fillText(`"${text}"`, width / 2, y);
            y += lineHeight;
        }
    }, [loadedImages, customTitle]);

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
    const audioPath = import.meta.env.BASE_URL + 'audio/wendys_song.mp3';

    return (
        <div style={styles.container}>
            <div style={styles.inner}>
                {/* Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => setScreen('storyboard')}
                        style={styles.backButton}
                    >
                        <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Storyboard
                    </button>
                    <h1 style={styles.title}>Preview Your Video</h1>
                </div>

                {/* Video Canvas */}
                <div style={styles.videoCard}>
                    <div style={styles.canvasWrapper}>
                        <canvas
                            ref={canvasRef}
                            width={1280}
                            height={720}
                            style={styles.canvas}
                        />
                    </div>

                    <div style={styles.lyricIndicator}>
                        <span style={styles.lyricLabel}>Now showing:</span>
                        <p style={styles.lyricText}>"{currentSlot?.editable ? customTitle : currentSlot?.lyric}"</p>
                    </div>
                </div>

                {/* Controls */}
                <div style={styles.controlsCard}>
                    <div
                        style={styles.progressBar}
                        onClick={handleSeek}
                    >
                        <div style={{ ...styles.progressFill, width: `${(currentTime / SONG_DURATION) * 100}%` }} />
                    </div>

                    <div style={styles.timeRow}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(SONG_DURATION)}</span>
                    </div>

                    <div style={styles.buttonRow}>
                        <button
                            onClick={handleReset}
                            style={styles.controlButton}
                            title="Reset"
                        >
                            <svg style={{ width: 20, height: 20, color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>

                        <button
                            onClick={handlePlayPause}
                            style={styles.playButton}
                        >
                            {isPlaying ? (
                                <svg style={{ width: 28, height: 28, color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg style={{ width: 28, height: 28, color: 'white', marginLeft: 4 }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={() => setScreen('rendering')}
                            style={styles.generateButton}
                            title="Generate Video"
                        >
                            <svg style={{ width: 20, height: 20, color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Audio Element */}
                <audio
                    ref={audioRef}
                    src={audioPath}
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
