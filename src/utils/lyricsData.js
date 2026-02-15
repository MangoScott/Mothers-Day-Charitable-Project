// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: 124.83 seconds (2:05)
// Timings from original email reference — human-verified by songwriter
//
// Email timing (slide starts at these seconds):
// 1: 0s, 2: 8s, 3: 11s, 4: 17s, 5: 22s, 6: 30s, 7: 35s, 8: 40s, 9: 45s,
// 10: 50s, 11: 56s, 12: 60s, 13: 66s, 14: 72s, 15: 78s, 16: 82s, 17: 87s,
// 18: 92s, 19: 97s, 20: 103s, 21: 108s, 22: 113s, 23: 117s, 24: 124s

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 8,
        displayDuration: 8,
    },
    {
        id: 2,
        type: 'narrative',
        lyric: "Hi, mom, it's me",
        startTime: 8,
        endTime: 11,
        displayDuration: 3,
    },
    {
        id: 3,
        type: 'narrative',
        lyric: "I couldn't find the words to say",
        startTime: 11,
        endTime: 17,
        displayDuration: 6,
    },
    {
        id: 4,
        type: 'narrative',
        lyric: 'just how much you mean to me',
        startTime: 17,
        endTime: 22,
        displayDuration: 5,
    },
    {
        id: 5,
        type: 'narrative',
        lyric: 'so I wrote down how I feel in this song',
        startTime: 22,
        endTime: 30,
        displayDuration: 8,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'For my hurt feelings, she offered sympathy',
        startTime: 30,
        endTime: 35,
        displayDuration: 5,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'Through both the good times and the bad',
        startTime: 35,
        endTime: 40,
        displayDuration: 5,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'She was the one true friend I always had',
        startTime: 40,
        endTime: 45,
        displayDuration: 5,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night',
        startTime: 45,
        endTime: 50,
        displayDuration: 5,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away',
        startTime: 50,
        endTime: 56,
        displayDuration: 6,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'Made time for me during her busy day',
        startTime: 56,
        endTime: 60,
        displayDuration: 4,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 60,
        endTime: 66,
        displayDuration: 6,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 66,
        endTime: 72,
        displayDuration: 6,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 72,
        endTime: 78,
        displayDuration: 6,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 78,
        endTime: 82,
        displayDuration: 4,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 82,
        endTime: 87,
        displayDuration: 5,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was bad, she was firm but fair',
        startTime: 87,
        endTime: 92,
        displayDuration: 5,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She did her best',
        startTime: 92,
        endTime: 97,
        displayDuration: 5,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'To teach me right from wrong',
        startTime: 97,
        endTime: 103,
        displayDuration: 6,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'And now my heart',
        startTime: 103,
        endTime: 108,
        displayDuration: 5,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'Carries her loving song',
        startTime: 108,
        endTime: 113,
        displayDuration: 5,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'My heart carries her loving song',
        startTime: 113,
        endTime: 117,
        displayDuration: 4,
    },
    {
        id: 23,
        type: 'verse',
        lyric: 'Her loving song...',
        startTime: 117,
        endTime: 124,
        displayDuration: 7,
    },
    {
        id: 24,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 124,
        endTime: 131,
        displayDuration: 7,
        isGenerated: true,
    },
];

export const SONG_DURATION = 124.83;
export const TOTAL_SLOTS = lyricSlots.length;
export const SLIDE_DURATION = SONG_DURATION / TOTAL_SLOTS;

export const getCurrentSlot = (currentTime) => {
    return lyricSlots.find(
        (slot) => currentTime >= slot.startTime && currentTime < slot.endTime
    ) || lyricSlots[0];
};

export const getSlotProgress = (currentTime, slot) => {
    const elapsed = currentTime - slot.startTime;
    return Math.min(1, Math.max(0, elapsed / slot.displayDuration));
};
