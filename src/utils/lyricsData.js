// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~124.87 seconds (2:04)
//
// Timing approach: each transition is placed ~0.5s before the vocal onset
// of the next phrase (at the energy dip / silence gap between phrases).
// This gives the viewer time to read the new text before hearing it sung.
//
// Sources: ffmpeg RMS energy analysis cross-referenced with manual measurements
// Manual measurements (vocal onsets): 0, 8, 11, 17, 22, 30, 35, 40, 45, 50,
//   56, 60, 66, 72, 78, 82, 87, 92, 97, 103, 108, 113, 117, 124

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 7.5,
        displayDuration: 7.5,
    },
    {
        id: 2,
        type: 'narrative',
        lyric: "Hi, mom, it's me",
        startTime: 7.5,
        endTime: 10.5,
        displayDuration: 3.0,
    },
    {
        id: 3,
        type: 'narrative',
        lyric: "I couldn't find the words to say",
        startTime: 10.5,
        endTime: 16.5,
        displayDuration: 6.0,
    },
    {
        id: 4,
        type: 'narrative',
        lyric: 'just how much you mean to me',
        startTime: 16.5,
        endTime: 21.5,
        displayDuration: 5.0,
    },
    {
        id: 5,
        type: 'narrative',
        lyric: 'so I wrote down how I feel in this song',
        startTime: 21.5,
        endTime: 29.5,
        displayDuration: 8.0,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'For my hurt feelings, she offered sympathy',
        startTime: 29.5,
        endTime: 34.5,
        displayDuration: 5.0,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'Through both the good times and the bad',
        startTime: 34.5,
        endTime: 39.5,
        displayDuration: 5.0,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'She was the one true friend I always had',
        startTime: 39.5,
        endTime: 44.5,
        displayDuration: 5.0,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night',
        startTime: 44.5,
        endTime: 49.5,
        displayDuration: 5.0,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away',
        startTime: 49.5,
        endTime: 55.5,
        displayDuration: 6.0,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'Made time for me during her busy day',
        startTime: 55.5,
        endTime: 59.5,
        displayDuration: 4.0,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 59.5,
        endTime: 65.5,
        displayDuration: 6.0,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 65.5,
        endTime: 71.5,
        displayDuration: 6.0,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 71.5,
        endTime: 77.5,
        displayDuration: 6.0,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 77.5,
        endTime: 81.5,
        displayDuration: 4.0,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 81.5,
        endTime: 86.5,
        displayDuration: 5.0,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was bad, she was firm but fair',
        startTime: 86.5,
        endTime: 91.5,
        displayDuration: 5.0,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She did her best',
        startTime: 91.5,
        endTime: 96.5,
        displayDuration: 5.0,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'To teach me right from wrong',
        startTime: 96.5,
        endTime: 102.5,
        displayDuration: 6.0,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'And now my heart',
        startTime: 102.5,
        endTime: 107.5,
        displayDuration: 5.0,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'Carries her loving song',
        startTime: 107.5,
        endTime: 112.5,
        displayDuration: 5.0,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'My heart carries her loving song',
        startTime: 112.5,
        endTime: 116.5,
        displayDuration: 4.0,
    },
    {
        id: 23,
        type: 'verse',
        lyric: 'Her loving song...',
        startTime: 116.5,
        endTime: 124.0,
        displayDuration: 7.5,
    },
    {
        id: 24,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 124.0,
        endTime: 130,
        displayDuration: 6,
        isGenerated: true,
    },
];

export const SONG_DURATION = 124.87;
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
