// Build an apiRouter using express Router
// Build an apiRouter using express Router
const express = require('express');
const apiRouter = express.Router();
// Import the database adapter functions from the db
const {
    createReport,
    closeReport,
    getOpenReports,
    _getReport,
    createReportComment,
  } = require("../db/index");
/**
 * Set up a GET request for /reports
 *
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */

apiRouter.get("/reports", async (req, res,next) => {
    try {
      const theReports = await getOpenReports();
      res.send({
        reports: theReports,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */
apiRouter.post('/reports', async(req,res,next)=>{
    try{
       
        const { title , location , description , password } = req.body
        const fields = {}
        if (title) {
            fields.title = title
        }else{
            throw Error('Need Title')
        }
        if(location){
            fields.location = location
        }else{
            throw Error('Need Location')
        }
        if(description){
            fields.description= description
        }else{
            throw Error('Need description')
        }
        if(password){
            fields.password = password
        }else{
            throw Error('Need Password')
        }
        const create = await createReport(fields)
        res.send(create);
    }catch(error){
        next(error)
    }
})


/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */

apiRouter.delete('/reports/:reportId',async(req,res,next) => {
    try{
        const {reportId} = req.params
        const {password} = req.body
        const close = await closeReport(reportId,password)
        res.send(close)

    }catch(error){
        next(error)
    }
})
/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */
// Export the apiRouter

apiRouter.post('/reports/:reportId/comments',async(req,res,next) =>{
    try{
        const {reportId} = req.params
        const fields = req.body
        console.log(fields)
        const createComments = await createReportComment(reportId,fields)
        res.send(createComments)

    }catch(error){
        next(error)
    }

})


module.exports = apiRouter;