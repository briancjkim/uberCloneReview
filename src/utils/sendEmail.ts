import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey:"38ac1385c731a535f927e526a1727ad9-49a2671e-6d2be4f9",
  domain: "sandbox12402d687b3c4692b744200e029c7d66.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "briancjkim92@gmail.com",
    to: "briancjkim92@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
}
export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}">here</a>`;
  return sendEmail(emailSubject, emailBody);
}
