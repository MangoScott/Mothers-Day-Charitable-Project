import React, { useEffect, useState, useCallback } from 'react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots } from '../utils/lyricsData';
import { generateVideo, downloadBlob } from '../utils/ffmpegHelper';

const VideoRenderer = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const photos = useVideoStore((state) => state.photos);
    const customTitle = useVideoStore((state) => state.customTitle);
    const [status, setStatus] = useState('preparing');
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 16px',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%)',
        },
        card: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '48px',
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
        },
        iconCircle: {
            width: '96px',
            height: '96px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px',
        },
        subtitle: {
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '24px',
        },
        progressBar: {
            height: '12px',
            background: '#f3f4f6',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '12px',
        },
        progressFill: {
            height: '100%',
            background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
        },
        progressText: {
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '24px',
        },
        note: {
            fontSize: '0.75rem',
            color: '#9ca3af',
        },
        buttonRow: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        secondaryButton: {
            padding: '14px 24px',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            color: '#374151',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        primaryButton: {
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
            transition: 'all 0.2s ease',
        },
        errorBox: {
            background: '#fef2f2',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left',
        },
        errorTitle: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#dc2626',
            marginBottom: '8px',
        },
        errorList: {
            fontSize: '0.875rem',
            color: '#b91c1c',
            margin: 0,
            paddingLeft: '20px',
        },
    };

    const handleProgress = (percent, message) => {
        setProgress(percent);
        setProgressMessage(message || '');
    };

    const renderVideo = useCallback(async () => {
        try {
            setStatus('rendering');
            handleProgress(0, 'Initializing video encoder...');

            const canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            const ctx = canvas.getContext('2d');

            const processedImages = [];

            // Helper to load image
            const loadImage = (src) => new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });

            for (let i = 0; i < lyricSlots.length; i++) {
                const slot = lyricSlots[i];
                handleProgress(5 + Math.round((i / lyricSlots.length) * 20), `Preparing slide ${i + 1}/${lyricSlots.length}...`);

                // Clear canvas
                const gradient = ctx.createLinearGradient(0, 0, 0, 720);
                gradient.addColorStop(0, '#fdf2f8');
                gradient.addColorStop(1, '#fce7f3');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1280, 720);

                // --- Drawing Logic ---

                // 1. Title Slide - Premium Design
                if (slot.id === 1) {
                    // Decorative gradient background overlay
                    const bgGradient = ctx.createRadialGradient(640, 360, 0, 640, 360, 900);
                    bgGradient.addColorStop(0, 'rgba(252, 231, 243, 0.6)');
                    bgGradient.addColorStop(0.5, 'rgba(253, 242, 248, 0.4)');
                    bgGradient.addColorStop(1, 'rgba(255, 241, 242, 0.3)');
                    ctx.fillStyle = bgGradient;
                    ctx.fillRect(0, 0, 1280, 720);

                    // Decorative hearts - scattered around
                    ctx.save();
                    const heartPositions = [
                        { x: 120, y: 150, size: 40, opacity: 0.15, rotation: -15 },
                        { x: 1130, y: 180, size: 35, opacity: 0.12, rotation: 20 },
                        { x: 200, y: 520, size: 30, opacity: 0.1, rotation: -25 },
                        { x: 1080, y: 540, size: 45, opacity: 0.15, rotation: 15 },
                        { x: 290, y: 260, size: 25, opacity: 0.08, rotation: 10 },
                        { x: 1020, y: 410, size: 28, opacity: 0.1, rotation: -10 },
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
                    const accentGradient = ctx.createLinearGradient(490, 0, 790, 0);
                    accentGradient.addColorStop(0, 'transparent');
                    accentGradient.addColorStop(0.2, '#ec4899');
                    accentGradient.addColorStop(0.5, '#f472b6');
                    accentGradient.addColorStop(0.8, '#ec4899');
                    accentGradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = accentGradient;
                    ctx.fillRect(490, 80, 300, 4);

                    ctx.textAlign = 'center';

                    // Small badge text
                    ctx.fillStyle = '#9ca3af';
                    ctx.font = '500 20px Inter, sans-serif';
                    ctx.fillText('✦  A Charitable Project  ✦', 640, 230);

                    // Main Title
                    ctx.fillStyle = '#be185d';
                    ctx.font = 'bold 72px Inter, sans-serif';
                    ctx.fillText("A Mother's Day", 640, 310);

                    // "Story Card" with gradient emphasis
                    const titleGradient = ctx.createLinearGradient(440, 0, 840, 0);
                    titleGradient.addColorStop(0, '#ec4899');
                    titleGradient.addColorStop(0.5, '#f43f5e');
                    titleGradient.addColorStop(1, '#ec4899');
                    ctx.fillStyle = titleGradient;
                    ctx.font = 'bold 88px Inter, sans-serif';
                    ctx.fillText('Story Card', 640, 410);

                    // Subtitle with emphasis on "YOU"
                    ctx.fillStyle = '#6b7280';
                    ctx.font = '400 28px Inter, sans-serif';
                    ctx.fillText('made especially for ', 600, 480);
                    ctx.fillStyle = '#ec4899';
                    ctx.font = 'italic 600 32px Inter, sans-serif';
                    ctx.fillText('YOU', 755, 480);

                    // Bottom decorative line
                    ctx.fillStyle = accentGradient;
                    ctx.fillRect(540, 620, 200, 3);

                    // Copyright & Design - styled footer
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#9ca3af';
                    ctx.font = '14px Inter, sans-serif';
                    ctx.fillText("The Wendy's Song Project  •  © 1986/2026 Kim Coleman Uhlik and Wendy Emerick", 640, 665);
                    ctx.font = '13px Inter, sans-serif';
                    ctx.fillStyle = '#b4b4b4';
                    ctx.fillText('Designed by Scott Glasgow', 640, 688);

                    // 2. Finale Slide - Premium Design
                } else if (slot.isGenerated) {
                    // Warm gradient background
                    const finaleGradient = ctx.createRadialGradient(640, 360, 0, 640, 360, 750);
                    finaleGradient.addColorStop(0, 'rgba(254, 205, 211, 0.5)');
                    finaleGradient.addColorStop(0.5, 'rgba(252, 231, 243, 0.4)');
                    finaleGradient.addColorStop(1, 'rgba(253, 242, 248, 0.2)');
                    ctx.fillStyle = finaleGradient;
                    ctx.fillRect(0, 0, 1280, 720);

                    // Large decorative heart in center background
                    ctx.save();
                    ctx.translate(640, 330);
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
                        { x: 1080, y: 220, size: 30, opacity: 0.18 },
                        { x: 250, y: 540, size: 22, opacity: 0.15 },
                        { x: 1030, y: 520, size: 28, opacity: 0.2 },
                        { x: 120, y: 360, size: 18, opacity: 0.12 },
                        { x: 1150, y: 410, size: 20, opacity: 0.15 },
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
                    ctx.fillText('Happy', 640, 280);

                    // "Mother's Day" - main emphasis
                    const finaleTextGradient = ctx.createLinearGradient(390, 0, 890, 0);
                    finaleTextGradient.addColorStop(0, '#ec4899');
                    finaleTextGradient.addColorStop(0.5, '#f43f5e');
                    finaleTextGradient.addColorStop(1, '#ec4899');
                    ctx.fillStyle = finaleTextGradient;
                    ctx.font = 'bold 80px Inter, sans-serif';
                    ctx.fillText("Mother's Day", 640, 370);

                    // "Mom" with heart
                    ctx.fillStyle = '#6b7280';
                    ctx.font = '400 36px Inter, sans-serif';
                    ctx.fillText('to the best Mom ever', 640, 440);

                    // Heart emoji row
                    ctx.font = '32px Inter, sans-serif';
                    ctx.fillText('❤️  💕  ❤️', 640, 500);

                    // Bottom accent
                    const bottomAccent = ctx.createLinearGradient(560, 0, 720, 0);
                    bottomAccent.addColorStop(0, 'transparent');
                    bottomAccent.addColorStop(0.3, '#f472b6');
                    bottomAccent.addColorStop(0.7, '#f472b6');
                    bottomAccent.addColorStop(1, 'transparent');
                    ctx.fillStyle = bottomAccent;
                    ctx.fillRect(560, 660, 160, 3);

                    // 3. Standard Photo Slots
                } else {
                    const photoUrl = photos[slot.id];
                    if (photoUrl) {
                        try {
                            const img = await loadImage(photoUrl);

                            // Draw image covering canvas (aspect fill)
                            const imgAspect = img.width / img.height;
                            const canvasAspect = 1280 / 720;
                            let drawWidth, drawHeight, drawX, drawY;

                            if (imgAspect > canvasAspect) {
                                drawHeight = 720;
                                drawWidth = 720 * imgAspect;
                                drawX = (1280 - drawWidth) / 2;
                                drawY = 0;
                            } else {
                                drawWidth = 1280;
                                drawHeight = 1280 / imgAspect;
                                drawX = 0;
                                drawY = (720 - drawHeight) / 2;
                            }
                            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                        } catch (e) {
                            console.warn(`Failed to load image for slot ${slot.id}`, e);
                        }
                    } else {
                        // Placeholder if missing
                        ctx.fillStyle = '#d1d5db';
                        ctx.textAlign = 'center';
                        ctx.font = 'bold 24px Inter, sans-serif';
                        ctx.fillText('No photo', 640, 360);
                    }

                    // Lyric Overlay
                    if (slot.lyric) {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                        ctx.fillRect(0, 620, 1280, 100);

                        ctx.fillStyle = '#FFFFFF';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.font = 'italic 32px Georgia, serif';
                        ctx.fillText(slot.lyric, 640, 670);
                    }
                }

                processedImages.push({
                    dataUrl: canvas.toDataURL('image/jpeg', 0.9),
                    duration: slot.displayDuration
                });
            }

            const audioPath = import.meta.env.BASE_URL + 'audio/wendys_song.mp3';
            const videoBlob = await generateVideo(processedImages, audioPath, handleProgress);

            downloadBlob(videoBlob, 'MothersDayTribute.mp4');

            setStatus('complete');
            handleProgress(100, 'Video ready!');
        } catch (err) {
            console.error('Video generation failed:', err);
            setError(err.message || 'Failed to generate video');
            setStatus('error');
        }
    }, [photos, customTitle]);

    useEffect(() => {
        const timer = setTimeout(() => {
            renderVideo();
        }, 500);
        return () => clearTimeout(timer);
    }, [renderVideo]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {status === 'preparing' && (
                    <>
                        <div style={{ ...styles.iconCircle, background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' }}>
                            <svg style={{ width: 40, height: 40, color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 style={styles.title}>Getting Ready</h2>
                        <p style={styles.subtitle}>Preparing your photos...</p>
                    </>
                )}

                {status === 'rendering' && (
                    <>
                        <div style={{ ...styles.iconCircle, background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', position: 'relative' }}>
                            <svg style={{ width: 40, height: 40, color: '#ec4899', animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                        <h2 style={styles.title}>Creating Your Video</h2>
                        <p style={styles.subtitle}>This may take a few minutes...</p>

                        <div style={styles.progressBar}>
                            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                        </div>
                        <p style={styles.progressText}>{progressMessage || `${progress}% complete`}</p>

                        <p style={styles.note}>
                            Please keep this tab open. Your video is being created entirely in your browser.
                        </p>
                    </>
                )}

                {status === 'complete' && (
                    <>
                        <div style={{ ...styles.iconCircle, background: 'linear-gradient(135deg, #34d399, #10b981)' }}>
                            <svg style={{ width: 48, height: 48, color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 style={styles.title}>Your Video is Ready! 🎉</h2>
                        <p style={styles.subtitle}>
                            Your Mother's Day tribute video has been downloaded.
                        </p>

                        <div style={styles.buttonRow}>
                            <button
                                onClick={() => setScreen('storyboard')}
                                style={styles.secondaryButton}
                            >
                                Edit Photos
                            </button>
                            <button
                                onClick={() => setScreen('landing')}
                                style={styles.primaryButton}
                            >
                                Create Another
                            </button>
                        </div>

                        <p style={{ ...styles.note, marginTop: '24px' }}>
                            Don't forget to share your video with Mom! 💕
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div style={{ ...styles.iconCircle, background: 'linear-gradient(135deg, #f87171, #ef4444)' }}>
                            <svg style={{ width: 48, height: 48, color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 style={styles.title}>Oops! Something went wrong</h2>
                        <p style={styles.subtitle}>{error}</p>

                        <div style={styles.errorBox}>
                            <p style={styles.errorTitle}>Tips to fix this:</p>
                            <ul style={styles.errorList}>
                                <li>Make sure you have a stable internet connection</li>
                                <li>Try using Chrome or Edge browser</li>
                                <li>Close other tabs to free up memory</li>
                            </ul>
                        </div>

                        <div style={styles.buttonRow}>
                            <button
                                onClick={() => setScreen('storyboard')}
                                style={styles.secondaryButton}
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => {
                                    setError(null);
                                    setStatus('preparing');
                                    renderVideo();
                                }}
                                style={styles.primaryButton}
                            >
                                Try Again
                            </button>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default VideoRenderer;
