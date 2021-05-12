import Styles from '../styles/App.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import Status from '../components/app/Status'
import Setup from '../components/app/Setup'
import Relatorio from '../components/app/Relatorio'

// Icons

import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import UpdateIcon from '@material-ui/icons/Update'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

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
  menu: {
    backgroundColor: 'white',
    color: '#00897b'
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
  const [menu, setMenu] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [relatorio, setRelatorio] = useState(false)

  const classes = useStyle()

  const openStatus = () => {
    setSetup(false)
    setStatus(true)
    setRelatorio(false)
  }
  const openSetup = () => {
    setSetup(true)
    setStatus(false)
    setRelatorio(false)
  }

  const openRelatorio = () => {
    setSetup(false)
    setStatus(false)
    setRelatorio(true)
  }

  const handleMenu = () => {
    setMenu(!menu)
  }

  const handleRefresh = () => {
    setRefresh(true)
    setTimeout(() => setRefresh(false), 5000)
  }

  return (
    <div className={Styles.root}>
          

      {status && <div className={Styles.status}><Status data={dados}/></div>}
      
      {setup && <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={12} md={5}><Setup exit={openStatus}/></Grid>
        <Grid item xs></Grid>
      </Grid>
      }

      {
        relatorio && <Grid container>
          <Grid item xs></Grid>
          <Grid item xs={12} md={5}><Relatorio /></Grid>
          <Grid item xs></Grid>
        </Grid>
      }




      <AppBar position="fixed" color="primary" className={classes.appBar}>

        <Toolbar>
          <IconButton onClick={handleMenu} edge="start" color="inherit" aria-label="open drawer">
              { menu ? <ExpandMoreIcon className={classes.icon} /> : <MenuIcon className={classes.icon} />}
          </IconButton>

          {status &&  
            <Fab aria-label="add" onClick={openSetup} className={classes.fabButton}>
              <AddIcon />
            </Fab>
          }
          {setup && 
            <Fab aria-label="add" onClick={openStatus} className={classes.fabButton}>
              <CloseIcon /> 
            </Fab>
          }
          {relatorio && 
            <Fab aria-label="add" onClick={openStatus} className={classes.fabButton}>
              <KeyboardReturnIcon/>
            </Fab>
          }            
          

          <div className={classes.grow} />


          {(status || relatorio) && (refresh ?  

          <IconButton edge="end" color="inherit">
              <DoneAllIcon className={classes.icon} />
          </IconButton>

          :

          <IconButton onClick={handleRefresh} edge="end" color="inherit">
            <UpdateIcon  className={classes.icon} />
          </IconButton>

          )}

        </Toolbar>

        {menu && 
          <div className={classes.menu}>
            <List component="nav" aria-label="secondary mailbox folders">
              <Divider />
              <Link href={'/'}><ListItem button>
                <ListItemText primary="Início" />
              </ListItem></Link>
              <Divider />
              <ListItem button onClick={openRelatorio}>
                <ListItemText primary="Relatórios" />
              </ListItem>
              <Divider />
              <ListItem button onClick={openSetup}>
                <ListItemText primary="Configuração" />
              </ListItem>
            </List>
          </div>
        }
      </AppBar>

      
    </div>
  )

}
