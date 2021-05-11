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
    const {temperatura, nivelAgua, timeLight, umidade} = props.data

    return (
        <>
        <Grid container>
            <Grid item xs></Grid>

            <Grid item xs={12} md={5} className={classes.marginCard}>
                <Card className={classes.rootP}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Configuração
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Temperatura: 28º <br />
                            Umidade: 65% <br />
                            Exposição: 5hrs <br />
                            Espécie: Hortelã
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
                                    A temperatura atual é de {temperatura}.
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
                                    O nível de àgua no reservatório está em {nivelAgua}.
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
                                    O plantário está a {timeLight} esposto ao sol.
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
                                    A taxa de umidade do solo está em {umidade}.
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
                        Para adicionar ou alterar as configuraçãos, clique no botão " + ". 
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
        </>
    )
}