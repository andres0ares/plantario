import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import OpacityIcon from '@material-ui/icons/Opacity'
import Grid from '@material-ui/core/Grid'

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '40px',
        padding: '15px'
    },
    title: {
        fontSize: 14,
    },
    subTitle: {
        marginTop: '10px',
        marginLeft: '5px'
    },
    icon: {
        marginTop: '10px',
        color: '#00897b'
    },
}))

export default function RelatorioPaper(props) {

    const classes = useStyle()
    const day = new Date().toDateString()

    return (
        <Paper elevation={3} className={classes.root} >
            <h4 className={classes.title}>{day}</h4>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Informações do plantário
            </Typography>
            <Typography variant="h5" component="h2">
            Status
            </Typography>
            <Grid container>
                <Grid item xs={1} className={classes.icon} >
                    <AcUnitIcon />
                </Grid>
                <Grid item xs={11}>
                    <div className={classes.subTitle}>
                        <Typography  color="textSecondary">
                        Temperatura
                        </Typography>
                        <Typography variant="body2" component="p">
                        A temperatura atual é de .
                        </Typography>
                    </div>                                
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1} className={classes.icon} >
                    <LocalDrinkIcon />
                </Grid>
                <Grid item xs={11}>
                    <div className={classes.subTitle}>
                        <Typography  color="textSecondary">
                        Reservatório
                        </Typography>
                        <Typography variant="body2" component="p">
                        O nível de àgua no reservatório está em .
                        </Typography>
                    </div>                                
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1} className={classes.icon} >
                    <WbSunnyIcon />
                </Grid>
                <Grid item xs={11}>
                    <div className={classes.subTitle}>
                        <Typography  color="textSecondary">
                        Exposição ao sol
                        </Typography>
                        <Typography variant="body2" component="p">
                        O plantário está a esposto ao sol.
                        </Typography>
                    </div>                                
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1} className={classes.icon} >
                    <OpacityIcon />
                </Grid>
                <Grid item xs={11}>
                    <div className={classes.subTitle}>
                        <Typography  color="textSecondary">
                        Umidade
                        </Typography>
                        <Typography variant="body2" component="p">
                        A taxa de umidade do solo está em .
                        </Typography>
                    </div>                                
                </Grid>
            </Grid>
        </Paper>        
    )
}