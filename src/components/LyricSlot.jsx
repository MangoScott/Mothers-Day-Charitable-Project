import React, { useRef, useState } from 'react';
import useVideoStore from '../store/useVideoStore';
import { cropToCenter } from '../utils/imageUtils';

const LyricSlot = ({ slot, index }) => {
    const { photos, setPhoto, removePhoto } = useVideoStore();
    const fileInputRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

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
        if (slot.type === 'intro') return '✨';
        if (slot.type === 'finale') return '💕';
        return index;
    };

    const isSpecial = slot.type === 'intro' || slot.type === 'finale';

    return (
        <div
            className={`
        rounded-xl border transition-all cursor-pointer group
        ${hasPhoto
                    ? 'bg-gradient-to-br from-[#fef7f7] to-white border-[#E87B7B]'
                    : 'bg-white border-[#eee] hover:border-[#ccc]'
                }
      `}
            onClick={() => !hasPhoto && fileInputRef.current?.click()}
        >
            <div className="flex items-center gap-4 p-4">
                {/* Badge */}
                <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0
          ${isSpecial
                        ? 'bg-[#E87B7B] text-white'
                        : hasPhoto
                            ? 'bg-[#1a1a1a] text-white'
                            : 'bg-[#f5f5f5] text-[#1a1a1a]'
                    }
        `}>
                    {getLabel()}
                </div>

                {/* Lyric */}
                <p className={`flex-1 font-medium ${hasPhoto ? 'text-[#1a1a1a]' : 'text-[#666]'}`}>
                    {slot.lyric}
                </p>

                {/* Photo or Upload indicator */}
                {hasPhoto ? (
                    <div className="relative flex-shrink-0">
                        <img
                            src={photo}
                            alt=""
                            className="w-16 h-11 object-cover rounded-lg shadow-sm"
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); removePhoto(slot.id); }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-[#1a1a1a] text-white rounded-full text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className="flex-shrink-0 flex items-center gap-2 text-sm text-[#999] group-hover:text-[#666] transition-colors">
                        {isProcessing ? (
                            <span className="animate-pulse">Adding...</span>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="hidden sm:inline">Add photo</span>
                            </>
                        )}
                    </div>
                )}
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
