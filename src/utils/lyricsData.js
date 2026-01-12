// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~4:19 (259 seconds)
// 14 slots = ~18.5 seconds per slot

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: 'Title Card / Hero Photo',
        startTime: 0,
        endTime: 18.5,
        displayDuration: 18.5,
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings, she offered sympathy',
        startTime: 18.5,
        endTime: 37,
        displayDuration: 18.5,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'Through both the good times and the bad',
        startTime: 37,
        endTime: 55.5,
        displayDuration: 18.5,
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'She was the one true friend I always had',
        startTime: 55.5,
        endTime: 74,
        displayDuration: 18.5,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night',
        startTime: 74,
        endTime: 92.5,
        displayDuration: 18.5,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away',
        startTime: 92.5,
        endTime: 111,
        displayDuration: 18.5,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'Made time for me during her busy day',
        startTime: 111,
        endTime: 129.5,
        displayDuration: 18.5,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 129.5,
        endTime: 148,
        displayDuration: 18.5,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'Through the years she kept me safe and warm',
        startTime: 148,
        endTime: 166.5,
        displayDuration: 18.5,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'When I was growing up, she was always there',
        startTime: 166.5,
        endTime: 185,
        displayDuration: 18.5,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'When I was bad, she was firm, but fair',
        startTime: 185,
        endTime: 203.5,
        displayDuration: 18.5,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 203.5,
        endTime: 222,
        displayDuration: 18.5,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 222,
        endTime: 240.5,
        displayDuration: 18.5,
    },
    {
        id: 14,
        type: 'finale',
        lyric: 'Mom, I love you more than words can say',
        startTime: 240.5,
        endTime: 259,
        displayDuration: 18.5,
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
