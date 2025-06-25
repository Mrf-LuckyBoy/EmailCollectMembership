# 🎥 YouTube Membership Reminder Mailer

This is a simple Node.js project that sends automatic reminder emails to your friends to help collect monthly contributions for a shared YouTube Premium membership (or any shared subscription).

## ✨ Features

- 📧 Sends email reminders via SMTP (Gmail, Outlook, etc.)
- 📆 Can be scheduled to run monthly using a cron job
- 👤 Personalizes messages for each friend
- 🔐 Uses environment variables to keep credentials safe

## 🛠️ Tech Stack

- Node.js
- Nodemailer (for sending emails)
- node-cron (for scheduling tasks)
- dotenv (for environment variables)

## 📦 Installation

1. Clone this repo:

```bash
git clone https://github.com/Mrf-LuckyBoy/EmailCollectMembership.git
cd EmailCollectMembership
