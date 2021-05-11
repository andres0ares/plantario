import styles from '../styles/App.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import MoreIcon from '@material-ui/icons/MoreVert'
import Grid from '@material-ui/core/Grid'

import AppNav from '../components/app/AppNav'
import Status from '../components/app/Status'
import Setup from '../components/app/Setup'

const dados = { 
  temperatura: '25º graus',
  nivelAgua: '75%',
  timeLight: '6:30min',
  minTemp: '22º graus',
  maxTemp: '30º graus',
  umidade: '68%'
}

const useStyle = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'white'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundImage: 'linear-gradient(to right, #80cbc4 , #26a69a )',
    color: 'white'
  },
  icon: {
      color: '#26a69a'
  }
}))

export default  function App() { 

  const [status, setStatus] = useState(true)
  const [setup, setSetup] = useState(false)

  const classes = useStyle()

  const handleClick = () => {
    setSetup(!setup)
    setStatus(!status)
  }

  return (
    <div className={styles.root}>
      <Link href={'/'}><Button>Voltar</Button></Link>
      

      {status && <div className={styles.status}><Status data={dados}/></div>}
      
      {setup && <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={12} md={5}><Setup /></Grid>
        <Grid item xs></Grid>
      </Grid>
      }

      <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon className={classes.icon} />
          </IconButton>
          <Fab aria-label="add" onClick={handleClick} className={classes.fabButton}>
            {status && <AddIcon /> }
            {setup && <CloseIcon /> }
          </Fab>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit">
              <MoreIcon className={classes.icon} />
          </IconButton>
          </Toolbar>
      </AppBar>

    </div>
  )

}
