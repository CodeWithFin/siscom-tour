function onPaymentReceived(e) {
    // CONFIGURATION
    const recipientEmail = "siscom.tech@gmail.com"; // Set to your full Gmail address
    const subject = "NEW PAYMENT RECEIVED - Siscom DC Tour";

    try {
        // Get the range/row that was just added
        const range = e.range;
        const values = range.getValues()[0];
        const sheet = range.getSheet();
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

        // Build the email body dynamically from the row data
        let body = "A new payment record was added to '" + sheet.getName() + "':\n\n";

        // Loop through all headers to include every column
        for (let i = 0; i < headers.length; i++) {
            let headerName = headers[i] || "Column " + (i + 1);
            let cellValue = values[i] || "N/A";

            // Format dates if the cell contains one
            if (cellValue instanceof Date) {
                cellValue = Utilities.formatDate(cellValue, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
            }

            body += "➤ " + headerName + ": " + cellValue + "\n";
        }

        body += "\n--\nSiscom Tour Automated Notification System";

        // Send the email
        MailApp.sendEmail({
            to: recipientEmail,
            subject: subject,
            body: body
        });

        Logger.log("Payment record processed for sheet: " + sheet.getName());
    } catch (err) {
        Logger.log("Error sending email: " + err.toString());
    }
}
