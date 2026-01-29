// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: 125 seconds (2:05)
// First lyrics start at 0:31 after instrumental intro

// Slide durations from email (starting at 0:31):
// Slides 3-23 contain the lyrics, slide 24 is end of show
// 3: 2s, 4: 2s, 5: 4s, 6: 4s, 7: 4s, 8: 1.5s, 9: 1.5s, 10: 3s, 11: 3s, 
// 12: 1.5s, 13: 4s, 14: 1.5s, 15: 4s, 16: 1.5s, 17: 1.5s, 18: 3s, 
// 19: 4s, 20: 1.5s, 21: 3s, 22: 3s, 23: 5s

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 31,
        displayDuration: 31, // Instrumental intro - title card shows for 31 seconds
    },
    {
        id: 2,
        type: 'verse',
        lyric: 'For my hurt feelings',
        startTime: 31,
        endTime: 33,
        displayDuration: 2, // slide 3
    },
    {
        id: 3,
        type: 'verse',
        lyric: 'She offered sympathy',
        startTime: 33,
        endTime: 35,
        displayDuration: 2, // slide 4
    },
    {
        id: 4,
        type: 'verse',
        lyric: 'Through both the good times',
        startTime: 35,
        endTime: 39,
        displayDuration: 4, // slide 5
    },
    {
        id: 5,
        type: 'verse',
        lyric: 'And the bad',
        startTime: 39,
        endTime: 43,
        displayDuration: 4, // slide 6
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'She was the one true friend',
        startTime: 43,
        endTime: 47,
        displayDuration: 4, // slide 7
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'I always had',
        startTime: 47,
        endTime: 48.5,
        displayDuration: 1.5, // slide 8
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'When I was sick',
        startTime: 48.5,
        endTime: 50,
        displayDuration: 1.5, // slide 9
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'She stayed up through the night',
        startTime: 50,
        endTime: 53,
        displayDuration: 3, // slide 10
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores',
        startTime: 53,
        endTime: 56,
        displayDuration: 3, // slide 11
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'And my tears away',
        startTime: 56,
        endTime: 57.5,
        displayDuration: 1.5, // slide 12
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'Made time for me',
        startTime: 57.5,
        endTime: 61.5,
        displayDuration: 4, // slide 13
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'During her busy day',
        startTime: 61.5,
        endTime: 63,
        displayDuration: 1.5, // slide 14
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 63,
        endTime: 67,
        displayDuration: 4, // slide 15
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 67,
        endTime: 68.5,
        displayDuration: 1.5, // slide 16
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 68.5,
        endTime: 70,
        displayDuration: 1.5, // slide 17
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 70,
        endTime: 73,
        displayDuration: 3, // slide 18
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 73,
        endTime: 77,
        displayDuration: 4, // slide 19
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'When I was bad',
        startTime: 77,
        endTime: 78.5,
        displayDuration: 1.5, // slide 20
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'She was firm, but fair',
        startTime: 78.5,
        endTime: 81.5,
        displayDuration: 3, // slide 21
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong',
        startTime: 81.5,
        endTime: 84.5,
        displayDuration: 3, // slide 22
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'And now, my heart carries her loving song',
        startTime: 84.5,
        endTime: 89.5,
        displayDuration: 5, // slide 23
    },
    {
        id: 23,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 89.5,
        endTime: 125,
        displayDuration: 35.5, // Outro - shows until end of song
        isGenerated: true,
    },
];

export const SONG_DURATION = 125; // Total duration: 2:05
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
