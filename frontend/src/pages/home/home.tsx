import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';
import "./home.sass"
import CountUp from 'react-countup';

let gap = 40
let imageWidth = 200;
const animalsCount = 22;
const GetImages = ()=>{
    const list = []
    const windowWidth = window.innerWidth
    let images_to_repeat = Math.floor(windowWidth / (imageWidth + gap))
    console.log(images_to_repeat)
    let moveAmount = (imageWidth) * 25
    for(let i = 1; i <=animalsCount; i++)
        list.push(
            // @ts-ignore
            <div className="imgCarousel" style={{'--move':`-${moveAmount}px`, '--imageSize':`${imageWidth}px`}} key={i}>
                <img loading={"lazy"} src={`/images/animal (${i}).jpg`} alt={`Animal_${i}`}/>
            </div>
        )
    for(let i = 1; i <= images_to_repeat; i++)
        list.push(
            // @ts-ignore
            <div className="imgCarousel" style={{'--move':`-${moveAmount}px`, '--imageSize':`${imageWidth}px`}} key={i + 25}>
                <img loading={"lazy"} src={`/images/animal (${i}).jpg`} alt={`Animal_${i}`}/>
            </div>
        )
    return list
}
export default function Home(){
    const [scroll, scrollTo] = useWindowScroll();
    return(
        <div className={"homeContainer"}>
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Lost Pet</Button>
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' ,deg: -100}}>Found Pet</Button>
            <CountUp
                end={2123543}
                separator={"."}
                duration={5}
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias, delectus dignissimos et exercitationem laborum minima molestias omnis sequi velit vitae voluptatem. Ab accusamus amet aperiam at aut, cupiditate dicta distinctio doloremque dolores doloribus ducimus error et eum expedita inventore ipsum laborum magni necessitatibus nemo nesciunt nisi nostrum obcaecati placeat quaerat quasi quia rerum sapiente tempora tempore totam unde ut vel velit veritatis, voluptas, voluptatem voluptatibus? Architecto aspernatur blanditiis cum dolor dolores eius eligendi enim et, facilis harum id illo in ipsa iusto libero maiores mollitia nam nemo quae qui quo quod sit temporibus tenetur totam ut veritatis! Accusamus, optio?</p>
             {/* @ts-ignore */}
            <div className="carousel" style={{'--gap':`${gap}px`}}>
                {GetImages()}
            </div>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            leftIcon={<ArrowUpwardIcon/>}
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
        </div>
    )
}