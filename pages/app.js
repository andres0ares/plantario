import Link from 'next/link'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import styles from '../styles/Home.module.css'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

const GreenSwitch = withStyles({
    switchBase: {
      color: '#388e3c',
      '&$checked': {
        color: '#388e3c',
      },
      '&$checked + $track': {
        backgroundColor: '#388e3c',
      },
    },
    checked: {},
    track: {},
})(Switch)

const RedSwitch = withStyles({
    switchBase: {
      color: '#9a0036',
      '&$checked': {
        color: '#9a0036',
      },
      '&$checked + $track': {
        backgroundColor: '#9a0036',
      },
    },
    checked: {},
    track: {},
})(Switch)

const YellowSwitch = withStyles({
    switchBase: {
      color: '#ff9800',
      '&$checked': {
        color: '#ff9800',
      },
      '&$checked + $track': {
        backgroundColor: '#ff9800',
      },
    },
    checked: {},
    track: {},
})(Switch)

export default  function App() {

    let model = {
        ledRed: 0,
        ledGre: 0,
        ledYel: 0,
    }

    const [ sended, setSended ] = useState(false)

    const [state, setState] = useState({
        red: true,
        green: false,
        yellow: true,
    })
    
    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    }

    const handleSend = async () => {

        model.ledRed = state.red ? 1 : 0
        model.ledGre = state.green ? 1 : 0
        model.ledYel = state.yellow ? 1 : 0
       

        const url = `/api/command`
        console.log(model)

        const res = await fetch(
            url,
            {
              body: JSON.stringify(model),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
        )
            
        const result = await res.json()
        if(result.success) {
          setSended(true)
          setTimeout(() => setSended(false), 3000)
        }

      }


    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <Button>Voltar</Button>
            </Link>
            <h1>Comandos</h1>
            <form>
                <FormGroup>
                    <FormControlLabel
                    control={<RedSwitch className={styles.red} checked={state.red} onChange={handleChange} name="red" />}
                    label="Led Vermelho"
                    />
                    <FormControlLabel
                    control={<GreenSwitch className={styles.red} checked={state.green} onChange={handleChange} name="green" />}
                    label="Led Verde"
                    />
                    <FormControlLabel
                    control={<YellowSwitch className={styles.red} checked={state.yellow} onChange={handleChange} name="yellow" />}
                    label="Led Amarelo"
                    />
                </FormGroup>
            </form>
            <Button variant="contained" color="primary" onClick={handleSend}>Enviar</Button>
            {sended && <p>Enviado com sucesso!</p> }
        </div>
    )
}