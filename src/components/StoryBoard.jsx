import { ArrowLeft, Eye } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';
import LyricSlot from './LyricSlot';
import { lyricSlots } from '../utils/lyricsData';

export default function StoryBoard() {
    const photos = useVideoStore((state) => state.photos);
    const getUploadedCount = useVideoStore((state) => state.getUploadedCount);
    const hasAllPhotosFunc = useVideoStore((state) => state.hasAllPhotos);

    const progress = getUploadedCount();
    const hasAllPhotos = hasAllPhotosFunc();
    const slots = lyricSlots;

    const handleGoBack = () => {
        useVideoStore.setState({ currentScreen: 'landing' });
    };

    const handlePreview = () => {
        useVideoStore.setState({ currentScreen: 'preview' });
    };

    const handleGenerate = () => {
        if (hasAllPhotos) {
            useVideoStore.setState({ currentScreen: 'rendering' });
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%)',
        },
        header: {
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #f3f4f6',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        },
        headerInner: {
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '20px 24px',
        },
        headerTop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
        },
        headerLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
        },
        backButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            color: '#374151',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        titleBlock: {},
        title: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
        },
        subtitle: {
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: '4px 0 0 0',
        },
        progressBlock: {
            textAlign: 'right',
        },
        progressLabel: {
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: '0 0 4px 0',
        },
        progressCount: {
            fontSize: '2rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
        },
        progressBar: {
            height: '8px',
            background: '#f3f4f6',
            borderRadius: '9999px',
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
            borderRadius: '9999px',
            transition: 'width 0.4s ease',
        },
        main: {
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '40px 24px 120px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
        },
        actionBar: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid #f3f4f6',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
        },
        actionBarInner: {
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '20px 24px',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
        },
        previewButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 28px',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '14px',
            color: '#374151',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        generateButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 32px',
            background: hasAllPhotos
                ? 'linear-gradient(135deg, #ec4899, #f43f5e)'
                : '#e5e7eb',
            border: 'none',
            borderRadius: '14px',
            color: hasAllPhotos ? 'white' : '#9ca3af',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: hasAllPhotos ? 'pointer' : 'not-allowed',
            boxShadow: hasAllPhotos ? '0 10px 30px rgba(236, 72, 153, 0.3)' : 'none',
            transition: 'all 0.2s ease',
        },
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerInner}>
                    <div style={styles.headerTop}>
                        <div style={styles.headerLeft}>
                            <button
                                onClick={handleGoBack}
                                style={styles.backButton}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#f9fafb';
                                    e.currentTarget.style.borderColor = '#d1d5db';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                }}
                            >
                                <ArrowLeft style={{ width: 18, height: 18 }} />
                                Back
                            </button>
                            <div style={styles.titleBlock}>
                                <h1 style={styles.title}>Your Storyboard</h1>
                                <p style={styles.subtitle}>Add photos to bring your story to life</p>
                            </div>
                        </div>
                        <div style={styles.progressBlock}>
                            <p style={styles.progressLabel}>Progress</p>
                            <p style={styles.progressCount}>{progress}/14</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={styles.progressBar}>
                        <div
                            style={{
                                ...styles.progressFill,
                                width: `${(progress / 14) * 100}%`
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Photo Grid */}
            <main style={styles.main}>
                <div style={styles.grid}>
                    {slots.map((slot, index) => (
                        <LyricSlot key={slot.id} slot={slot} index={index} />
                    ))}
                </div>
            </main>

            {/* Action Bar */}
            <footer style={styles.actionBar}>
                <div style={styles.actionBarInner}>
                    <button
                        onClick={handlePreview}
                        style={styles.previewButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                    >
                        <Eye style={{ width: 20, height: 20 }} />
                        Preview Video
                    </button>

                    <button
                        onClick={handleGenerate}
                        disabled={!hasAllPhotos}
                        style={styles.generateButton}
                        onMouseEnter={(e) => {
                            if (hasAllPhotos) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 14px 40px rgba(236, 72, 153, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (hasAllPhotos) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.3)';
                            }
                        }}
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Generate & Download
                    </button>
                </div>
            </footer>
        </div>
    );
}
