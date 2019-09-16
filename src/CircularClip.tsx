import { tween, styler, chain, stagger } from "popmotion"
import styled from "styled-components"
import * as React from "react"
import { easeInOut } from "@popmotion/easing"

let id: any = null
let i = 0

namespace Style {
    export const left = ({ fullScreen, click, x }: Circular.State) => fullScreen === 0 || click === 0 ? "0" : `${-x}`
    export const zIndex = ({ fullScreen, click }: Circular.State) => fullScreen === 0 || click === 0 ? "0" : "100"
    export const display = ({ contentHeight }: Circular.State) => contentHeight === 0 ? "none" : ""
    export const heightContent = ({ contentHeight, children }: Circular.State) => {
        if (contentHeight === 0) { return "0" }
        if ( children && children.length !== 0 ) { return ""}
        return "60vh"
    }
    export const cardHeight = ({ fullScreen, click, height }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? height : "500px"
    } 
    export const bgImage = ({ headerImage }: Circular.Props) => headerImage
    export const cardWidth = ({ fullScreen, click, width }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? width : "99.4vw"
    } 
    export const contentBgColor = ({ contentColor }: Circular.Props) => contentColor
    export const cardTop = ({ fullScreen, click, y }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "" : `${-y * 2}`
    }
}

namespace Circular {  
    export interface Props {
        children: React.ReactNode
        [propName: string]: any
        contentColor: string
        headerImage: string
        headerColor: string
        className: string
        duration: number
        height: string
        width: string
    }
    export interface State {
        contentHeight: number
        fullScreen: number
        duration: number
        click: number
        start: number
        xArr: number[]
        yArr: number[]
        x: number
        y: number
    }
}
// height:  ${Style.contentHeight};

const Card = styled.div`
    background: url(${ Style.bgImage }) no-repeat center center;
    background-repeat: no-repeat;
    background-size: cover;
    height:  ${Style.cardHeight};
    width: ${Style.cardWidth};
    top: ${Style.cardTop};
    left: ${Style.left};
    position: absolute;
`
const Content = styled.div`
    background: ${Style.contentBgColor};
    height:  ${Style.heightContent};
    display: ${Style.display};
    left: ${Style.left};
    position: absolute;
    width: 99.4vw;
    top: 0;
`
const Main = styled.div`
    z-index: ${Style.zIndex};
    position: absolute;
    left: ${Style.left};
`
export class CircularClip extends React.Component<Circular.Props, Circular.State> {
    private Circular: any
    private Content: any
    private Main: any

    constructor(props: any) {
        super(props)
        this.Circular = null
        this.Content = null
        this.Main = null
    }

    public state: Circular.State = {
        contentHeight: 0,
        fullScreen: 0,
        duration: 4,
        click: 0,
        start: 0,
        xArr: [],
        yArr: [],
        x: 0,
        y: 0,
    }

    public componentDidMount() {
        const x = this.Main.getBoundingClientRect().left
        const y = this.Main.getBoundingClientRect().top
        const translateToX = window.innerWidth - x
        let R
        let newX
        let newY
        let xArr = []
        let yArr = []
        //console.log(this.props.children[0])

        if (x < translateToX) {
            R = (translateToX - x) / 2
        } else {
            R = (x - translateToX) / 2
        }
       // console.log(R)
        for (let i = 0; i < 180; i++) {
            newX = (R * Math.cos(i * 0.5 * Math.PI / 180))
            xArr.push(newX)
            newY = ((R * 0.55) * Math.sin(i *  Math.PI / 180) )
            yArr.push(newY)
        }

        this.setState({
            xArr: xArr.reverse(),
            yArr: yArr.reverse(),
            x, 
            y,
        })
    }

    public onStart = (timestamp) => {
        const card = this.Circular
        const content = this.Content
        const circular = styler(card)
        const animateContent = styler(content)

        const { click, x, y, xArr, yArr} = this.state

        const initialY = () => {
            return y !== 0 ? 0 : y 
        }
        const initialX = () => {
            return x !== 0 ? 0 : x 
        }

        if (click < 1) {
            card.style.left = xArr[i] 
            card.style.top = yArr[i]
            
            i++
            id = requestAnimationFrame(this.onStart)
            // if (xNow <= (windowWidth / 2.2)) {
            //     this.cancel_animation()
            // } 
        }
    }

    public cancel_animation = () => cancelAnimationFrame(id)

    public render() {
         return (
            <Main 
                ref={(node: any) => this.Main = node}
                fullScreen={this.state.fullScreen}
                className={this.props.className}
                click={this.state.click} 
                x={this.state.x}
            >
                <Card
                    ref={(node: any) => this.Circular = node}
                    headerImage={this.props.headerImage}
                    fullScreen={this.state.fullScreen}
                    height={this.props.height}
                    width={this.props.width}
                    click={this.state.click}
                    onClick={this.onStart}
                    y={this.state.y}
                    x={this.state.x} 
                />

                <Content
                    ref={(node: any) => this.Content = node}
                    contentHeight={this.state.contentHeight}
                    contentColor={this.props.contentColor}
                    fullScreen={this.state.fullScreen}
                    x={this.state.x}
                    y={this.state.y}
                    >
                    {Array.isArray(this.props.children) ? this.props.children.map( (i) => i) : this.props.children}
                </Content>
            </Main >
        )
    }
}

export default CircularClip 