import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const CertificatePreview = forwardRef(({ name, templateImageSrc }, ref) => {
    const canvasRef = useRef(null);

    // Expose the generateDataUrl function to parent components
    useImperativeHandle(ref, () => ({
        generateDataUrl: () => {
            if (canvasRef.current) {
                return canvasRef.current.toDataURL('image/png');
            }
            return null;
        }
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!templateImageSrc) {
            // Draw placeholder if no template
            canvas.width = 800;
            canvas.height = 600;
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#333';
            ctx.font = '24px Outfit';
            ctx.textAlign = 'center';
            ctx.fillText('Please upload a template image first.', canvas.width / 2, canvas.height / 2);
            return;
        }

        const img = new Image();
        img.src = templateImageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw Background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Draw Name
            if (name && name.trim() !== '') {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#1e293b'; 
                
                // Dynamic font size relative to template width
                // Reduced font size as requested
                const fontSize = Math.floor(canvas.width * 0.035);
                ctx.font = `bold ${fontSize}px 'Outfit', sans-serif`;
                
                // Moved slightly to the right as requested
                const centerX = canvas.width * 0.52;
                // Positioned specifically for the provided Google template
                // Moved downwards as requested
                const centerY = canvas.height * 0.52; 
                
                ctx.fillText(name, centerX, centerY);
            }
        };
    }, [name, templateImageSrc]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} />
        </div>
    );
});

export default CertificatePreview;
