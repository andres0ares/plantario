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
    const day = props.data.date.slice(4, 16)

    function format(time) {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    return (
        <Paper elevation={3} className={classes.root} >
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Relatório Diário
            </Typography>
            <Typography variant="h5" component="h2">
            {day}
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
                        Máxima de {props.data.tempMax}ºC e mínima de {props.data.tempMin}ºC.
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
                        Na última medição o reservatório estava em {props.data.reservatorio}%.
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
                        O plantário passou {format(props.data.timeIlu / 1000)}hs exposto ao sol.
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
                        Na última medição a umidade estava à {props.data.umi}%.
                        </Typography>
                    </div>                                
                </Grid>
            </Grid>
        </Paper>        
    )
}