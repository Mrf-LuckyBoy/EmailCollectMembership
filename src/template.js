import Mailgen from 'mailgen';
import dotenv from 'dotenv';

const listTemplate = [];
dotenv.config();
const listGest = [
  {
    gestMail: 'atsawa2001@gmail.com',
    gestName: 'testtesttest',
    gestFullName: 'test',
  },
  // {
  //   gestMail: process.env.GEST_MAIL_TWO,
  //   gestName: process.env.GEST_TWO,
  //   gestFullName: process.env.GEST_TWO_FULL_NAME,
  // },
  // {
  //   gestMail: process.env.GEST_MAIL_THREE,
  //   gestName: process.env.GEST_THREE,
  //   gestFullName: process.env.GEST_THREE_FULL_NAME,
  // },
  // {
  //   gestMail: process.env.GEST_MAIL_FOUR,
  //   gestName: process.env.GEST_FOUR,
  //   gestFullName: process.env.GEST_FOUR_FULL_NAME,
  // },
  // {
  //   gestMail: process.env.GEST_MAIL_FIVE,
  //   gestName: process.env.GEST_FIVE,
  //   gestFullName: process.env.GEST_FIVE_FULL_NAME,
  // },
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
      intro: `${i.gestName} ได้เวลาจ่ายเงินครอบครัวแล้ววว`,
      action: {
        instructions: 'จ่ายเงินได้ที่ QR นี้ได้เลย',
        button: {
          color: '#22BC66',
          text: 'กดเพื่อดู QR',
          link: process.env.IMAGE_LINK,
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
