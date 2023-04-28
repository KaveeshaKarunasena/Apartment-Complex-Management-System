const nodemailer = require("nodemailer");
const OTP = require("../modles/otp");

const sendOTP = async (req, res) => {
    const email = req.body.email;
      let generatedOTP = Math.floor(Math.random() * 10000);
          
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "wesccotappartment@gmail.com",
          pass: "kjdqnircpckrapnp",
        },
      });
    
      const otp = generatedOTP;
      let mailOptions = {
        from: "wesccotappartment@gmail.com",
        to: email,
        subject: "OTP",
        text: "here is your otp",
        html: `<b>${otp}</b>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return alert(error);
        }
        alert("Message sent: %s", info.messageId);
    
        
        const createdAt = Date.now();
        const expiredAt = Date.now() + 300000;
    
        const newOTP = new OTP({
          email,
          otp,
          createdAt,
          expiredAt,
        });
    
      newOTP.save().then(() => {
          res.json("OTP Added")
      }).catch((err) => {
          alert(err);
      })
        
  
  
      });
    };
    
  const verifyOTP = async(req, res) => {
      const email = req.body.values.email;
      const receivedOTP = req.body.otp;
    
      OTP.findOne({email: email,otp: receivedOTP })
        .then((otp) => {
          if (otp) {
            if (otp.expiredAt > Date.now()) {
              OTP.deleteMany({ email: email }).then(alert("deleted")).catch(error =>{
                alert(error)
              })
                res.json("verified");
            } else {
              OTP.deleteMany({ email: email }).then(alert("deleted")).catch(error =>{
                alert(error)
              })
              res.json("expired");
            }
          } else {
            res.json("invalid");
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
  
  
  
  module.exports= {
    sendOTP,
    verifyOTP,
  };