import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // TODO: wire up to Resend or Formspree
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio <noreply@yourdomain.com>',
    //   to: 'vgooge1@student.gsu.edu',
    //   subject: `Portfolio contact from ${name}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
