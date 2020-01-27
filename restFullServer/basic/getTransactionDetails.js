var request = require("request");
//var jwtToken = require('../basic/jwtToken.js');
async function getTransactionDetails(req,res) {

    var transactionInvoked = req.query.transactionInvoked;
    transactionInvoked = transactionInvoked.replace("#", "/");
    //return res.send(transactionInvoked);
    //var trxId=trx.slice(trx.lastIndexOf('#') + 1);
    //var url=trx.slice(0,trx.indexOf('#') - 1);

    options = {
        method: 'GET',
        url: 'http://localhost:3000/api/'+transactionInvoked,
        headers: {accept: 'application/json'},
        json: true
    };
    
    
    request(options, async function (error, response, body) {
        if (error)
            return res.status(500).send(JSON.stringify({success: false, message:error}));

        if (response.statusCode!=200)
            return res.status(response.statusCode).send(JSON.stringify({success: false, message: body.error.message}));


        return res.send({success: true, result: body});
    });
    

}

module.exports={
    getTransactionDetails
}
