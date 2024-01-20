import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Payload = {
  email: string;
  html: string;
};

export async function POST(req: Request) {
  const dt: Payload = await req.json();

  if (!dt.email) {
    return Response.json({ error: "Email is required", status: 400 });
  }

  if (!dt.html) {
    return Response.json({ error: "HTML is required", status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: "Testing Email <abdul@abdulsamad.xyz>",
      to: [dt.email],
      subject: "Testing Email",
      text: "Testing Email",
      html: dt.html,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
