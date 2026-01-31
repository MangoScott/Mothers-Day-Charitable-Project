import { Image, X, Edit3, Sparkles } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';

export default function LyricSlot({ slot, index }) {
    const setPhoto = useVideoStore((state) => state.setPhoto);
    const removePhoto = useVideoStore((state) => state.removePhoto);
    const getPhotoForSlot = useVideoStore((state) => state.getPhotoForSlot);
    const customTitle = useVideoStore((state) => state.customTitle);
    const setCustomTitle = useVideoStore((state) => state.setCustomTitle);

    const imageUrl = getPhotoForSlot(slot.id);
    const isEditable = slot.editable === true;

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(slot.id, event.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        removePhoto(slot.id);
    };

    const handleTitleChange = (e) => {
        setCustomTitle(e.target.value);
    };

    const styles = {
        card: {
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid #f3f4f6',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease',
        },
        cardHover: {
            borderColor: '#fbcfe8',
            boxShadow: '0 8px 30px rgba(236, 72, 153, 0.1)',
        },
        header: {
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            borderBottom: '1px solid #fce7f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        sceneLabel: {
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
        },
        sceneBadge: {
            padding: '4px 10px',
            background: 'white',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#ec4899',
        },
        photoArea: {
            position: 'relative',
            aspectRatio: '16 / 9',
            background: '#f9fafb',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        removeButton: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
        },
        uploadLabel: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        uploadIcon: {
            width: '64px',
            height: '64px',
            background: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            transition: 'all 0.2s ease',
        },
        uploadText: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 4px 0',
        },
        uploadHint: {
            fontSize: '0.875rem',
            color: '#9ca3af',
            margin: 0,
        },
        lyrics: {
            padding: '16px 20px',
            background: 'white',
            borderTop: '1px solid #f3f4f6',
        },
        lyricsText: {
            fontSize: '0.9375rem',
            color: '#4b5563',
            fontStyle: 'italic',
            lineHeight: 1.6,
            margin: 0,
        },
        titleInputWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        titleInput: {
            flex: 1,
            fontSize: '0.9375rem',
            color: '#111827',
            fontWeight: '600',
            padding: '10px 14px',
            border: '2px solid #fce7f3',
            borderRadius: '10px',
            background: '#fdf2f8',
            outline: 'none',
            transition: 'all 0.2s ease',
        },
        editIcon: {
            color: '#ec4899',
            flexShrink: 0,
        },
        editHint: {
            fontSize: '0.75rem',
            color: '#9ca3af',
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        },
    };

    return (
        <div
            style={styles.card}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fbcfe8';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(236, 72, 153, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#f3f4f6';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Header */}
            <div style={styles.header}>
                <h3 style={styles.sceneLabel}>Scene {index + 1}</h3>
                <span style={styles.sceneBadge}>{slot.type}</span>
            </div>

            {/* Photo Upload Area */}
            <div style={styles.photoArea}>
                {(slot.type === 'intro' || slot.type === 'narrative' || slot.isGenerated) ? (
                    <div style={{
                        ...styles.uploadLabel,
                        background: '#fdf2f8',
                        cursor: 'default'
                    }}>
                        <div style={{
                            ...styles.uploadIcon,
                            background: '#fce7f3'
                        }}>
                            <Sparkles style={{ width: 28, height: 28, color: '#ec4899' }} />
                        </div>
                        <p style={{ ...styles.uploadText, color: '#be185d' }}>
                            {slot.type === 'intro' ? 'Title Card' : slot.type === 'narrative' ? 'Narrative Card' : 'Closing Card'}
                        </p>
                        <p style={styles.uploadHint}>
                            Auto-generated text slide
                        </p>
                    </div>
                ) : imageUrl ? (
                    <>
                        <img
                            src={imageUrl}
                            alt={`Scene ${index + 1}`}
                            style={styles.image}
                        />
                        <button
                            onClick={handleRemoveImage}
                            style={styles.removeButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fef2f2';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = '#374151';
                            }}
                        >
                            <X style={{ width: 18, height: 18 }} />
                        </button>
                    </>
                ) : (
                    <label
                        style={styles.uploadLabel}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fdf2f8';
                            const iconDiv = e.currentTarget.querySelector('.upload-icon');
                            if (iconDiv) {
                                iconDiv.style.background = '#fce7f3';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            const iconDiv = e.currentTarget.querySelector('.upload-icon');
                            if (iconDiv) {
                                iconDiv.style.background = '#f3f4f6';
                            }
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                        <div className="upload-icon" style={styles.uploadIcon}>
                            <Image style={{ width: 28, height: 28, color: '#9ca3af' }} />
                        </div>
                        <p style={styles.uploadText}>Add Photo</p>
                        <p style={styles.uploadHint}>Click to upload</p>
                    </label>
                )}
            </div>

            {/* Lyrics or Editable Title */}
            <div style={styles.lyrics}>
                {isEditable ? (
                    <>
                        <div style={styles.titleInputWrapper}>
                            <Edit3 style={{ ...styles.editIcon, width: 16, height: 16 }} />
                            <input
                                type="text"
                                value={customTitle}
                                onChange={handleTitleChange}
                                placeholder="Enter your title..."
                                style={styles.titleInput}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#ec4899';
                                    e.target.style.background = '#fff';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#fce7f3';
                                    e.target.style.background = '#fdf2f8';
                                }}
                            />
                        </div>
                        <p style={styles.editHint}>
                            ✨ This title will appear as the opening text in your video
                        </p>
                    </>
                ) : (
                    <p style={styles.lyricsText}>"{slot.lyric}"</p>
                )}
            </div>
        </div>
    );
}
