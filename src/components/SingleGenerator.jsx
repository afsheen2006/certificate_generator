import React, { useState, useRef } from 'react';
import CertificatePreview from './CertificatePreview';

const SingleGenerator = ({ templateImageSrc }) => {
    const [name, setName] = useState('');
    const previewRef = useRef(null);

    const handleDownload = () => {
        if (!name.trim()) {
            alert('Please enter a name first.');
            return;
        }

        if (previewRef.current) {
            const dataUrl = previewRef.current.generateDataUrl();
            if (dataUrl) {
                const link = document.createElement('a');
                link.download = `Certificate_${name.replace(/\s+/g, '_')}.png`;
                link.href = dataUrl;
                link.click();
            }
        }
    };

    return (
        <section className="view-section active">
            <div className="card form-card">
                <h2>Personalize Certificate</h2>
                <div className="input-group">
                    <label htmlFor="name-input">Full Name</label>
                    <input 
                        type="text" 
                        id="name-input" 
                        placeholder="e.g. Jane Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                <div className="action-buttons">
                    <button 
                        className="btn primary-btn" 
                        onClick={handleDownload}
                        disabled={!templateImageSrc || !name.trim()}
                    >
                        Download Certificate
                    </button>
                </div>
            </div>

            <div className="card preview-card">
                <h2>Preview</h2>
                <CertificatePreview 
                    ref={previewRef}
                    name={name} 
                    templateImageSrc={templateImageSrc} 
                />
            </div>
        </section>
    );
};

export default SingleGenerator;
