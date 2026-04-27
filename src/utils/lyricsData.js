// Lyrics & timings for "Wendy's Song"
// Total song duration: 124.83 seconds (2:05)
//
// Timings produced via Whisper medium.en forced alignment of the actual MP3
// (see scripts/sync_lyrics.py). Each slot's startTime equals the first sung
// word's onset detected by Whisper, accurate to roughly ±100ms. Slots are
// contiguous: each slot's endTime equals the next slot's startTime.
//
// Lyric text matches what is actually performed in the recording (re-verified
// against an unbiased re-transcription).
//
// Layout: 1 title (auto) + 4 narrative + 18 verse + 1 closing (auto) = 24 slots.

export const lyricSlots = [
    // Title (auto-generated slide)
    {
        id: 1,
        type: 'intro',
        lyric: "A Mother's Day Story Card",
        subLyric: 'made especially for YOU',
        editable: true,
        startTime: 0,
        endTime: 7.40,
        displayDuration: 7.40,
    },

    // Spoken intro (4 narrative slides)
    {
        id: 2,
        type: 'narrative',
        lyric: "Hi, mom, it's me.",
        startTime: 7.40,
        endTime: 10.44,
        displayDuration: 3.04,
    },
    {
        id: 3,
        type: 'narrative',
        lyric: "Sometimes it's hard for me to say it face to face,\nabout how I've left you all along.",
        startTime: 10.44,
        endTime: 15.78,
        displayDuration: 5.34,
    },
    {
        id: 4,
        type: 'narrative',
        lyric: "Now that Mother's Day is near,\nit's easier for me to say",
        startTime: 15.78,
        endTime: 18.74,
        displayDuration: 2.96,
    },
    {
        id: 5,
        type: 'narrative',
        lyric: "how I feel in this song.",
        startTime: 18.74,
        endTime: 24.24,
        displayDuration: 5.50,
    },

    // Sung verses (18 photo slides)
    {
        id: 6,
        type: 'verse',
        lyric: 'Those tender tears my mother shed for me,',
        startTime: 24.24,
        endTime: 29.76,
        displayDuration: 5.52,
    },
    {
        id: 7,
        type: 'verse',
        lyric: 'for my hurt feelings she offered sympathy.',
        startTime: 29.76,
        endTime: 35.68,
        displayDuration: 5.92,
    },
    {
        id: 8,
        type: 'verse',
        lyric: 'Through both the good times and the bad,',
        startTime: 35.68,
        endTime: 39.46,
        displayDuration: 3.78,
    },
    {
        id: 9,
        type: 'verse',
        lyric: 'she was the one true friend I always had.',
        startTime: 39.46,
        endTime: 45.52,
        displayDuration: 6.06,
    },
    {
        id: 10,
        type: 'verse',
        lyric: "When I was scared, she'd say it'll be alright.",
        startTime: 45.52,
        endTime: 50.62,
        displayDuration: 5.10,
    },
    {
        id: 11,
        type: 'verse',
        lyric: 'When I was sick, she stayed up through the night.',
        startTime: 50.62,
        endTime: 56.12,
        displayDuration: 5.50,
    },
    {
        id: 12,
        type: 'verse',
        lyric: 'She kissed my sores and my tears away,',
        startTime: 56.12,
        endTime: 61.00,
        displayDuration: 4.88,
    },
    {
        id: 13,
        type: 'verse',
        lyric: 'made time for me during her busy day.',
        startTime: 61.00,
        endTime: 66.86,
        displayDuration: 5.86,
    },
    {
        id: 14,
        type: 'verse',
        lyric: 'She sheltered me from all harm',
        startTime: 66.86,
        endTime: 71.10,
        displayDuration: 4.24,
    },
    {
        id: 15,
        type: 'verse',
        lyric: 'through the years, she kept me safe and warm.',
        startTime: 71.10,
        endTime: 77.52,
        displayDuration: 6.42,
    },
    {
        id: 16,
        type: 'verse',
        lyric: 'When I was growing up, she was always there.',
        startTime: 77.52,
        endTime: 82.12,
        displayDuration: 4.60,
    },
    {
        id: 17,
        type: 'verse',
        lyric: 'When I was bad, she was firm but fair.',
        startTime: 82.12,
        endTime: 87.26,
        displayDuration: 5.14,
    },
    {
        id: 18,
        type: 'verse',
        lyric: 'She did her best to teach me right from wrong.',
        startTime: 87.26,
        endTime: 92.14,
        displayDuration: 4.88,
    },
    {
        id: 19,
        type: 'verse',
        lyric: 'And now my heart carries her loving song.',
        startTime: 92.14,
        endTime: 97.68,
        displayDuration: 5.54,
    },
    {
        id: 20,
        type: 'verse',
        lyric: 'Thanks for loving what you gave to me.',
        startTime: 97.68,
        endTime: 103.04,
        displayDuration: 5.36,
    },
    {
        id: 21,
        type: 'verse',
        lyric: 'Thanks for not giving up when I was mean as I could be.',
        startTime: 103.04,
        endTime: 108.64,
        displayDuration: 5.60,
    },
    {
        id: 22,
        type: 'verse',
        lyric: 'Mom, I love you more than words can say.',
        startTime: 108.64,
        endTime: 113.42,
        displayDuration: 4.78,
    },
    {
        id: 23,
        type: 'verse',
        lyric: "And this is your song on Mother's Day.",
        startTime: 113.42,
        endTime: 119.18,
        displayDuration: 5.76,
    },

    // Closing (auto-generated slide)
    {
        id: 24,
        type: 'outro',
        lyric: "Happy Mother's Day, Mom",
        startTime: 119.18,
        endTime: 124.83,
        displayDuration: 5.65,
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
