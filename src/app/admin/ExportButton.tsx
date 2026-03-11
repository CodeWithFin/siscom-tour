'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

export default function ExportButton({ data }: { data: any[] }) {
    const [isExporting, setIsExporting] = useState(false);

    const exportToCsv = () => {
        if (!data || data.length === 0) return;
        setIsExporting(true);

        try {
            // Define CSV headers
            const headers = [
                'Status',
                'Name',
                'Email',
                'Phone',
                'Facility',
                'Tour Date',
                'Ticket Type',
                'Quantity',
                'Club Member',
                'Amount (KES)',
                'M-Pesa Ref',
                'Failure Reason',
                'Date Added',
            ];

            // Map data to CSV rows
            const csvRows = data.map((payment) => {
                return [
                    payment.status || '',
                    `"${(payment.name || '').replace(/"/g, '""')}"`,
                    `"${(payment.email || '').replace(/"/g, '""')}"`,
                    `"${(payment.phone_number || '').replace(/"/g, '""')}"`,
                    `"${(payment.facility || '').replace(/"/g, '""')}"`,
                    `"${(payment.tour_date || '').replace(/"/g, '""')}"`,
                    `"${(payment.ticket_type || '').replace(/"/g, '""')}"`,
                    payment.quantity || '',
                    payment.is_club_member ? 'Yes' : 'No',
                    payment.amount || '',
                    `"${(payment.mpesa_ref || '').replace(/"/g, '""')}"`,
                    `"${(payment.failure_reason || '').replace(/"/g, '""')}"`,
                    `"${new Date(payment.created_at).toLocaleString()}"`,
                ].join(',');
            });

            // Combine headers and rows
            const csvString = [headers.join(','), ...csvRows].join('\n');

            // Create blob and download link
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.setAttribute('href', url);
            link.setAttribute('download', `siscom_tour_records_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting CSV:', error);
        } finally {
            setTimeout(() => setIsExporting(false), 500);
        }
    };

    return (
        <button
            onClick={exportToCsv}
            disabled={isExporting || data.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#DE3163] hover:bg-[#c92a58] text-white font-medium rounded-xl transition-all shadow-sm shadow-[#DE3163]/20 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            {isExporting ? 'Exporting...' : 'Export to Sheet'}
        </button>
    );
}
