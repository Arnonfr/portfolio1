import React from 'react';

export const FlowerOne = ({ className }: { className?: string }) => (
    <img src="/images/flowers/flower1_top.png" className={className} alt="Flower" style={{ objectFit: 'cover', borderRadius: '50%' }} />
);

export const FlowerTwo = ({ className }: { className?: string }) => (
    <img src="/images/flowers/flower2_top.png" className={className} alt="Flower" style={{ objectFit: 'cover', borderRadius: '50%' }} />
);

export const FlowerThree = ({ className }: { className?: string }) => (
    <img src="/images/flowers/flower3_top.png" className={className} alt="Flower" style={{ objectFit: 'cover', borderRadius: '50%' }} />
);

export const FlowerFour = ({ className }: { className?: string }) => (
    <img src="/images/flowers/flower4_top.png" className={className} alt="Flower" style={{ objectFit: 'cover', borderRadius: '50%' }} />
);

export const TOP_FLOWERS = [FlowerOne, FlowerTwo, FlowerThree, FlowerFour];
