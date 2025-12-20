import { ImageResponse } from 'next/og';
import { portfolioData } from '@/constants/data';

export const alt = 'Chandraprakash Nyaupane | MERN & App Developer';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#040404',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                    padding: '80px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        background: '#6366f1',
                        borderRadius: '100%',
                        filter: 'blur(100px)',
                        opacity: 0.2,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-100px',
                        width: '400px',
                        height: '400px',
                        background: '#f43f5e',
                        borderRadius: '100%',
                        filter: 'blur(100px)',
                        opacity: 0.1,
                    }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '8px', color: '#6366f1', marginBottom: '20px', textTransform: 'uppercase' }}>
                        Portfolio Artifact
                    </div>
                    <div style={{ fontSize: '80px', fontWeight: 900, textAlign: 'center', lineHeight: 1.1, marginBottom: '20px' }}>
                        {portfolioData.name}
                    </div>
                    <div style={{ fontSize: '32px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                        {portfolioData.title}
                    </div>
                </div>

                <div style={{ display: 'flex', marginTop: '60px', gap: '20px' }}>
                    {['React', 'React Native', 'Node.js', 'MongoDB'].map(skill => (
                        <div key={skill} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', fontSize: '18px' }}>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
