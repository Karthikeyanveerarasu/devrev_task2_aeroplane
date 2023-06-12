const express =require('express');
const app = express();
const mysql = require('mysql')
const cors=require('cors')
const bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const saltRounds = 10;
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
  key:"userid",
  secret:"Vsvivvva",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires : 60* 60 *24,
  },
}))
const db = mysql.createConnection({
  host: 'localhost',
  user: 'karthi',
  password: 'karthi',
  database: 'page'
})
app.post('/mobile',(req,res)=>{
  const number=req.body.number;
    const email=req.body.email;
    console.log(email);     
    var otp = Math.floor(100000 + Math.random() * 900000);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "20bcs4037@mkce.ac.in",
        pass: "20BCS403720BCS4037"
      }
    });
    
    var mailOptions = {
      from: "fakeidbro88@gmail.com",
      to: email,
      subject: "Indian Air Lane Management",
      text: "your one time password is " + otp
    };
    db.query("SELECT * FROM login WHERE email=?",[email],(err,name)=>{
      console.log(name);
      if(err){
        console.log(err);
        return;
      }
      if(name.length>0){
       return res.send({already : "email already exist !"})
      }
    })
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
        return res.send({otp : otp})
      }
    });
})

app.post('/register',(req,res)=>{
  const username=req.body.name;
  const password =req.body.password;
  const email=req.body.email;
  const number=req.body.number;
  console.log(number);
        bcrypt.hash(password,saltRounds,(err,hash)=>{
             if(err){
                console.log(err);
              }
              db.query("INSERT INTO login (username, password, email,phone) VALUES (?,?,?,?)",[username,hash,email,number],(err,result)=>{
                console.log(err);
                if(!err){
                return  res.send({success:"Register Successfully !"})
                }
              })
            }) 
})
////logout function ///
app.post('/logout', function(req, res) {
  console.log("Logging out ....")
  req.session.destroy(function(err,result) {
    if (err) {
      console.log(err);
    } else {
      res.send({Loggedin:false})
    }
  });
});
app.get('/login',(req,res)=>{
  if(req.session.user){
    res.send({Loggedin : true})
  }
  else{
    res.send({Loggedin : false})
  }
})
app.post('/login',(req,res)=>{
  const email=req.body.email;
  const password =req.body.password;
  console.log(email)
db.query("SELECT * FROM login WHERE email = ?",[email],(err,result)=>{
  if(err){
    console.log(err)
  }  
  if(result.length >0){
    bcrypt.compare(password,result[0].password,(err,response)=>{
      if(response){
        req.session.user = result;
        console.log(req.session.user);
         return res.send({success : "validated"});
      }
      else{
         return res.send({mismatch : "Wrong Credentials"});
      }
    })
  }
  else{
    return res.send({mismatch : "Wrong Credentials"})
  } 
})
})
app.post('/plane',(req,res)=>{
  const plane_no=req.body.plane_no;
  const plane_time=req.body.plane_time;
 const count=60;
  console.log(plane_no,plane_time);
  db.query("SELECT * FROM plane_details WHERE plane_no = ?",[plane_no],(err,datas)=>{
    if(err){
      console.log(err);
      return;
    }
    if(datas.length>0){
     return res.send({already : "Plane already scheduled!"})
    }
    else{
      db.query("INSERT INTO plane_details (plane_no,planetime,count) VALUES(?,?,?)",[plane_no,plane_time,count],(err,result)=>{
        console.log(err);
        if(!err){
        return  res.send({success:"Added Successfully !"})
        }
      })
    }
  })
 
})

app.post('/deleteplane',(req,res)=>{
  const plane_no=req.body.plane_no;
  const plane_time=req.body.plane_time;
 const count=60;
  console.log(plane_no,plane_time);
  db.query("SELECT * FROM plane_details WHERE plane_no = ?",[plane_no],(err,datas)=>{
    if(err){
      console.log(err);
      return;
    }
    if(datas.length>0){
      db.query("DELETE FROM plane_details WHERE plane_no=?",[plane_no],(err,data)=>{
        if(err){
          console.log(err);
          return
        }
      })
     return res.send({delete : "Plane deleted!"});
    }
    else{
      return res.send({noplane : "Plane not available!"});   
    }
  })
 
})



app.post('/book', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const ticket = req.body.ticket;
  const phone = req.body.phone;
  const plane_no = req.body.plane_no;
  const plane_time = req.body.plane_time;

  console.log(plane_no, plane_time, name, email, phone, ticket);

  db.query("SELECT * FROM plane_details WHERE plane_no = ? AND planetime = ?", [plane_no, plane_time], (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else if (result.length > 0) {
      const availableCount = result[0].count;
      if (ticket <= availableCount) {
        const updatedCount = availableCount - ticket;
        db.query("UPDATE plane_details SET count = ? WHERE plane_no = ? AND planetime = ?", [updatedCount, plane_no, plane_time], (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          // Ticket count updated in plane_details table
          // Insert user details into user_details table
          db.query("INSERT INTO userdata (email, name, ticket, phone, planeno, planetime) VALUES (?, ?, ?, ?, ?, ?)", [email, name, ticket, phone, plane_no, plane_time], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            // Ticket successfully booked and user details inserted
          return  res.send({success:"Ticket booked successfully!"});
          });
        });
      } else {
        // Insufficient available tickets
       return res.send({no:"Not enough available tickets!"});
      }
    } else {
      // No plane found with the provided plane_no and plane_time
     return res.send({no:"Plane not found!"});
    }
  });
});


app.post('/booking',(req,res)=>{
  const email=req.body.email;
  console.log(email);
  db.query("SELECT * from userdata where email=?",[email],(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result.length > 0){
      console.log(result);
      return res.send(result);
    }
  })
})
app.post("/alldata", (req, res) => {
  db.query("SELECT * from userdata",(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result.length > 0){
      console.log(result);
      return res.send(result);
    }
  })

});
app.post("/allplanedetails", (req, res) => {
  db.query("SELECT * from plane_details",(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result.length > 0){
      console.log(result);
      return res.send(result);
    }
  })

});
app.listen(3002,()=>{
    console.log("running server");
})
