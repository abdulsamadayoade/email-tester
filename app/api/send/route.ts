import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Payload = {
  email: string;
  html: string;
};

export async function POST(req: Request) {
  const dt: Payload = await req.json();

  if (!dt.email) {
    return {
      status: 400,
      body: { error: "Email is required" },
    };
  }

  if (!dt.html) {
    return {
      status: 400,
      body: { error: "HTML is required" },
    };
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
