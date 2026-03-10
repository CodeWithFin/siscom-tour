import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    // Only protect routes under /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude the login page itself to avoid redirect loops
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const authCookie = request.cookies.get('admin_auth');

        // If not authenticated, redirect to login
        if (!authCookie || authCookie.value !== 'true') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
