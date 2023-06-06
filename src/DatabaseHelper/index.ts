import mssql from 'mssql'
import { sqlConfig } from '../config'

export class DatabaseHelper{
    private static pool:Promise<mssql.ConnectionPool>=mssql.connect(sqlConfig)

    // constructor(){
    //     DtabaseHelper.pool=mssql.connect(sqlConfig)
    // }

    private static  addInputToRequest (request:mssql.Request,data:{[x:string]:string|number}={}){
        const keys=Object.keys(data)
        keys.map(KeyName=>{
            return request.input(KeyName,data[KeyName])

        })
        return request
    }
     static async exec (storedProcedure:string,data:{[x:string]:string|number}={}){
        let request:mssql.Request= await (await DatabaseHelper.pool).request()
        request=this.addInputToRequest(request,data)
        return request.execute(storedProcedure)
    }

    static async query (querystring:string){
        return (await DatabaseHelper.pool).request().query(querystring)
    }
} 