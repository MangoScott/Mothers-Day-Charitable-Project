// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~125 seconds
// Timing synchronized from the Sync Lyrics tool

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 5.2,
        displayDuration: 5.2,
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings',
        startTime: 5.2,
        endTime: 10.63,
        displayDuration: 5.43,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 10.63,
        endTime: 16.06,
        displayDuration: 5.44,
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 16.06,
        endTime: 21.49,
        displayDuration: 5.43,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 21.49,
        endTime: 26.93,
        displayDuration: 5.44,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 26.93,
        endTime: 32.37,
        displayDuration: 5.44,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 32.37,
        endTime: 37.79,
        displayDuration: 5.42,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 37.79,
        endTime: 43.23,
        displayDuration: 5.44,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 43.23,
        endTime: 48.66,
        displayDuration: 5.43,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 48.66,
        endTime: 54.1,
        displayDuration: 5.44,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 54.1,
        endTime: 59.54,
        displayDuration: 5.44,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 59.54,
        endTime: 64.96,
        displayDuration: 5.43,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 64.96,
        endTime: 70.4,
        displayDuration: 5.44,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 70.4,
        endTime: 75.84,
        displayDuration: 5.44,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 75.84,
        endTime: 81.27,
        displayDuration: 5.43,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 81.27,
        endTime: 86.71,
        displayDuration: 5.44,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 86.71,
        endTime: 92.14,
        displayDuration: 5.43,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 92.14,
        endTime: 97.57,
        displayDuration: 5.44,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 97.57,
        endTime: 103.01,
        displayDuration: 5.44,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 103.01,
        endTime: 108.44,
        displayDuration: 5.43,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 108.44,
        endTime: 113.87,
        displayDuration: 5.43,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 113.87,
        endTime: 119.30,
        displayDuration: 5.43,
    },
    {
        id: 23,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 119.30,
        endTime: 125,
        displayDuration: 5.70,
        isGenerated: true,
    },
];

export const SONG_DURATION = 125; // ~2:05 in seconds
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
