import LoginDevice from "../modules/loginDevices.model";
import Session from "../modules/sesson.model";
import path from "path";
import fs from "fs";

import axios from "axios";
import sharp from "sharp";
import QRCode from "qrcode";





 const updateUserAccountService = async (req: any) => {
  const { deviceId, userId, type } = req.body;

  if (type === "DEVICE") {
    await Session.updateMany({ deviceId }, { isActive: false });

    await LoginDevice.updateOne({ _id: deviceId }, { isActive: false });

    return {
      message: "Device logged out successfully",
    };
  }

  if (type === "ALL") {
    await Session.updateMany({ userId }, { isActive: false });

    await LoginDevice.updateMany({ userId }, { isActive: false });

    return {
      message: "User logged out from all devices",
    };
  }

  throw new Error("Invalid type");
};


const generateCertificateTestService = async(payload:any)=>{
  const {
    certificate_uuId,
    issue_date,
    batch_number,
    name,
    course_radiation,
    course_title,
    instructor_title,
    instructor_name,
    course_type,
    signature,
  } = payload;

  payload.signature = "";

  const outputDir = path.join(process.cwd(), "public", "certificates");
  const outputPath = path.join(outputDir, `${certificate_uuId}.png`);
  const certificate_image = `${process.env.APP_URL}/public/certificates/${certificate_uuId}.png`;

  if (fs.existsSync(outputPath)) {
    return {
      certificate_uuId,
      name,
      course_title,
      issue_date,
      certificate_image,
    };
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let templatePath: any = null;
  let recordedCourseSVGText = "";

  if (course_type === "LIVE") {
    templatePath = path.join(process.cwd(), "public", "live-course-certificate.png");

    recordedCourseSVGText = `
    <svg width="3500" height="2480">
      <style>
        .id { fill: #313131; font-size: 50px; font-width:600; font-family: "Arial, sans-serif"; }
        .date { fill: #313131; font-size: 50px; font-width:600; font-family: "Arial, sans-serif"; }
        .batch { fill: #313131; font-size: 50px; font-width:600; font-family: "Arial, sans-serif"; }
        .name { fill: #259D41; font-size: 134px; font-weight: 600; font-family: "Arial, sans-serif"; }
        .course_title { fill: #313131; font-size: 50px; font-weight: 700; font-family: "Arial, sans-serif"; }
        .course_radiation { fill: #313131; font-size: 50px; font-weight: 700; font-family: "Arial, sans-serif"; }
        .instructor_title { fill: #313131; font-size: 28px; font-weight: 600; font-family: "Arial, sans-serif"; }
        .instructor_name { fill: #313131; font-size: 42px; font-weight: 600; font-family: "Arial, sans-serif"; }
      </style>

      <!-- Left side -->
      <text x="570" y="1025" class="id">${certificate_uuId}</text>
      <text x="535" y="1260" class="date">${issue_date}</text>
       <text x="685" y="1490" text-anchor="middle" class="batch">${batch_number}</text>

      <!-- Middle -->
      <text x="1290" y="1150" text-anchor="start"  class="name">${name}</text>
      <text x="1290" y="1395" text-anchor="start"  class="course_title">${course_title}</text>
      <text x="1543" y="1530" text-anchor="start" class="course_radiation">${course_radiation}</text>

           <!--   <text x="1550" y="2000" text-anchor="middle" class="instructor_title">${instructor_title}</text>

             <text x="1550" y="1960" text-anchor="middle" class="instructor_name">${instructor_name}</text> -->

    </svg>
  `;
  }

  if (course_type === "RECORDED") {
    templatePath = path.join(process.cwd(), "public", "recorded-course-certificate.png");

    recordedCourseSVGText = `
    <svg width="3500" height="2480">
      <style>
        .id { fill: #313131; font-size: 50px; font-width:600; font-family: "Arial, sans-serif"; }
        .date { fill: #313131; font-size: 50px; font-width:600; font-family: "Arial, sans-serif"; }
        .name { fill: #259D41; font-size: 134px; font-weight: 600; font-family: "Arial, sans-serif"; }
        .course_title { fill: #313131; font-size: 50px; font-weight: 700; font-family: "Arial, sans-serif"; }

        .instructor_title { fill: #313131; font-size: 28px; font-weight: 600; font-family: "Arial, sans-serif"; }
        .instructor_name { fill: #313131; font-size: 42px; font-weight: 600; font-family: "Arial, sans-serif"; }
      </style>

      <!-- Left side -->
      <text x="570" y="1025" class="id">${certificate_uuId}</text>
      <text x="535" y="1260" class="date">${issue_date}</text>

      <!-- Middle -->
      <text x="1290" y="1150" text-anchor="start"  class="name">${name}</text>
      <text x="1290" y="1395" text-anchor="start"  class="course_title">${course_title}</text>

           <!--   <text x="1550" y="2000" text-anchor="middle" class="instructor_title">${instructor_title}</text>

             <text x="1550" y="1960" text-anchor="middle" class="instructor_name">${instructor_name}</text> -->

    </svg>
  `;

    // const certificate = await sharp(templatePath)
    //   .composite([{ input: Buffer.from(recordedCourseSVGText), top: 0, left: 0 }])
    //   .png()
    //   .toBuffer();

    // res.set("Content-Type", "image/png");
    // res.send(certificate);
  }

  const signatureBuffer = signature
    ? (await axios.get(signature, { responseType: "arraybuffer" })).data
    : null;

  // const qrUrl = `${process.env.APP_URL}/v1/website/get-certificate?certificateId=${certificate_uuId}`;
  const qrUrl = `${process.env.WEBSITE_BASE_URL}/certificates/${certificate_uuId}`;
  const qrCodeBuffer = await QRCode.toBuffer(qrUrl, {
    errorCorrectionLevel: "H",
    type: "png",
    width: 400,
    margin: 1,
    color: {
      dark: "#414042",
      light: "#F8FBEF",
    },
  });

  const composites: any[] = [
    { input: Buffer.from(recordedCourseSVGText), top: 0, left: 0 },
    { input: qrCodeBuffer, top: 1670, left: 500 },
  ];
  // TODO SIGNATURE ARE OFF HERE
  // if (signatureBuffer) {
  //   composites.push({ input: signatureBuffer, top: 1700, left: 1400 });
  // }

  await sharp(templatePath).composite(composites).png().toFile(outputPath);

  return {
    certificate_uuId,
    name,
    course_title,
    issue_date,
    certificate_image: `${process.env.APP_URL}/public/certificates/${certificate_uuId}.png`,
  };

  // const certificate = await sharp(templatePath).composite(composites).png().toBuffer();
  // res.set("Content-Type", "image/png");
  // res.send({ success: true, certificate });
  // const certificateBuffer = await sharp(templatePath).composite(composites).png().toBuffer();
  // const outputPath = path.join(process.cwd(), "public", `${certificate_uuId}.png`);
  // await sharp(certificateBuffer).toFile(outputPath);
}



export { updateUserAccountService, generateCertificateTestService };