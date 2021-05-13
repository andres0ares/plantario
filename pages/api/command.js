import Command from '../../utils/models/Command'
import dbConnect from '../../utils/dbConnect'

dbConnect()

export default async (req, res)  => {

    const { method } = req
    
    switch(method) {
        case 'GET':
            try {
                const command = await Command.find({})
                if(command.length > 0) {
                    res.status(200).json({ success: true, data: command[command.length -1] })
                }else {
                    res.status(200).json({ success: true, data: command })
                }
                
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST': 
            try {
                const command = await Command.replaceOne({_id: "609d2193b4c0a3368dd69077"}, req.body);
                res.status(201).json({success: true, data: command})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
    
}