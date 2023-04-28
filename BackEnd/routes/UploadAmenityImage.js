const imageRouter2 = require('express').Router()
const cloudinary = require('cloudinary')
const fs = require('fs')


//I am upload image on cloudinary
cloudinary.config({
    cloud_name: 'dnbijvtow',
    api_key: '351166249198857',
    api_secret: '-_RcmYmUglGhra5bh3P1HOjsxV4' 
})

//upload image only admin
imageRouter2.post('/upload',(req, res) =>{
    try {
        // console.log(cloudinary.cloud_name)
        if (!req.files || Object.keys(req.files).length ===0)
            return res.status(400).json({msg:"No files were uploaded"})

            const file = req.files.file;
            if(file.size > 1024*1024) {
                removeTmp(file.tempFilePath)
                return res.status(400). json({msg:"Size too large"})
            }
            

            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
                removeTmp(file.tempFilePath)
                return res.status(400).json({msg: "File format is incorrect."})
            }
              

            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
                if(err) throw err;
                removeTmp(file.tempFilePath)

                res.json({public_id: result.public_id, url: result.secure_url})
            })   


        
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
})

//Delete image
imageRouter2.post('/destroy',(req, res) =>{
    try {
        const {public_id} = req.body;
         if(!public_id) return res.status(400).json({msg: 'No images Selected'})

         cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg:"Delete Image"})

         })
    } catch (err) {
       return  res.status(500).json({msg: err.message})
    }
    
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}
module.exports = imageRouter2;