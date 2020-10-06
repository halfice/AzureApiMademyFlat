module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    const sql = require('mssql')



    var config = {
        server: "mademyflat.database.windows.net", // Use your SQL server name
        database: "finalflatmate", // Database to connect to
        user: "finalflatmate", // Use your username
        password: "P@ssw0rd123#", // Use your password
        port: 1433,
        // Since we're on Windows Azure, we need to set the following options
        options: {
            encrypt: true
        }
    };

    var id = context.bindingData.email;



    if (context.bindingData.email == 'b') {
        InsertUser(context, req);
    } else {
        //Feth user
        //try start
        try {

            var email = req.query.email;
            await sql.connect(config)
            const result = await sql.query`select * from users where useremail=${email}`
            context.log(result);
            context.res = {
                status: 200,
                body: result,//"Please pass a videoId on the query string or in the   request body"
            };
        } catch (err) {
            // ... error checks
            context.log(err);
            context.res = {
                status: 500,
                body: err
            };
        }//catch end
    }//else end
    //fetch user end



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

function InsertUser(req) {
    try {

        var email = req.query.email;
        await sql.connect(config)
        const result = await sql.query`select * from users`
        context.log(result);
        context.res = {
            status: 200,
            body: result,//"Please pass a videoId on the query string or in the   request body"
        };
    } catch (err) {
        // ... error checks
        context.log(err);
        context.res = {
            status: 500,
            body: err
        };
    }//catch end
}