# 🎥 YouTube Membership Reminder Mailer

This is a simple Node.js project that sends automatic reminder emails to your friends to help collect monthly contributions for a shared YouTube Premium membership (or any shared subscription).

## ✨ Features

- 🔌 Api for manage data for send mail
- 📧 Sends email reminders via SMTP (Gmail, Outlook, etc.)
- 📆 Can be scheduled to run monthly using a cron job
- 👤 Personalizes messages for each friend
- 🔐 Uses environment variables to keep credentials safe
- 📲 Sends noti to telegram when send mail success or error

## 🛠️ Tech Stack

- Node.js
- Nodemailer (for sending emails)
- node-cron (for scheduling tasks)
- dotenv (for environment variables)
- prisma (for orm database for collect data)
- fastify (for api service)
- postgresql (database)
- githubAction (CICD)

## 📦 Installation

1. Clone this repo:

```bash
git clone https://github.com/Mrf-LuckyBoy/EmailCollectMembership.git
cd EmailCollectMembership
```

2. Set Env:

```.env
HOST_MAIL = yahoo@gmail.com
HOST_PASS = gmail application password
IMAGE_LINK = image link on drive or other
chat_id_tele = chatIdTelegram
chat_bot_tele = botKeyTelegram
domain_tele = https://api.telegram.org
DATABASE_URL = url-connect-db
```
