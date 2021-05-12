import { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ShowCarousel from './ShowCarousel'
import TextField from '@material-ui/core/TextField'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import OpacityIcon from '@material-ui/icons/Opacity'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import Button from '@material-ui/core/Button'



const useStyle = makeStyles((theme) => ({
    form: {
        marginTop: '40px',
        marginBottom: '70px'
    },
    formName: {
        width: '90%',
        margin: '10px 5% 10px 5%',
        color: 'white'
    },
    formD: {
        width: '27%',
        margin: '10px 0 10px 5%',
    },
    apagar: {
        width: '42.5%',
        margin: '10px 0 0 5%',
        color: 'white'
    },
    enviar: {
        width: '42.5%',
        margin: '10px 0 0 5%',
        color: 'white',
        backgroundImage: 'linear-gradient(to right, #80cbc4 , #26a69a )',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontFamily: "'Exo 2', sans-serif"
    },
}))

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
      borderWidth: 2,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
      borderWidth: 2,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: 'white',
        borderWidth: 2,
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        borderWidth: 2,
      },
    },
  },
})(TextField)


export default function Setup() {

    const schema = {
        name: '',
        temp: '',
        umi: '',
        ilu: ''
    }

    const classes = useStyle()
    const [config, setConfig] = useState(schema)

    const handleForm = (event) => {

        const { value, name }  = event.target
        setConfig((prevValue) => ({
            ...prevValue,
            [name]: value
        }))
    }

    const handleSelect = (plant) => {
        setConfig(plant)
    }

    const handleApagar = () => {
        setConfig(schema)
    }

    const handleEnviar = () => {
        const enviar = {
            name: config.name,
            temp: Number(config.temp),
            ilu: Number(config.ilu),
            imu: Number(config.umi)
        }

        console.log(enviar)
    }

    return (
        <div>
            <h3 className={classes.title} >Configurar</h3>

            <ShowCarousel click={handleSelect}/>

            <form className={classes.form} autoComplete="off">
                <CssTextField
                    className={classes.formName}
                    id="outlined-required"
                    name="name"
                    label="Espécie"
                    variant="outlined"
                    value={config.name}
                    onChange={handleForm}                   
                />
                <CssTextField
                    className={classes.formD}
                    id="outlined-required"
                    name="ilu"
                    label={<WbSunnyIcon />}
                    type="number"
                    variant="outlined"
                    value={config.ilu}
                    onChange={handleForm}
                />
                <CssTextField
                    className={classes.formD}
                    id="outlined-required"
                    name="temp"
                    label={<AcUnitIcon />}
                    type="number"
                    variant="outlined"
                    value={config.temp}
                    onChange={handleForm}
                />
                <CssTextField
                    className={classes.formD}
                    id="outlined-required"
                    name="umi"
                    label={<OpacityIcon />}
                    type="number"
                    variant="outlined"
                    value={config.umi}
                    onChange={handleForm}
                />
                <Button onClick={handleApagar} variant="outlined" className={classes.apagar}>
                    Apagar
                </Button>
                <Button onClick={handleEnviar} variant="contained" className={classes.enviar}>
                    Enviar
                </Button>
            </form>
        </div>
    )
}