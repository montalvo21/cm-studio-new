import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

/**
 * POST /api/contact
 *
 * Saves contact form submissions to Google Sheets and sends an email notification.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Cloud project at https://console.cloud.google.com
 * 2. Enable the Google Sheets API
 * 3. Create a Service Account and download the JSON key
 * 4. Share your Google Sheet with the service account email (Editor access)
 * 5. Add environment variables:
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *    - GOOGLE_PRIVATE_KEY
 *    - GOOGLE_SHEET_ID
 *    - GMAIL_USER
 *    - GMAIL_APP_PASSWORD
 *    - CONTACT_NOTIFICATION_EMAIL (optional, defaults to GMAIL_USER)
 */

type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  locale: string;
  source: string;
};

type SanitizedPayload = {
  date: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  language: string;
  source: string;
};

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '').slice(0, 1000);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function appendLeadToGoogleSheet(payload: SanitizedPayload) {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.error('[CM Studio] Missing Google Sheets environment variables:', {
      hasSheetId: Boolean(SHEET_ID),
      hasServiceAccountEmail: Boolean(SERVICE_ACCOUNT_EMAIL),
      hasPrivateKey: Boolean(PRIVATE_KEY),
    });

    throw new Error('Google Sheets integration is not configured correctly.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: SERVICE_ACCOUNT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:L',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        payload.date,
        payload.name,
        payload.company,
        payload.email,
        payload.phone,
        payload.service,
        payload.budget,
        payload.message,
        payload.language,
        payload.source,
        'New',
        '',
      ]],
    },
  });
}

async function sendNotificationEmail(payload: SanitizedPayload) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword || !notificationEmail) {
    console.warn('[CM Studio] Email notification skipped. Missing email environment variables:', {
      hasGmailUser: Boolean(gmailUser),
      hasGmailAppPassword: Boolean(gmailAppPassword),
      hasNotificationEmail: Boolean(notificationEmail),
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const safePayload = {
    date: escapeHtml(payload.date),
    name: escapeHtml(payload.name),
    company: escapeHtml(payload.company || 'No especificada'),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone || 'No especificado'),
    service: escapeHtml(payload.service || 'No especificado'),
    budget: escapeHtml(payload.budget || 'No especificado'),
    message: escapeHtml(payload.message),
    language: escapeHtml(payload.language || 'No especificado'),
    source: escapeHtml(payload.source || 'No especificado'),
  };

  const subject = `Nuevo lead de CM Studio: ${payload.name}`;

  const text = `Nuevo cliente potencial desde CM Studio.\n\nFecha: ${payload.date}\nNombre: ${payload.name}\nEmpresa: ${payload.company || 'No especificada'}\nEmail: ${payload.email}\nTeléfono: ${payload.phone || 'No especificado'}\nServicio: ${payload.service || 'No especificado'}\nPresupuesto: ${payload.budget || 'No especificado'}\nIdioma: ${payload.language || 'No especificado'}\nOrigen: ${payload.source || 'No especificado'}\n\nMensaje:\n${payload.message}\n`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Nuevo lead de CM Studio</h2>
      <p>Alguien completó el formulario de contacto en tu portafolio.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Fecha</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.date}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Nombre</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Empresa</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.company}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Teléfono</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Servicio</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.service}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Presupuesto</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.budget}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Idioma</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.language}</td></tr>
          <tr><td style="padding: 8px; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Origen</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${safePayload.source}</td></tr>
        </tbody>
      </table>
      <h3 style="margin: 20px 0 8px;">Mensaje</h3>
      <p style="white-space: pre-line; background: #f9fafb; padding: 12px; border-radius: 8px;">${safePayload.message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `CM Studio Website <${gmailUser}>`,
    to: notificationEmail,
    replyTo: payload.email,
    subject,
    text,
    html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const payload: SanitizedPayload = {
      date: new Date().toISOString(),
      name: sanitize(body.name),
      company: sanitize(body.company),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      service: sanitize(body.service),
      budget: sanitize(body.budget),
      message: sanitize(body.message),
      language: sanitize(body.locale),
      source: sanitize(body.source),
    };

    await appendLeadToGoogleSheet(payload);
    await sendNotificationEmail(payload);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[CM Studio] Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
