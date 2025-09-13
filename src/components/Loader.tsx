import React, { useId } from "react";

type LoaderProps = {
    size?: number; // px
    strokeWidth?: number; // px
    className?: string;
    "aria-label"?: string;
    center?: boolean; // optionally center inside a flex container
};

/**
 * Multicolor loader using Tailwind CSS for animation and layout.
 * - Rotating rainbow arc with a secondary counter-rotating ring
 * - Accessible (role=status, aria-live)
 * - Respects reduced motion via Tailwind's motion-reduce utilities
 */
export const Loader: React.FC<LoaderProps> = ({
                                                  size = 56,
                                                  strokeWidth = 6,
                                                  className = "",
                                                  center = false,
                                                  "aria-label": ariaLabel = "Loading",
                                              }) => {
    const gradId = useId();
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <div
            className={`${center ? "inline-flex items-center justify-center" : ""} ${className}`}
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label={ariaLabel}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                xmlns="http://www.w3.org/2000/svg"
                className="block"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff3b3b" />
                        <stop offset="16.6%" stopColor="#ff8c3b" />
                        <stop offset="33.3%" stopColor="#ffd43b" />
                        <stop offset="50%" stopColor="#4cd964" />
                        <stop offset="66.6%" stopColor="#34c8ff" />
                        <stop offset="83.3%" stopColor="#7a5cff" />
                        <stop offset="100%" stopColor="#ff3bbd" />
                    </linearGradient>

                    <linearGradient id={`${gradId}-rot`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7a5cff" />
                        <stop offset="25%" stopColor="#34c8ff" />
                        <stop offset="50%" stopColor="#4cd964" />
                        <stop offset="75%" stopColor="#ffd43b" />
                        <stop offset="100%" stopColor="#ff3b3b" />
                    </linearGradient>

                    <mask id={`${gradId}-mask`}>
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="white"
                            strokeLinecap="round"
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${0.22 * circumference} ${0.78 * circumference}`}
                        >
                            {/* Using native SVG animation for dash offset; rotations are handled by Tailwind */}
                            <animate
                                attributeName="stroke-dashoffset"
                                values={`0; -${circumference}`}
                                dur="1.2s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </mask>
                </defs>

                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth={strokeWidth}
                />

                {/* Primary rotating ring */}
                <g className="origin-center animate-spin motion-reduce:animate-none [animation-duration:1.6s]">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={`url(#${gradId})`}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                        mask={`url(#${gradId}-mask)`}
                    />
                </g>

                {/* Secondary counter-rotating ring */}
                <g className="origin-center animate-spin motion-reduce:animate-none [animation-duration:1.6s] [animation-direction:reverse] [-animation-delay:0.2s]">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={`url(#${gradId}-rot)`}
                        strokeLinecap="round"
                        strokeWidth={Math.max(2, strokeWidth * 0.55)}
                        opacity="0.7"
                        mask={`url(#${gradId}-mask)`}
                    />
                </g>
            </svg>

            <span className="sr-only">Loading…</span>
        </div>
    );
};

export default Loader;