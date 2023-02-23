const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { urlToHttpOptions } = require('url');
const { log } = require('console');

const app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));





app.get("/",function (req,res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/",function (req,res) {
  
   const FirstName = req.body.fname;
   const lastName = req.body.lname;
   const Email = req.body.email;

   const data = {
      members:[
           {
            email_address : Email,
            status : "subscribed",
            merge_fields:{
             FNAME :  FirstName,
             LNAME :lastName
            }


           }
          ]
        }
        const jsonData = JSON.stringify(data);


         const url = "https://us21.api.mailchimp.com/3.0/lists/5e2782a6e0 "  

         const options = {
            method : "POST",
            auth :   "abhishek1:99bc7c3b54535c6905dddbb410699008-us21"
         }

  const request = https.request(url, options, function (response) {
         
        if ( response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
        } else{

          res.sendFile(__dirname + "/failure.html");
        }
           response.on("data",function (data) {
             console.log(JSON.parse(data));
         });
  });

     request.write(jsonData);
     request.end();
});





app.post("/failure",function (req, res) {
   res.redirect("/");
});












app.listen(process.env.PORT || 3000 , function ( ) {
    console.log ("Server is running on port 3000");  
  });
 

// API key
// 99bc7c3b54535c6905dddbb410699008-us21

// LIST id
//  5e2782a6e0 
  