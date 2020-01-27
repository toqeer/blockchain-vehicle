const  jwt  =  require('jsonwebtoken');
const SECRET_KEY = "ksaforvhiclesystem";
//var jwtDecode = require('jwt-decode');


function getToken(data) {
    return new Promise(async resolve => {
    
        const  expiresIn  = 6*60* 60;
        const  accessToken  =  jwt.sign({ data:data }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        //var token = jwtDecode(accessToken);
        //token.token=accessToken;
        resolve(accessToken);
   
    });
} 
  
  
//---------------------------------token verification--------------------------------------------------------
  
  
function verifyToken(token) {
    return new Promise(async resolve => {
   
   
        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            jwt.verify(token, SECRET_KEY,async (err, decoded) => {
                if (err) {
                  //console.log(err);
                  // resolve('Token Expired');
                    var result= {error: "Invalid Token"};
                    resolve(result);  
                } 
                else {
  
                    // var expDate= new Date(decoded.exp*1000);
                    // var currentDate= new Date();
                    // var date3=new Date(currentDate.getTime() + 30*1000); // after 30 ses of current time
                    // // var d=decoded;
                    // if (date3.getTime() >= expDate.getTime()) {
  
                    //     var r= await getToken(decoded.data,connection);
                    //     decoded.newToken=r.token;
                    //     decoded.iat=r.iat;
                    //     decoded.exp=r.exp;
                    //     resolve(decoded);
                    // }
                    // else{
                    //     decoded.newToken=null;
                    //     resolve(decoded);
                    // }
                    resolve(decoded);
                }
            });
        } 
        else{
            var result= {error: "No Token supplied"};
            resolve(result);
        }
    });
} 
  
  

module.exports={
    getToken,
	verifyToken
}
