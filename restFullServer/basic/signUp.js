var request = require("request");
async function signUp(req,res) {

  var email= req.body.email;
  var companyId= req.body.companyId;
  var password= req.body.password;
  var title= req.body.title;
  var firstName= req.body.firstName;
  var lastName= req.body.lastName;
  var nic= req.body.nic;
  var gender= req.body.gender;
  var contactDetails= req.body.contactDetails;
  var userType = req.body.userType;

  contactDetails.$class='composer.base.ContactDetails';
  contactDetails.address.$class='composer.base.Address';

  var options;
  if(userType=='USER'){

    options = {
      method: 'POST',
      url: 'http://localhost:3000/api/composer.base.User',
      headers: {'content-type': 'application/json'},
      body: {
        "$class": "composer.base.User",
        "email": email,
        "password": password,
        "title": title,
        "firstName": firstName,
        "lastName": lastName,
        "nic": nic,
        "gender": gender,
        "contactDetails": contactDetails
      },
      json: true
    };
    
  }
  else if(userType=='MANUFACTURER'){

    options = {
      method: 'POST',
      url: 'http://localhost:3000/api/composer.base.Manufacturer',
      headers: {'content-type': 'application/json'},
      body: {
        "$class": "composer.base.Manufacturer",
        "companyId": companyId,
        "password": password,
        "title": title,
        "contactDetails": contactDetails
      },
      json: true
    };
  }
  else if(userType=='TAKAFUL'){

    options = {
      method: 'POST',
      url: 'http://localhost:3000/api/composer.base.Takaful',
      headers: {'content-type': 'application/json'},
      body: {
        "$class": "composer.base.Takaful",
        "companyId": companyId,
        "password": password,
        "title": title,
        "contactDetails": contactDetails
      },
      json: true
    };
  }
  else if(userType=='FAHAS'){

    options = {
      method: 'POST',
      url: 'http://localhost:3000/api/composer.base.Fahas',
      headers: {'content-type': 'application/json'},
      body: {
        "$class": "composer.base.Fahas",
        "companyId": companyId,
        "password": password,
        "title": title,
        "contactDetails": contactDetails
      },
      json: true
    };
  }
  else{
    return res.status(422).send(JSON.stringify({success: false, message:'Invalid UserType'}));
  }


  
  request(options, function (error, response, body) {
    if (error){
      console.log(error);
      return res.status(500).send(JSON.stringify({success: false, message:error}));
    }
    

    if (response.statusCode!=200){
      if(body.error.message && body.error.message.includes('object already exists'))
        return res.status(409).send(JSON.stringify({success: false, message:'User Already registered.'}));
      else
        return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));
    }
    
    var result= {success: true, result: {message: "SignUp successful, Kindly Login to continue."}};
    return res.send(JSON.stringify(result));
  });
  

}

module.exports={
    signUp
}
