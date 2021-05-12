import Styles from '../../styles/PreCard.module.css'
import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import OpacityIcon from '@material-ui/icons/Opacity'
import AcUnitIcon from '@material-ui/icons/AcUnit'


export default function PreCard(props) {

    const {name, temp, umi, ilu} = props.data
    const [click, setClick] = useState(false)

    const handleClick = () => {
        setClick(!click)
        props.click(props.data)
    }

    return (
        <div className={click ? Styles.rootClicked : Styles.root} onClick={handleClick}>
            <p className={Styles.title}>{name}</p>
            <div className={Styles.dados}>
                <Grid container>
                    <Grid item xs={2}><WbSunnyIcon className={Styles.icon}/></Grid>
                    <Grid item xs={9}><p className={Styles.text1}>{ilu} horas</p></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}><AcUnitIcon className={Styles.icon}/></Grid>
                    <Grid item xs={9}><p className={Styles.text1}>{temp} graus</p></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}><OpacityIcon className={Styles.icon}/></Grid>
                    <Grid item xs={9}><p className={Styles.text1}>{umi}% </p></Grid>
                </Grid>
            </div>
        </div>
    )
}