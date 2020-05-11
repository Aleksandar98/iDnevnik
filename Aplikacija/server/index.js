const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');
const User =     require('./models/User');
const LocalStratrgy = require("passport-local");
const cors = require('cors')

const path = require("path");

const flash = require('express-flash');

//const Administrator = require('./Models/Administrator');

//dodaj cripto async i nodemailer
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

mongoose.connect("mongodb+srv://aleksandar:databasetest@cluster0-k3chi.mongodb.net/test?retryWrites=true&w=majority").then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });



const app = express();

//app.use(express.static(path.join(__dirname, "client","src","components")));
app.use(express.static(path.join(__dirname, "/")));

app.use(cors());

app.use(flash());

app.use(bodyParser.urlencoded({extended:true}))

app.use(require("express-session")({
    secret: "Neki string",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratrgy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
   res.redirect("/");
}



app.get("/",(req,res)=>{
    req.flash('error_messages',"greskaaa");
    res.redirect("http://localhost:3000/login");
});


app.get("/greska",isLoggedIn,(req,res)=>{
    req.flash('error_messages',"greskaaa");
    res.redirect("http://localhost:3000/login");
});

app.post("/register",(req,res)=>{
 
User.register(new User({username: req.body.username,type: req.body.type}),req.body.password,(err,user)=>{
    if(err){
        console.log(err)
        res.send(err);
    }
    passport.authenticate("local")(req,res,()=>{
        res.redirect("http://localhost:3000/preview"); 
    })
})
})

app.post("/login",passport.authenticate("local",{
    successRedirect:"http://localhost:3000/preview",
    failureRedirect:"/greska"
}),(req,res)=>{

})

app.get("/logout",(req,res)=>{
   req.logOut();
   res.redirect("http://localhost:3000/");
});

app.get("/api/current_user",(req,res)=>{
    res.send(req.user);
})


  const UcenikControl = require("./controllers/UcenikController");
app.get("/Zdravko", UcenikControl.all);
app.get("/Dete/:_id", UcenikControl.findById);
app.get("/DeteEmail/:Email", UcenikControl.findByEmail);
const RoditeljControl = require("./controllers/RoditeljController");
app.get("/Roditelj", RoditeljControl.all);

app.get("/forgot",function(req,res){
    res.redirect("http://localhost:3000/Forget");
})

app.post("/forgot",function(req,res,next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20,function(err,buf){
                const token = buf.toString('hex');
                done(err,token);
            });
        },
        function(token, done){
            User.findOne({username: req.body.username},function(err,user){
                if(!user){
                    console.log("ERROR");
                    return res.redirect("http://localhost:3000/Forget")
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; //1 sat

                user.save(function(err){
                    done(err,token,user);
                });
            });
        },
        function(token,user,done){
            const stmpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth:{
                    user:'aleksandar19981@gmail.com',
                    pass:'jaigramikariam.'
                }
            });
            const mailOptions = {
                to:user.username,
                from:'aleksandar19981@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            stmpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                console.log("POSLAT MAILL")
                done(err, 'done');
              });
        }
    ],function(err){
        if(err) return next(err);
        res.redirect("http://localhost:3000/Forget")
    })
})
app.get("/reset/:token",function(req,res){
    
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires:{$gt: Date.now() } }, function(err, user){
         if(!user){
             console.log("Greska je"+err);
             return res.redirect("http://localhost:3000/Forget")
         }
         res.redirect("http://localhost:3000/Reset/?token="+req.params.token);
    
    });
});

app.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        console.log("Token je:"+req.params.token);
        console.log("Datum je:"+Date.now());
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
           console.log('Password reset token is invalid or has expired.');
            return res.redirect('http://localhost:3000/Forget');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
             console.log("Passwords do not match.");
              return res.redirect("http://localhost:3000/Forget");
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'aleksnadr19981@gmail.com',
            pass: 'jaigramikariam.'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'aleksandar19981@mail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });
  


const PORT = process.env.PORT || 5000;
app.listen(PORT);