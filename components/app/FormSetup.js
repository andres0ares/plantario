import { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const { APP_PASSWORD } = process.env

const useStyle = makeStyles((theme) => ({
    form: {
        marginTop: '-20px',
        marginBottom: '100px'
    },
    formName: {
        width: '90%',
        margin: '10px 5% 10px 5%',
        color: 'white'
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
    i: {
        width: '100%'
    }
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

export default function FormSetup(props) {

    const classes = useStyle()

    const obj = props.obj
    const [ senha , setSenha] = useState('')
    const [ wrong, setWrong] = useState(false)
    const [ send, setSend] = useState(false)

    const handleForm = (event) => {
        setSenha(event.target.value)
    }

    const handleEnviar = () => {
        if(senha == APP_PASSWORD){
            setSend(true)
            setWrong(false)
            console.log('confirmed')
            console.log(obj)

        }else{
            setWrong(true)
        }
    }

    return (
        <form className={classes.form} autoComplete="off">
            <h4 className={classes.title} > digite sua senha</h4>
            {send && <h5 className={classes.title}> Enviado com sucesso!</h5>}
            <CssTextField
                className={classes.formName}
                id="outlined-required-senha"
                name="name"
                label="Senha"
                variant="outlined"
                type="password"
                value={senha}
                onChange={handleForm}                   
            />
            {wrong && <h5 className={classes.title}> Senha Invalida!</h5>}
         
            <Button onClick={props.cancel} variant="outlined" className={classes.apagar}>
                Cancelar
            </Button>
                     
            <Button onClick={handleEnviar} variant="contained" className={classes.enviar}>
                Enviar
            </Button>
          
            

        </form>
    )
}