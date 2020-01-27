var request = require("request");
var jwtToken = require('./jwtToken.js');
async function logIn(req,res) {

    var email= req.body.email;
    var companyId= req.body.companyId;
    var mId= req.body.mId;
    var password= req.body.password;
    var options;
    var data={};
    var userType = req.body.userType;
    
    if(userType=='USER'){
        data ={email:email};
        var filter = {where:{email:email}};
        var options = {
            method: 'GET',
            url: 'http://localhost:3000/api/composer.base.User',
            qs: {filter: JSON.stringify(filter)},
            headers: {accept: 'application/json'},
            json: true
        };
    }
    else if(userType=='MANUFACTURER'){
        data ={companyId:companyId};
        var filter = {where:{companyId:companyId}};
        options = {
            method: 'GET',
            url: 'http://localhost:3000/api/composer.base.Manufacturer',
            qs: {filter: JSON.stringify(filter)},
            headers: {accept: 'application/json'},
            json: true
        };
    }
    else if(userType=='TAKAFUL'){
        data ={companyId:companyId};
        var filter = {where:{companyId:companyId}};
        options = {
            method: 'GET',
            url: 'http://localhost:3000/api/composer.base.Takaful',
            qs: {filter: JSON.stringify(filter)},
            headers: {accept: 'application/json'},
            json: true
        };
    }
    else if(userType=='FAHAS'){
        data ={companyId:companyId};
        var filter = {where:{companyId:companyId}};
        options = {
            method: 'GET',
            url: 'http://localhost:3000/api/composer.base.Fahas',
            qs: {filter: JSON.stringify(filter)},
            headers: {accept: 'application/json'},
            json: true
        };
    }
    else if(userType=='MINISTORY'){
        data ={mId:mId};
        var filter = {where:{mId:mId}};
        options = {
            method: 'GET',
            url: 'http://localhost:3000/api/composer.base.Ministory',
            qs: {filter: JSON.stringify(filter)},
            headers: {accept: 'application/json'},
            json: true
        };
    }
    else{
        return res.status(422).send(JSON.stringify({success: false, message:'Invalid UserType'}));
    }
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));


        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));


        if(body.length==0)  
            return res.status(401).send(JSON.stringify({success: false, message: 'Invalid user identifier, User not found'}));

        if(body[0].password!=password)
            return res.status(401).send(JSON.stringify({success: false, message: 'Invalid user credentials, wrong password'}));


        var jwt= await jwtToken.getToken(data);
        return res.send(JSON.stringify({success: true, result: {jwt: jwt, userType: userType}}));
    });
    

}

module.exports={
    logIn
}
