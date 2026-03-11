'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
    const password = formData.get('password');
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validPassword) {
        throw new Error('ADMIN_PASSWORD environment variable is not configured.');
    }

    if (password === validPassword) {
        // Set an HTTP-only cookie to mark the user as authenticated
        const cookieStore = await cookies();
        cookieStore.set('admin_auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        // Return a flag to trigger the client-side redirect
        redirect('/admin');
    } else {
        return { error: 'Invalid password' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
    redirect('/admin/login');
}
