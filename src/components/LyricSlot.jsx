import { ImagePlus, X, Edit3, Sparkles, Heart } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';

const TYPE_LABELS = {
    intro: 'Title card',
    narrative: 'Spoken intro',
    verse: 'Verse',
    outro: 'Closing card',
};

export default function LyricSlot({ slot, index }) {
    const setPhoto = useVideoStore((state) => state.setPhoto);
    const removePhoto = useVideoStore((state) => state.removePhoto);
    const getPhotoForSlot = useVideoStore((state) => state.getPhotoForSlot);
    const customTitle = useVideoStore((state) => state.customTitle);
    const setCustomTitle = useVideoStore((state) => state.setCustomTitle);

    const imageUrl = getPhotoForSlot(slot.id);
    const isEditable = slot.editable === true;
    const isAutoSlide = slot.type === 'intro' || slot.type === 'narrative' || slot.isGenerated;
    const typeLabel = TYPE_LABELS[slot.type] ?? slot.type;

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setPhoto(slot.id, event.target?.result);
        reader.readAsDataURL(file);
    };

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-card transition-spring hover:-translate-y-1 hover:border-brand-100 hover:shadow-card-hover">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
                <div className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink-900 text-[11px] font-bold text-white tabular">
                        {index + 1}
                    </span>
                    <p className="text-[13px] font-semibold text-ink-800">
                        Scene {index + 1}
                    </p>
                </div>
                <span
                    className={[
                        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
                        slot.type === 'verse'
                            ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'
                            : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
                    ].join(' ')}
                >
                    {typeLabel}
                </span>
            </div>

            {/* Photo area */}
            <div className="relative aspect-video bg-ink-50">
                {isAutoSlide ? (
                    <div className="grid h-full place-items-center bg-gradient-to-br from-brand-50 via-rose-50 to-amber-50 text-center">
                        <div>
                            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-brand-100">
                                {slot.isGenerated ? (
                                    <Heart className="h-5 w-5 text-brand-500" fill="currentColor" />
                                ) : (
                                    <Sparkles className="h-5 w-5 text-brand-500" />
                                )}
                            </div>
                            <p className="mt-3 text-sm font-semibold text-brand-700">
                                {slot.isGenerated ? 'Closing card' : slot.type === 'intro' ? 'Title card' : 'Narrative card'}
                            </p>
                            <p className="mt-0.5 text-[12px] text-ink-500">
                                Auto-generated text slide
                            </p>
                        </div>
                    </div>
                ) : imageUrl ? (
                    <>
                        <img
                            src={imageUrl}
                            alt={`Scene ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                        <button
                            onClick={() => removePhoto(slot.id)}
                            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink-600 shadow-md backdrop-blur hover:bg-white hover:text-rose-600"
                            aria-label="Remove photo"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <label className="group/upload absolute inset-0 grid cursor-pointer place-items-center bg-ink-50 text-ink-500 hover:bg-brand-50/60 hover:text-brand-600">
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        <div className="text-center">
                            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-ink-200 transition-spring group-hover/upload:ring-brand-200 group-hover/upload:shadow-glow-soft">
                                <ImagePlus className="h-6 w-6" />
                            </div>
                            <p className="mt-3 text-sm font-semibold text-ink-700 group-hover/upload:text-brand-700">
                                Add photo
                            </p>
                            <p className="text-[12px] text-ink-400">PNG, JPG up to 10MB</p>
                        </div>
                    </label>
                )}
            </div>

            {/* Lyric / editable title */}
            <div className="px-5 py-4">
                {isEditable ? (
                    <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                            Title
                        </label>
                        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2 transition-spring focus-within:border-brand-300 focus-within:shadow-glow-soft">
                            <Edit3 className="h-4 w-4 shrink-0 text-brand-500" />
                            <input
                                type="text"
                                value={customTitle}
                                onChange={(e) => setCustomTitle(e.target.value)}
                                placeholder="Enter your title…"
                                className="w-full bg-transparent text-sm font-semibold text-ink-900 outline-none placeholder:text-ink-300"
                            />
                        </div>
                        <p className="mt-2 text-[12px] text-ink-500">
                            Appears as the opening text in your video
                        </p>
                    </div>
                ) : (
                    <p className="whitespace-pre-line font-display text-[15px] italic leading-relaxed text-ink-700">
                        “{slot.lyric}”
                    </p>
                )}
            </div>
        </article>
    );
}
