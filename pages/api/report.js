import Report from '../../utils/models/Report'
import Command from '../../utils/models/Command'
import dbConnect from '../../utils/dbConnect'
import sendemail from '../../utils/sendemail'

dbConnect()

export default async (req, res)  => {

    const { method } = req
    
    switch(method) {
        case 'GET':
            try {

                const report = await Report.find({})
                res.status(200).json({ success: true, data: report })
                               
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST': 
            try {

                const date = new Date().toDateString()

                const result = await Report.findOne({date: date});
                const newestTime = new Date().getTime()

                if(result){

                    // atualiza o newestTime e atualiza o tempo de exposicao ao sol 
                    const newTimeIlu = (newestTime - result.newestTime)

                    let setNewTimeIlu

                    if(newTimeIlu > 600000 || req.body.ilu < 900) {
                        setNewTimeIlu = result.timeIlu
                    }else{
                        setNewTimeIlu = result.timeIlu + newTimeIlu
                    }

                    if(setNewTimeIlu > 7200000) { //maior que duas horas

                        const config = await Command.find({})
                        const configTime = (config[config.legth -1].ilu * 3600000)

                        if(setNewTimeIlu >= configTime) {
                            
                            config[config.legth -1].openSombrete = 1
                            await Command.replaceOne({_id: "609d2193b4c0a3368dd69077"}, config);
                        }


                    } 

                    let sendedEmail
                    if(req.body.reservatorio == 1 && !result.sendedEmail){
                        sendemail()
                        sendedEmail = true
                    }else if(req.body.reservatorio == 0 && result.sendedEmail) {
                        sendedEmail = false
                    }else{
                        sendedEmail = result.sendedEmail
                    }



                    //Cria novo objeto report com as informacoes atualizadas
                    const newReport = {
                        date: date,
                        newestTime: newestTime,
                        temp: req.body.temp,
                        tempMin: req.body.temp < result.tempMin ? req.body.temp : result.tempMin,
                        tempMax: req.body.temp > result.tempMax ? req.body.temp : result.tempMax,
                        ilu: req.body.ilu,
                        timeIlu: setNewTimeIlu,
                        umi: req.body.umi,
                        reservatorio: req.body.reservatorio,
                        sendedEmail: sendedEmail
                    }

                    const report = await Report.replaceOne({date: date}, newReport);
                    res.status(201).json({success: true, data: report})

                }else{

                    
                    const newReport = {
                        date: date,
                        newestTime: newestTime,
                        temp: req.body.temp,
                        tempMin:req.body.temp,
                        tempMax: req.body.temp,
                        ilu: req.body.ilu,
                        timeIlu: 0,
                        umi: req.body.umi,
                        reservatorio: req.body.reservatorio,
                        sendedEmail: false
                    }
                  
                    const report = await Report.create(newReport)
                    res.status(200).json({ success: true, data: report})
                }
                    
                
                
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false, body: req.body,  error: error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
    
}
