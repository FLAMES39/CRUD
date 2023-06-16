import joi from 'joi'


export const validationSchema= joi.object({
    userid:joi.string().required(),
    name:joi.string().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email:joi.string().required(),
    role:joi.string().required()
})
