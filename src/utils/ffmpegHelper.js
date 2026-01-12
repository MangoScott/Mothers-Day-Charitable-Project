import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg = null;
let isLoaded = false;

/**
 * Initialize ffmpeg.wasm
 */
export const initFFmpeg = async (onProgress) => {
    if (isLoaded && ffmpeg) return ffmpeg;

    ffmpeg = new FFmpeg();

    ffmpeg.on('log', ({ message }) => {
        console.log('[FFmpeg]', message);
    });

    ffmpeg.on('progress', ({ progress, time }) => {
        if (onProgress) {
            onProgress(Math.round(progress * 100));
        }
    });

    // Load ffmpeg core from CDN
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

    try {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        isLoaded = true;
        return ffmpeg;
    } catch (error) {
        console.error('Failed to load FFmpeg:', error);
        throw error;
    }
};

/**
 * Check if ffmpeg is loaded
 */
export const isFFmpegLoaded = () => isLoaded;

/**
 * Get the ffmpeg instance
 */
export const getFFmpeg = () => ffmpeg;

/**
 * Generate video from images and audio
 * @param {Array} images - Array of { dataUrl, duration } objects
 * @param {string} audioUrl - URL to the audio file
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Blob} - The generated MP4 video
 */
export const generateVideo = async (images, audioUrl, onProgress) => {
    const ff = await initFFmpeg(onProgress);

    onProgress?.(5, 'Preparing images...');

    // Write each image to ffmpeg's virtual filesystem
    for (let i = 0; i < images.length; i++) {
        const { dataUrl } = images[i];
        const paddedIndex = String(i).padStart(3, '0');
        const filename = `img${paddedIndex}.jpg`;

        // Convert data URL to Uint8Array
        const base64 = dataUrl.split(',')[1];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let j = 0; j < binary.length; j++) {
            bytes[j] = binary.charCodeAt(j);
        }

        await ff.writeFile(filename, bytes);
        onProgress?.(5 + (i / images.length) * 20, `Processing image ${i + 1}/${images.length}...`);
    }

    onProgress?.(25, 'Loading audio...');

    // Write audio file
    try {
        const audioData = await fetchFile(audioUrl);
        await ff.writeFile('audio.mp3', audioData);
    } catch (error) {
        console.warn('Could not load audio file, generating silent video:', error);
        // Continue without audio
    }

    onProgress?.(30, 'Creating slideshow...');

    // Create a concat file for the slideshow
    // Each image displays for approximately 18.5 seconds (259 seconds / 14 images)
    const slideDuration = 259 / images.length;
    let concatContent = '';
    for (let i = 0; i < images.length; i++) {
        const paddedIndex = String(i).padStart(3, '0');
        concatContent += `file 'img${paddedIndex}.jpg'\n`;
        concatContent += `duration ${slideDuration}\n`;
    }
    // Add last image again (required by concat demuxer)
    concatContent += `file 'img${String(images.length - 1).padStart(3, '0')}.jpg'\n`;

    await ff.writeFile('concat.txt', concatContent);

    onProgress?.(35, 'Encoding video...');

    // Generate the video
    const hasAudio = await ff.readFile('audio.mp3').then(() => true).catch(() => false);

    const ffmpegArgs = [
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
    ];

    if (hasAudio) {
        ffmpegArgs.push('-i', 'audio.mp3');
    }

    ffmpegArgs.push(
        '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
    );

    if (hasAudio) {
        ffmpegArgs.push(
            '-c:a', 'aac',
            '-b:a', '192k',
            '-shortest',
        );
    }

    ffmpegArgs.push('-y', 'output.mp4');

    await ff.exec(ffmpegArgs);

    onProgress?.(95, 'Finalizing...');

    // Read the output file
    const data = await ff.readFile('output.mp4');

    // Clean up
    for (let i = 0; i < images.length; i++) {
        const paddedIndex = String(i).padStart(3, '0');
        await ff.deleteFile(`img${paddedIndex}.jpg`).catch(() => { });
    }
    await ff.deleteFile('concat.txt').catch(() => { });
    await ff.deleteFile('audio.mp3').catch(() => { });
    await ff.deleteFile('output.mp4').catch(() => { });

    onProgress?.(100, 'Complete!');

    return new Blob([data.buffer], { type: 'video/mp4' });
};

/**
 * Download a blob as a file
 */
export const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
