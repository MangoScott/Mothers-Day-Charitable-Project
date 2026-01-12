import React from 'react';

const ProgressBar = ({ progress, message }) => {
    return (
        <div className="w-full">
            {/* Progress bar container */}
            <div className="h-4 bg-white/70 rounded-full overflow-hidden shadow-inner mb-3">
                <div
                    className="h-full bg-gradient-to-r from-highlight via-accent to-rose-400 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-warm/70">{message || 'Processing...'}</span>
                <span className="font-medium text-accent">{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
