// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~4:19 (259 seconds)
// Timing adjusted to match the natural flow of a ballad song

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: 'A Tribute to Mom ❤️',
        editable: true, // User can customize this title
        startTime: 0,
        endTime: 12,
        displayDuration: 12,
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings, she offered sympathy',
        startTime: 12,
        endTime: 31,
        displayDuration: 19,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'Through both the good times and the bad',
        startTime: 31,
        endTime: 48,
        displayDuration: 17,
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'She was the one true friend I always had',
        startTime: 48,
        endTime: 67,
        displayDuration: 19,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night',
        startTime: 67,
        endTime: 87,
        displayDuration: 20,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away',
        startTime: 87,
        endTime: 105,
        displayDuration: 18,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'Made time for me during her busy day',
        startTime: 105,
        endTime: 123,
        displayDuration: 18,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 123,
        endTime: 139,
        displayDuration: 16,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'Through the years she kept me safe and warm',
        startTime: 139,
        endTime: 158,
        displayDuration: 19,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'When I was growing up, she was always there',
        startTime: 158,
        endTime: 177,
        displayDuration: 19,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'When I was bad, she was firm, but fair',
        startTime: 177,
        endTime: 195,
        displayDuration: 18,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 195,
        endTime: 214,
        displayDuration: 19,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 214,
        endTime: 235,
        displayDuration: 21,
    },
    {
        id: 14,
        type: 'finale',
        lyric: 'Mom, I love you more than words can say',
        startTime: 235,
        endTime: 259,
        displayDuration: 24,
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
