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
    const isPlayingRef = useRef(false);
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

        // 1. Title Slide - Premium Design
        if (slot.id === 1) {
            // Decorative gradient background overlay
            const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.7);
            bgGradient.addColorStop(0, 'rgba(252, 231, 243, 0.6)');
            bgGradient.addColorStop(0.5, 'rgba(253, 242, 248, 0.4)');
            bgGradient.addColorStop(1, 'rgba(255, 241, 242, 0.3)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // Decorative hearts - scattered around
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

            // Decorative top accent line
            const accentGradient = ctx.createLinearGradient(width / 2 - 150, 0, width / 2 + 150, 0);
            accentGradient.addColorStop(0, 'transparent');
            accentGradient.addColorStop(0.2, '#ec4899');
            accentGradient.addColorStop(0.5, '#f472b6');
            accentGradient.addColorStop(0.8, '#ec4899');
            accentGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = accentGradient;
            ctx.fillRect(width / 2 - 150, 80, 300, 4);

            ctx.textAlign = 'center';

            // Small badge text
            ctx.fillStyle = '#9ca3af';
            ctx.font = '500 20px Inter, sans-serif';
            ctx.fillText('✦  A Charitable Project  ✦', width / 2, height / 2 - 130);

            // Main Title
            ctx.fillStyle = '#be185d';
            ctx.font = 'bold 72px Inter, sans-serif';
            ctx.fillText("A Mother's Day", width / 2, height / 2 - 50);

            // "Story Card" with gradient emphasis
            const titleGradient = ctx.createLinearGradient(width / 2 - 200, 0, width / 2 + 200, 0);
            titleGradient.addColorStop(0, '#ec4899');
            titleGradient.addColorStop(0.5, '#f43f5e');
            titleGradient.addColorStop(1, '#ec4899');
            ctx.fillStyle = titleGradient;
            ctx.font = 'bold 88px Inter, sans-serif';
            ctx.fillText('Story Card', width / 2, height / 2 + 50);

            // Subtitle with emphasis on "YOU"
            ctx.fillStyle = '#6b7280';
            ctx.font = '400 28px Inter, sans-serif';
            ctx.fillText('made especially for', width / 2 - 40, height / 2 + 120);
            ctx.fillStyle = '#ec4899';
            ctx.font = 'italic 600 32px Inter, sans-serif';
            ctx.fillText('YOU', width / 2 + 115, height / 2 + 120);

            // Bottom decorative line
            ctx.fillStyle = accentGradient;
            ctx.fillRect(width / 2 - 100, height - 100, 200, 3);

            // Copyright & Design - styled footer
            ctx.textAlign = 'center';
            ctx.fillStyle = '#9ca3af';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText("The Wendy's Song Project  •  © 1986/2026 Kim Coleman Uhlik and Wendy Emerick", width / 2, height - 55);
            ctx.font = '13px Inter, sans-serif';
            ctx.fillStyle = '#b4b4b4';
            ctx.fillText('Designed by Scott Glasgow', width / 2, height - 32);
            return;
        }

        // 2. Narrative Slides (spoken intro before singing)
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
            ctx.font = 'italic 48px Georgia, serif';
            ctx.fillText(slot.lyric, width / 2, height / 2);

            ctx.fillStyle = '#9ca3af';
            ctx.font = '18px Inter, sans-serif';
            ctx.fillText('— spoken intro —', width / 2, height - 80);

            return;
        }

        // 3. Finale Slide - Premium Design
        if (slot.isGenerated) {
            // Warm gradient background
            const finaleGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);
            finaleGradient.addColorStop(0, 'rgba(254, 205, 211, 0.5)');
            finaleGradient.addColorStop(0.5, 'rgba(252, 231, 243, 0.4)');
            finaleGradient.addColorStop(1, 'rgba(253, 242, 248, 0.2)');
            ctx.fillStyle = finaleGradient;
            ctx.fillRect(0, 0, width, height);

            // Large decorative heart in center background
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

            // Scattered small hearts
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

            // "Happy" with elegant styling
            ctx.fillStyle = '#be185d';
            ctx.font = '500 48px Inter, sans-serif';
            ctx.fillText('Happy', width / 2, height / 2 - 80);

            // "Mother's Day" - main emphasis
            const finaleTextGradient = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
            finaleTextGradient.addColorStop(0, '#ec4899');
            finaleTextGradient.addColorStop(0.5, '#f43f5e');
            finaleTextGradient.addColorStop(1, '#ec4899');
            ctx.fillStyle = finaleTextGradient;
            ctx.font = 'bold 80px Inter, sans-serif';
            ctx.fillText("Mother's Day", width / 2, height / 2 + 10);

            // "Mom" with heart
            ctx.fillStyle = '#6b7280';
            ctx.font = '400 36px Inter, sans-serif';
            ctx.fillText('to the best Mom ever', width / 2, height / 2 + 80);

            // Heart emoji row
            ctx.font = '32px Inter, sans-serif';
            ctx.fillText('❤️  💕  ❤️', width / 2, height / 2 + 140);

            // Bottom accent
            const bottomAccent = ctx.createLinearGradient(width / 2 - 80, 0, width / 2 + 80, 0);
            bottomAccent.addColorStop(0, 'transparent');
            bottomAccent.addColorStop(0.3, '#f472b6');
            bottomAccent.addColorStop(0.7, '#f472b6');
            bottomAccent.addColorStop(1, 'transparent');
            ctx.fillStyle = bottomAccent;
            ctx.fillRect(width / 2 - 80, height - 60, 160, 3);
            return;
        }

        // 3. Standard Photo Slots
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

        // Lyric Overlay
        if (slot.lyric) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, height - 100, width, 100);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'italic 32px Georgia, serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(slot.lyric, width / 2, height - 50);
        }
    }, [loadedImages, customTitle]);

    const animate = useCallback(() => {
        if (!audioRef.current || !isPlayingRef.current) return;

        const time = audioRef.current.currentTime;
        setCurrentTime(time);
        drawFrame(time);

        if (time < SONG_DURATION) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Song ended
            isPlayingRef.current = false;
            setIsPlaying(false);
        }
    }, [drawFrame]);

    // Cleanup rAF on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
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
            }
        } else {
            audioRef.current.play().catch((e) => {
                console.warn('Audio playback failed:', e);
            });
            isPlayingRef.current = true;
            setIsPlaying(true);
            animationRef.current = requestAnimationFrame(animate);
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
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
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
                    preload="auto"
                    onEnded={handleReset}
                />
            </div>
        </div>
    );
};

export default VideoPreview;
