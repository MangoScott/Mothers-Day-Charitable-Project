import { useRef } from 'react';
import { ArrowLeft, Eye, Upload, Download, ImagePlus, CheckCircle2 } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';
import LyricSlot from './LyricSlot';
import { lyricSlots } from '../utils/lyricsData';

export default function StoryBoard() {
    const getUploadedCount = useVideoStore((state) => state.getUploadedCount);
    const hasAllPhotosFunc = useVideoStore((state) => state.hasAllPhotos);
    const getRequiredPhotoCount = useVideoStore((state) => state.getRequiredPhotoCount);
    const setBulkPhotos = useVideoStore((state) => state.setBulkPhotos);

    const progress = getUploadedCount();
    const requiredPhotos = getRequiredPhotoCount();
    const hasAllPhotos = hasAllPhotosFunc();
    const slots = lyricSlots;
    const percent = Math.round((progress / requiredPhotos) * 100);

    const bulkInputRef = useRef(null);

    const goTo = (screen) => useVideoStore.setState({ currentScreen: screen });

    const handleBulkUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        files.sort((a, b) => a.name.localeCompare(b.name));

        const photoPromises = files.map((file) => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        }));

        Promise.all(photoPromises).then((photoDataArray) => {
            const validPhotos = photoDataArray.filter(Boolean);
            if (validPhotos.length > 0) setBulkPhotos(validPhotos);
        });

        event.target.value = '';
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FFF8FA] via-white to-white pb-32 text-ink-900">
            {/* Soft aurora background */}
            <div className="aurora opacity-60" aria-hidden />

            {/* ============= Sticky header ============= */}
            <header className="sticky top-0 z-30 border-b border-ink-100/80 bg-white/75 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => goTo('landing')}
                                className="inline-flex h-10 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 hover:border-ink-300 hover:bg-ink-50"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                            <div>
                                <h1 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                                    Your storyboard
                                </h1>
                                <p className="text-[13px] text-ink-500">
                                    Add a photo for each lyric — drag-and-drop or click to upload
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {hasAllPhotos && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                                    <CheckCircle2 className="h-3.5 w-3.5" /> All set
                                </span>
                            )}
                            <div className="text-right">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                                    Progress
                                </p>
                                <p className="font-extrabold tabular text-2xl">
                                    <span className="text-brand-gradient">{progress}</span>
                                    <span className="text-ink-300"> / {requiredPhotos}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                        <div
                            className="relative h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 transition-all duration-500 ease-spring"
                            style={{ width: `${percent}%` }}
                        >
                            <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] animate-[shimmer-keyframes_2.6s_linear_infinite]" />
                        </div>
                    </div>
                </div>
            </header>

            {/* ============= Main ============= */}
            <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
                {/* Bulk upload hero */}
                <div className="mb-10 overflow-hidden rounded-3xl border border-ink-200/70 bg-white/80 p-6 shadow-card backdrop-blur sm:p-8">
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-rose-100 ring-1 ring-inset ring-brand-100">
                                <ImagePlus className="h-6 w-6 text-brand-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-ink-900">
                                    Upload all photos at once
                                </h2>
                                <p className="mt-1 text-sm text-ink-600">
                                    Pick up to {requiredPhotos} photos in order — we'll place them in the right scenes.
                                </p>
                            </div>
                        </div>

                        <input
                            ref={bulkInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleBulkUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => bulkInputRef.current?.click()}
                            className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink-900 px-6 text-sm font-semibold text-white transition-spring hover:-translate-y-0.5 hover:bg-ink-800"
                        >
                            <Upload className="h-4 w-4" />
                            Choose photos
                            <span className="ml-1 hidden text-ink-300 group-hover:text-white sm:inline">→</span>
                        </button>
                    </div>
                </div>

                {/* Slot grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {slots.map((slot, index) => (
                        <LyricSlot key={slot.id} slot={slot} index={index} />
                    ))}
                </div>
            </main>

            {/* ============= Sticky action bar ============= */}
            <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-ink-100/80 bg-white/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
                    <div className="hidden items-center gap-3 text-sm text-ink-500 sm:flex">
                        <div className="flex h-9 items-center gap-2 rounded-full border border-ink-200 bg-white px-3 text-[13px] font-semibold text-ink-700">
                            <span className="tabular">{progress}</span>
                            <span className="text-ink-300">/</span>
                            <span className="tabular text-ink-500">{requiredPhotos}</span>
                            photos added
                        </div>
                        {!hasAllPhotos && (
                            <span className="text-[13px]">
                                Add {requiredPhotos - progress} more to generate your video
                            </span>
                        )}
                    </div>

                    <div className="ml-auto flex w-full items-center gap-3 sm:w-auto">
                        <button
                            onClick={() => goTo('preview')}
                            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-800 hover:border-ink-300 hover:bg-ink-50 sm:flex-none"
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </button>
                        <button
                            onClick={() => hasAllPhotos && goTo('rendering')}
                            disabled={!hasAllPhotos}
                            className={[
                                'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-spring sm:flex-none',
                                hasAllPhotos
                                    ? 'bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 text-white shadow-glow-soft hover:-translate-y-0.5 hover:shadow-glow-brand'
                                    : 'cursor-not-allowed bg-ink-100 text-ink-400',
                            ].join(' ')}
                        >
                            <Download className="h-4 w-4" />
                            Generate video
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
