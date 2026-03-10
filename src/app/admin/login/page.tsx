'use client';

import { useState, useActionState } from 'react';
import { loginAction } from './actions';

export default function AdminLogin() {
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dot-pattern">
            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Login</h1>
                    <p className="text-sm text-gray-500 mt-2">Enter credentials to access the dashboard</p>
                </div>

                <form action={action} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DE3163]/20 focus:border-[#DE3163] transition-all"
                            placeholder="Enter admin password"
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 px-4 bg-[#DE3163] hover:bg-[#c92a58] text-white rounded-xl font-medium transition-all shadow-md shadow-[#DE3163]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
