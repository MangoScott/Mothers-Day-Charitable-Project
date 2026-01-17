// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~4:19 (259 seconds)
// Timing adjusted to match the natural flow of a ballad song

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 6,
        displayDuration: 6,
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings',
        startTime: 6,
        endTime: 11,
        displayDuration: 5,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 11,
        endTime: 16,
        displayDuration: 5,
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 16,
        endTime: 21,
        displayDuration: 5,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 21,
        endTime: 26,
        displayDuration: 5,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 26,
        endTime: 31,
        displayDuration: 5,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 31,
        endTime: 36,
        displayDuration: 5,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 36,
        endTime: 41,
        displayDuration: 5,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 41,
        endTime: 46,
        displayDuration: 5,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 46,
        endTime: 51,
        displayDuration: 5,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 51,
        endTime: 56,
        displayDuration: 5,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 56,
        endTime: 61,
        displayDuration: 5,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 61,
        endTime: 66,
        displayDuration: 5,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 66,
        endTime: 71,
        displayDuration: 5,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 71,
        endTime: 76,
        displayDuration: 5,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 76,
        endTime: 81,
        displayDuration: 5,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 81,
        endTime: 86,
        displayDuration: 5,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 86,
        endTime: 91,
        displayDuration: 5,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 91,
        endTime: 96,
        displayDuration: 5,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 96,
        endTime: 101,
        displayDuration: 5,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 101,
        endTime: 108,
        displayDuration: 7,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 108,
        endTime: 115,
        displayDuration: 7,
    },
    {
        id: 23,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 115,
        endTime: 125,
        displayDuration: 10,
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
