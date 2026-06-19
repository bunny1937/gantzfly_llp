import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const firstName = name.trim().split(" ")[0];

  // Read your template HTML file and inline the name
  // We send as a raw transactional email — no template ID needed
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "GiantzFly Exim LLP", email: "giantzflyexim@gmail.com" },
      to: [{ email: email.trim(), name: name.trim() }],
      subject: `Welcome to GiantzFly — ${firstName}, you're on our trade list`,
      // We use the template HTML but replace the name merge tag manually
      htmlContent: buildEmailHtml(firstName),
      // Also send a copy to yourself for every new subscriber
      bcc: [{ email: "giantzflyexim@gmail.com" }],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Brevo error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

function buildEmailHtml(firstName: string): string {
  // Inline the template with the name substituted
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f7f6f2;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#0f2341;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7db9e8;font-weight:700;">B2B Export Catalog</p>
            <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#ffffff;">GiantzFly Exim LLP</h1>
            <p style="margin:6px 0 0;font-size:13px;color:#a8c4dc;">From Indian Origins to Global Markets.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            <h2 style="margin:0 0 20px;font-size:22px;color:#0f2341;font-weight:700;">Thank you, ${firstName}.</h2>
            <p style="margin:0 0 16px;font-size:15px;color:#4a4845;line-height:1.7;">You are now connected with GiantzFly Exim LLP — supplying Indian spices, makhana, and dry fruits to importers and distributors worldwide.</p>
            <p style="margin:0 0 28px;font-size:15px;color:#4a4845;line-height:1.7;">We share catalog updates, harvest notes, and trade-relevant information. No retail noise.</p>
            <a href="https://giantzfly.com/products" style="display:inline-block;background:#0f2341;color:#ffffff;font-size:14px;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;">Explore Our Catalog →</a>
          </td>
        </tr>
        <tr>
          <td style="background:#f3f0ec;padding:24px 40px;border-top:1px solid #e0ddd8;">
            <p style="margin:0;font-size:12px;color:#7a7974;">GiantzFly Exim LLP · Udaipur, Rajasthan, India · FSSAI · APEDA · Spices Board India</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
