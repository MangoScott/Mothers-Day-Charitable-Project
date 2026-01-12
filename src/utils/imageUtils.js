// Image processing utilities

/**
 * Load an image from a file and return it as an HTMLImageElement
 */
export const loadImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Crop and resize an image to fit 1280x720 (16:9) with center crop
 */
export const cropToCenter = async (file, targetWidth = 1280, targetHeight = 720) => {
    const img = await loadImage(file);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    // Calculate the aspect ratios
    const targetAspect = targetWidth / targetHeight;
    const imgAspect = img.width / img.height;

    let sourceX, sourceY, sourceWidth, sourceHeight;

    if (imgAspect > targetAspect) {
        // Image is wider than target - crop horizontally
        sourceHeight = img.height;
        sourceWidth = img.height * targetAspect;
        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
    } else {
        // Image is taller than target - crop vertically
        sourceWidth = img.width;
        sourceHeight = img.width / targetAspect;
        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
    }

    // Draw the cropped image
    ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, targetWidth, targetHeight
    );

    return canvas.toDataURL('image/jpeg', 0.9);
};

/**
 * Create a thumbnail from a data URL
 */
export const createThumbnail = async (dataUrl, maxWidth = 200, maxHeight = 150) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = dataUrl;
    });
};

/**
 * Convert data URL to Blob
 */
export const dataURLToBlob = (dataUrl) => {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }

    return new Blob([array], { type: mime });
};

/**
 * Convert data URL to Uint8Array for ffmpeg
 */
export const dataURLToUint8Array = (dataUrl) => {
    const parts = dataUrl.split(',');
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }

    return array;
};
