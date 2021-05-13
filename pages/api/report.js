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
                const result = await Report.findOne({date: date});

                if(result){


                    const newReport = {
                        date: date,
                        temp: req.body.temp,
                        tempMin: req.body.temp < result.tempMin ? req.body.temp : result.tempMin,
                        tempMax: req.body.temp > result.tempMax ? req.body.temp : result.tempMax,
                        ilu: req.body.ilu,
                        umi: req.body.umi,
                        reservatorio: req.body.reservatorio
                    }

                    const report = await Report.replaceOne({date: date}, newReport);
                    res.status(201).json({success: true, data: report})

                }else{
                    
                    const newReport = {
                        date: date,
                        temp: req.body.temp,
                        tempMin:req.body.temp,
                        tempMax: req.body.temp,
                        ilu: req.body.ilu,
                        umi: req.body.umi,
                        reservatorio: req.body.reservatorio
                    }
                  
                    const report = await Report.create(newReport)
                    res.status(200).json({ success: true, data: report})
                }
                    
                
                
            } catch (error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
    
}