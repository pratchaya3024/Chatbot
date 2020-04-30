const functions = require("firebase-functions");
const request = require("request-promise");
const config = require("./config.json");

//[1]เพิ่ม dialogflow-fulfillment library
//[7] เพิ่ม Payload
const { WebhookClient, Payload } = require("dialogflow-fulfillment");

//[8] เพิ่ม firebase-admin และ initial database
const firebase = require("firebase-admin");
firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: config.databaseURL
});
var db = firebase.firestore();

//ตั้งค่า region และปรับ timeout และเพิ่ม memory
const region = "asia-east2";
const runtimeOptions = {
  timeoutSeconds: 4,
  memory: "2GB"
};

//ทำ webhook request url
exports.webhook = functions
  .region(region)
  .runWith(runtimeOptions)
  .https.onRequest(async (req, res) => {
    // console.log("LINE REQUEST BODY", JSON.stringify(req.body));
    //[2] ประกาศ ตัวแปร agent
    const agent = new WebhookClient({ request: req, response: res });
    //[4] ทำ function view menu เพื่อแสดงผลบางอย่างกลับไปที่หน้าจอของ bot

    //intent start
    const start = async agent => {
      console.log("do start");
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      //ดึงข้อมูล userId
      let userId = "";
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let name = req.body.queryResult.parameters.name;

      console.log(name, "==>", userId);

      return db
        .collection("User")
        .doc(userId)
        .set({
          userId: userId,
          source: source,
          name: name,
        })
    }

    const second = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      console.log("do secondAtt ====>", userId)

      let firstResult = req.body.queryResult.parameters.attitude;
      return db
        .collection("attitude")
        .doc(userId)
        .set({
          userId: userId,
          firstAttitude: firstResult,
          secondAttitude: '',
          thirdAttitude: '',
        })
    }

    const situation1 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.situation;
      return db.collection("evalution").doc(userId).set({
        situation: result
      })
    }

    const interview_1 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.interview1;
      return db.collection("evalution").doc(userId).update({
        interview1: result
      })
    }

    const interview_2 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.interview2;
      return db.collection("evalution").doc(userId).update({
        interview2: result
      })
    }

    const interview_3 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.interview3;
      return db.collection("evalution").doc(userId).update({
        interview3: result
      })
    }

    const interview_4 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.interview4;
      return db.collection("evalution").doc(userId).update({
        interview4: result
      })
    }

    const interview_5 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.interview5;
      return db.collection("evalution").doc(userId).update({
        interview5: result
      })
    }

    const interview_6 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let result = req.body.queryResult.parameters.interview6;
      return db.collection("evalution").doc(userId).update({
        interview6: result
      })
    }

    const interview_7 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let result = req.body.queryResult.parameters.interview7;
      return db.collection("evalution").doc(userId).update({
        interview7: result
      }).then(async () => {
        let user = await db.collection("User").doc(userId).get().then(
          (doc) => {
            let uData = doc.data()
            // console.log(uData);
            return uData
          })
        let attitude = await db.collection("attitude").doc(userId).get().then(
          (doc) => {
            let aData = doc.data()
            // console.log(aData)
            return aData
          })
        let personal = await db.collection("Personal").doc(userId).get().then(
          (doc) => {
            let pData = doc.data()
            // console.log(pData)
            return pData
          })
        console.log(user)
        console.log(attitude)
        console.log(personal)
        let firstResult = '';
        let secondResult = '';
        let thirdResult = '';
        switch (attitude.firstAttitude) {
          case 'a':
            firstResult = 'ศาสตราจารย์ในมหาวิทยาลัย: คุณเป็นคนที่เชื่อสนิทใจว่าคนที่ยิ่งใหญ่มักเป็นผู้บริสุทธิ์ ดังนั้นคุณจึงเชื่อข่าวต่างๆ ทั้งข่าวดี ข่าวลือที่เขียนลงในหน้าหนังสือพิมพ์เป็นคนที่มุ่งมั่นว่าจะต้องประสบความสำเร็จในด้านการเรียนและหน้าที่การงาน'
            break;
          case 'b':
            firstResult = 'นักร้องวัยรุ่นยอดนิยม: เป็นสัญลักษณ์ของจินตนาการและเพศตรงข้าม ดังนั้นใจของคุณจึงมักไล่ตามจินตนาการและคิดถึงเรื่องความรัก รู้สึกจริงจังทั้งเวลาที่อกหักและเวลาอยากมีความรัก เมื่อเหนื่อยก็จะหยุดพักแล้วกลับมามีความรักใหม่อีกครั้ง'
            break;
          case 'c':
            firstResult = 'นักเขียนการ์ตูน: คุณมักให้ความสำคัญกับความรู้สึก เป็นคนที่มีเพื่อนสนิทอยู่มาก ซึ่งสนใจในเรื่องเดียวกันและมีความฝันเหมือนกัน'
            break;
          case 'd':
            firstResult = 'คุณป้าที่ทำงานพาร์ทไทม์: แสดงถึงชีวิตที่ราบเรียบ คุณคิดว่าเมื่อแต่งงานแล้วก็มีลูก สร้างครอบครัว มีชีวิตที่มีความสุข'
            break;
        }

        switch (attitude.secondAttitude) {
          case 'a':
            secondResult = 'ขนม: แสดงถึงการร้องขอการอยากถูกตามใจ จริง ๆ แล้วคุณเป็นคนละเอียดรอบคอบ เมื่อทำอะไรก็หมกมุ่นอยู่กับสิ่งนั้น จนทำให้คนอื่นคิดว่าคุณเป็นคนไม่ค่อยสนใจเรื่องคนรอบข้างสักเท่าไหร่เรียกว่าเอาแต่ใจอยู่เหมือนกัน ดังนั้นจึงอยากลองให้เอาใจเขามาใส่ใจดูบ้าง'
            break;
          case 'b':
            secondResult = 'ร่ม: แสดงถึงจิตใจที่ปกปิดมีนิสัยขี้ตกใจกับเรื่องเล็ก ๆ น้อย ๆ ของคนอื่น ดูภายนอกเหมือนเป็นคนกล้า แต่ความจริงแล้วต้องการปกปิดความอ่อนแอของตัวเอง แม้ว่าคนรอบข้างจะไม่ได้ว่าอะไร แต่คุณก็ชอบพูดเรื่องที่ทำไปแล้วว่ามันไม่ดี หรือน่าจะทำได้ดีกว่านี้ ดังนั้นจีงอยากให้คุณสงบจิตใจบ้าง แล้วรู้จักค่อยคิดค่อยทำบ้างสักนิด'
            break;
          case 'c':
            secondResult = 'แปรงสีฟัน: แสดงถึงความเข้าใจ แม้คุณจะเข้าใจในเรื่องต่าง ๆ แต่มักจะพูดไม่ตรง ดังนั้นจึงอยากให้คุณเข้มแข็งกว่านี้ให้มาก'
            break;
          case 'd':
            secondResult = 'เกม: แสดงถึงความรุนแรงในการแข่งขัน เป็นคนที่อยากจะเอาชนะคนอื่น แต่ส่วนใหญ่จะเก็บความรู้สึกไว้ไม่กระทำ แต่จะแสดงออกมาทางคำพูด เช่น การพูดเหน็บแนม   เป็นต้น'
            break;
        }

        switch (attitude.thirdAttitude) {
          case 'a':
            thirdResult = 'ยาเปลี่ยนเพศ: เป็นคนขี้เหนียวกับเพศเดียวกัน แต่ใจกว้างกับเพศตรงข้าม ซึ่งนอกจากปัญหาความสัมพันธ์กับเพื่อนเพศเดียวกันแล้ว คุณต้องระวังเรื่องการใช้เงินเพื่อเชื่อมความสัมพันธ์ระหว่างตัวเองกับเพศตรงข้ามด้วยนะจ๊ะ'
            break;
          case 'b':
            thirdResult = 'พรมวิเศษ: คุณมักชอบที่จะลองท่านู่น ทำนี่ไปเรื่อย เพื่อเป็นการตอบความต้องการของตัวเอง แต่สำหรับเรื่องการจ่ายเงินซื้อสิ่งของต่าง ๆ คุณจะคิดแล้ว คิดอีก ดังนั้นจึงไม่รู้จักคำว่าฟุ่มเฟือยสักเท่าไหร่นัก'
            break;
          case 'c':
            thirdResult = 'ยาที่ทำให้ไม่แก่ไม่ตาย: เป็นคนที่รู้สึกชื่นใจทุกครั้งที่เห็นตัวเลขในสมุดบัญชีธนาคารมีมากขึ้นไปเรื่อย ๆ แต่ก็อยากให้คุณเอาเงินไปซื้อสิ่งต่าง ๆ เพื่อแลกกับความสุขของชีวิตดูบ้างนะจ๊ะ'
            break;
          case 'd':
            thirdResult = 'กระจกที่มองเห็นอนาคต: คุณเป็นคนที่คิดก่อนใช้เงินกับเรื่องทั่วไป แต่ก็ยังเสียเงินให้กับเรื่องไม่เป็นเรื่องอยู่เยอะ ดังนั้นจะใช้เงินซื้ออะไร ก็อยากให้คิดหน้าคิดหลังให้ดีก่อนเสมอ'
            break;
        }

        let personalCode = personal.perosnalResult.join('')
        switch (personalCode) {
          case 'ENFP':
            personalities = "คุณคือ ENFP (นักสร้างแรงบันดาลใจ)\nมีทักษะการสื่อสารที่ดี และมีความคิดสร้างสรรค์สูงมาก จึงสามารถทำงานร่วมกับผู้อื่นได้ดี นอกจากนั้นสามารถเข้าใจในแนวคิดหรือทฤษฎีที่ยาก ๆ ได้ แต่เพราะมีความเก่งหลากหลายด้าน จึงมีแนวโน้มที่จะเปลี่ยนงานบ่อย เมื่อรู้สึกเบื่อ\nอาชีพที่เหมาะสม - ผู้จัดการร้านอาหาร - เจ้าของภัตตาคาร - นักเขียนเรื่องท่องเที่ยว - นักเขียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'INFP':
            personalities = "คุณคือ INFP (นักเพ้อฝัน)\nชอบงานบริการ และมักให้ความสำคัญกับคนอื่นมากกว่าตัวเอง มีทักษะทางการสื่อสาร จึงสามารถเป็นได้ทั้งนักสื่อสารและนักเขียนที่ดี ชอบความยืดหยุ่นสูง และทำงานคนเดียวได้ดีกว่าทำงานเป็นกลุ่ม\nอาชีพที่เหมาะสม - นักทำภาพยนตร์ การ์ตูน - นักจิตวิทยา - บรรณารักษ์ - นักเขียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ESFJ':
            personalities = "คุณคือ ESFJ (ผู้จัดหา)\nเป็นคนมีระเบียบ มีความซื่อสัตย์และจงรักภักดี ชอบทำงานที่มีกำหนดการหรือเวลาชัดเจน เป็นนักปฏิบัติจึงไม่ชอบทำงานร่วมกับทฤษฎีและนามธรรม\nอาชีพที่เหมาะสม - นักโภชนาการ - พยาบาลวิชาชีพ - นักกายภาพบำบัด - ผู้ทำงานด้านศาสนา\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ISTP':
            personalities = "คุณคือ ISTP (ผู้ชำนาญงานฝีมือ)\nจะไม่ชอบทำงานในสภาพแวดล้อมที่เข้มงวด และเคร่งครัดจนเกินไป แต่ก็เป็นนักแก้ปัญหาที่ยอดเยี่ยม ชอบเห็นผลลัพธ์ของงานอย่างรวดเร็วที่สุด ชอบเสี่ยง มีความเป็นตัวของตัวเองสูง\nอาชีพที่เหมาะสม - วิศวกรคอมพิวเตอร์ - นักวิเคราะห์การออกแบบ - เจ้าหน้าที่ตำรวจ - ช่างฝีมือ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ISTJ':
            personalities = "คุณคือ ISTJ (ผู้ตรวจสอบ)\nเป็นคนที่มีความอดทน จึงทำให้สามารถประสบความสำเร็จในการทำงานได้อย่างง่ายดาย แต่จะทำงานได้อย่างมีประสิทธิภาพและดีที่สุดในสภาพแวดล้อมที่เป็นระเบียบ มีแผนการ และขั้นตอนปฏิบัติที่ชัดเจน\nอาชีพที่เหมาะสม - ผู้จัดการ - นักบัญชี - นักตรรกวิทยา - ผู้ดูแลระบบ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ENFJ':
            personalities = "คุณคือ ENFJ (ผู้สอน)\nเป็นคนที่สนใจความรู้สึกของคนอื่นมาก และให้ความสำคัญกับความเป็นระเบียบเรียบร้อย นอกจากนั้นยังเป็นคนที่เก่งในเรื่องของการสร้างความสามัคคีปรองดอง แต่ค่อนข้างอ่อนไหวง่ายต่อคำวิพากษ์วิจารณ์และความขัดแย้ง\nอาชีพที่เหมาะสม - อาจารย์ - นักวิชาการ - นักการเมือง - นักการฑูต\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ENTP':
            personalities = "คุณคือ ENTP (ผู้มีวิสัยทัศน์)\nสามารถโฟกัสไปที่งานหรือโปรเจ็กต์ได้ดี สนุกกับการสร้างไอเดียและทฤษฎี มีความเป็นผู้นำแต่ไม่ชอบควบคุมผู้อื่น ชอบแก้ปัญหาที่ยาก ๆ แต่จะไม่ชอบทำงานในสภาพแวดล้อมที่เข้มงวดจนเกินไป\nอาชีพที่เหมาะสม - นักวางผังเมือง - ผู้ประกอบการ - นักธุรกิจ - ผู้กำกับ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ENTJ':
            personalities = "คุณคือ ENTJ (ผู้บริหาร)\nมีความเป็นผู้นำสูง ไม่ชอบเป็นผู้ตามเลย นอกจากนั้นยังเป็นคนที่ให้ความสำคัญกับความรู้ความสามารถ และจะรู้สึกไม่พอใจเวลาเจอความผิดพลาดซ้ำ ๆ เหมาะกับการทำงานในบริษัทหรือองค์กรใหญ่ ๆ\nอาชีพที่เหมาะสม - นักบริหาร - วิศกร - สถาปนิก - นักกฏหมาย\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ISFJ':
            personalities = "คุณคือ ISFJ (ผู้พิทักษ์)\nเนื่องจากเป็นคนที่ใส่ใจคนอื่นมาก จึงสามารถเป็นที่พึ่งพาให้กับคนอื่นเรื่องงานต่าง ๆ ให้ประสบความสำเร็จ มีใจรักในงานบริการ มีความมั่นคงและอดทน และจะเรียนรู้ได้ดีที่สุดเมื่อลงมือปฏิบัติจริง\nอาชีพที่เหมาะสม - นักสังคมศาสตร์ - แพทย์ - พยาบาล - ผู้ช่วยผู้บริหาร\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ESFP':
            personalities = "คุณคือ ESFP (ผู้กระทำ)\nชอบและรู้สึกตื่นเต้นกับการได้พบสิ่งใหม่ ๆ จึงสามารถทำงานเป็นทีมได้ดี และทำให้ผู้อื่นรู้สึกสนุกไปด้วย นอกจากนั้นยังมีทักษะทางการสื่อสารที่ยอดเยี่ยม แต่จะเป็นคนที่ไม่ชอบมีแผนการและกำหนดการในชีวิต\nอาชีพที่เหมาะสม - เจ้าหน้าที่สันทนาการ - ตัวแทนบริการลูกค้า - พนักงานต้อนรับ - ผู้ช่วยทันตกรรม\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ESTP':
            personalities = "คุณคือ ESTP (ผู้คิดค้น)\nเป็นคนที่มุ่งมั่น และมีความช่างสังเกตสูงมาก สามารถจดจำรายละเอียดได้ดี เข้าหาคนได้ง่ายและรวดเร็ว เก่งในการพูดโน้มน้าวใจคนอื่น แต่ไม่ค่อยวางแผนก่อนที่จะลงมือทำอะไร\nอาชีพที่เหมาะสม - ช่างรับเหมาก่อสร้าง - ตำรวจสายลับ - ที่ปรึกษาด้านการเงิน - ผู้จัดการฝ่ายขาย\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ESTJ':
            personalities = "คุณคือ ESTJ (ควบคุมดูแล)\nมีความเป็นผู้นำ จึงเหมาะที่จะทำงานที่ต้องใช้ความรับผิดชอบสูง ขยัน ปราดเปรียว เป็นคนตรงไปตรงมา สามารถทำงานหนักได้ เป็นคนมีความทะเยอะทะยานสูง\nอาชีพที่เหมาะสม - ผู้จัดการทั่วไป - ตัวแทนประกัน - เจ้าหน้าที่สินเชื่อ - ผู้บริหารโรงเรียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'ISFP':
            personalities = "คุณคือ ISFP (นักแต่งเพลง)\nเป็นคนมีความคิดริเริ่มและมีความเป็นศิลปิน ไม่ค่อยให้ความสำคัญต่อแบบแผนมากนัก และจะมีความสุขกับการทำงานที่สอดคล้องกับค่านิยมของตัวเอง ดังนั้นคนที่มีบุคลิกแบบนี้ หากทำงานเป็นศิลปินจะมีโอกาสประสบความสำเร็จสูงมาก\nอาชีพที่เหมาะสม - ศิลปิน - นักแต่งเพลง - นักออกแบบแฟชั่น - นักออกแบบกราฟิก\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'INTJ':
            personalities = "คุณคือ INTJ (นักวิทยาศาสตร์)\nจุดเด่นของคนประเภทนี้คือ สามารถทำงานกับทฤษฏีที่ซับซ้อนและเข้าใจได้ง่ายมาก เป็นสุดยอดนักวิเคราะห์และนักวางแผน แต่จะทำงานได้ดีที่สุดก็ต่อเมื่อทำงานคนเดียว\nอาชีพที่เหมาะสม - นักพัฒนาซอฟต์แวร์ - นักวิชาการ - ผู้พิพากษา - ศัลยแพทย์\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'INTP':
            personalities = "คุณคือ INTP (ผู้สร้าง)\nให้ความสำคัญกับความรู้ความสามารถเหนือสิ่งอื่นใด เป็นคนที่มีมาตรฐานในการทำสิ่งต่าง ๆ สูงมาก แต่ก็ไม่ต้องการเป็นทั้งผู้นำและผู้ตาม จะทำงานได้ดีที่สุดเมื่อได้ทำคนเดียวและเป็นอิสระ\nอาชีพที่เหมาะสม - วิศวกรซอฟต์แวร์ - นักวิทยาศาสตร์การแพทย์ - นักคณิตศาสตร์ - จิตแพทย์\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
          case 'INFJ':
            personalities = "คุณคือ INFJ (ผู้ให้คำปรึกษา)\nมักจะใช้สัญชาตญาณในการทำงาน และชอบความเพ้อฝัน เป็นคนช่างเห็นอกเห็นใจ จึงสามารถทำงานที่ต้องช่วยเหลือผู้อื่นได้ดี ถึงแม้จะเป็นคนที่ใช้ความรู้สึกเป็นหลัก แต่ก็สามารถใช้ตรรกะและเหตุผลได้ดี\nอาชีพที่เหมาะสม - นักเขียน - ที่ปรึกษา - นักกายภาพบำบัด - ล่าม\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
            break;
        }

        let textMsg = {
          type: "text",
          text: `คุณ ${user.name}\nผลทดสอบทัศนคติ\n1. คุณได้ตอบ ${firstResult}\n2. คุณได้ตอบ ${secondResult}\n3. คุณได้ตอบ ${thirdResult}\n\n---------------\n\nผลทดสอบบุคลิกภาพ\n${personalities}`
        }
        const payloadMsg = new Payload("LINE", textMsg, {
          sendAsMessage: true
        });
        return agent.add(payloadMsg);
      }).catch(error => console.log(error));
    }

    const test = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }

      let user = await db.collection("User").doc(userId).get().then(
        (doc) => {
          let uData = doc.data()
          // console.log(uData);
          return uData
        })
      let attitude = await db.collection("attitude").doc(userId).get().then(
        (doc) => {
          let aData = doc.data()
          // console.log(aData)
          return aData
        })
      let personal = await db.collection("Personal").doc(userId).get().then(
        (doc) => {
          let pData = doc.data()
          // console.log(pData)
          return pData
        })
      console.log(user)
      console.log(attitude)
      console.log(personal)
      let firstResult = '';
      let secondResult = '';
      let thirdResult = '';
      switch (attitude.firstAttitude) {
        case 'a':
          firstResult = 'ศาสตราจารย์ในมหาวิทยาลัย: คุณเป็นคนที่เชื่อสนิทใจว่าคนที่ยิ่งใหญ่มักเป็นผู้บริสุทธิ์ ดังนั้นคุณจึงเชื่อข่าวต่างๆ ทั้งข่าวดี ข่าวลือที่เขียนลงในหน้าหนังสือพิมพ์เป็นคนที่มุ่งมั่นว่าจะต้องประสบความสำเร็จในด้านการเรียนและหน้าที่การงาน'
          break;
        case 'b':
          firstResult = 'นักร้องวัยรุ่นยอดนิยม: เป็นสัญลักษณ์ของจินตนาการและเพศตรงข้าม ดังนั้นใจของคุณจึงมักไล่ตามจินตนาการและคิดถึงเรื่องความรัก รู้สึกจริงจังทั้งเวลาที่อกหักและเวลาอยากมีความรัก เมื่อเหนื่อยก็จะหยุดพักแล้วกลับมามีความรักใหม่อีกครั้ง'
          break;
        case 'c':
          firstResult = 'นักเขียนการ์ตูน: คุณมักให้ความสำคัญกับความรู้สึก เป็นคนที่มีเพื่อนสนิทอยู่มาก ซึ่งสนใจในเรื่องเดียวกันและมีความฝันเหมือนกัน'
          break;
        case 'd':
          firstResult = 'คุณป้าที่ทำงานพาร์ทไทม์: แสดงถึงชีวิตที่ราบเรียบ คุณคิดว่าเมื่อแต่งงานแล้วก็มีลูก สร้างครอบครัว มีชีวิตที่มีความสุข'
          break;
      }

      switch (attitude.secondAttitude) {
        case 'a':
          secondResult = 'ขนม: แสดงถึงการร้องขอการอยากถูกตามใจ จริง ๆ แล้วคุณเป็นคนละเอียดรอบคอบ เมื่อทำอะไรก็หมกมุ่นอยู่กับสิ่งนั้น จนทำให้คนอื่นคิดว่าคุณเป็นคนไม่ค่อยสนใจเรื่องคนรอบข้างสักเท่าไหร่เรียกว่าเอาแต่ใจอยู่เหมือนกัน ดังนั้นจึงอยากลองให้เอาใจเขามาใส่ใจดูบ้าง'
          break;
        case 'b':
          secondResult = 'ร่ม: แสดงถึงจิตใจที่ปกปิดมีนิสัยขี้ตกใจกับเรื่องเล็ก ๆ น้อย ๆ ของคนอื่น ดูภายนอกเหมือนเป็นคนกล้า แต่ความจริงแล้วต้องการปกปิดความอ่อนแอของตัวเอง แม้ว่าคนรอบข้างจะไม่ได้ว่าอะไร แต่คุณก็ชอบพูดเรื่องที่ทำไปแล้วว่ามันไม่ดี หรือน่าจะทำได้ดีกว่านี้ ดังนั้นจีงอยากให้คุณสงบจิตใจบ้าง แล้วรู้จักค่อยคิดค่อยทำบ้างสักนิด'
          break;
        case 'c':
          secondResult = 'แปรงสีฟัน: แสดงถึงความเข้าใจ แม้คุณจะเข้าใจในเรื่องต่าง ๆ แต่มักจะพูดไม่ตรง ดังนั้นจึงอยากให้คุณเข้มแข็งกว่านี้ให้มาก'
          break;
        case 'd':
          secondResult = 'เกม: แสดงถึงความรุนแรงในการแข่งขัน เป็นคนที่อยากจะเอาชนะคนอื่น แต่ส่วนใหญ่จะเก็บความรู้สึกไว้ไม่กระทำ แต่จะแสดงออกมาทางคำพูด เช่น การพูดเหน็บแนม   เป็นต้น'
          break;
      }

      switch (attitude.thirdAttitude) {
        case 'a':
          thirdResult = 'ยาเปลี่ยนเพศ: เป็นคนขี้เหนียวกับเพศเดียวกัน แต่ใจกว้างกับเพศตรงข้าม ซึ่งนอกจากปัญหาความสัมพันธ์กับเพื่อนเพศเดียวกันแล้ว คุณต้องระวังเรื่องการใช้เงินเพื่อเชื่อมความสัมพันธ์ระหว่างตัวเองกับเพศตรงข้ามด้วยนะจ๊ะ'
          break;
        case 'b':
          thirdResult = 'พรมวิเศษ: คุณมักชอบที่จะลองท่านู่น ทำนี่ไปเรื่อย เพื่อเป็นการตอบความต้องการของตัวเอง แต่สำหรับเรื่องการจ่ายเงินซื้อสิ่งของต่าง ๆ คุณจะคิดแล้ว คิดอีก ดังนั้นจึงไม่รู้จักคำว่าฟุ่มเฟือยสักเท่าไหร่นัก'
          break;
        case 'c':
          thirdResult = 'ยาที่ทำให้ไม่แก่ไม่ตาย: เป็นคนที่รู้สึกชื่นใจทุกครั้งที่เห็นตัวเลขในสมุดบัญชีธนาคารมีมากขึ้นไปเรื่อย ๆ แต่ก็อยากให้คุณเอาเงินไปซื้อสิ่งต่าง ๆ เพื่อแลกกับความสุขของชีวิตดูบ้างนะจ๊ะ'
          break;
        case 'd':
          thirdResult = 'กระจกที่มองเห็นอนาคต: คุณเป็นคนที่คิดก่อนใช้เงินกับเรื่องทั่วไป แต่ก็ยังเสียเงินให้กับเรื่องไม่เป็นเรื่องอยู่เยอะ ดังนั้นจะใช้เงินซื้ออะไร ก็อยากให้คิดหน้าคิดหลังให้ดีก่อนเสมอ'
          break;
      }

      let personalCode = personal.perosnalResult.join('')
      switch (personalCode) {
        case 'ENFP':
          personalities = "คุณคือ ENFP (นักสร้างแรงบันดาลใจ)\nมีทักษะการสื่อสารที่ดี และมีความคิดสร้างสรรค์สูงมาก จึงสามารถทำงานร่วมกับผู้อื่นได้ดี นอกจากนั้นสามารถเข้าใจในแนวคิดหรือทฤษฎีที่ยาก ๆ ได้ แต่เพราะมีความเก่งหลากหลายด้าน จึงมีแนวโน้มที่จะเปลี่ยนงานบ่อย เมื่อรู้สึกเบื่อ\nอาชีพที่เหมาะสม - ผู้จัดการร้านอาหาร - เจ้าของภัตตาคาร - นักเขียนเรื่องท่องเที่ยว - นักเขียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'INFP':
          personalities = "คุณคือ INFP (นักเพ้อฝัน)\nชอบงานบริการ และมักให้ความสำคัญกับคนอื่นมากกว่าตัวเอง มีทักษะทางการสื่อสาร จึงสามารถเป็นได้ทั้งนักสื่อสารและนักเขียนที่ดี ชอบความยืดหยุ่นสูง และทำงานคนเดียวได้ดีกว่าทำงานเป็นกลุ่ม\nอาชีพที่เหมาะสม - นักทำภาพยนตร์ การ์ตูน - นักจิตวิทยา - บรรณารักษ์ - นักเขียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ESFJ':
          personalities = "คุณคือ ESFJ (ผู้จัดหา)\nเป็นคนมีระเบียบ มีความซื่อสัตย์และจงรักภักดี ชอบทำงานที่มีกำหนดการหรือเวลาชัดเจน เป็นนักปฏิบัติจึงไม่ชอบทำงานร่วมกับทฤษฎีและนามธรรม\nอาชีพที่เหมาะสม - นักโภชนาการ - พยาบาลวิชาชีพ - นักกายภาพบำบัด - ผู้ทำงานด้านศาสนา\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ISTP':
          personalities = "คุณคือ ISTP (ผู้ชำนาญงานฝีมือ)\nจะไม่ชอบทำงานในสภาพแวดล้อมที่เข้มงวด และเคร่งครัดจนเกินไป แต่ก็เป็นนักแก้ปัญหาที่ยอดเยี่ยม ชอบเห็นผลลัพธ์ของงานอย่างรวดเร็วที่สุด ชอบเสี่ยง มีความเป็นตัวของตัวเองสูง\nอาชีพที่เหมาะสม - วิศวกรคอมพิวเตอร์ - นักวิเคราะห์การออกแบบ - เจ้าหน้าที่ตำรวจ - ช่างฝีมือ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ISTJ':
          personalities = "คุณคือ ISTJ (ผู้ตรวจสอบ)\nเป็นคนที่มีความอดทน จึงทำให้สามารถประสบความสำเร็จในการทำงานได้อย่างง่ายดาย แต่จะทำงานได้อย่างมีประสิทธิภาพและดีที่สุดในสภาพแวดล้อมที่เป็นระเบียบ มีแผนการ และขั้นตอนปฏิบัติที่ชัดเจน\nอาชีพที่เหมาะสม - ผู้จัดการ - นักบัญชี - นักตรรกวิทยา - ผู้ดูแลระบบ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ENFJ':
          personalities = "คุณคือ ENFJ (ผู้สอน)\nเป็นคนที่สนใจความรู้สึกของคนอื่นมาก และให้ความสำคัญกับความเป็นระเบียบเรียบร้อย นอกจากนั้นยังเป็นคนที่เก่งในเรื่องของการสร้างความสามัคคีปรองดอง แต่ค่อนข้างอ่อนไหวง่ายต่อคำวิพากษ์วิจารณ์และความขัดแย้ง\nอาชีพที่เหมาะสม - อาจารย์ - นักวิชาการ - นักการเมือง - นักการฑูต\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ENTP':
          personalities = "คุณคือ ENTP (ผู้มีวิสัยทัศน์)\nสามารถโฟกัสไปที่งานหรือโปรเจ็กต์ได้ดี สนุกกับการสร้างไอเดียและทฤษฎี มีความเป็นผู้นำแต่ไม่ชอบควบคุมผู้อื่น ชอบแก้ปัญหาที่ยาก ๆ แต่จะไม่ชอบทำงานในสภาพแวดล้อมที่เข้มงวดจนเกินไป\nอาชีพที่เหมาะสม - นักวางผังเมือง - ผู้ประกอบการ - นักธุรกิจ - ผู้กำกับ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ENTJ':
          personalities = "คุณคือ ENTJ (ผู้บริหาร)\nมีความเป็นผู้นำสูง ไม่ชอบเป็นผู้ตามเลย นอกจากนั้นยังเป็นคนที่ให้ความสำคัญกับความรู้ความสามารถ และจะรู้สึกไม่พอใจเวลาเจอความผิดพลาดซ้ำ ๆ เหมาะกับการทำงานในบริษัทหรือองค์กรใหญ่ ๆ\nอาชีพที่เหมาะสม - นักบริหาร - วิศกร - สถาปนิก - นักกฏหมาย\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ISFJ':
          personalities = "คุณคือ ISFJ (ผู้พิทักษ์)\nเนื่องจากเป็นคนที่ใส่ใจคนอื่นมาก จึงสามารถเป็นที่พึ่งพาให้กับคนอื่นเรื่องงานต่าง ๆ ให้ประสบความสำเร็จ มีใจรักในงานบริการ มีความมั่นคงและอดทน และจะเรียนรู้ได้ดีที่สุดเมื่อลงมือปฏิบัติจริง\nอาชีพที่เหมาะสม - นักสังคมศาสตร์ - แพทย์ - พยาบาล - ผู้ช่วยผู้บริหาร\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ESFP':
          personalities = "คุณคือ ESFP (ผู้กระทำ)\nชอบและรู้สึกตื่นเต้นกับการได้พบสิ่งใหม่ ๆ จึงสามารถทำงานเป็นทีมได้ดี และทำให้ผู้อื่นรู้สึกสนุกไปด้วย นอกจากนั้นยังมีทักษะทางการสื่อสารที่ยอดเยี่ยม แต่จะเป็นคนที่ไม่ชอบมีแผนการและกำหนดการในชีวิต\nอาชีพที่เหมาะสม - เจ้าหน้าที่สันทนาการ - ตัวแทนบริการลูกค้า - พนักงานต้อนรับ - ผู้ช่วยทันตกรรม\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ESTP':
          personalities = "คุณคือ ESTP (ผู้คิดค้น)\nเป็นคนที่มุ่งมั่น และมีความช่างสังเกตสูงมาก สามารถจดจำรายละเอียดได้ดี เข้าหาคนได้ง่ายและรวดเร็ว เก่งในการพูดโน้มน้าวใจคนอื่น แต่ไม่ค่อยวางแผนก่อนที่จะลงมือทำอะไร\nอาชีพที่เหมาะสม - ช่างรับเหมาก่อสร้าง - ตำรวจสายลับ - ที่ปรึกษาด้านการเงิน - ผู้จัดการฝ่ายขาย\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ESTJ':
          personalities = "คุณคือ ESTJ (ควบคุมดูแล)\nมีความเป็นผู้นำ จึงเหมาะที่จะทำงานที่ต้องใช้ความรับผิดชอบสูง ขยัน ปราดเปรียว เป็นคนตรงไปตรงมา สามารถทำงานหนักได้ เป็นคนมีความทะเยอะทะยานสูง\nอาชีพที่เหมาะสม - ผู้จัดการทั่วไป - ตัวแทนประกัน - เจ้าหน้าที่สินเชื่อ - ผู้บริหารโรงเรียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'ISFP':
          personalities = "คุณคือ ISFP (นักแต่งเพลง)\nเป็นคนมีความคิดริเริ่มและมีความเป็นศิลปิน ไม่ค่อยให้ความสำคัญต่อแบบแผนมากนัก และจะมีความสุขกับการทำงานที่สอดคล้องกับค่านิยมของตัวเอง ดังนั้นคนที่มีบุคลิกแบบนี้ หากทำงานเป็นศิลปินจะมีโอกาสประสบความสำเร็จสูงมาก\nอาชีพที่เหมาะสม - ศิลปิน - นักแต่งเพลง - นักออกแบบแฟชั่น - นักออกแบบกราฟิก\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'INTJ':
          personalities = "คุณคือ INTJ (นักวิทยาศาสตร์)\nจุดเด่นของคนประเภทนี้คือ สามารถทำงานกับทฤษฏีที่ซับซ้อนและเข้าใจได้ง่ายมาก เป็นสุดยอดนักวิเคราะห์และนักวางแผน แต่จะทำงานได้ดีที่สุดก็ต่อเมื่อทำงานคนเดียว\nอาชีพที่เหมาะสม - นักพัฒนาซอฟต์แวร์ - นักวิชาการ - ผู้พิพากษา - ศัลยแพทย์\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'INTP':
          personalities = "คุณคือ INTP (ผู้สร้าง)\nให้ความสำคัญกับความรู้ความสามารถเหนือสิ่งอื่นใด เป็นคนที่มีมาตรฐานในการทำสิ่งต่าง ๆ สูงมาก แต่ก็ไม่ต้องการเป็นทั้งผู้นำและผู้ตาม จะทำงานได้ดีที่สุดเมื่อได้ทำคนเดียวและเป็นอิสระ\nอาชีพที่เหมาะสม - วิศวกรซอฟต์แวร์ - นักวิทยาศาสตร์การแพทย์ - นักคณิตศาสตร์ - จิตแพทย์\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
        case 'INFJ':
          personalities = "คุณคือ INFJ (ผู้ให้คำปรึกษา)\nมักจะใช้สัญชาตญาณในการทำงาน และชอบความเพ้อฝัน เป็นคนช่างเห็นอกเห็นใจ จึงสามารถทำงานที่ต้องช่วยเหลือผู้อื่นได้ดี ถึงแม้จะเป็นคนที่ใช้ความรู้สึกเป็นหลัก แต่ก็สามารถใช้ตรรกะและเหตุผลได้ดี\nอาชีพที่เหมาะสม - นักเขียน - ที่ปรึกษา - นักกายภาพบำบัด - ล่าม\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง"
          break;
      }

      let textMsg = {
        type: "text",
        text: `คุณ ${user.name}\nผลทดสอบทัศนคติ\n1. คุณได้ตอบ ${firstResult}\n2. คุณได้ตอบ ${secondResult}\n3. คุณได้ตอบ ${thirdResult}\n\n---------------\n\nผลทดสอบบุคลิกภาพ\n${personalities}`
      }
      const payloadMsg = new Payload("LINE", textMsg, {
        sendAsMessage: true
      });
      return agent.add(payloadMsg);
    }


    const third = async agent => {
      console.log("do thirdAtt")
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let secondResult = req.body.queryResult.parameters.attitude;
      return db
        .collection("attitude")
        .doc(userId)
        .update({
          // userId: userId,
          secondAttitude: secondResult,
        })
    }

    const attitudeResult = async agent => {
      console.log("do final attitude")
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let thirdResult = req.body.queryResult.parameters.attitude;
      return db
        .collection("attitude")
        .doc(userId)
        .update({
          thirdAttitude: thirdResult,
        }).then(() => {
          return db.collection("attitude").doc(userId).get().then(
            function (doc) {
              let firstResult = '';
              let secondResult = '';
              let thirdResult = '';
              let attitudeData = doc.data()
              switch (attitudeData.firstAttitude) {
                case 'a':
                  firstResult = 'ศาสตราจารย์ในมหาวิทยาลัย: คุณเป็นคนที่เชื่อสนิทใจว่าคนที่ยิ่งใหญ่มักเป็นผู้บริสุทธิ์ ดังนั้นคุณจึงเชื่อข่าวต่างๆ ทั้งข่าวดี ข่าวลือที่เขียนลงในหน้าหนังสือพิมพ์เป็นคนที่มุ่งมั่นว่าจะต้องประสบความสำเร็จในด้านการเรียนและหน้าที่การงาน'
                  break;
                case 'b':
                  firstResult = 'นักร้องวัยรุ่นยอดนิยม: เป็นสัญลักษณ์ของจินตนาการและเพศตรงข้าม ดังนั้นใจของคุณจึงมักไล่ตามจินตนาการและคิดถึงเรื่องความรัก รู้สึกจริงจังทั้งเวลาที่อกหักและเวลาอยากมีความรัก เมื่อเหนื่อยก็จะหยุดพักแล้วกลับมามีความรักใหม่อีกครั้ง'
                  break;
                case 'c':
                  firstResult = 'นักเขียนการ์ตูน: คุณมักให้ความสำคัญกับความรู้สึก เป็นคนที่มีเพื่อนสนิทอยู่มาก ซึ่งสนใจในเรื่องเดียวกันและมีความฝันเหมือนกัน'
                  break;
                case 'd':
                  firstResult = 'คุณป้าที่ทำงานพาร์ทไทม์: แสดงถึงชีวิตที่ราบเรียบ คุณคิดว่าเมื่อแต่งงานแล้วก็มีลูก สร้างครอบครัว มีชีวิตที่มีความสุข'
                  break;
              }

              switch (attitudeData.secondAttitude) {
                case 'a':
                  secondResult = 'ขนม: แสดงถึงการร้องขอการอยากถูกตามใจ จริง ๆ แล้วคุณเป็นคนละเอียดรอบคอบ เมื่อทำอะไรก็หมกมุ่นอยู่กับสิ่งนั้น จนทำให้คนอื่นคิดว่าคุณเป็นคนไม่ค่อยสนใจเรื่องคนรอบข้างสักเท่าไหร่เรียกว่าเอาแต่ใจอยู่เหมือนกัน ดังนั้นจึงอยากลองให้เอาใจเขามาใส่ใจดูบ้าง'
                  break;
                case 'b':
                  secondResult = 'ร่ม: แสดงถึงจิตใจที่ปกปิดมีนิสัยขี้ตกใจกับเรื่องเล็ก ๆ น้อย ๆ ของคนอื่น ดูภายนอกเหมือนเป็นคนกล้า แต่ความจริงแล้วต้องการปกปิดความอ่อนแอของตัวเอง แม้ว่าคนรอบข้างจะไม่ได้ว่าอะไร แต่คุณก็ชอบพูดเรื่องที่ทำไปแล้วว่ามันไม่ดี หรือน่าจะทำได้ดีกว่านี้ ดังนั้นจีงอยากให้คุณสงบจิตใจบ้าง แล้วรู้จักค่อยคิดค่อยทำบ้างสักนิด'
                  break;
                case 'c':
                  secondResult = 'แปรงสีฟัน: แสดงถึงความเข้าใจ แม้คุณจะเข้าใจในเรื่องต่าง ๆ แต่มักจะพูดไม่ตรง ดังนั้นจึงอยากให้คุณเข้มแข็งกว่านี้ให้มาก'
                  break;
                case 'd':
                  secondResult = 'เกม: แสดงถึงความรุนแรงในการแข่งขัน เป็นคนที่อยากจะเอาชนะคนอื่น แต่ส่วนใหญ่จะเก็บความรู้สึกไว้ไม่กระทำ แต่จะแสดงออกมาทางคำพูด เช่น การพูดเหน็บแนม   เป็นต้น'
                  break;
              }

              switch (attitudeData.thirdAttitude) {
                case 'a':
                  thirdResult = 'ยาเปลี่ยนเพศ: เป็นคนขี้เหนียวกับเพศเดียวกัน แต่ใจกว้างกับเพศตรงข้าม ซึ่งนอกจากปัญหาความสัมพันธ์กับเพื่อนเพศเดียวกันแล้ว คุณต้องระวังเรื่องการใช้เงินเพื่อเชื่อมความสัมพันธ์ระหว่างตัวเองกับเพศตรงข้ามด้วยนะจ๊ะ'
                  break;
                case 'b':
                  thirdResult = 'พรมวิเศษ: คุณมักชอบที่จะลองท่านู่น ทำนี่ไปเรื่อย เพื่อเป็นการตอบความต้องการของตัวเอง แต่สำหรับเรื่องการจ่ายเงินซื้อสิ่งของต่าง ๆ คุณจะคิดแล้ว คิดอีก ดังนั้นจึงไม่รู้จักคำว่าฟุ่มเฟือยสักเท่าไหร่นัก'
                  break;
                case 'c':
                  thirdResult = 'ยาที่ทำให้ไม่แก่ไม่ตาย: เป็นคนที่รู้สึกชื่นใจทุกครั้งที่เห็นตัวเลขในสมุดบัญชีธนาคารมีมากขึ้นไปเรื่อย ๆ แต่ก็อยากให้คุณเอาเงินไปซื้อสิ่งต่าง ๆ เพื่อแลกกับความสุขของชีวิตดูบ้างนะจ๊ะ'
                  break;
                case 'd':
                  thirdResult = 'กระจกที่มองเห็นอนาคต: คุณเป็นคนที่คิดก่อนใช้เงินกับเรื่องทั่วไป แต่ก็ยังเสียเงินให้กับเรื่องไม่เป็นเรื่องอยู่เยอะ ดังนั้นจะใช้เงินซื้ออะไร ก็อยากให้คิดหน้าคิดหลังให้ดีก่อนเสมอ'
                  break;
              }
              let textMsg = {
                type: "text",
                text: `1.คุณได้ตอบ ${firstResult}\n2.คุณได้ตอบ ${secondResult}\n3.คุณได้ตอบ ${thirdResult}\n\n---------------\n\nเมื่อพร้อมแล้วให้พิมพ์ "แบบทดสอบที่2"`
              }
              const payloadMsg = new Payload("LINE", textMsg, {
                sendAsMessage: true
              });
              // console.log(firstResult)
              // console.log(secondResult)
              // console.log(thirdResult)
              return agent.add(payloadMsg);
            }
          ).catch(error => {
            console.log(error);
          })
        })
    }

    const personal2 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let firstResult = req.body.queryResult.parameters.personal;
      console.log(firstResult);
      let perosnalData = {
        userId: userId,
        perosnalResult: [firstResult]
      }
      return db
        .collection("Personal")
        .doc(userId)
        .set(perosnalData).then(() => {
          console.log('written Document')
        })
    }

    const personal3 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let result = req.body.queryResult.parameters.personal;
      return db
        .collection("Personal")
        .doc(userId)
        .update({
          perosnalResult: firebase.firestore.FieldValue.arrayUnion(result)
        })
        .then(() => {
          console.log('updated Document')
        })
    }

    const personal4 = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let result = req.body.queryResult.parameters.personal;
      return db
        .collection("Personal")
        .doc(userId)
        .update({
          perosnalResult: firebase.firestore.FieldValue.arrayUnion(result)
        })
        .then(() => {
          console.log('updated Document')
        })
    }

    const perosnalResult = async agent => {
      let userId = "";
      let source = req.body.originalDetectIntentRequest.source;
      if (typeof source === "undefined") {
        source = "";
      }
      if (source === "line") {
        userId =
          req.body.originalDetectIntentRequest.payload.data.source.userId;
      }
      let result = req.body.queryResult.parameters.personal;
      return db
        .collection("Personal")
        .doc(userId)
        .update({
          perosnalResult: firebase.firestore.FieldValue.arrayUnion(result)
        })
        .then(() => {
          return db.collection("Personal").doc(userId).get().then(
            doc => {
              let personalities = '';
              let personalData = doc.data()
              let personalCode = personalData.perosnalResult.join('')
              switch (personalCode) {
                case 'ENFP':
                  personalities = "คุณคือ ENFP (นักสร้างแรงบันดาลใจ)\nมีทักษะการสื่อสารที่ดี และมีความคิดสร้างสรรค์สูงมาก จึงสามารถทำงานร่วมกับผู้อื่นได้ดี นอกจากนั้นสามารถเข้าใจในแนวคิดหรือทฤษฎีที่ยาก ๆ ได้ แต่เพราะมีความเก่งหลากหลายด้าน จึงมีแนวโน้มที่จะเปลี่ยนงานบ่อย เมื่อรู้สึกเบื่อ\nอาชีพที่เหมาะสม - ผู้จัดการร้านอาหาร - เจ้าของภัตตาคาร - นักเขียนเรื่องท่องเที่ยว - นักเขียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'INFP':
                  personalities = "คุณคือ INFP (นักเพ้อฝัน)\nชอบงานบริการ และมักให้ความสำคัญกับคนอื่นมากกว่าตัวเอง มีทักษะทางการสื่อสาร จึงสามารถเป็นได้ทั้งนักสื่อสารและนักเขียนที่ดี ชอบความยืดหยุ่นสูง และทำงานคนเดียวได้ดีกว่าทำงานเป็นกลุ่ม\nอาชีพที่เหมาะสม - นักทำภาพยนตร์ การ์ตูน - นักจิตวิทยา - บรรณารักษ์ - นักเขียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ESFJ':
                  personalities = "คุณคือ ESFJ (ผู้จัดหา)\nเป็นคนมีระเบียบ มีความซื่อสัตย์และจงรักภักดี ชอบทำงานที่มีกำหนดการหรือเวลาชัดเจน เป็นนักปฏิบัติจึงไม่ชอบทำงานร่วมกับทฤษฎีและนามธรรม\nอาชีพที่เหมาะสม - นักโภชนาการ - พยาบาลวิชาชีพ - นักกายภาพบำบัด - ผู้ทำงานด้านศาสนา\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ISTP':
                  personalities = "คุณคือ ISTP (ผู้ชำนาญงานฝีมือ)\nจะไม่ชอบทำงานในสภาพแวดล้อมที่เข้มงวด และเคร่งครัดจนเกินไป แต่ก็เป็นนักแก้ปัญหาที่ยอดเยี่ยม ชอบเห็นผลลัพธ์ของงานอย่างรวดเร็วที่สุด ชอบเสี่ยง มีความเป็นตัวของตัวเองสูง\nอาชีพที่เหมาะสม - วิศวกรคอมพิวเตอร์ - นักวิเคราะห์การออกแบบ - เจ้าหน้าที่ตำรวจ - ช่างฝีมือ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ISTJ':
                  personalities = "คุณคือ ISTJ (ผู้ตรวจสอบ)\nเป็นคนที่มีความอดทน จึงทำให้สามารถประสบความสำเร็จในการทำงานได้อย่างง่ายดาย แต่จะทำงานได้อย่างมีประสิทธิภาพและดีที่สุดในสภาพแวดล้อมที่เป็นระเบียบ มีแผนการ และขั้นตอนปฏิบัติที่ชัดเจน\nอาชีพที่เหมาะสม - ผู้จัดการ - นักบัญชี - นักตรรกวิทยา - ผู้ดูแลระบบ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ENFJ':
                  personalities = "คุณคือ ENFJ (ผู้สอน)\nเป็นคนที่สนใจความรู้สึกของคนอื่นมาก และให้ความสำคัญกับความเป็นระเบียบเรียบร้อย นอกจากนั้นยังเป็นคนที่เก่งในเรื่องของการสร้างความสามัคคีปรองดอง แต่ค่อนข้างอ่อนไหวง่ายต่อคำวิพากษ์วิจารณ์และความขัดแย้ง\nอาชีพที่เหมาะสม - อาจารย์ - นักวิชาการ - นักการเมือง - นักการฑูต\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ENTP':
                  personalities = "คุณคือ ENTP (ผู้มีวิสัยทัศน์)\nสามารถโฟกัสไปที่งานหรือโปรเจ็กต์ได้ดี สนุกกับการสร้างไอเดียและทฤษฎี มีความเป็นผู้นำแต่ไม่ชอบควบคุมผู้อื่น ชอบแก้ปัญหาที่ยาก ๆ แต่จะไม่ชอบทำงานในสภาพแวดล้อมที่เข้มงวดจนเกินไป\nอาชีพที่เหมาะสม - นักวางผังเมือง - ผู้ประกอบการ - นักธุรกิจ - ผู้กำกับ\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ENTJ':
                  personalities = "คุณคือ ENTJ (ผู้บริหาร)\nมีความเป็นผู้นำสูง ไม่ชอบเป็นผู้ตามเลย นอกจากนั้นยังเป็นคนที่ให้ความสำคัญกับความรู้ความสามารถ และจะรู้สึกไม่พอใจเวลาเจอความผิดพลาดซ้ำ ๆ เหมาะกับการทำงานในบริษัทหรือองค์กรใหญ่ ๆ\nอาชีพที่เหมาะสม - นักบริหาร - วิศกร - สถาปนิก - นักกฏหมาย\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ISFJ':
                  personalities = "คุณคือ ISFJ (ผู้พิทักษ์)\nเนื่องจากเป็นคนที่ใส่ใจคนอื่นมาก จึงสามารถเป็นที่พึ่งพาให้กับคนอื่นเรื่องงานต่าง ๆ ให้ประสบความสำเร็จ มีใจรักในงานบริการ มีความมั่นคงและอดทน และจะเรียนรู้ได้ดีที่สุดเมื่อลงมือปฏิบัติจริง\nอาชีพที่เหมาะสม - นักสังคมศาสตร์ - แพทย์ - พยาบาล - ผู้ช่วยผู้บริหาร\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ESFP':
                  personalities = "คุณคือ ESFP (ผู้กระทำ)\nชอบและรู้สึกตื่นเต้นกับการได้พบสิ่งใหม่ ๆ จึงสามารถทำงานเป็นทีมได้ดี และทำให้ผู้อื่นรู้สึกสนุกไปด้วย นอกจากนั้นยังมีทักษะทางการสื่อสารที่ยอดเยี่ยม แต่จะเป็นคนที่ไม่ชอบมีแผนการและกำหนดการในชีวิต\nอาชีพที่เหมาะสม - เจ้าหน้าที่สันทนาการ - ตัวแทนบริการลูกค้า - พนักงานต้อนรับ - ผู้ช่วยทันตกรรม\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ESTP':
                  personalities = "คุณคือ ESTP (ผู้คิดค้น)\nเป็นคนที่มุ่งมั่น และมีความช่างสังเกตสูงมาก สามารถจดจำรายละเอียดได้ดี เข้าหาคนได้ง่ายและรวดเร็ว เก่งในการพูดโน้มน้าวใจคนอื่น แต่ไม่ค่อยวางแผนก่อนที่จะลงมือทำอะไร\nอาชีพที่เหมาะสม - ช่างรับเหมาก่อสร้าง - ตำรวจสายลับ - ที่ปรึกษาด้านการเงิน - ผู้จัดการฝ่ายขาย\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ESTJ':
                  personalities = "คุณคือ ESTJ (ควบคุมดูแล)\nมีความเป็นผู้นำ จึงเหมาะที่จะทำงานที่ต้องใช้ความรับผิดชอบสูง ขยัน ปราดเปรียว เป็นคนตรงไปตรงมา สามารถทำงานหนักได้ เป็นคนมีความทะเยอะทะยานสูง\nอาชีพที่เหมาะสม - ผู้จัดการทั่วไป - ตัวแทนประกัน - เจ้าหน้าที่สินเชื่อ - ผู้บริหารโรงเรียน\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'ISFP':
                  personalities = "คุณคือ ISFP (นักแต่งเพลง)\nเป็นคนมีความคิดริเริ่มและมีความเป็นศิลปิน ไม่ค่อยให้ความสำคัญต่อแบบแผนมากนัก และจะมีความสุขกับการทำงานที่สอดคล้องกับค่านิยมของตัวเอง ดังนั้นคนที่มีบุคลิกแบบนี้ หากทำงานเป็นศิลปินจะมีโอกาสประสบความสำเร็จสูงมาก\nอาชีพที่เหมาะสม - ศิลปิน - นักแต่งเพลง - นักออกแบบแฟชั่น - นักออกแบบกราฟิก\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'INTJ':
                  personalities = "คุณคือ INTJ (นักวิทยาศาสตร์)\nจุดเด่นของคนประเภทนี้คือ สามารถทำงานกับทฤษฏีที่ซับซ้อนและเข้าใจได้ง่ายมาก เป็นสุดยอดนักวิเคราะห์และนักวางแผน แต่จะทำงานได้ดีที่สุดก็ต่อเมื่อทำงานคนเดียว\nอาชีพที่เหมาะสม - นักพัฒนาซอฟต์แวร์ - นักวิชาการ - ผู้พิพากษา - ศัลยแพทย์\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'INTP':
                  personalities = "คุณคือ INTP (ผู้สร้าง)\nให้ความสำคัญกับความรู้ความสามารถเหนือสิ่งอื่นใด เป็นคนที่มีมาตรฐานในการทำสิ่งต่าง ๆ สูงมาก แต่ก็ไม่ต้องการเป็นทั้งผู้นำและผู้ตาม จะทำงานได้ดีที่สุดเมื่อได้ทำคนเดียวและเป็นอิสระ\nอาชีพที่เหมาะสม - วิศวกรซอฟต์แวร์ - นักวิทยาศาสตร์การแพทย์ - นักคณิตศาสตร์ - จิตแพทย์\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
                case 'INFJ':
                  personalities = "คุณคือ INFJ (ผู้ให้คำปรึกษา)\nมักจะใช้สัญชาตญาณในการทำงาน และชอบความเพ้อฝัน เป็นคนช่างเห็นอกเห็นใจ จึงสามารถทำงานที่ต้องช่วยเหลือผู้อื่นได้ดี ถึงแม้จะเป็นคนที่ใช้ความรู้สึกเป็นหลัก แต่ก็สามารถใช้ตรรกะและเหตุผลได้ดี\nอาชีพที่เหมาะสม - นักเขียน - ที่ปรึกษา - นักกายภาพบำบัด - ล่าม\n----------\nอย่างไรก็ตาม แบบทดสอบนี้ก็เป็นแค่คำแนะนำเบื้องต้นเท่านั้น เพราะการประสบความสำเร็จ แท้จริงแล้วสิ่งที่สำคัญที่สุด ก็คือตัวของคุณนั่นเอง\n----------\n\nเมื่อพร้อมแล้วให้พิมพ์'เข้าแบบทดสอบต่อไป'"
                  break;
              }
              let textMsg = {
                type: "text",
                text: `${personalities}`
              }
              const payloadMsg = new Payload("LINE", textMsg, {
                sendAsMessage: true
              });
              return agent.add(payloadMsg);
            }).catch(error => {
              console.log(error);
            })
        })
    }
    //[3] ทำ intent map เข้ากับ function
    let intentMap = new Map();
    intentMap.set("Start", start);
    intentMap.set("Attitude-2", second);
    intentMap.set("Attitude-3", third);
    intentMap.set("Attituderesult-1", attitudeResult)
    intentMap.set("Personal2", personal2);
    intentMap.set("Personal3", personal3);
    intentMap.set("Personal4", personal4);
    intentMap.set("Personal-result", perosnalResult);
    intentMap.set("Situation-1", situation1);
    intentMap.set("Interview-1", interview_1);
    intentMap.set("Interview-2", interview_2);
    intentMap.set("Interview-3", interview_3);
    intentMap.set("Interview-4", interview_4);
    intentMap.set("Interview-5", interview_5);
    intentMap.set("Interview-6", interview_6);
    intentMap.set("Interview-7", interview_7);
    intentMap.set("all-result", test)
    agent.handleRequest(intentMap);
  });

//function สำหรับ reply กลับไปหา LINE โดยต้องการ reply token และ messages (array)
const lineReply = (replyToken, messages) => {
  const body = {
    replyToken: replyToken,
    messages: messages
  };
  return request({
    method: "POST",
    uri: `${config.lineMessagingApi}/reply`,
    headers: config.lineHeaders,
    body: JSON.stringify(body)
  });
};