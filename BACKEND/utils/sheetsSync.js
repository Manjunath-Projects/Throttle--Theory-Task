const { google } = require('googleapis');
const path = require('path');
// Use only the sheet ID, not the full URL
const SHEET_ID = '1go_c-0ZX9OjKvAMrxElz6q9LZNCxGKRHnMVIWB7dDCw';

// Path to your service account key file (relative to this file)
const KEYFILEPATH = path.join(__dirname, 'throttle-theory-467010-d19076d9342c.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

async function appendRowToSheet(row) {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1', // Change to your sheet name if needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [row],
      },
    });
  } catch (err) {
    console.error('Google Sheets sync error:', err.message);
  }
}

module.exports = appendRowToSheet;