import React, { useEffect, useState, useCallback } from 'react';
import useVideoStore from '../store/useVideoStore';
import { lyricSlots } from '../utils/lyricsData';
import { generateVideo, downloadBlob } from '../utils/ffmpegHelper';
import ProgressBar from './ProgressBar';

const VideoRenderer = () => {
    const { setScreen, photos, progress, progressMessage, setProgress } = useVideoStore();
    const [status, setStatus] = useState('preparing'); // preparing, rendering, complete, error
    const [error, setError] = useState(null);

    const renderVideo = useCallback(async () => {
        try {
            setStatus('rendering');
            setProgress(0, 'Initializing video encoder...');

            // Prepare images array with data URLs
            const images = lyricSlots.map((slot) => ({
                dataUrl: photos[slot.id],
                lyric: slot.lyric,
                duration: slot.displayDuration,
            }));

            // Generate video
            const videoBlob = await generateVideo(
                images,
                '/audio/wendys_song.mp3',
                (percent, message) => {
                    setProgress(percent, message);
                }
            );

            // Download the video
            downloadBlob(videoBlob, 'MothersDayTribute.mp4');

            setStatus('complete');
            setProgress(100, 'Video ready!');
        } catch (err) {
            console.error('Video generation failed:', err);
            setError(err.message || 'Failed to generate video');
            setStatus('error');
        }
    }, [photos, setProgress]);

    useEffect(() => {
        // Start rendering when component mounts
        const timer = setTimeout(() => {
            renderVideo();
        }, 500); // Small delay to let UI render first

        return () => clearTimeout(timer);
    }, [renderVideo]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="glass-card rounded-3xl p-8 md:p-12 max-w-lg w-full text-center animate-fade-in">
                {status === 'preparing' && (
                    <>
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-200 to-highlight flex items-center justify-center animate-pulse">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-serif text-warm mb-2">Getting Ready</h2>
                        <p className="text-warm/70">Preparing your photos...</p>
                    </>
                )}

                {status === 'rendering' && (
                    <>
                        {/* Animated video icon */}
                        <div className="w-24 h-24 mx-auto mb-6 relative">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-200 to-highlight animate-pulse" />
                            <div className="absolute inset-2 rounded-xl bg-white/80 flex items-center justify-center">
                                <svg className="w-10 h-10 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-serif text-warm mb-2">Creating Your Video</h2>
                        <p className="text-warm/70 mb-6">This may take a few minutes...</p>

                        <div className="mb-6">
                            <ProgressBar progress={progress} message={progressMessage} />
                        </div>

                        <p className="text-xs text-warm/50">
                            Please keep this tab open. Your video is being created entirely in your browser.
                        </p>
                    </>
                )}

                {status === 'complete' && (
                    <>
                        {/* Success checkmark */}
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center animate-bounce">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-serif text-warm mb-2">Your Video is Ready! 🎉</h2>
                        <p className="text-warm/70 mb-6">
                            Your Mother's Day tribute video has been downloaded.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => setScreen('storyboard')}
                                className="btn-secondary"
                            >
                                Edit Photos
                            </button>
                            <button
                                onClick={() => setScreen('landing')}
                                className="btn-primary"
                            >
                                Create Another
                            </button>
                        </div>

                        <p className="text-sm text-warm/60 mt-6">
                            Don't forget to share your video with Mom! 💕
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        {/* Error icon */}
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-serif text-warm mb-2">Oops! Something went wrong</h2>
                        <p className="text-warm/70 mb-4">{error}</p>

                        <div className="bg-red-50 rounded-lg p-3 mb-6 text-sm text-red-700">
                            <p>Tips to fix this:</p>
                            <ul className="mt-2 text-left list-disc list-inside">
                                <li>Make sure you have a stable internet connection</li>
                                <li>Try using a different browser (Chrome recommended)</li>
                                <li>Close other tabs to free up memory</li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => setScreen('storyboard')}
                                className="btn-secondary"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => {
                                    setError(null);
                                    setStatus('preparing');
                                    renderVideo();
                                }}
                                className="btn-primary"
                            >
                                Try Again
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoRenderer;
