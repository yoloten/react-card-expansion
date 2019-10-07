import { tween, styler, chain, delay } from "popmotion"
import styled from "styled-components"
import * as React from "react"
import EasingFunctions from "./easings"
import lerp from "./lerp"

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
    export const headerBgColor = ({ headerColor }: Circular.Props) => headerColor
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
        easing: string
        width: string
    }
    export interface State {
        contentHeight: number
        fullScreen: number
        cardHeight: number
        cardWidth: number
        reverse: number
        click: number
        toX: number
        x: number
        y: number
    }
}

const Card = styled.div`
    background: ${Style.headerBgColor};
    background-image: url(${ Style.bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
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
        cardHeight: 0,
        cardWidth: 0,
        click: 0,
        reverse: 0,
        toX: 0,
        x: 0,
        y: 0,
    }

    public componentDidMount() {
        const x = this.Circular.getBoundingClientRect().left
        const y = this.Circular.getBoundingClientRect().top
        const translateToX = (window.innerWidth - this.Circular.getBoundingClientRect().width) / 2

        this.setState({
            cardHeight: this.Circular.getBoundingClientRect().height,
            cardWidth: this.Circular.getBoundingClientRect().width,
            toX: translateToX,
            x,
            y,
        })
    }

    public path = (begin: number, end: number, ease: number) => {
        const { y, click } = this.state
        let radious
        let newX
        let newY

        if (begin < end) {
            radious = (end - begin)

        } else {
            radious = -(begin - end)
        }
        if (click < 1) {
            newX = radious * (lerp(1.1, 0, ease))
            newY = Math.sin(lerp(110, 0, ease) / 20) * y + 30
        } else {
            newX = radious * (lerp(-0.2, 0.9, ease))
            newY = Math.sin(lerp(-24.2, 110, ease) / 20) * y 
        }

        return { x: newX, y: newY }
    }

    public initialCircular = (circular: any) => {
        const { width } = this.props

        tween({
            from: {
                height: 250,
                width: 250,
                borderRadius: 200,
                scale: 1,
            },
            to: {
                height: 250,
                width: 250,
                borderRadius: 200,
                scale: 0.4,
            },
            duration: 300
        }).start(circular.set)
    }

    public expansion = (circular: any, animateContent: any, xNow: number, yNow: number) => {
        const { y, x } = this.state
     
        setTimeout(() => {
            tween({
                from: {
                    borderRadius: 200,
                    height: 250,
                    width: 250,
                    scale: 0.3,
                    x: 0,
                    y: 0,
                },
                to: {
                    borderRadius: 0,
                    height: 501,
                    width: window.innerWidth * 0.994,
                    scale: 1,
                    x: -Math.round(xNow - 250 / 3.4),
                    y: y < 40 ? -y : -yNow - 1,
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

    public backToCircular = (circular: any, animateContent: any, toX: number) => {
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
                x: -600,
                y: -32,
                scale: 1,
            },
            to: {
                borderRadius: 200,
                height: 250,
                width: 250,
                x: 0,
                y: 0,
                scale: .4,
            },
            duration: 300
        }).start(circular.set)
    }

    public backToInitial = (circular: any) => {
        const { cardWidth, cardHeight } = this.state
        tween({
            from: {
                borderRadius: 200,
                height: 250,
                width: 250,
                scale: .4,
            },
            to: {
                borderRadius: 0,
                height: cardHeight,
                width: cardWidth,
                scale: 1,
            },
            duration: 700
        }).start(circular.set)
    }

    public onStart = () => {
        const circular = styler(this.Circular)
        const animateContent = styler(this.Content)

        let id = null
        const { click, x, y, toX, reverse } = this.state
        const { duration } = this.props

        if (start === 0) {
            start = performance.now()
        }

        const elapsed = performance.now() - start - 500

        const xNow = this.Circular.getBoundingClientRect().x
        const yNow = Math.floor(this.Circular.getBoundingClientRect().y * 0.3)

        const easing = EasingFunctions[this.props.easing]

        if (click < 1) {
            if (elapsed < 0) {
                if ( xNow === x) {
                    this.initialCircular(circular)
                }
            } else {
                this.Circular.style.left = this.path(x, toX, easing(duration / (elapsed + duration))).x
                this.Circular.style.top = this.path(0, y, easing(duration / (elapsed + duration))).y
            }  
            id = window.requestAnimationFrame(this.onStart)
            
            if (yNow === 31) {
                cancelAnimationFrame(id)
                this.expansion(circular, animateContent, xNow, yNow)
                start = 0
            }

        } else {
            if (elapsed < 0) {
                if (reverse === 0) {
                    this.backToCircular(circular, animateContent, toX)
                    this.setState({ reverse: 1 })
                }
            } else {
                this.Circular.style.left = this.path(x, toX, easing(duration / (elapsed + duration))).x
                this.Circular.style.top = this.path(0, y, easing(duration / (elapsed + duration))).y
            }
            
            id = window.requestAnimationFrame(this.onStart)

            if (Math.floor(xNow - 75) === Math.floor(x + 1)
                || Math.round(xNow - 75) === Math.round(x + 1)
                || Math.round(xNow - 75) === Math.round(x - 1)
            ) {
                cancelAnimationFrame(id)
                this.backToInitial(circular)
                this.setState({ click: 0, reverse: 0 })
                start = 0
            }
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
                    headerColor={this.props.headerColor}
                    fullScreen={this.state.fullScreen}
                    height={this.props.height}
                    width={this.props.width}
                    click={this.state.click}
                    onClick={this.onStart}
                    y={this.state.y}
                    x={this.state.x}
                    easing={this.props.easing}
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