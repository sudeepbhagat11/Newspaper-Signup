const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(request,res){
    const firstName = request.body.fname;
    const secondName = request.body.sname;
    const email = request.body.email;
    
    const data = {
        members: [
            {
                
                
                email_address : email,
                status : "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : secondName,
        
                }
                
            }
            ]
        
       
    };
    const jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/f4964ca4cc';
    const options = {
        url : 'https://us21.api.mailchimp.com/3.0/lists/f4964ca4cc',
        method : "POST",
        headers: {
            Authorization : 'auth a3c0e4ad9f88b8c030cdfd6d70267846-us21'
        },
        body : jsonData

        
         
    };

    const rec = https.request(url,options,function(response){
        console.log(res.statusCode);

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));


        });

    })

    rec.write(jsonData);
    rec.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(procedd.env.PORT || 3000,function(){
    console.log("server is running in port 3000");
});


