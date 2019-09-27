import { tween, styler, chain, delay } from "popmotion"
import styled from "styled-components"
import * as React from "react"

let id: any = null
let i = 0
let j = 0
//let start: number = 0

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
        width: number
        start: number
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
        width: 0,
        click: 0,
        start: 0,
        xArr: [],
        yArr: [],
        x: 0,
        y: 0,
    }

    public componentDidMount() {
        const { duration } = this.props
        const x = this.Circular.getBoundingClientRect().left
        const y = this.Circular.getBoundingClientRect().top
        const translateToX = window.innerWidth - x - this.Circular.getBoundingClientRect().width
        
        let time = duration / 1000
        let dur1 = time > 4 ? ((6 + (time - 5)) - time) : (5 - time)
        let dur2 = (duration / 100) > 29 ? ((35 + ( duration / 100 - 30) - (duration / 100))) : (30 - (duration / 100))
        let R
        let newX
        let newY
        let xArr = []
        let yArr = []

        if (x < translateToX) {
            R = (translateToX - x) / 2.2
        } else {
            R = -(x - translateToX) / 2.2
        }

        for (let i = 0; i < 180; i += dur1) {
            if (x < translateToX) {
                newX = (R * Math.cos(i * .5 * Math.PI / 180))
                xArr.push(newX)
                newY = ((R * 0.39) * Math.sin(i * Math.PI / 180)) 
                yArr.push(newY)
            } else {
                newX = (R * Math.cos(i * 0.5 * Math.PI / 180))
                xArr.push(newX)
                newY = -((R * 0.49) * Math.sin(i * Math.PI / 180))
                yArr.push(newY)
            }
        }

        for (let i = 0; i <= y - 30; i++) {
            newY = -i * dur2
            if (-Math.floor(newY) <= y - 30) {
                yArr.unshift(newY)
                this.setState({ reversedY: i })
            }
        }

        const xArrReversed = [...xArr].reverse()
        const yArrReversed = [...yArr].reverse()
        
        this.setState({
            width: this.Circular.getBoundingClientRect().width,
            xArrReversed,
            yArrReversed,
            xArr,
            yArr,
            x,
            y,
        })
        //console.log(yArr, yArrReversed)
    }

    public onStart = (timestamp) => {
        const card = this.Circular
        const content = this.Content
        const circular = styler(card)
        const animateContent = styler(content)

        const { click, x, y, xArr, yArr, xArrReversed, yArrReversed, reversedY, width } = this.state
        const { duration } = this.props

        const xNow = card.getBoundingClientRect().left
        const yNow = card.getBoundingClientRect().top
        const contentY = 500 - y

        if (click < 1) {
            if (i === 0) {
                tween({
                    from: {
                        height: this.props.width,
                        borderRadius: 200,
                        scale: 1,
                    },
                    to: {
                        height: this.props.width,
                        borderRadius: 200,
                        scale: 0.4,
                    },
                    duration: 700
                }).start(circular.set)
            }

            card.style.left = xArrReversed[i]
            card.style.top = yArrReversed[i]
            //console.log(this.props.width)
            i++
            id = window.requestAnimationFrame(this.onStart)

            if (yArr.slice(i).length === 0) {
                this.cancel_animation()
                
                setTimeout(() => {
                    tween({
                        from: {
                            borderRadius: 200,
                            height: this.props.width,
                            width: this.props.width,
                            scale: 0.3,
                            x: 0,
                            y: 0,
                        },
                        to: {
                            borderRadius: 0,
                            height: "520px",
                            width: (window.innerWidth * 0.994) + "px",
                            scaleX: 1,
                            x: -(xNow - width / 3.35) , 
                            y: y < 40 ? -y : -35,
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
                i = 0
            }
        } else {
            if (j === 0) {
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
                        height: this.props.width,
                        width: this.props.width,
                        x: 0,
                        y: 0,
                        scale: .4,
                    },
                    duration: 900
                }).start(circular.set)
            }

            card.style.top = yArr[j]
            if (j > reversedY) {
            card.style.left = xArr[j - reversedY]
            }
           
            j++
            id = requestAnimationFrame(this.onStart)
            
            if (yArrReversed.slice(j).length === 0) {
                this.cancel_animation()
                
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

                this.setState({ click: 0 })
                j = 0
            }
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