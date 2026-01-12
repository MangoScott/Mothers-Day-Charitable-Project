import React, { useRef, useState } from 'react';
import useVideoStore from '../store/useVideoStore';
import { cropToCenter } from '../utils/imageUtils';

const LyricSlot = ({ slot, index }) => {
    const { photos, setPhoto, removePhoto } = useVideoStore();
    const fileInputRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const photo = photos[slot.id];
    const hasPhoto = !!photo;

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);
        try {
            const croppedDataUrl = await cropToCenter(file);
            setPhoto(slot.id, croppedDataUrl);
        } catch (error) {
            console.error('Error processing image:', error);
        } finally {
            setIsProcessing(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const getLabel = () => {
        if (slot.type === 'intro') return 'Intro';
        if (slot.type === 'finale') return 'Finale';
        return `Scene ${index}`;
    };

    return (
        <div className="relative w-full aspect-video group">
            {/* Main Card Area */}
            <div
                className={`w-full h-full rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative
          ${hasPhoto
                        ? 'border-gray-900 shadow-md'
                        : 'border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                    }
        `}
                onClick={() => !hasPhoto && fileInputRef.current?.click()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Photo Content */}
                {hasPhoto ? (
                    <>
                        <img src={photo} alt="" className="w-full h-full object-cover" />

                        {/* Hover Actions */}
                        <div
                            className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 transition-opacity duration-200
                ${isHovering ? 'opacity-100' : 'opacity-0'}
              `}
                            onClick={(e) => {
                                // Determine if we clicked a button or just the overlay
                                if (e.target === e.currentTarget) {
                                    // Clicked overlay -> maybe do nothing or trigger replace
                                }
                            }}
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); removePhoto(slot.id); }}
                                className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-red-50"
                            >
                                Remove
                            </button>
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                        {isProcessing ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-sm text-gray-500">Add Photo</span>
                            </>
                        )}
                    </div>
                )}

                {/* Lyric Overlay (Subtitle Style) */}
                <div className="absolute bottom-4 left-0 right-0 px-4 text-center pointer-events-none">
                    <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium leading-relaxed
              ${hasPhoto
                                ? 'bg-black/60 text-white backdrop-blur-sm'
                                : 'bg-gray-200 text-gray-600'
                            }
            `}
                    >
                        {slot.lyric}
                    </span>
                </div>

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 pointer-events-none">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md shadow-sm
            ${hasPhoto ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-500'}
          `}>
                        {getLabel()}
                    </span>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
};

export default LyricSlot;
