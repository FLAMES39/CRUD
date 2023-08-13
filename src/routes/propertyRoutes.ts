import { Router } from "express";
import { DeleteProperty, GetPropertyById, UpdateProperty, addProperty, getProperties } from "../Controlers/propertyControler";





const propertyroute=Router()

propertyroute.get('',getProperties)
propertyroute.post('',addProperty)
propertyroute.get('/prop/:Propertyid', GetPropertyById)
propertyroute.put('/:Propertyid',UpdateProperty)
propertyroute.delete('/:Propertyid',DeleteProperty)




export default propertyroute