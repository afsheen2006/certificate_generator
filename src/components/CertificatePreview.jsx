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
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#1e293b';

                // Dynamic font size relative to template width
                // Reduced font size as requested
                const fontSize = Math.floor(canvas.width * 0.035);
                ctx.font = `bold ${fontSize}px 'Outfit', sans-serif`;

                // Positioned on the right side of the certificate
                const rightX = canvas.width * 0.85; // 15% from the right edge
                // Keeping the vertical position adjusted by the user
                const centerY = (canvas.height * 0.52) - 150;

                ctx.fillText(name, rightX, centerY);
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
