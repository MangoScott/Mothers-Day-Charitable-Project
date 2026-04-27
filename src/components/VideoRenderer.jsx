import React, { useEffect, useState, useCallback } from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Film, Download, Edit3, Sparkles } from 'lucide-react';
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

    const handleProgress = (percent, message) => {
        setProgress(percent);
        setProgressMessage(message || '');
    };

    const renderVideo = useCallback(async () => {
        try {
            setStatus('rendering');
            handleProgress(0, 'Initializing video encoder…');

            const canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            const ctx = canvas.getContext('2d');

            const processedImages = [];

            const loadImage = (src) => new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });

            for (let i = 0; i < lyricSlots.length; i++) {
                const slot = lyricSlots[i];
                handleProgress(5 + Math.round((i / lyricSlots.length) * 20), `Preparing slide ${i + 1}/${lyricSlots.length}…`);

                const gradient = ctx.createLinearGradient(0, 0, 0, 720);
                gradient.addColorStop(0, '#fdf2f8');
                gradient.addColorStop(1, '#fce7f3');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1280, 720);

                if (slot.id === 1) {
                    const bgGradient = ctx.createRadialGradient(640, 360, 0, 640, 360, 900);
                    bgGradient.addColorStop(0, 'rgba(252, 231, 243, 0.6)');
                    bgGradient.addColorStop(0.5, 'rgba(253, 242, 248, 0.4)');
                    bgGradient.addColorStop(1, 'rgba(255, 241, 242, 0.3)');
                    ctx.fillStyle = bgGradient;
                    ctx.fillRect(0, 0, 1280, 720);

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

                    const accentGradient = ctx.createLinearGradient(490, 0, 790, 0);
                    accentGradient.addColorStop(0, 'transparent');
                    accentGradient.addColorStop(0.2, '#ec4899');
                    accentGradient.addColorStop(0.5, '#f472b6');
                    accentGradient.addColorStop(0.8, '#ec4899');
                    accentGradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = accentGradient;
                    ctx.fillRect(490, 80, 300, 4);

                    ctx.textAlign = 'center';

                    ctx.fillStyle = '#9ca3af';
                    ctx.font = '500 20px Inter, sans-serif';
                    ctx.fillText('✦  A Charitable Project  ✦', 640, 230);

                    ctx.fillStyle = '#be185d';
                    ctx.font = 'bold 72px Inter, sans-serif';
                    ctx.fillText("A Mother's Day", 640, 310);

                    const titleGradient = ctx.createLinearGradient(440, 0, 840, 0);
                    titleGradient.addColorStop(0, '#ec4899');
                    titleGradient.addColorStop(0.5, '#f43f5e');
                    titleGradient.addColorStop(1, '#ec4899');
                    ctx.fillStyle = titleGradient;
                    ctx.font = 'bold 88px Inter, sans-serif';
                    ctx.fillText('Story Card', 640, 410);

                    ctx.fillStyle = '#6b7280';
                    ctx.font = '400 28px Inter, sans-serif';
                    ctx.fillText('made especially for ', 600, 480);
                    ctx.fillStyle = '#ec4899';
                    ctx.font = 'italic 600 32px Inter, sans-serif';
                    ctx.fillText('YOU', 755, 480);

                    ctx.fillStyle = accentGradient;
                    ctx.fillRect(540, 620, 200, 3);

                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#9ca3af';
                    ctx.font = '14px Inter, sans-serif';
                    ctx.fillText("The Wendy's Song Project  •  © 1986/2026 Kim Coleman Uhlik and Wendy Emerick", 640, 665);
                    ctx.font = '13px Inter, sans-serif';
                    ctx.fillStyle = '#b4b4b4';
                    ctx.fillText('Designed by Scott Glasgow', 640, 688);

                } else if (slot.isGenerated) {
                    const finaleGradient = ctx.createRadialGradient(640, 360, 0, 640, 360, 750);
                    finaleGradient.addColorStop(0, 'rgba(254, 205, 211, 0.5)');
                    finaleGradient.addColorStop(0.5, 'rgba(252, 231, 243, 0.4)');
                    finaleGradient.addColorStop(1, 'rgba(253, 242, 248, 0.2)');
                    ctx.fillStyle = finaleGradient;
                    ctx.fillRect(0, 0, 1280, 720);

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

                    ctx.fillStyle = '#be185d';
                    ctx.font = '500 48px Inter, sans-serif';
                    ctx.fillText('Happy', 640, 280);

                    const finaleTextGradient = ctx.createLinearGradient(390, 0, 890, 0);
                    finaleTextGradient.addColorStop(0, '#ec4899');
                    finaleTextGradient.addColorStop(0.5, '#f43f5e');
                    finaleTextGradient.addColorStop(1, '#ec4899');
                    ctx.fillStyle = finaleTextGradient;
                    ctx.font = 'bold 80px Inter, sans-serif';
                    ctx.fillText("Mother's Day", 640, 370);

                    ctx.fillStyle = '#6b7280';
                    ctx.font = '400 36px Inter, sans-serif';
                    ctx.fillText('to the best Mom ever', 640, 440);

                    ctx.font = '32px Inter, sans-serif';
                    ctx.fillText('❤️  💕  ❤️', 640, 500);

                    const bottomAccent = ctx.createLinearGradient(560, 0, 720, 0);
                    bottomAccent.addColorStop(0, 'transparent');
                    bottomAccent.addColorStop(0.3, '#f472b6');
                    bottomAccent.addColorStop(0.7, '#f472b6');
                    bottomAccent.addColorStop(1, 'transparent');
                    ctx.fillStyle = bottomAccent;
                    ctx.fillRect(560, 660, 160, 3);

                } else {
                    const photoUrl = photos[slot.id];
                    if (photoUrl) {
                        try {
                            const img = await loadImage(photoUrl);

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
                        ctx.fillStyle = '#d1d5db';
                        ctx.textAlign = 'center';
                        ctx.font = 'bold 24px Inter, sans-serif';
                        ctx.fillText('No photo', 640, 360);
                    }

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
        const timer = setTimeout(() => renderVideo(), 500);
        return () => clearTimeout(timer);
    }, [renderVideo]);

    return (
        <div className="relative grid min-h-screen place-items-center bg-gradient-to-b from-[#FFF8FA] via-white to-[#FFF1F2] px-5 py-16 text-ink-900">
            <div className="aurora opacity-50" aria-hidden />

            <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-10 text-center shadow-card backdrop-blur-xl animate-scale-in sm:p-12">

                {status === 'preparing' && (
                    <>
                        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-brand-50 to-rose-100 ring-1 ring-inset ring-brand-100">
                            <Film className="h-9 w-9 text-brand-600" />
                        </div>
                        <h2 className="mt-6 text-2xl font-extrabold tracking-display text-ink-900">
                            Getting ready
                        </h2>
                        <p className="mt-1.5 text-[15px] text-ink-500">Preparing your photos…</p>
                    </>
                )}

                {status === 'rendering' && (
                    <>
                        <div className="relative mx-auto h-20 w-20">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-50 to-rose-100" />
                            <div className="absolute inset-0 grid place-items-center">
                                <Loader2 className="h-9 w-9 animate-spin text-brand-600" />
                            </div>
                        </div>

                        <h2 className="mt-6 text-2xl font-extrabold tracking-display text-ink-900">
                            Creating your video
                        </h2>
                        <p className="mt-1.5 text-[15px] text-ink-500">
                            This usually takes a minute or two…
                        </p>

                        {/* Progress */}
                        <div className="mt-7">
                            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
                                <div
                                    className="relative h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 transition-all duration-500 ease-spring"
                                    style={{ width: `${progress}%` }}
                                >
                                    <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] animate-[shimmer-keyframes_2.6s_linear_infinite]" />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-[13px] tabular text-ink-500">
                                <span className="truncate pr-3">{progressMessage}</span>
                                <span className="font-semibold text-ink-700">{progress}%</span>
                            </div>
                        </div>

                        <p className="mt-7 text-[12px] text-ink-400">
                            Keep this tab open — your video is being created entirely in your browser.
                        </p>
                    </>
                )}

                {status === 'complete' && (
                    <>
                        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_18px_40px_-10px_rgba(16,185,129,0.5)]">
                            <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
                        </div>

                        <h2 className="mt-6 text-2xl font-extrabold tracking-display text-ink-900 sm:text-3xl">
                            Your video is ready
                            <span className="ml-1 inline-block animate-float">🎉</span>
                        </h2>
                        <p className="mt-2 text-[15px] text-ink-600">
                            Your Mother's Day tribute has been downloaded to your device.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => setScreen('storyboard')}
                                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-800 hover:border-ink-300 hover:bg-ink-50"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit photos
                            </button>
                            <button
                                onClick={() => setScreen('landing')}
                                className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 px-6 text-sm font-semibold text-white shadow-glow-soft hover:-translate-y-0.5 hover:shadow-glow-brand"
                            >
                                <Sparkles className="h-4 w-4" />
                                Create another
                            </button>
                        </div>

                        <p className="mt-6 text-[13px] text-ink-500">
                            Don't forget to share it with Mom 💕
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_18px_40px_-10px_rgba(244,63,94,0.5)]">
                            <AlertTriangle className="h-9 w-9 text-white" />
                        </div>

                        <h2 className="mt-6 text-2xl font-extrabold tracking-display text-ink-900">
                            Something went wrong
                        </h2>
                        <p className="mt-2 text-[15px] text-ink-600">{error}</p>

                        <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/60 p-5 text-left">
                            <p className="text-[12px] font-semibold uppercase tracking-wider text-rose-700">
                                Tips to try
                            </p>
                            <ul className="mt-2 space-y-1.5 text-[13px] text-rose-800/90">
                                <li>• Make sure you have a stable internet connection</li>
                                <li>• Try Chrome, Edge, or another modern browser</li>
                                <li>• Close other tabs to free up memory</li>
                            </ul>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => setScreen('storyboard')}
                                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-800 hover:border-ink-300 hover:bg-ink-50"
                            >
                                Go back
                            </button>
                            <button
                                onClick={() => {
                                    setError(null);
                                    setStatus('preparing');
                                    renderVideo();
                                }}
                                className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 px-6 text-sm font-semibold text-white shadow-glow-soft hover:-translate-y-0.5 hover:shadow-glow-brand"
                            >
                                <Download className="h-4 w-4" />
                                Try again
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoRenderer;
