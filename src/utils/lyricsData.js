// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~4:19 (259 seconds)
// Timing adjusted to match the natural flow of a ballad song

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: 'A Mother’s Day Story Card',
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 12,
        displayDuration: 12,
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings',
        startTime: 12,
        endTime: 24,
        displayDuration: 12,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 24,
        endTime: 36,
        displayDuration: 12,
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 36,
        endTime: 48,
        displayDuration: 12,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 48,
        endTime: 60,
        displayDuration: 12,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 60,
        endTime: 72,
        displayDuration: 12,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 72,
        endTime: 84,
        displayDuration: 12,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 84,
        endTime: 96,
        displayDuration: 12,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 96,
        endTime: 108,
        displayDuration: 12,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 108,
        endTime: 120,
        displayDuration: 12,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 120,
        endTime: 132,
        displayDuration: 12,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 132,
        endTime: 144,
        displayDuration: 12,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 144,
        endTime: 156,
        displayDuration: 12,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 156,
        endTime: 168,
        displayDuration: 12,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 168,
        endTime: 180,
        displayDuration: 12,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 180,
        endTime: 192,
        displayDuration: 12,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 192,
        endTime: 204,
        displayDuration: 12,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 204,
        endTime: 216,
        displayDuration: 12,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 216,
        endTime: 228,
        displayDuration: 12,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 228,
        endTime: 240,
        displayDuration: 12,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 240,
        endTime: 252,
        displayDuration: 12,
    },
    {
        id: 22,
        type: 'outro',
        lyric: 'Happy Mother’s Day, Mom',
        startTime: 252,
        endTime: 259,
        displayDuration: 7,
        isGenerated: true, // Marker for non-upload slide
    },
];

export const SONG_DURATION = 259; // 4:19 in seconds
export const TOTAL_SLOTS = lyricSlots.length;
export const SLIDE_DURATION = SONG_DURATION / TOTAL_SLOTS;

// Get the current slot based on playback time
export const getCurrentSlot = (currentTime) => {
    return lyricSlots.find(
        (slot) => currentTime >= slot.startTime && currentTime < slot.endTime
    ) || lyricSlots[0];
};

// Get progress within the current slot (0-1)
export const getSlotProgress = (currentTime, slot) => {
    const elapsed = currentTime - slot.startTime;
    return Math.min(1, Math.max(0, elapsed / slot.displayDuration));
};
