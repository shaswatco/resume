import { useState, useEffect } from 'react';
import { Download, RefreshCw, Mail, Calendar, Users } from 'lucide-react';
import { GoogleSheetsSync } from './GoogleSheetsSync';

interface Submission {
  id: string;
  email: string;
  created_at: string;
}

export function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/waitlist_submissions?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const exportToCSV = () => {
    const headers = ['Email', 'Submitted At', 'ID'];
    const rows = submissions.map(sub => [
      sub.email,
      new Date(sub.created_at).toLocaleString(),
      sub.id
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2A] to-[#1a2a3a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Waitlist Dashboard
          </h1>
          <p className="text-gray-400">
            Track and manage your email submissions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-[#2762ea]" />
              <h3 className="text-white font-bold text-lg">Total Submissions</h3>
            </div>
            <p className="text-4xl font-black text-white">{submissions.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-[#2762ea]" />
              <h3 className="text-white font-bold text-lg">Latest Signup</h3>
            </div>
            <p className="text-lg text-white">
              {submissions.length > 0 ? formatDate(submissions[0].created_at).split(',')[0] : 'No data'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-[#2762ea]" />
              <h3 className="text-white font-bold text-lg">Actions</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchSubmissions}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                disabled={submissions.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#2762ea] text-white rounded-lg hover:bg-[#1e4db8] transition-colors disabled:opacity-50 text-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <GoogleSheetsSync submissions={submissions} />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold">Email</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Submitted At</th>
                  <th className="px-6 py-4 text-left text-white font-bold">ID</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading submissions...
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                      No submissions yet
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission, index) => (
                    <tr
                      key={submission.id}
                      className={`border-t border-white/10 ${
                        index % 2 === 0 ? 'bg-white/5' : ''
                      } hover:bg-white/10 transition-colors`}
                    >
                      <td className="px-6 py-4 text-white">{submission.email}</td>
                      <td className="px-6 py-4 text-gray-300">{formatDate(submission.created_at)}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                        {submission.id.slice(0, 8)}...
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div id="setup-guide" className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Google Sheets Setup Guide</h2>

          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Step 1: Create Your Google Sheet</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to Google Sheets and create a new spreadsheet</li>
                <li>Name it "RefineCV Waitlist"</li>
                <li>Add these headers in Row 1: Email, Submitted At, ID, Timestamp</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Step 2: Create Apps Script</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>In your Google Sheet, click Extensions → Apps Script</li>
                <li>Delete any existing code</li>
                <li>Copy and paste the code below</li>
                <li>Click Save (disk icon)</li>
              </ol>

              <div className="mt-3 bg-black/30 rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono whitespace-pre">
{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    if (data.submissions && Array.isArray(data.submissions)) {
      data.submissions.forEach(function(submission) {
        sheet.appendRow([
          submission.email,
          submission.submitted_at,
          submission.id,
          submission.timestamp
        ]);
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({success: true})
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Step 3: Deploy as Web App</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click Deploy → New deployment</li>
                <li>Click the gear icon and select "Web app"</li>
                <li>Set "Execute as" to "Me"</li>
                <li>Set "Who has access" to "Anyone"</li>
                <li>Click Deploy</li>
                <li>Copy the Web App URL (starts with https://script.google.com/macros/s/...)</li>
                <li>Paste it in the sync box above</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Step 4: Test the Sync</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Paste your Web App URL in the sync box above</li>
                <li>Click "Sync Submissions"</li>
                <li>Check your Google Sheet - all emails should appear!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-[#2762ea] hover:text-[#5b8ef7] transition-colors"
          >
            Back to Landing Page
          </a>
        </div>
      </div>
    </div>
  );
}
