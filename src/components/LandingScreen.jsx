import { Heart, Music, Download, Upload, Sparkles, Play } from 'lucide-react';
import useVideoStore from '../store/useVideoStore';

export default function LandingScreen() {
    const handleStartClick = () => {
        useVideoStore.setState({ currentScreen: 'storyboard' });
    };

    // Inline styles to ensure they render correctly
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%)',
            position: 'relative',
            overflow: 'hidden',
        },
        decorBlob1: {
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '280px',
            height: '280px',
            background: '#fbcfe8',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.4,
        },
        decorBlob2: {
            position: 'absolute',
            top: '160px',
            right: '80px',
            width: '380px',
            height: '380px',
            background: '#fecdd3',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.3,
        },
        decorBlob3: {
            position: 'absolute',
            bottom: '80px',
            left: '33%',
            width: '320px',
            height: '320px',
            background: '#fef3c7',
            borderRadius: '50%',
            filter: 'blur(90px)',
            opacity: 0.35,
        },
        content: {
            position: 'relative',
            zIndex: 10,
        },
        heroSection: {
            paddingTop: '80px',
            paddingBottom: '100px',
            paddingLeft: '24px',
            paddingRight: '24px',
        },
        heroInner: {
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid #fce7f3',
            marginBottom: '48px',
        },
        badgeText: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            margin: 0,
        },
        title: {
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            lineHeight: 1.1,
        },
        titleMain: {
            color: '#111827',
            display: 'block',
        },
        titleGradient: {
            display: 'block',
            color: '#dc2626',
            marginTop: '8px',
        },
        subtitle: {
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: '#4b5563',
            maxWidth: '640px',
            margin: '0 auto 16px',
            lineHeight: 1.6,
        },
        tagline: {
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '48px',
        },
        ctaButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '20px 48px',
            background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '700',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
            transition: 'all 0.3s ease',
        },
        statsRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '48px',
            flexWrap: 'wrap',
        },
        statItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#6b7280',
        },
        statDot: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#34d399',
        },
        stepsSection: {
            padding: '80px 24px',
        },
        stepsInner: {
            maxWidth: '1100px',
            margin: '0 auto',
        },
        sectionHeader: {
            textAlign: 'center',
            marginBottom: '64px',
        },
        sectionTitle: {
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '16px',
        },
        sectionSubtitle: {
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '560px',
            margin: '0 auto',
        },
        cardsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
        },
        card: {
            position: 'relative',
            background: 'white',
            borderRadius: '24px',
            padding: '40px 32px 32px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f3f4f6',
            transition: 'all 0.3s ease',
        },
        cardNumber: {
            position: 'absolute',
            top: '-16px',
            left: '32px',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '16px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        },
        cardIconWrapper: {
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '12px',
        },
        cardText: {
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: 1.6,
            margin: 0,
        },
        privacySection: {
            padding: '48px 24px 80px',
        },
        privacyBox: {
            maxWidth: '640px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
            borderRadius: '16px',
            padding: '24px 32px',
            border: '1px solid #d1fae5',
        },
        privacyInner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
        },
        privacyIcon: {
            width: '48px',
            height: '48px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            flexShrink: 0,
        },
        privacyTitle: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 4px 0',
        },
        privacyText: {
            fontSize: '0.875rem',
            color: '#4b5563',
            margin: 0,
        },
    };

    return (
        <div style={styles.container}>
            {/* Decorative blobs */}
            <div style={styles.decorBlob1}></div>
            <div style={styles.decorBlob2}></div>
            <div style={styles.decorBlob3}></div>

            <div style={styles.content}>
                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <div style={styles.heroInner}>
                        {/* Badge */}
                        <div style={styles.badge}>
                            <Heart style={{ width: 16, height: 16, color: '#dc2626', fill: '#dc2626' }} />
                            <span style={styles.badgeText}>A Mother's Day Charitable Project</span>
                            <Sparkles style={{ width: 16, height: 16, color: '#f59e0b' }} />
                        </div>

                        {/* Title */}
                        <h1 style={styles.title}>
                            <span style={{ ...styles.titleMain, color: '#dc2626' }}>A Mother’s Day Story Card</span>
                            <span style={{ fontSize: '0.5em', display: 'block', marginTop: '16px', fontWeight: '400', color: '#374151' }}>made especially for YOU</span>
                        </h1>

                        {/* Subtitle */}
                        <p style={styles.subtitle}>
                            Create a heartfelt tribute video for Mom in minutes
                        </p>
                        <p style={styles.tagline}>
                            Upload your favorite photos, sync them to a beautiful song, and share the love ❤️
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={handleStartClick}
                            style={styles.ctaButton}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 24px 50px rgba(236, 72, 153, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.3)';
                            }}
                        >
                            <Play style={{ width: 20, height: 20, fill: 'white' }} />
                            Start Creating
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>

                        {/* Stats */}
                        <div style={styles.statsRow}>
                            <div style={styles.statItem}>
                                <span style={styles.statDot}></span>
                                <span>100% Free</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statDot}></span>
                                <span>No Sign-up Required</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statDot}></span>
                                <span>Processed Locally</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section style={styles.stepsSection}>
                    <div style={styles.stepsInner}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>How It Works</h2>
                            <p style={styles.sectionSubtitle}>
                                Create your personalized tribute in three simple steps
                            </p>
                        </div>

                        <div style={styles.cardsGrid}>
                            {/* Step 1 */}
                            <div style={styles.card}>
                                <div style={{ ...styles.cardNumber, background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>1</div>
                                <div style={{ ...styles.cardIconWrapper, background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' }}>
                                    <Upload style={{ width: 32, height: 32, color: '#db2777' }} />
                                </div>
                                <h3 style={styles.cardTitle}>Upload Photos</h3>
                                <p style={styles.cardText}>
                                    Add 14 of your favorite moments to match each lyric of the song
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div style={styles.card}>
                                <div style={{ ...styles.cardNumber, background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}>2</div>
                                <div style={{ ...styles.cardIconWrapper, background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)' }}>
                                    <Music style={{ width: 32, height: 32, color: '#9333ea' }} />
                                </div>
                                <h3 style={styles.cardTitle}>Preview & Arrange</h3>
                                <p style={styles.cardText}>
                                    Watch your photos sync perfectly to Wendy's Song with smooth transitions
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div style={styles.card}>
                                <div style={{ ...styles.cardNumber, background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>3</div>
                                <div style={{ ...styles.cardIconWrapper, background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}>
                                    <Download style={{ width: 32, height: 32, color: '#d97706' }} />
                                </div>
                                <h3 style={styles.cardTitle}>Download & Share</h3>
                                <p style={styles.cardText}>
                                    Get a high-quality MP4 video ready to share with Mom on her special day
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Privacy */}
                <section style={styles.privacySection}>
                    <div style={styles.privacyBox}>
                        <div style={styles.privacyInner}>
                            <div style={styles.privacyIcon}>
                                <svg width="24" height="24" fill="#059669" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p style={styles.privacyTitle}>Your Privacy is Protected</p>
                                <p style={styles.privacyText}>All processing happens in your browser — your photos never leave your device</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
