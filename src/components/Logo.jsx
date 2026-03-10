export default function Logo({ className = "h-10", alt = "Siscom Logo" }) {
    return (
        <img
            src="/logo.png"
            alt={alt}
            className={className}
        />
    );
}
