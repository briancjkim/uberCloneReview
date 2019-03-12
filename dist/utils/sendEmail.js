"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var mailGunClient = new mailgun_js_1.default({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandbox12402d687b3c4692b744200e029c7d66.mailgun.org"
});
var sendEmail = function (subject, html) {
    var emailData = {
        from: "briancjkim92@gmail.com",
        to: "briancjkim92@gmail.com",
        subject: subject,
        html: html
    };
    return mailGunClient.messages().send(emailData);
};
exports.sendVerificationEmail = function (fullName, key) {
    var emailSubject = "Hello! " + fullName + ", please verify your email";
    var emailBody = "Verify your email by clicking <a href=\"http://nuber.com/verification/" + key + "\">here</a>";
    return sendEmail(emailSubject, emailBody);
};
//# sourceMappingURL=sendEmail.js.map