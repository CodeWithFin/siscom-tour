import { useId } from 'react';

export default function Logo({ className = "h-12 w-auto", color = "currentColor" }) {
    const id = useId();
    const patternId = `striped-pattern-${id.replace(/:/g, '')}`;
    const maskId = `text-mask-${id.replace(/:/g, '')}`;

    return (
        <svg
            viewBox="0 0 240 50"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <pattern id={patternId} x="0" y="0" width="1" height="8" patternUnits="userSpaceOnUse">
                    <rect width="1" height="4" fill={color} />
                    <rect y="4" width="1" height="4" fill="transparent" />
                </pattern>
                <mask id={maskId}>
                    <text
                        x="0"
                        y="42"
                        fontFamily="Syne, sans-serif"
                        fontWeight="900"
                        fontSize="50"
                        fill="white"
                        letterSpacing="-2"
                    >
                        SISCOM
                    </text>
                </mask>
            </defs>

            {/* Background with stripes masked by the text */}
            <rect
                width="100%"
                height="100%"
                fill={color}
                mask={`url(#${maskId})`}
            />

            {/* Adding the horizontal stripes effect by layering */}
            <rect
                width="100%"
                height="100%"
                mask={`url(#${maskId})`}
                fill={`url(#${patternId})`}
            />
        </svg>
    );
}
