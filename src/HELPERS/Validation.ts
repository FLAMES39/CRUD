import joi from 'joi'


export const validationSchema= joi.object({
    
    // userid:joi.string().required(),
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    // role:joi.string().required()
})

export const propertySchema= joi.object({
  name:joi.string().required(),
  type:joi.string().required(),
  address:joi.string().required(),
  price:joi.number().required(),
  location:joi.string().required(),
  city:joi.string().required(),
  country:joi.string().required(),
  imageUrl:joi.string().required()
})


export const landLordSchema= joi.object({
  // landlordid:joi.required(),
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  propertyDocs:joi.string().required()
})