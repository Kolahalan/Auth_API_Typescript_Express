export default {
    port:3000,
    dbUri: "mongodb://localhost:27017/mydatabase",
    smtp:{
         user: 'osau5dvyfrjxalid@ethereal.email',
         pass: 'SmjtCbnrFq2sv3KP1h',
         host: "smtp.ethereal.email",
         port: 587,
         secure: false, //In production while using a proper smtp server, this will be set to true with proper user, pass, and host
    },
    accessTokenPrivateKey: "",
    refreshTokenPrivateKey: "",
    dbServer: "",
    dbPort: "",
    dbUser: "",
    dbPassword: "",
    databaseName: "test"
}

/*
The reason I tried to use npm config is that we can easily create multiple configurations file 
for multiple environments

When the NODE_ENV environment variable is set to 'production', the config package will automatically 
load the configuration values from the production.ts file instead of the default.ts file.

Note that you can also have configuration values for other environments such as development, test, etc. 
by creating corresponding files in the config folder (development.ts, test.ts, etc.) and
 setting the NODE_ENV environment variable accordingly.
*/

