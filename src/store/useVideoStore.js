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
    customTitle: 'A Tribute to Mom ❤️',

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

    clearAllPhotos: () => set({ photos: initialPhotos }),

    setIsGenerating: (isGenerating) => set({ isGenerating }),

    setProgress: (progress, message = '') => set({
        progress,
        progressMessage: message
    }),

    setIsPlaying: (isPlaying) => set({ isPlaying }),

    setCurrentTime: (currentTime) => set({ currentTime }),

    // Computed helpers
    getUploadedCount: () => {
        const { photos } = get();
        return Object.values(photos).filter(Boolean).length;
    },

    hasAllPhotos: () => {
        const { photos } = get();
        return Object.values(photos).every(Boolean);
    },

    getPhotoForSlot: (slotId) => {
        const { photos } = get();
        return photos[slotId];
    },
}));

export default useVideoStore;
