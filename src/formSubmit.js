import { FORM_EMAIL } from "./config.js";

export const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${FORM_EMAIL}`;
export const FORMSUBMIT_POST_URL = `https://formsubmit.co/${FORM_EMAIL}`;

function friendlyError(status, message) {
  const msg = String(message || "").trim();
  if (/confirm|activation|inbox|verify/i.test(msg)) {
    return "FormSubmit needs a one-time confirmation. Open the activation email (check spam), then try again.";
  }
  if (status === 422) return "FormSubmit rejected the enquiry (HTTP 422 — a required field may be empty).";
  if (status === 429) return "Too many sends. Wait a minute and try again.";
  if (!status) return msg || "Could not reach the mail service (network or blocked request).";
  return msg ? `Send failed: ${msg}` : `Send failed (HTTP ${status}).`;
}

function fallbackFormPost(fields) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = FORMSUBMIT_POST_URL;
  form.target = "_blank";
  form.rel = "noopener noreferrer";
  form.style.display = "none";
  Object.entries(fields).forEach(([key, value]) => {
    if (value == null) return;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  window.setTimeout(() => form.remove(), 1500);
}

/**
 * POST an enquiry via FormSubmit AJAX. On failure, opens a classic FormSubmit POST in a new tab.
 * @returns {{ ok: boolean, usedFallback: boolean, error: string }}
 */
export async function sendFormSubmit(fields) {
  const payload = Object.fromEntries(
    Object.entries({
      ...fields,
      _captcha: "false",
      _template: fields._template || "table",
      _subject: fields._subject || "Enquiry from Ivy Sphere Academy website",
    }).filter(([, value]) => value != null && String(value).trim() !== "")
  );

  try {
    const res = await fetch(FORMSUBMIT_AJAX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    const success = data.success === true || data.success === "true";
    if (res.ok && success) {
      return { ok: true, usedFallback: false, error: "" };
    }
    const error = friendlyError(res.status, data.message);
    const needsActivation = /confirm|activation|activate form|inbox|verify/i.test(String(data.message || ""));
    if (needsActivation) {
      return { ok: false, usedFallback: false, error };
    }
    try {
      fallbackFormPost(payload);
      return { ok: false, usedFallback: true, error };
    } catch {
      return { ok: false, usedFallback: false, error };
    }
  } catch (err) {
    const error = friendlyError(0, err?.message);
    try {
      fallbackFormPost(payload);
      return { ok: false, usedFallback: true, error };
    } catch {
      return { ok: false, usedFallback: false, error };
    }
  }
}

