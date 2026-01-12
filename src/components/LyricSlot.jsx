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

    return (
        <div className={`slot ${hasPhoto ? 'completed' : ''} flex items-center gap-4`}>
            {/* Badge */}
            <div className="badge flex-shrink-0">
                {getLabel()}
            </div>

            {/* Lyric */}
            <p className="flex-1 font-display text-lg text-[#3D3D3D]">
                {slot.lyric}
            </p>

            {/* Photo or Upload */}
            {hasPhoto ? (
                <div className="relative group flex-shrink-0">
                    <img src={photo} alt="" className="thumbnail" />
                    <button
                        onClick={() => removePhoto(slot.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-[#F0E8E5] rounded-full text-[#9A9A9A] text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="upload-btn flex-shrink-0"
                >
                    {isProcessing ? (
                        <span>Adding...</span>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Photo
                        </>
                    )}
                </button>
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
