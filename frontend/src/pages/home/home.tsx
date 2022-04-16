import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';
import "./home.sass"
import CountUp from 'react-countup';
import lost from "../../assets/wanted.png"
import found from "../../assets/badges.png"

let gap = 40
let imageWidth = 200;
const animalsCount = 20;
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
            <div className="buttons">
                <a href="/lost"><img src={lost} alt="Lost Pet"/><span>Lost Pet</span></a>
                <a href="/found"><img src={found} alt="Found Per"/><span>Found Pet</span></a>
            </div>
            <div className="Countable">
                <span className="left">Saved over</span>
                <CountUp className={"counter"}
                    end={2123543}
                    separator={"."}
                    duration={120}
                />
                <span className="right">pets!</span>
            </div>
            <p>
                The American Humane Association estimates over 10 million dogs and cats are lost or stolen in the U.S. every year. One in three pets will become lost at some point during their life. Each year, approximately 1.5 million shelter animals are euthanized (670,000 dogs and 860,000 cats).
            </p>
             {/* @ts-ignore */}
            <div className="carousel" style={{'--gap':`${gap}px`}}>
                {GetImages()}
            </div>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            color="violet"
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