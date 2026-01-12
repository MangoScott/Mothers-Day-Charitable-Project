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
        <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${hasPhoto ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-100'}`}>
            {/* Number badge */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8A87C] to-[#C38D94] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {getLabel()}
            </div>

            {/* Lyric text */}
            <p className="flex-1 text-[#2D2A26] text-sm font-serif leading-snug line-clamp-2">
                {slot.lyric}
            </p>

            {/* Photo area - compact */}
            {hasPhoto ? (
                <div className="relative group flex-shrink-0">
                    <img
                        src={photo}
                        alt=""
                        className="w-14 h-10 object-cover rounded-lg"
                    />
                    <button
                        onClick={() => removePhoto(slot.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-[#E8A87C] border border-[#E8A87C] rounded-lg hover:bg-[#E8A87C] hover:text-white transition-all disabled:opacity-50"
                >
                    {isProcessing ? '...' : '+ Add'}
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
