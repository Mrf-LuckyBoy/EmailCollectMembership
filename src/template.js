import Mailgen from 'mailgen';
import dotenv from 'dotenv';

const listTemplate = [];
dotenv.config();
const listGest = [
  {
    gestMail: 'atsawa2001@gmail.com',
    gestName: process.env.GEST_ONE,
    gestFullName: 'a',
  },
  {
    gestMail: 'atsawa2001@gmail.com',
    gestName: process.env.GEST_TWO,
    gestFullName: 'b',
  },
];

const mailGenerator = new Mailgen({
  theme: 'cerberus',
  product: {
    name: 'Family Plan',
    link: 'https://github.com/Mrf-LuckyBoy/EmailCollectMembership#',
  },
});

listGest.forEach(i => {
  const email = {
    body: {
      name: i.gestFullName,
      intro: `${i.gestName} วันนี้ครบรอบรายเดือนครอบครับจ่ายค่าส่วนกลางด้วยยย`,
      action: {
        instructions: 'จ่ายเงินได้ที่ QR นี้ได้เลย',
        button: {
          color: '#22BC66',
          text: 'กดเพื่อดู QR',
          link: 'https://cdn.discordapp.com/attachments/1341659114656235580/1382689002397765642/IMG_3766.jpg?ex=685c8bbb&is=685b3a3b&hm=5d622afa8610f5418f0f1d87f358ddb65eb853f0a36fd5ed28fa33010cd97d7a&',
        },
      },
      outro: 'ถ้าโอนแล้วส่งสลิปใน line ได้เลย',
    },
  };
  const textMail = mailGenerator.generatePlaintext(email);
  const htmlMail = mailGenerator.generate(email);
  listTemplate.push({
    gestMail: i.gestMail,
    textMail,
    htmlMail,
  });
});

export default listTemplate;
