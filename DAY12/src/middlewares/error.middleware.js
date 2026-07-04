    import dotenv from "dotenv";

    dotenv.config();

    // in error handling middleware there are 4 parameter are used
    function handleError(err,req,res,next){

        const response = {
            message:err.message
        }
        console.log(process.env.NODE_ENVIRONMENT);
        if(process.env.NODE_ENVIRONMENT === "development"){
            response.stack = err.stack
        }

        res.status(err.status).json(response);
    }

    export default handleError;