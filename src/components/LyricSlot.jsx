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
        flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
        ${hasPhoto
                    ? 'bg-pink-50 border-pink-300'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }
      `}
            onClick={() => !hasPhoto && fileInputRef.current?.click()}
        >
            {/* Badge */}
            <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
        ${isSpecial ? 'bg-pink-500 text-white' : hasPhoto ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}
      `}>
                {getLabel()}
            </div>

            {/* Lyric */}
            <p className={`flex-1 font-medium text-sm sm:text-base ${hasPhoto ? 'text-gray-900' : 'text-gray-600'}`}>
                {slot.lyric}
            </p>

            {/* Photo or Add button */}
            {hasPhoto ? (
                <div className="relative group flex-shrink-0">
                    <img src={photo} alt="" className="w-16 h-11 object-cover rounded-lg shadow-sm" />
                    <button
                        onClick={(e) => { e.stopPropagation(); removePhoto(slot.id); }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <div className="flex-shrink-0 text-sm text-gray-400">
                    {isProcessing ? '...' : (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">Add</span>
                        </span>
                    )}
                </div>
            )}

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
