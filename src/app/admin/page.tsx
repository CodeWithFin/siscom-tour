import pool from '@/lib/db';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let payments: any[] = [];

    try {
        const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
        payments = result.rows;
    } catch (error) {
        console.error('Error fetching payments:', error);
    }

    // Helper to format currency
    const formatCurrency = (amount: number | string | null) => {
        if (!amount) return 'KES 0';
        return `KES ${Number(amount).toLocaleString()}`;
    };

    // Helper to format date
    const formatDate = (dateString: string | Date) => {
        try {
            return new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
            }).format(new Date(dateString));
        } catch (e) {
            return dateString?.toString() || 'N/A';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-8 dot-pattern">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-2">Manage tour bookings and payments</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50/80 uppercase text-xs font-semibold text-gray-500 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Guest Info</th>
                                    <th className="px-6 py-4">Tour Details</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4">Date Added</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No records found in the database.
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${payment.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    payment.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                        'bg-red-50 text-red-700 border-red-200'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{payment.name || 'N/A'}</div>
                                                <div className="text-gray-500">{payment.email || 'No email'}</div>
                                                <div className="text-gray-500">{payment.phone_number || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal min-w-[200px]">
                                                <div className="font-medium text-gray-900">{payment.facility || 'N/A'}</div>
                                                <div className="text-gray-500">{payment.tour_date || 'N/A'} • {payment.ticket_type} (x{payment.quantity})</div>
                                                {payment.is_club_member && (
                                                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-medium uppercase tracking-wider">
                                                        Club Member
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                                                {payment.mpesa_ref && (
                                                    <div className="text-xs font-mono text-gray-500 mt-1 uppercase">Ref: {payment.mpesa_ref}</div>
                                                )}
                                                {payment.failure_reason && (
                                                    <div className="text-xs text-red-500 mt-1 max-w-xs truncate" title={payment.failure_reason}>
                                                        {payment.failure_reason}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {formatDate(payment.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

