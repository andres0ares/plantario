import Carousel, { slidesToShowPlugin, slidesToScrollPlugin, arrowsPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PreCard from './PreCard'
import { makeStyles } from '@material-ui/core/styles'
//import "slick-carousel/slick/slick-theme.css";
//import "slick-carousel/slick/slick.css";
//import Slider from "react-slick";


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
    },
    margin: {
        padding: '15px',
        marginLeft: '30px'
    }, 
}))

export default function ShowCarousel(props) {

    const classes = useStyle()

    let settings = {
        //className: "center",
        // centerMode: true,
        infinite: true,
        speed: 1000,
        dots: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                },
            }
        ],  
    };
      
   

    return (

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
                
                    <PreCard name={plant.name} click={props.click} data={plant} key={index} />
                
                ))}
            </Carousel>

    )

}

/*

<p>hi</p>





*/