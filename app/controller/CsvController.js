const csvModel=require('../model/csvModel')
const csv=require('csvtojson')
const path=require('path')

class CsvController {
    async creatCSv(req,res){
        try{
            const userData=[]
            csv()
            .fromFile(req.file.path)
            .then(async(response)=>{
                for(let x=0;x<response.length;x++){
                    userData.push({
                        name:response[x].name,
                        email:response[x].email,
                        mobile:response[x].mobile,
                    })
                }
                const datas=await csvModel.insertMany(userData)  
            res.status(200).json({
                message:"csv data save successfully",
                data:datas  
            })

            })  
            

        }catch(err){
            console.log(err);
            
        }

    }


}


module.exports =new CsvController();