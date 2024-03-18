import React from 'react';

function ImagePreview({ imageUrl }) {
    const handleImageError = () => {
        console.error('Failed to load image: ' + imageUrl);
    };

    return (
        <div>
            <img src={imageUrl} alt="Uploaded" onError={handleImageError} style={{width: '200px', height: '200px'}} />
        </div>
    );
}

export default ImagePreview;