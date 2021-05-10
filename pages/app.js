import styles from '../styles/App.module.css'
import Link from 'next/link'
import { useState } from 'react'
import Button from '@material-ui/core/Button'

import AppNav from '../components/app/AppNav'
import Status from '../components/app/Status'

const dados = { 
  temperatura: '25º graus',
  nivelAgua: '75%',
  timeLight: '6:30min',
  minTemp: '22º graus',
  maxTemp: '30º graus',
  umidade: '68%'
}

export default  function App() { 

    return (
        <div className={styles.root}>
            <Link href={'/'}><Button>Voltar</Button></Link>
            <div className={styles.status}><Status data={dados}/></div>
            <AppNav />
        </div>
    )
}

/*

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

*/