require("dotenv").config();
// const cron = require("node-cron");
// const cheerio = require("cheerio");
// const moment = require("moment");

// const User = require("./models/User");
// const Mail = require("./models/Mail");
// var Imap = require("node-imap"),
//   inspect = require("util").inspect;
// const Imap = require("imap");
//const Imap = require("node-imap");
//const { promisify } = require("util");
const express = require("express");
const cors = require("cors");

const conn = require("../config/conn");

const app = express();
const port = process.env.PORT;

//models

//config para ler json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config para o cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// rotas
const router = require("../routes/routes");
app.use(router);

// // EMAIL
// const imap = new Imap({
//   user: "simaopedro365@gmail.com",
//   password: "ufeyxiheechuzbry",
//   host: "imap.gmail.com",
//   port: 993,
//   tls: true,
// });

// function openInbox(cb) {
//   imap.openBox("INBOX", true, cb);
// }

// imap.once("ready", function () {
//   openInbox(function (err, box) {
//     if (err) throw err;
//     imap.search(["UNSEEN", ["SINCE", "Apr 17 2023"]], function (err, results) {
//       if (err) throw err;
//       const f = imap.fetch(results, {
//         bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
//         struct: true,
//       });
//       f.on("message", function (msg, seqno) {
//         console.log("Message #%d", seqno);
//         const prefix = "(#" + seqno + ") ";
//         const email = { headers: {} };
//         msg.on("body", function (stream, info) {
//           let buffer = "";
//           stream.on("data", function (chunk) {
//             buffer += chunk.toString("utf8");
//           });
//           stream.once("end", function () {
//             email.html = buffer;
//           });
//         });
//         msg.once("attributes", function (attrs) {
//           email.headers = attrs;
//         });
//         msg.once("end", function () {
//           console.log(prefix + "Finished");
//           saveEmails([email]);
//         });
//       });
//       f.once("error", function (err) {
//         console.log("Fetch error: " + err);
//       });
//       f.once("end", function () {
//         console.log("Done fetching all messages!");
//         imap.end();
//       });
//     });
//   });
// });

// imap.once("error", function (err) {
//   console.log(err);
// });

// imap.once("end", function () {
//   console.log("Connection ended");
// });

// imap.connect();

// const extractEmailInfo = (body) => {
//   const regexFrom = /From: (.+)\n/;
//   const regexTo = /To: (.+)\n/;
//   const regexSubject = /Subject: (.+)\n/;
//   const regexDate = /Date: (.+)\n/;

//   const fromMatch = body.match(regexFrom);
//   const toMatch = body.match(regexTo);
//   const subjectMatch = body.match(regexSubject);
//   const dateMatch = body.match(regexDate);

//   const from = fromMatch ? fromMatch[1].trim() : "";
//   const to = toMatch ? toMatch[1].trim() : "";
//   const subject = subjectMatch ? subjectMatch[1].trim() : "";
//   const date = dateMatch ? dateMatch[1].trim() : "";

//   return { from, to, subject, date };
// };

// const extractInfo = (body) => {
//   const to = body.match(/To: (.+)\n/)[1];
//   const from = body.match(/From: (.+)\n/)[1];
//   const date = body.match(/Date: (.+)\n/)[1];
//   const subject = body.match(/Subject: (.+)\n/)[1];
//   return { to, from, date, subject };
// }

// const saveEmails = async (emails) => {
//   try {
//     const emailObjects = emails.map((email) => {
//       const { to, from, date, subject } = extractInfo(email.html);
//       return {
//         subject: subject,
//         body: email.html,
//         from: from,
//         to: to,
//         date: date
//       };
//     });
//     await Mail.bulkCreate(emailObjects);
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// cron.schedule("*/15 * * * *", function () {
//   imap.connect();
// });

conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server rodadando na porta ${port}`);
    });
  })
  .catch((err) => console.log(err));
