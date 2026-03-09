"use client";
import { useId } from 'react';

export default function Logo({ className = "h-12 w-auto", alt = "Siscom Logo" }) {
    return (
        <img
            src="/logo.png"
            alt={alt}
            className={className}
        />
    );
}
