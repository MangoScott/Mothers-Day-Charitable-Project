// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: 62 seconds
// Timing synchronized from slide duration email

// Slide durations from email:
// 1: 1s, 2: 1s (combined = 2s), 3: 2s, 4: 2s, 5: 4s, 6: 4s, 7: 4s, 
// 8: 1.5s, 9: 1.5s, 10: 3s, 11: 3s, 12: 1.5s, 13: 4s, 14: 1.5s, 
// 15: 4s, 16: 1.5s, 17: 1.5s, 18: 3s, 19: 4s, 20: 1.5s, 21: 3s, 22: 3s, 23: 5s

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 2,
        displayDuration: 2, // slides 1+2 combined
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings',
        startTime: 2,
        endTime: 4,
        displayDuration: 2, // slide 3
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 4,
        endTime: 6,
        displayDuration: 2, // slide 4
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 6,
        endTime: 10,
        displayDuration: 4, // slide 5
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 10,
        endTime: 14,
        displayDuration: 4, // slide 6
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 14,
        endTime: 18,
        displayDuration: 4, // slide 7
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 18,
        endTime: 19.5,
        displayDuration: 1.5, // slide 8
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 19.5,
        endTime: 21,
        displayDuration: 1.5, // slide 9
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 21,
        endTime: 24,
        displayDuration: 3, // slide 10
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 24,
        endTime: 27,
        displayDuration: 3, // slide 11
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 27,
        endTime: 28.5,
        displayDuration: 1.5, // slide 12
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 28.5,
        endTime: 32.5,
        displayDuration: 4, // slide 13
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 32.5,
        endTime: 34,
        displayDuration: 1.5, // slide 14
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 34,
        endTime: 38,
        displayDuration: 4, // slide 15
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 38,
        endTime: 39.5,
        displayDuration: 1.5, // slide 16
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 39.5,
        endTime: 41,
        displayDuration: 1.5, // slide 17
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 41,
        endTime: 44,
        displayDuration: 3, // slide 18
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 44,
        endTime: 48,
        displayDuration: 4, // slide 19
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 48,
        endTime: 49.5,
        displayDuration: 1.5, // slide 20
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 49.5,
        endTime: 52.5,
        displayDuration: 3, // slide 21
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 52.5,
        endTime: 55.5,
        displayDuration: 3, // slide 22
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 55.5,
        endTime: 60.5,
        displayDuration: 5, // slide 23
    },
    {
        id: 23,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 60.5,
        endTime: 62,
        displayDuration: 1.5, // end of show buffer
        isGenerated: true,
    },
];

export const SONG_DURATION = 62; // Total duration in seconds
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
