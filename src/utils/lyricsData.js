// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: 124.83 seconds (2:05)
// Timings derived from spectral onset analysis of actual MP3 audio file
// Key onset reference points from analysis (seconds):
//   Volume transition at 7.60s = spoken intro begins
//   Singing starts around onset at 29.81s
//   Song ends with fade at ~124.83s

// Spectral onset analysis mapped to lyric phrases:
// 1: 0s (title card), 2: 7.6s, 3: 10.35s, 4: 17.51s, 5: 22.67s,
// 6: 29.81s, 7: 34.98s, 8: 40.23s, 9: 45.38s, 10: 50.57s,
// 11: 55.78s, 12: 59.65s, 13: 65.52s, 14: 72.02s, 15: 77.46s,
// 16: 81.77s, 17: 86.94s, 18: 92.16s, 19: 97.35s, 20: 103.03s,
// 21: 108.43s, 22: 113.63s, 23: 117.54s, 24: 124.83s (outro)

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 7.6,
        displayDuration: 7.6,
    },
    {
        id: 2,
        type: 'narrative',
        lyric: "Hi, mom, it's me",
        startTime: 7.6,
        endTime: 10.35,
        displayDuration: 2.75,
    },
    {
        id: 3,
        type: 'narrative',
        lyric: "I couldn't find the words to say",
        startTime: 10.35,
        endTime: 17.51,
        displayDuration: 7.16,
    },
    {
        id: 4,
        type: 'narrative',
        lyric: 'just how much you mean to me',
        startTime: 17.51,
        endTime: 22.67,
        displayDuration: 5.16,
    },
    {
        id: 5,
        type: 'narrative',
        lyric: 'so I wrote down how I feel in this song',
        startTime: 22.67,
        endTime: 29.81,
        displayDuration: 7.14,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'For my hurt feelings, she offered sympathy',
        startTime: 29.81,
        endTime: 34.98,
        displayDuration: 5.17,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'Through both the good times and the bad',
        startTime: 34.98,
        endTime: 40.23,
        displayDuration: 5.25,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'She was the one true friend I always had',
        startTime: 40.23,
        endTime: 45.38,
        displayDuration: 5.15,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night',
        startTime: 45.38,
        endTime: 50.57,
        displayDuration: 5.19,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away',
        startTime: 50.57,
        endTime: 55.78,
        displayDuration: 5.21,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'Made time for me during her busy day',
        startTime: 55.78,
        endTime: 59.65,
        displayDuration: 3.87,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 59.65,
        endTime: 65.52,
        displayDuration: 5.87,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 65.52,
        endTime: 72.02,
        displayDuration: 6.50,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 72.02,
        endTime: 77.46,
        displayDuration: 5.44,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 77.46,
        endTime: 81.77,
        displayDuration: 4.31,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 81.77,
        endTime: 86.94,
        displayDuration: 5.17,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was bad, she was firm but fair',
        startTime: 86.94,
        endTime: 92.16,
        displayDuration: 5.22,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She did her best',
        startTime: 92.16,
        endTime: 97.35,
        displayDuration: 5.19,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'To teach me right from wrong',
        startTime: 97.35,
        endTime: 103.03,
        displayDuration: 5.68,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'And now my heart',
        startTime: 103.03,
        endTime: 108.43,
        displayDuration: 5.40,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'Carries her loving song',
        startTime: 108.43,
        endTime: 113.63,
        displayDuration: 5.20,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'My heart carries her loving song',
        startTime: 113.63,
        endTime: 117.54,
        displayDuration: 3.91,
    },
    {
        id: 23,
        type: 'verse',
        lyric: 'Her loving song...',
        startTime: 117.54,
        endTime: 124.83,
        displayDuration: 7.29,
    },
    {
        id: 24,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 124.83,
        endTime: 130,
        displayDuration: 5.17,
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
