const Products = require ('../modles/productModel')
const Customer = require('../modles/Customer');
const productModel = require('../modles/productModel');


 

  
    

  
//filter, sorting and paginating

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
   
    //////////     // /////////////////////////////////////////////////////////////////////////
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
        
        const excludedFields =['page', 'sort', 'limit']
        excludedFields.forEach(e1 => delete(queryObj[e1]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
       
        //gte = greater than or equal
        //lte = lesser than or equal
        // lt= lesser than 
        //gt = greater than
        this.query.find(JSON.parse(queryStr))
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async(req,res) =>{
        try {
            
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.status(200).json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
          const {product_id, title,fee,description,content, images,category} = req.body;
          if(!images) return res.status(400).json({msg: "No image upload"})

          const product = await Products.findOne({product_id})
          if(product) return res.status(400).json({msg: "This Product already exists"})

          const newProduct = new Products({
            product_id, title: title.toLowerCase(),fee,description,content, images,category
          })
          await newProduct.save()         
          res.status(200).json({msg:"Created a Amenity"})

        } catch (err) {
            return res.status(500).json({msg: err.message})     
        }
    },
    deleteProduct: async(req,res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:"Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req,res) =>{
        try {
            const { title,fee,description,content, images,category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(),fee,description,content, images,category
            })

            res.status(200).json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    totalFee : async(req,res) =>{

        await Customer.aggregate(
           
            [   
                {
                    $unwind: "$cart"
                    },
                    {
                     $group: {
                             _id: "$cart.title",
                              totalOrdered: {$sum: 1}
                     }
                    }
              ]
        ).exec((err,total) =>{
    
            if(err){
                res.status(404).json({ err})
            }
            if(total){
                res.status(200).json(total)
               console.log(total)
    
            }
        })
      }

}


module.exports =productCtrl