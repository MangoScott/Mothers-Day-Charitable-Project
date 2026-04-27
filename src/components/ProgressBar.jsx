import React from 'react';

const ProgressBar = ({ progress, message }) => {
    return (
        <div className="w-full">
            <div className="relative h-2 overflow-hidden rounded-full bg-ink-100">
                <div
                    className="relative h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 transition-all duration-500 ease-spring"
                    style={{ width: `${progress}%` }}
                >
                    <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] animate-[shimmer-keyframes_2.6s_linear_infinite]" />
                </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[13px] tabular">
                <span className="text-ink-500">{message || 'Processing…'}</span>
                <span className="font-semibold text-ink-800">{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
