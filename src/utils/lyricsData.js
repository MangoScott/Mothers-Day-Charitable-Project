// Lyrics data structure with timing for "Wendy's Song"
// Total song duration: ~124.87 seconds (2:04)
// Timings refined via ffmpeg audio energy analysis (RMS dB dip detection)
// Each transition point is placed at the energy dip between vocal phrases

// Audio-verified transition points (seconds):
// 1: 0.0  (silence → intro music at ~3.85s)
// 2: 8.2  (dip at 8.18-8.57s, voice resumes ~8.6s)
// 3: 10.5 (dip at 10.16-10.37s)
// 4: 16.5 (vocal gap around 15.5-16s)
// 5: 21.5 (dip at 21.47-22.02s)
// 6: 29.8 (dip at 29.52-30.17s, singing starts ~30.3s)
// 7: 34.8 (dip at 34.80-35.66s, vocal onset ~36s)
// 8: 39.6 (dip at 39.60-40.26s, vocal onset ~40.3s)
// 9: 45.0 (dip at 45.14-46.03s)
// 10: 49.5 (large dip 48.82-50.57s, vocal onset ~51s)
// 11: 55.5 (large dip 54.02-55.80s, vocal onset ~56.5s)
// 12: 60.0 (energy transition at 60-60.5s)
// 13: 65.5 (energy dip around 66s)
// 14: 71.5 (energy moderate, phrase transition)
// 15: 77.5 (energy dip at 76.4-76.6s, recovery ~78s)
// 16: 81.5 (large dip 80.04-81.79s, vocal onset ~82s)
// 17: 86.5 (large dip 85.24-86.96s, vocal onset ~87s)
// 18: 91.5 (large dip 90.38-92.16s, vocal onset ~92s)
// 19: 96.5 (large dip 95.66-97.36s, vocal onset ~97.5s)
// 20: 102.5 (energy transition)
// 21: 108.0 (energy dip at 108s)
// 22: 112.5 (dip at 112.54-112.72s)
// 23: 116.5 (dip at 116.32-116.59s)
// 24: 124.0 (song ends, fade to silence)

export const lyricSlots = [
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 8.2,
        displayDuration: 8.2,
    },
    {
        id: 2,
        type: 'narrative',
        lyric: "Hi, mom, it's me",
        startTime: 8.2,
        endTime: 10.5,
        displayDuration: 2.3,
    },
    {
        id: 3,
        type: 'narrative',
        lyric: "I couldn't find the words to say",
        startTime: 10.5,
        endTime: 16.5,
        displayDuration: 6,
    },
    {
        id: 4,
        type: 'narrative',
        lyric: 'just how much you mean to me',
        startTime: 16.5,
        endTime: 21.5,
        displayDuration: 5,
    },
    {
        id: 5,
        type: 'narrative',
        lyric: 'so I wrote down how I feel in this song',
        startTime: 21.5,
        endTime: 29.8,
        displayDuration: 8.3,
    },
    {
        id: 6,
        type: 'verse',
        lyric: 'For my hurt feelings, she offered sympathy',
        startTime: 29.8,
        endTime: 34.8,
        displayDuration: 5,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'Through both the good times and the bad',
        startTime: 34.8,
        endTime: 39.6,
        displayDuration: 4.8,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'She was the one true friend I always had',
        startTime: 39.6,
        endTime: 45.0,
        displayDuration: 5.4,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night',
        startTime: 45.0,
        endTime: 49.5,
        displayDuration: 4.5,
    },
    {
        id: 10,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away',
        startTime: 49.5,
        endTime: 55.5,
        displayDuration: 6,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'Made time for me during her busy day',
        startTime: 55.5,
        endTime: 60.0,
        displayDuration: 4.5,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 60.0,
        endTime: 65.5,
        displayDuration: 5.5,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'Through the years',
        startTime: 65.5,
        endTime: 71.5,
        displayDuration: 6,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She kept me safe and warm',
        startTime: 71.5,
        endTime: 77.5,
        displayDuration: 6,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'When I was growing up',
        startTime: 77.5,
        endTime: 81.5,
        displayDuration: 4,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'She was always there',
        startTime: 81.5,
        endTime: 86.5,
        displayDuration: 5,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was bad, she was firm but fair',
        startTime: 86.5,
        endTime: 91.5,
        displayDuration: 5,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She did her best',
        startTime: 91.5,
        endTime: 96.5,
        displayDuration: 5,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'To teach me right from wrong',
        startTime: 96.5,
        endTime: 102.5,
        displayDuration: 6,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'And now my heart',
        startTime: 102.5,
        endTime: 108.0,
        displayDuration: 5.5,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'Carries her loving song',
        startTime: 108.0,
        endTime: 112.5,
        displayDuration: 4.5,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'My heart carries her loving song',
        startTime: 112.5,
        endTime: 116.5,
        displayDuration: 4,
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
