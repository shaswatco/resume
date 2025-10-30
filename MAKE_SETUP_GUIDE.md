# Make.com + Google Sheets Integration Guide

This guide will help you automatically sync waitlist email submissions from your Outskill landing page to a Google Sheet using Make.com (formerly Integromat).

## Overview

When a user submits their email on your landing page:
1. Email is saved to Supabase database
2. A webhook is triggered to Make.com
3. Make.com automatically adds the email to your Google Sheet

---

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Outskill Waitlist"
3. Add these column headers in Row 1:
   - Column A: **Email**
   - Column B: **ID**
   - Column C: **Submitted At**
   - Column D: **Timestamp**

---

## Step 2: Set Up Make.com Scenario

### 2.1 Create a Make.com Account
1. Go to [Make.com](https://www.make.com)
2. Sign up for a free account (includes 1,000 operations/month)

### 2.2 Create a New Scenario
1. Click **"Create a new scenario"**
2. You'll see a blank canvas with a "+" button

### 2.3 Add Webhook Module (Trigger)
1. Click the **"+"** button
2. Search for **"Webhooks"**
3. Select **"Custom webhook"**
4. Click **"Create a webhook"**
5. Give it a name: `Outskill Waitlist`
6. Click **"Save"**
7. **Copy the webhook URL** that appears (it will look like: `https://hook.us1.make.com/xxxxxxxxxx`)

### 2.4 Add Google Sheets Module (Action)
1. Click the **"+"** button after the webhook
2. Search for **"Google Sheets"**
3. Select **"Add a row"**
4. Connect your Google account when prompted
5. Configure the module:
   - **Spreadsheet**: Select "Outskill Waitlist"
   - **Sheet**: Sheet1
   - **Values**: Map the fields as follows:
     - Column A (Email): Click and select `email` from webhook data
     - Column B (ID): Click and select `id` from webhook data
     - Column C (Submitted At): Click and select `created_at` from webhook data
     - Column D (Timestamp): Click and select `timestamp` from webhook data

### 2.5 Save and Activate
1. Click **"Save"** (bottom left)
2. Toggle the switch to **"ON"** (bottom left)
3. Your scenario is now active!

---

## Step 3: Configure Your Supabase Edge Function

You need to add the Make.com webhook URL as an environment variable.

### Option A: Using Supabase CLI (Recommended)

```bash
# Set the webhook URL
supabase secrets set MAKE_WEBHOOK_URL=https://hook.us1.make.com/xxxxxxxxxx
```

### Option B: Using Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Edge Functions**
4. Click **"Manage secrets"**
5. Add a new secret:
   - **Name**: `MAKE_WEBHOOK_URL`
   - **Value**: Your Make.com webhook URL (the one you copied earlier)
6. Click **"Save"**

---

## Step 4: Test the Integration

### 4.1 Test Webhook in Make.com
1. In your Make.com scenario, right-click the webhook module
2. Select **"Run this module only"**
3. Make.com will listen for incoming data

### 4.2 Submit a Test Email
1. Go to your Outskill landing page
2. Scroll to the email form
3. Enter a test email (e.g., `test@example.com`)
4. Click **"Get Shortlisted"**

### 4.3 Verify in Make.com
1. You should see the webhook receive data
2. The Google Sheets module should execute
3. Check your Google Sheet - the email should appear!

### 4.4 Verify in Google Sheets
Open your "Outskill Waitlist" spreadsheet and verify the new row was added with:
- Email address
- Database ID
- Created timestamp
- Current timestamp

---

## Troubleshooting

### Webhook Not Receiving Data
- Make sure your scenario is **ON** (active)
- Verify the `MAKE_WEBHOOK_URL` environment variable is set correctly in Supabase
- Check that the webhook URL is correct (no extra spaces or characters)

### Emails Not Appearing in Google Sheets
- Verify the Google Sheets module is configured correctly
- Check that the column mappings match the webhook data
- Make sure Make.com has permission to access your Google Sheet

### Duplicate Emails
- The database prevents duplicate emails, so only the first submission will be saved
- If testing, use different email addresses each time

### Environment Variable Not Working
- After setting the `MAKE_WEBHOOK_URL`, you may need to redeploy the edge function
- Check Supabase logs for any errors

---

## Advanced: Add Email Notifications

You can extend your Make.com scenario to also send confirmation emails:

1. After the Google Sheets module, add another module
2. Search for your email provider (Gmail, SendGrid, Mailchimp, etc.)
3. Configure it to send a welcome email to the submitted email address
4. Save and test!

---

## Data Structure

The webhook sends this JSON data to Make.com:

```json
{
  "email": "user@example.com",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2025-10-30T14:30:00.000Z",
  "timestamp": "2025-10-30T14:30:00.123Z"
}
```

---

## Cost & Limits

### Make.com Free Plan:
- 1,000 operations per month
- Each email submission = 2 operations (webhook + Google Sheets)
- = **500 email submissions per month** on free plan

### Upgrading:
If you exceed the free limit, Make.com paid plans start at $9/month for 10,000 operations.

---

## Security Notes

- The webhook URL should be kept private
- Supabase environment variables are encrypted
- Make.com connections are secure (HTTPS)
- Google Sheets can be set to private (only you can access)

---

## Alternative: Direct Google Sheets API

If you prefer not to use Make.com, you can also integrate directly with Google Sheets API by modifying the edge function. However, Make.com is recommended for easier setup and maintenance.

---

## Support

- **Make.com Help**: https://www.make.com/en/help
- **Google Sheets API**: https://developers.google.com/sheets
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions

---

## Summary

✅ Edge function now sends webhook data to Make.com
✅ Make.com automatically adds emails to Google Sheets
✅ Real-time sync with every submission
✅ No code changes needed after initial setup
✅ Free for up to 500 submissions per month

Your waitlist emails will now automatically populate in Google Sheets in real-time!
