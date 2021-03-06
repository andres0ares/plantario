import { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ShowCarousel from './ShowCarousel'
import TextField from '@material-ui/core/TextField'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import OpacityIcon from '@material-ui/icons/Opacity'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import Button from '@material-ui/core/Button'
import FormSetup from './FormSetup'



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
    p: {
        color: 'white',
        fontSize: '14px',
        margin: '0 5%'
    },
    i: {
        width: '100%'
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


export default function Setup(props) {

    const schema = {
        name: '',
        temp: '',
        umi: '',
        ilu: '',
    }

    const classes = useStyle()

    const [config, setConfig] = useState(schema)
    const [conf, setConf] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [enviar, setEnviar] = useState({name: '', temp: 0, umi: 0, ilu: 0, openSombrete: 0})

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
        const n = {
            name: config.name,
            temp: Number(config.temp),
            ilu: Number(config.ilu),
            umi: Number(config.umi),
            openSombrete: 0
        }
        if((n.temp < 31 && n.temp > 19) && (n.ilu > 1 && n.ilu < 11) && (n.umi < 101 && n.umi > 0)){
            setEnviar(n)
            setInvalid(false)
            setConf(true)
        }else{
            setInvalid(true)
        }

        
    }

    return (
        <div>
            <h3 className={classes.title} >Configurar</h3>

            <ShowCarousel click={handleSelect}/>

            <form className={classes.form} autoComplete="off">
                <CssTextField
                    className={classes.formName}
                    id="outlined-required-name"
                    name="name"
                    label="Esp??cie"
                    variant="outlined"
                    value={config.name}
                    onChange={handleForm}                   
                />
                <CssTextField
                    className={classes.formD}
                    id="outlined-required-ilu"
                    name="ilu"
                    label={<WbSunnyIcon />}
                    type="number"
                    variant="outlined"
                    value={config.ilu}
                    onChange={handleForm}
                />
                <CssTextField
                    className={classes.formD}
                    id="outlined-required-temp"
                    name="temp"
                    label={<AcUnitIcon />}
                    type="number"
                    variant="outlined"
                    value={config.temp}
                    onChange={handleForm}
                />
                <CssTextField
                    className={classes.formD}
                    id="outlined-required-umi"
                    name="umi"
                    label={<OpacityIcon />}
                    type="number"
                    variant="outlined"
                    value={config.umi}
                    onChange={handleForm}
                />

                {invalid && <><p className={classes.p}>Parece que um dos dados que voc?? inseriu n??o ?? v??lido.<br />
                *A temperatura deve estar entre 20 e 30, a umidade entre 0 e 100, e o tempo de exposi????o ao sol entre 2 e 10</p></>}

                <Button onClick={handleApagar} variant="outlined" className={classes.apagar}>
                    Apagar
                </Button>
                <Button  onClick={handleEnviar} variant="contained" className={classes.enviar}>
                    Confirmar
                </Button>

            </form>

            {conf && <FormSetup obj={enviar} cancel={props.exit} />}
            

        </div>
    )
}