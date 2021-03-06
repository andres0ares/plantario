import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import OpacityIcon from '@material-ui/icons/Opacity'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px 0',
        minWidth: 275,
    },
    marginCard: {
        marginBottom: '30px'
    },
    marginCardLast: {
        
        marginBottom: '70px'
    },
    padd: {
        padding: '30px 0',
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
    pos: {
        marginBottom: 12,
    },
    rootP: {
        padding: '30px 0',
        display: 'flex',
    },
    details: {
    display: 'flex',
    flexDirection: 'column',
    },
    content: {
    flex: '1 0 auto',
    },
    cover: {
    width: 151,
    },
}))

export default function Status(props) {

    const classes = useStyles()
    const {temp, reservatorio, ilu, umi, timeIlu} = props.data

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
        <>
        <Grid container>
            <Grid item xs></Grid>

            <Grid item xs={12} md={5} className={classes.marginCard}>
                <Card className={classes.rootP}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Configura????o
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Esp??cie: {props.set.name}<br />
                            Temperatura: {props.set.temp}?? graus<br />
                            Umidade: {props.set.umi}% <br />
                            Exposi????o: {props.set.ilu}hrs 
                        </Typography>
                        </CardContent>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image="https://st.depositphotos.com/1169502/2025/v/600/depositphotos_20257115-stock-illustration-abstract-eco-green-plant-with.jpg"
                        title="Live from space album cover"
                    />
                </Card>
            </Grid>

            <Grid item xs></Grid>
        </Grid>

        <Grid container>
            <Grid item xs></Grid>

            <Grid item xs={12} md={5} className={classes.marginCard}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Informa????es do plant??rio
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
                                    A temperatura atual ?? de {temp}??C.
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
                                    Reservat??rio
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {reservatorio > 0 ? "O reservat??rio est?? cheio" : "O reservat??rio est?? vazio"}
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
                                    Exposi????o ao sol
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    {(ilu < 900) && "Aten????o: Movimente o plant??rio para um lugar mais iluminado."}
                                    </Typography>
                                    <Typography variant="body2" component="p">
            
                                    Tempo de exposi????o ao sol: {format(timeIlu / 1000)}.
                                    Valor do sensor: {ilu}.
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
                                    A taxa de umidade do solo est?? em {umi}%.
                                    </Typography>
                                </div>                                
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs></Grid>
        </Grid>

        <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={12} md={5} className={classes.marginCardLast}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        Conectado ao plantario
                        </Typography>
                        <Typography variant="body2" component="p">
                        Para adicionar ou alterar as configura????os, clique no bot??o " + ". 
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
        </>
    )
}