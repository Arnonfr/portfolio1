import React from 'react';

const SvgRoot = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className}>
        <g transform="translate(100, 100)">
            {children}
        </g>
    </svg>
);

export const FlowerOne = ({ className }: { className?: string }) => (
    <SvgRoot className={className}>
        {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} transform={`rotate(${i * (360 / 14)})`} d="M0,0 C-15,-30 -20,-70 0,-90 C20,-70 15,-30 0,0" fill="#6b77c5" opacity="0.9" />
        ))}
        <circle r="15" fill="#322b64" />
    </SvgRoot>
);

export const FlowerTwo = ({ className }: { className?: string }) => (
    <SvgRoot className={className}>
        {Array.from({ length: 10 }).map((_, i) => (
            <path key={i} transform={`rotate(${i * 36})`} d="M0,0 Q-25,-40 0,-95 Q25,-40 0,0" fill="#c9899a" opacity="0.9" />
        ))}
        <circle r="20" fill="#4a3f3f" />
    </SvgRoot>
);

export const FlowerThree = ({ className }: { className?: string }) => (
    <SvgRoot className={className}>
        {Array.from({ length: 12 }).map((_, i) => (
            <path key={'outer' + i} transform={`rotate(${i * 30})`} d="M0,0 C-25,-30 -35,-80 0,-95 C35,-80 25,-30 0,0" fill="#9e8fb8" opacity="0.9" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
            <path key={'inner' + i} transform={`rotate(${i * 30 + 15})`} d="M0,0 C-15,-20 -20,-50 0,-60 C20,-50 15,-20 0,0" fill="#b08d9e" opacity="0.9" />
        ))}
        <circle r="12" fill="#2d2424" />
    </SvgRoot>
);

export const FlowerFour = ({ className }: { className?: string }) => (
    <SvgRoot className={className}>
        {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} transform={`rotate(${i * 45})`} d="M0,0 C-35,-10 -45,-80 0,-90 C45,-80 35,-10 0,0" fill="#7a9e7a" opacity="0.9" />
        ))}
        <circle r="22" fill="#aa9999" />
    </SvgRoot>
);

export const TOP_FLOWERS = [FlowerOne, FlowerTwo, FlowerThree, FlowerFour];
