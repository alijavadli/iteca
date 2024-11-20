import React from 'react';

export const ServiceImage = ({ images, quantity, name }) => {
    if (!images || !quantity) return null;

    const getImageForQuantity = (qty, images) => {
        const numQty = parseInt(qty, 10);
        if (numQty > 36) {
            return images.find(img => img.qty === "36")?.img;
        }
        return images.find(img => img.qty === qty.toString())?.img;
    };

    const imageUrl = getImageForQuantity(quantity, images);

    if (!imageUrl) return null;

    return (
        <div className="service-image">
            <img 
                src={imageUrl} 
                alt={`${name} - ${quantity} sq.m.`}
            />
        </div>
    );
};
