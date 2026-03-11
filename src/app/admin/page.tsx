import pool from '@/lib/db';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/admin/login/actions';
import ExportButton from './ExportButton';
import { LogOut, Users, Ticket, CreditCard, ChevronRight } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 lg:p-12 dot-pattern">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-2 h-8 bg-[#DE3163] rounded-full"></div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
                        </div>
                        <p className="text-gray-500 ml-5">Manage tour bookings and payments overview</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <ExportButton data={payments} />
                        <form action={logoutAction}>
                            <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-[#DE3163] hover:text-[#DE3163] text-gray-700 font-medium rounded-xl transition-all shadow-sm group">
                                <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                Log Out
                            </button>
                        </form>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DE3163] to-rose-400"></div>

                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-[#DE3163]" />
                            Recent Transactions
                        </h2>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            {payments.length} Records
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        {/* Desktop Table View */}
                        <table className="w-full text-left text-sm whitespace-nowrap hidden md:table">
                            <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 border-b border-gray-100 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Guest Info</th>
                                    <th className="px-6 py-4">Tour Details</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4">Added</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-gray-500 bg-gray-50/30">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <Ticket className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-base font-medium text-gray-900 mb-1">No bookings found</p>
                                                <p className="text-sm">There are no records in the database yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-rose-50/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Users className="w-4 h-4 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{payment.name || 'N/A'}</div>
                                                        <div className="text-gray-500 text-xs mt-0.5">{payment.email || 'No email'}</div>
                                                        <div className="text-gray-500 text-xs">{payment.phone_number || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-normal min-w-[200px]">
                                                <div className="font-medium text-gray-900 border-b border-dashed border-gray-200 pb-1 mb-1 inline-block">{payment.facility || 'N/A'}</div>
                                                <div className="text-gray-500 flex items-center gap-2">
                                                    <span>{payment.tour_date || 'N/A'}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <span className="font-medium text-[#DE3163]">{payment.ticket_type} (x{payment.quantity})</span>
                                                </div>
                                                {payment.is_club_member && (
                                                    <span className="inline-block mt-2 px-2 py-0.5 bg-[#DE3163]/10 text-[#DE3163] border border-[#DE3163]/20 rounded text-[10px] font-bold uppercase tracking-wider">
                                                        Club Member
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                                    <div className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</div>
                                                </div>
                                                {payment.mpesa_ref && (
                                                    <div className="text-[11px] font-mono text-gray-500 mt-1.5 uppercase bg-gray-50 px-2 py-0.5 rounded w-max border border-gray-100">
                                                        Ref: {payment.mpesa_ref}
                                                    </div>
                                                )}
                                                {payment.failure_reason && (
                                                    <div className="text-xs text-red-500 mt-1.5 max-w-xs truncate" title={payment.failure_reason}>
                                                        {payment.failure_reason}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-gray-500 font-medium">
                                                {formatDate(payment.created_at)}
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex w-max items-center gap-1.5 bg-white ${payment.status === 'success' ? 'text-emerald-700 border-emerald-200' :
                                                    payment.status === 'pending' ? 'text-amber-700 border-amber-200' :
                                                        'text-red-700 border-red-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${payment.status === 'success' ? 'bg-emerald-500' :
                                                        payment.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                                                        }`}></span>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Mobile Card View */}
                        <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50/50 border-t border-gray-100">
                            {payments.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <Ticket className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-base font-medium text-gray-900 mb-1">No bookings found</p>
                                        <p className="text-sm">There are no records in the database yet.</p>
                                    </div>
                                </div>
                            ) : (
                                payments.map((payment) => (
                                    <div key={payment.id} className="p-5 flex flex-col gap-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[#DE3163]/30 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                    <Users className="w-4 h-4 text-gray-500" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{payment.name || 'N/A'}</div>
                                                    <div className="text-gray-500 text-xs mt-0.5">{payment.email || 'No email'}</div>
                                                    <div className="text-gray-500 text-xs">{payment.phone_number || 'N/A'}</div>
                                                </div>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 bg-white shrink-0 ${payment.status === 'success' ? 'text-emerald-700 border-emerald-200' :
                                                payment.status === 'pending' ? 'text-amber-700 border-amber-200' :
                                                    'text-red-700 border-red-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${payment.status === 'success' ? 'bg-emerald-500' :
                                                    payment.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                                                    }`}></span>
                                                {payment.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                                            <div>
                                                <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Tour Details</div>
                                                <div className="font-medium text-gray-900 text-sm whitespace-normal">{payment.facility || 'N/A'}</div>
                                                <div className="text-gray-500 text-xs mt-1">{payment.tour_date || 'N/A'}</div>
                                                <div className="font-medium text-[#DE3163] text-xs mt-0.5">{payment.ticket_type} (x{payment.quantity})</div>
                                            </div>
                                            <div>
                                                <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Payment</div>
                                                <div className="font-semibold text-gray-900 text-sm flex items-center gap-1.5 whitespace-nowrap">
                                                    <CreditCard className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                    {formatCurrency(payment.amount)}
                                                </div>
                                                {payment.mpesa_ref && (
                                                    <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase truncate">
                                                        Ref: {payment.mpesa_ref}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <div className="text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Added: {formatDate(payment.created_at)}</div>
                                            {payment.is_club_member && (
                                                <span className="shrink-0 ml-2 px-2 py-0.5 bg-[#DE3163]/10 text-[#DE3163] border border-[#DE3163]/20 rounded text-[10px] font-bold uppercase tracking-wider">
                                                    Club Member
                                                </span>
                                            )}
                                        </div>

                                        {payment.failure_reason && (
                                            <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg border border-red-100 mt-1">
                                                {payment.failure_reason}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

