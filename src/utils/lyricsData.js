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
        endTime: 23.5,
        displayDuration: 11.5,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 23.5,
        endTime: 35,
        displayDuration: 11.5,
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 35,
        endTime: 46.5,
        displayDuration: 11.5,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 46.5,
        endTime: 58,
        displayDuration: 11.5,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 58,
        endTime: 69.5,
        displayDuration: 11.5,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 69.5,
        endTime: 81,
        displayDuration: 11.5,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 81,
        endTime: 92.5,
        displayDuration: 11.5,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 92.5,
        endTime: 104,
        displayDuration: 11.5,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 104,
        endTime: 115.5,
        displayDuration: 11.5,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 115.5,
        endTime: 127,
        displayDuration: 11.5,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 127,
        endTime: 138.5,
        displayDuration: 11.5,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 138.5,
        endTime: 150,
        displayDuration: 11.5,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 150,
        endTime: 161.5,
        displayDuration: 11.5,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 161.5,
        endTime: 173,
        displayDuration: 11.5,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 173,
        endTime: 184.5,
        displayDuration: 11.5,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 184.5,
        endTime: 196,
        displayDuration: 11.5,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 196,
        endTime: 207.5,
        displayDuration: 11.5,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 207.5,
        endTime: 219,
        displayDuration: 11.5,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 219,
        endTime: 230.5,
        displayDuration: 11.5,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best',
        startTime: 230.5,
        endTime: 242,
        displayDuration: 11.5,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'To teach me right from wrong',
        startTime: 242,
        endTime: 252,
        displayDuration: 10,
    },
    {
        id: 23,
        type: 'outro',
        lyric: 'Happy Mother’s Day, Mom',
        startTime: 252,
        endTime: 259,
        displayDuration: 7,
        isGenerated: true,
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
