const connectToDb = require('./src/config/database')
const app = require('./src/app')


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    connectToDb();
})