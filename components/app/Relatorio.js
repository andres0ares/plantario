import { makeStyles } from '@material-ui/core/styles'
import RelatorioPaper from './RelatorioPaper'

const useStyle = makeStyles((theme) => ({
    root: {
        width: '90%',
        margin: '40px 5% 100px 5%'
    }
}))

export default function Relatorio(props) {

    const classes = useStyle()
    const reports = props.data.reverse()

    return (
        <div className={classes.root}>
            {reports.map((report, index) => 
                <RelatorioPaper key={index} data={report}/>
            )}
        </div>
        
    )
}