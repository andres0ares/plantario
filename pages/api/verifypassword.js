const { APP_PASSWORD } = process.env

export default async (req, res)  => {
    
    const { method } = req

    switch(method){
        case 'GET':
            res.status(200).json({ message: 'API Route to verify password' })
            break
        case 'POST':
            if(req.body.password == APP_PASSWORD){
                res.status(200).json({ success: true })
            }else{
                res.status(200).json({ success: false })
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}