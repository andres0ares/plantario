import PreCard from './PreCard'
import { makeStyles } from '@material-ui/core/styles'
import Carousel, { slidesToShowPlugin, slidesToScrollPlugin, arrowsPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const preset = [
    {
        name: 'Hortelã',
        temp: 26,
        umi: 80,
        ilu: 5
    },
    {
        name: 'Coentro',
        temp: 29,
        umi: 70,
        ilu: 6
    },
    {
        name: 'Salsa',
        temp: 26,
        umi: 85,
        ilu: 7
    },
    {
        name: 'Alecrim',
        temp: 24,
        umi: 65,
        ilu: 4
    },
    {
        name: 'Cebolinha',
        temp: 27,
        umi: 75,
        ilu: 6
    },
]

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
                {preset.map((plant, index) => (
                    <PreCard key={index} name={plant.name} data={plant} />
                ))}
            </Carousel>
        </div>
    )
}