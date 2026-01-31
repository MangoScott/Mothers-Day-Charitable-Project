import { create } from 'zustand';
import { lyricSlots } from '../utils/lyricsData';

// Initialize photos map with null values for each slot
const initialPhotos = {};
lyricSlots.forEach((slot) => {
    initialPhotos[slot.id] = null;
});

const useVideoStore = create((set, get) => ({
    // Current screen: 'landing' | 'storyboard' | 'preview' | 'rendering'
    currentScreen: 'landing',

    // Photos mapped by slot ID
    photos: initialPhotos,

    // Custom title for the title card (slot 1)
    customTitle: 'A Mother’s Day Story Card',

    // Rendering state
    isGenerating: false,
    progress: 0,
    progressMessage: '',

    // Preview state
    isPlaying: false,
    currentTime: 0,

    // Actions
    setScreen: (screen) => set({ currentScreen: screen }),

    setCustomTitle: (title) => set({ customTitle: title }),

    setPhoto: (slotId, photoData) => set((state) => ({
        photos: { ...state.photos, [slotId]: photoData }
    })),

    removePhoto: (slotId) => set((state) => ({
        photos: { ...state.photos, [slotId]: null }
    })),

    // Bulk upload: assign photos to slots in order
    setBulkPhotos: (photoDataArray) => set((state) => {
        const newPhotos = { ...state.photos };
        const slotIds = lyricSlots.map(slot => slot.id);

        photoDataArray.forEach((photoData, index) => {
            if (index < slotIds.length) {
                newPhotos[slotIds[index]] = photoData;
            }
        });

        return { photos: newPhotos };
    }),

    clearAllPhotos: () => set({ photos: initialPhotos }),

    setIsGenerating: (isGenerating) => set({ isGenerating }),

    setProgress: (progress, message = '') => set({
        progress,
        progressMessage: message
    }),

    setIsPlaying: (isPlaying) => set({ isPlaying }),

    setCurrentTime: (currentTime) => set({ currentTime }),

    // Computed helpers - only count verse slots that need photos
    getUploadedCount: () => {
        const { photos } = get();
        const verseSlots = lyricSlots.filter(slot => slot.type === 'verse');
        return verseSlots.filter(slot => photos[slot.id]).length;
    },

    hasAllPhotos: () => {
        const { photos } = get();
        const verseSlots = lyricSlots.filter(slot => slot.type === 'verse');
        return verseSlots.every(slot => photos[slot.id]);
    },

    getRequiredPhotoCount: () => {
        return lyricSlots.filter(slot => slot.type === 'verse').length;
    },

    getPhotoForSlot: (slotId) => {
        const { photos } = get();
        return photos[slotId];
    },
}));

export default useVideoStore;
