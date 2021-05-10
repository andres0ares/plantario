import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import MoreIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
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

export default function AppNav() {

    const classes = useStyles()

    return (
        <div>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer">
                    <MenuIcon className={classes.icon} />
                </IconButton>
                <Fab aria-label="add" className={classes.fabButton}>
                    <AddIcon />
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