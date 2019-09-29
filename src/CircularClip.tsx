import { tween, styler, chain, delay } from "popmotion"
import styled from "styled-components"
import * as React from "react"

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
        contentHeight: number
        fullScreen: number
        cardWidth: number
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
        contentHeight: 0,
        fullScreen: 0,
        cardWidth: 0,
        click: 0,
        start: 0,
        toX: 0,
        x: 0,
        y: 0,
    }

    public componentDidMount() {
        const x = this.Circular.getBoundingClientRect().left
        const y = this.Circular.getBoundingClientRect().top
        const translateToX = (window.innerWidth - this.Circular.getBoundingClientRect().width) / 2

        this.setState({
            cardWidth: this.Circular.getBoundingClientRect().width,
            toX: translateToX,
            x,
            y,
        })
    }

    public lerp = (start, end, amt) => (1 - amt) * start + amt * end

    public easeIn = (t) => t * t

    public path = (start, end, ease) => {
        const { y } = this.state
        let radious
        let newX
        let newY

        if (start < end) {
            radious = (end - start) + 50
        } else {
            radious = -(start - end) - 45
        }

        newX = radious * (this.lerp(1, 0, ease))
        newY = Math.sin(this.lerp(100, 0, ease) / 20) * y + 30
            // -Math.sin(this.lerp(200, 100, ease) / 20) * y 
    
        return { x: newX, y: newY }
    }

    public initialCircular = (circular: any) => {
        const { width } = this.props

        tween({
            from: {
                height: width,
                borderRadius: 200,
                scale: 1,
            },
            to: {
                height: width,
                borderRadius: 200,
                scale: 0.4,
            },
            duration: 700
        }).start(circular.set)
    }

    public expansion = (circular: any, animateContent: any, xNow: number, yNow: number) => {
        const { width } = this.props
        const { cardWidth, y} = this.state
       // console.log(xNow)
        setTimeout(() => {
            tween({
                from: {
                    borderRadius: 200,
                    height: width,
                    scale: 0.3,
                    width,
                    x: 0,
                    y: 0,
                },
                to: {
                    borderRadius: 0,
                    height: "500px",
                    width: (window.innerWidth * 0.993) + "px",
                    scaleX: 1,
                    x: -(xNow - cardWidth / 3.35),
                    y: y < 40 ? -y : -yNow,
                },
                duration: 550,
            })
                .start(circular.set)
        }, 300)

        setTimeout(() => {
            tween({
                from: {
                    y: 1000,
                    scaleY: 0.1,
                    x: 0,
                },
                to: {
                    y: 500,
                    scaleY: 1,
                    x: 0,
                },
                duration: 300,
            })
                .start(animateContent.set)

            this.setState({ contentHeight: 1, click: 1 })
        }, 700)
    }

    public backToCircular = (circular: any, animateContent: any) => {
        const { width } = this.props

        tween({
            from: {
                y: 500,
                scaleY: 1,
                x: 0,
            },
            to: {
                y: 1000,
                scaleY: 0,
                x: 0,
            },
            duration: 500
        })
            .start(animateContent.set)

        tween({
            from: {
                borderRadius: 200,
                height: "500px",
                width: (window.innerWidth * 0.995) + "px",
                scale: 1,
                x: -window.innerWidth / 2.49,
                y: -32,
            },
            to: {
                borderRadius: 200,
                height: width,
                width,
                x: 0,
                y: 0,
                scale: .4,
            },
            duration: 900
        }).start(circular.set)
    }

    public backToInitial = (circular: any) => {
        tween({
            from: {
                borderRadius: 200,
                height: this.props.width,
                width: this.props.width,
                x: 0,
                y: 0,
                scale: .4,
            },
            to: {
                borderRadius: 0,
                height: this.props.height,
                width: this.props.width,
                x: 0,
                y: 0,
                scale: 1,
            },
            duration: 700
        }).start(circular.set)
    }

    public onStart = () => {
        const circular = styler(this.Circular)
        const animateContent = styler(this.Content)

        let id = null
        const { click, x, y, toX } = this.state
        const { duration } = this.props

        start === 0 ? start = performance.now() : ""

        const elapsed = performance.now() - start
        const xNow = this.Circular.getBoundingClientRect().x
        const yNow = Math.floor(this.Circular.getBoundingClientRect().y * 0.3) 

        if (click < 1) {
            if (xNow === x) {
                this.initialCircular(circular)
            }
            this.Circular.style.left = this.path(x, toX, this.easeIn(duration / (elapsed + duration))).x
            this.Circular.style.top = this.path(0, y, this.easeIn(duration / (elapsed + duration))).y

            id = window.requestAnimationFrame(this.onStart)

           // console.log(xNow, toX, yNow)
            //xNow === Math.floor(toX) || xNow === Math.floor(toX) + 1 || xNow === Math.floor(toX) - 1
            if (yNow === 31) {
                cancelAnimationFrame(id)
                this.expansion(circular, animateContent, xNow, yNow)
            }

        } else {
            if( yNow === 0 ) {
                this.backToCircular(circular, animateContent)
            }

            this.Circular.style.left = this.path(x, toX, this.easeIn(duration / (elapsed + duration))).x
            this.Circular.style.top = this.path(0, y, this.easeIn(duration / (elapsed + duration))).y

            id = window.requestAnimationFrame(this.onStart)
            
            // if (yNow > 0) {
            //     cancelAnimationFrame(id)
            //     this.backToInitial(circular)
            // }

        }
    }

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