import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface Submission {
  id: string;
  email: string;
  created_at: string;
}

interface GoogleSheetsSyncProps {
  submissions: Submission[];
}

export function GoogleSheetsSync({ submissions }: GoogleSheetsSyncProps) {
  const [sheetUrl, setSheetUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSync = async () => {
    if (!sheetUrl.trim()) {
      setErrorMessage('Please enter a Google Sheets URL');
      setSyncStatus('error');
      return;
    }

    setIsSyncing(true);
    setSyncStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissions: submissions.map(sub => ({
            email: sub.email,
            submitted_at: new Date(sub.created_at).toLocaleString(),
            id: sub.id,
            timestamp: new Date().toISOString(),
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync with Google Sheets');
      }

      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to sync with Google Sheets');
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <Upload className="w-6 h-6 text-[#2762ea]" />
        <h3 className="text-white font-bold text-lg">Sync to Google Sheets</h3>
      </div>

      <p className="text-gray-300 text-sm mb-4">
        Paste your Google Apps Script Web App URL below to sync all submissions directly to Google Sheets.
      </p>

      <div className="space-y-3">
        <input
          type="url"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          placeholder="https://script.google.com/macros/s/..."
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2762ea]"
        />

        <button
          onClick={handleSync}
          disabled={isSyncing || submissions.length === 0}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2762ea] text-white font-semibold rounded-lg hover:bg-[#1e4db8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSyncing ? (
            <>
              <Upload className="w-5 h-5 animate-pulse" />
              Syncing {submissions.length} submissions...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Sync {submissions.length} Submissions
            </>
          )}
        </button>

        {syncStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 text-sm">Successfully synced to Google Sheets!</p>
          </div>
        )}

        {syncStatus === 'error' && (
          <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <p className="text-gray-400 text-xs">
          Don't have a Web App URL yet?{' '}
          <a
            href="#setup-guide"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('setup-guide')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#2762ea] hover:underline"
          >
            View setup instructions below
          </a>
        </p>
      </div>
    </div>
  );
}
