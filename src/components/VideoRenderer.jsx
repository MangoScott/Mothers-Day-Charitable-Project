import React, { useEffect, useState, useCallback } from 'react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots } from '../utils/lyricsData';
import { generateVideo, downloadBlob } from '../utils/ffmpegHelper';

const VideoRenderer = () => {
    const setScreen = useVideoStore((state) => state.setScreen);
    const photos = useVideoStore((state) => state.photos);
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

            const images = lyricSlots.map((slot) => ({
                dataUrl: photos[slot.id],
                lyric: slot.lyric,
                duration: slot.displayDuration,
            }));

            const audioPath = import.meta.env.BASE_URL + 'audio/wendys_song.mp3';
            const videoBlob = await generateVideo(images, audioPath, handleProgress);

            downloadBlob(videoBlob, 'MothersDayTribute.mp4');

            setStatus('complete');
            handleProgress(100, 'Video ready!');
        } catch (err) {
            console.error('Video generation failed:', err);
            setError(err.message || 'Failed to generate video');
            setStatus('error');
        }
    }, [photos]);

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
