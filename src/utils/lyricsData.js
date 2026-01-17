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
    // Verse 1 (originally 12-31)
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings',
        startTime: 12,
        endTime: 21.5,
        displayDuration: 9.5,
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 21.5,
        endTime: 31,
        displayDuration: 9.5,
    },
    // Verse 2 (originally 31-48)
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 31,
        endTime: 39.5,
        displayDuration: 8.5,
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 39.5,
        endTime: 48,
        displayDuration: 8.5,
    },
    // Verse 3 (originally 48-67)
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 48,
        endTime: 57.5,
        displayDuration: 9.5,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 57.5,
        endTime: 67,
        displayDuration: 9.5,
    },
    // Verse 4 (originally 67-87)
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 67,
        endTime: 77,
        displayDuration: 10,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 77,
        endTime: 87,
        displayDuration: 10,
    },
    // Verse 5 (originally 87-105)
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 87,
        endTime: 96,
        displayDuration: 9,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 96,
        endTime: 105,
        displayDuration: 9,
    },
    // Verse 6 (originally 105-123)
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 105,
        endTime: 114,
        displayDuration: 9,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 114,
        endTime: 123,
        displayDuration: 9,
    },
    // Verse 7 (originally 123-139) - WHOLE
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 123,
        endTime: 139,
        displayDuration: 16,
    },
    // Verse 8 (originally 139-158)
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 139,
        endTime: 148.5,
        displayDuration: 9.5,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 148.5,
        endTime: 158,
        displayDuration: 9.5,
    },
    // Verse 9 (originally 158-177)
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 158,
        endTime: 167.5,
        displayDuration: 9.5,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 167.5,
        endTime: 177,
        displayDuration: 9.5,
    },
    // Verse 10 (originally 177-195)
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 177,
        endTime: 186,
        displayDuration: 9,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 186,
        endTime: 195,
        displayDuration: 9,
    },
    // Verse 11 (originally 195-214) - WHOLE
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 195,
        endTime: 214,
        displayDuration: 19,
    },
    // Verse 12 (originally 214-235) - WHOLE
    {
        id: 22,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 214,
        endTime: 235,
        displayDuration: 21,
    },
    // Outro (originally 235-259)
    {
        id: 23,
        type: 'outro',
        lyric: 'Happy Mother’s Day, Mom',
        startTime: 235,
        endTime: 259,
        displayDuration: 24,
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
