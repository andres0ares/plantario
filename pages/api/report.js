import Report from '../../utils/models/Report'
import dbConnect from '../../utils/dbConnect'

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
                const newestTime = new Date().getTime()

                const result = await Report.findOne({date: date});

                if(result){

                    const newTimeIlu = newestTime - result.newestTime
                    let setNewTimeIlu = 0;
                    if(newTimeIlu > 600000 || req.body.ilu < 900) {
                        setNewTimeIlu = result.timeIlu
                    }else{
                        setNewTimeIlu = result.timeIlu + newTimeIlu
                    }

                    const newReport = {
                        date: date,
                        newestTime: newestTime,
                        temp: req.body.temp,
                        tempMin: req.body.temp < result.tempMin ? req.body.temp : result.tempMin,
                        tempMax: req.body.temp > result.tempMax ? req.body.temp : result.tempMax,
                        ilu: req.body.ilu,
                        timeIlu: setNewTimeILu,
                        umi: req.body.umi,
                        reservatorio: req.body.reservatorio
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
                        reservatorio: req.body.reservatorio
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
