import PreCard from './PreCard'
import { makeStyles } from '@material-ui/core/styles'
import Carousel, { slidesToShowPlugin, slidesToScrollPlugin, arrowsPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const useStyle = makeStyles((theme) => ({
    arrow: {
        color: '#e0f2f1',
    },
    arrowDisabled: {
        color: '#b2dfdb'
    }
}))

export default function Setup() {

    const classes = useStyle()

    return (
        <div>
            <Carousel
            plugins={[
                'centered',
                'infinite',
                
                {
                resolve: slidesToShowPlugin,
                options: {
                numberOfSlides: 2,
                },
                },
                {
                resolve: slidesToScrollPlugin,
                options: {
                numberOfSlides: 1,
                },
                },
                {
                resolve: arrowsPlugin,
                options: {
                    arrowLeft: <ChevronLeftIcon className={classes.arrow} />,
                    arrowLeftDisabled:<ChevronLeftIcon className={classes.arrowDisabled}/>,
                    arrowRight: <ChevronRightIcon className={classes.arrow}/>,
                    arrowRightDisabled: <ChevronRightIcon className={classes.arrowDisabled}/>,
                    addArrowClickHandler: true,
                },
                },
            ]}   
            >
                <PreCard />  
                <PreCard />
                <PreCard />
                <PreCard /> 
            </Carousel>
        </div>
    )
}