import {Button} from "@mantine/core";

export default function Home(){
    return(
        <div className={"homeContainer"}>
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Lost Pet</Button>
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' ,deg: -100}}>Found Pet</Button>
        </div>
    )
}