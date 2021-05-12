import { makeStyles } from '@material-ui/core/styles'
import RelatorioPaper from './RelatorioPaper'

const useStyle = makeStyles((theme) => ({
    root: {
        width: '90%',
        margin: '40px 5% 0 5%'
    }
}))

export default function Relatorio() {

    const classes = useStyle()

    return (
        <div className={classes.root}>
            <RelatorioPaper />
            <RelatorioPaper />
            <RelatorioPaper />
        </div>
        
    )
}