export async function GET() {
  // This route will help us check if environment variables are set
  const envVars = {
    SMTP_HOST: process.env.SMTP_HOST ? 'Set' : 'Not Set',
    SMTP_USER: process.env.SMTP_USER ? 'Set' : 'Not Set', 
    SMTP_PASS: process.env.SMTP_PASS ? 'Set' : 'Not Set',
    SMTP_FROM: process.env.SMTP_FROM ? 'Set' : 'Not Set',
  };

  return new Response(
    JSON.stringify({
      environment: process.env.NODE_ENV,
      environmentVariables: envVars,
      note: "SMTP_PASS is hidden for security"
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}