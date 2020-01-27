var request = require("request");
var jwtToken = require('../basic/jwtToken.js');
async function getAllTransactions(req,res) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    var verifyTokenResp= await jwtToken.verifyToken(token);
    
    if (!verifyTokenResp.data)
        return res.status(401).send(JSON.stringify({success: false, message:verifyTokenResp.error}));
    
    var companyId=verifyTokenResp.data.companyId;
    var filter = {where:{participantInvoking:'resource:composer.base.Fahas#'+companyId}};
    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/composer.base.Historian',
        qs: {filter: JSON.stringify(filter)},
        headers: {accept: 'application/json'},
        json: true
    };
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));

        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));

        body.forEach(element => {
            delete element.$class;
            //delete element.transactionInvoked;
            delete element.participantInvoking;
            //element.participantInvoking = element.participantInvoking.slice(element.participantInvoking.lastIndexOf('#') + 1);
            element.assetLinked = element.assetLinked.slice(element.assetLinked.lastIndexOf('.') + 1);
        });
        body.sort(function(x, y){
            return new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime();
        });
        return res.send(JSON.stringify({success: true, result: body}));
    });
    

}

module.exports={
    getAllTransactions
}
