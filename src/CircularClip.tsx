import { tween, styler, chain, delay } from "popmotion"
import styled from "styled-components"
import * as React from "react"

let id: any = null
let i = 0
let j = 0
let start = 0

namespace Style {
    export const left = () => "0"
    export const zIndex = ({ click }: Circular.State) => click === 0 ? "0" : "100"
    export const display = ({ contentHeight }: Circular.State) => contentHeight === 0 ? "none" : ""
    export const heightContent = ({ contentHeight, children }: Circular.State) => {
        if (contentHeight === 0) { return "0" }
        if (children && children.length !== 0) { return "" }
        return "60vh"
    }
    export const cardHeight = ({ height }: Circular.Props) => height
    export const bgImage = ({ headerImage }: Circular.Props) => headerImage
    export const cardWidth = ({ width }: Circular.Props) => width
    export const contentBgColor = ({ contentColor }: Circular.Props) => contentColor
    export const cardTop = ({ click, y }: Circular.State) => {
        return click === 0 ? "" : `${-y * 2}`
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
        xArrReversed: number[]
        yArrReversed: number[]
        contentHeight: number
        fullScreen: number
        reversedY: number
        duration: number
        xArr: number[]
        yArr: number[]
        click: number
        start: number
        toX: number
        x: number
        y: number
    }
}
// height:  ${Style.contentHeight};

const Card = styled.div`
    background: url(${ Style.bgImage}) no-repeat center center;
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
        xArrReversed: [],
        yArrReversed: [],
        contentHeight: 0,
        fullScreen: 0,
        reversedY: 0,
        duration: 4,
        click: 0,
        start: 0,
        xArr: [],
        yArr: [],
        toX: 0,
        x: 0,
        y: 0,
    }

    public componentDidMount() {
        const x = this.Circular.getBoundingClientRect().left
        const y = this.Circular.getBoundingClientRect().top
        const translateToX = (window.innerWidth - x - this.Circular.getBoundingClientRect().width) / 2

        this.setState({
            toX: translateToX,
            x,
            y,
        })
    }

    public lerp = (start, end, amt) => (1 - amt) * start + amt * end

    public easeIn = (t) => t * t 

    public path = (start, end, ease) => {
        let R 
        let x 
        let y

        if (start < end) {
            R = (end - start) 
        } else {
            R = -(start - end) 
        }

        x = R * (this.lerp(1, 0, ease))
        y = Math.sin(this.lerp(100, 0, ease) / 20 ) * this.state.y + 30

        return {x, y}
    }

    public onStart = (timestamp) => {
        const card = this.Circular
        const content = this.Content
        const circular = styler(card)
        const animateContent = styler(content)

        const { click, x, y, toX } = this.state
        const { duration } = this.props

        start === 0 ? start = performance.now() : ""
        
        const elapsed = performance.now() - start
        //console.log(card.getBoundingClientRect().y)
        if (click < 1) {
            
            card.style.left = this.path(0, toX, this.easeIn(duration / (elapsed + duration))).x
            card.style.top = this.path(0, y, this.easeIn(duration / (elapsed + duration))).y
            //console.log(this.lerp(0, 1, this.easeOut(duration / elapsed)))
            i++
            id = window.requestAnimationFrame(this.onStart)

        } else {
            //
        }
    }

    public cancel_animation = () => cancelAnimationFrame(id)

    public render() {
        return (
            <Main
                ref={(node: any) => this.Main = node}
                click={this.state.click}
                x={this.state.x}
            >
                <Card
                    className={this.props.className}
                    ref={(node: any) => this.Circular = node}
                    headerImage={this.props.headerImage}
                    fullScreen={this.state.fullScreen}
                    height={this.props.height}
                    width={this.props.width}
                    click={this.state.click}
                    onClick={this.onStart}
                    y={this.state.y}
                    x={this.state.x}
                    duration={this.props.duration}
                />

                <Content
                    ref={(node: any) => this.Content = node}
                    contentHeight={this.state.contentHeight}
                    contentColor={this.props.contentColor}
                    fullScreen={this.state.fullScreen}
                    x={this.state.x}
                    y={this.state.y}
                >
                    {Array.isArray(this.props.children) ? this.props.children.map((i) => i) : this.props.children}
                </Content>
            </Main >
        )
    }
}

export default CircularClip 