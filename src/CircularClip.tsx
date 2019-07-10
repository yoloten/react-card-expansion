import { tween, styler, chain } from "popmotion"
import styled from "styled-components"
import * as React from "react"

namespace Style {
    export const cardTop = ({ fullScreen, click, y }: Circular.State) => fullScreen === 0 || click === 0 ? "" : `${-y}`
    export const left = ({ fullScreen, click, x }: Circular.State) => fullScreen === 0 || click === 0 ? "" : `${-x}`
    export const zIndex = ({ fullScreen, click }: Circular.State) => fullScreen === 0 || click === 0 ? "0" : "100"
    export const contentDisplay = ({ fullScreen, click }: Circular.State) => fullScreen === 0 ? "none" : "block"
    export const contentHeight = ({ fullScreen, click }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "0" : "50vh"
    }
    export const contentWidth = ({ fullScreen, click }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "0" : "100vw"
    } 
    export const cardHeight = ({ fullScreen, click }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "200px" : "50vh"
    } 
    export const bgImage = ({ headerImage }: Circular.Props) => headerImage
    export const cardWidth = ({ fullScreen, click }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "200px" : "100vw"
    } 
    export const contentBgColor = ({ contentColor }: Circular.Props) => contentColor
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
        fullScreen: number
        click: number
        x: number
        y: number
    }
}

const Card = styled.div`
    background-image: url(${ Style.bgImage });
    background-repeat: no-repeat;
    background-size: cover;
    height:  ${Style.cardHeight};
    width: ${Style.cardWidth};
    top: ${Style.cardTop};
    left: ${Style.left};
    position: fixed;
`
const Content = styled.div`
    background: ${Style.contentBgColor};
    display: ${Style.contentDisplay};
    height:  ${Style.contentHeight};
    width: ${Style.contentWidth};
    left: ${Style.left};
    position: fixed;
    bottom: 0;
`
const Main = styled.div`
    z-index: ${Style.zIndex};
    position:  absolute;
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
        fullScreen: 0,
        click: 0,
        x: 0,
        y: 0
    }

    public componentDidMount() {
        this.setState({
            x: this.Main.getBoundingClientRect().left, 
            y: this.Main.getBoundingClientRect().top
        })
    }

    public onStart = () => {
        const card = this.Circular
        const content = this.Content
        const circular = styler(card)
        const animateContent = styler(content)
        const { click, x, y} = this.state
        //const ballXY = value({ x: 0, y: 0 }, circular.set)
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const translateToY = windowHeight / 8 - y
        const translateToX = windowWidth / 2.2 - x
        console.log(y)
        const initialY = () => {
            return y !== 0 ? 0 : y 
        }
        const initialX = () => {
            return x !== 0 ? 0 : x 
        }
        if (click < 1) {
            chain(
                tween({
                    from: {
                        borderRadius: 120,
                        y: initialY(),
                        x: initialX(),
                        scale: 1,
                    },
                    to: {
                        borderRadius: 120,
                        y: initialY(),
                        x: initialX(),
                        scale: 0.4,
                    },
                    duration: 600
                }),
                tween({
                    from: {
                        borderRadius: 120,
                        y: initialY(),
                        x: initialX(),
                        scale: 0.4,
                    },
                    to: {
                        borderRadius: 120,
                        y: translateToY,
                        x: translateToX,
                    },
                    duration: 900
                }),
            )
            .start(circular.set)

            setTimeout(() => {
                tween({
                    from : { 
                        borderRadius: 900,
                        scaleX: 0.4
                        y: y,
                        x: x, 
                    },
                    to: {
                        borderRadius: 0,
                        scaleX: 1
                        y: y,
                        x: x,
                    },
                    duration: 200
                })
                    .start(circular.set)
                tween({
                    from: {
                        scaleY: 0.1,
                        y: 200,
                        x: x,  
                    },
                    to: {
                        scaleY: 1,
                        y: 0,
                        x: x,
                    }
                })
                    .start(animateContent.set)

                this.setState({ fullScreen: 1, click: 1 })
            }, 1700)

        } else {
            tween({
                from: {
                    borderRadius: 120,
                    y: translateToY,
                    x: translateToX,
                    scale: 2,
                },
                to: {
                    borderRadius: 120,
                    y: translateToY,
                    x: translateToX,
                    scale: .4,
                },
                duration: 800
            })
            .start(circular.set)

            tween({
                from: {
                    scaleY: 1,
                    y: 300,
                    x: x,
                },
                to: {
                    scaleY: 0,
                    y: 300,
                    x: x,
                },
                duration: 500
            })
            .start(animateContent.set)

            setTimeout(() => {
                chain(
                    tween({
                        from: {
                            borderRadius: 120,
                            y: translateToY,
                            x: translateToX,
                            scale: .4,
                        },
                        to: {
                            borderRadius: 120,
                            y: initialY(),
                            x: initialX(),
                            scale: 0.6
                        },
                        duration: 1500
                    })
                    tween({
                        from: {
                            borderRadius: 730, 
                            scale: 0.6
                        },
                        to: {
                            borderRadius: 0, 
                            scale: 1
                        },
                        duration: 800
                    })
                )
                .start(circular.set)
            }, 800)
            this.setState({ fullScreen: 1, click: 0 })
        }
    }

    public render() {
        // console.log(this.state.fullScreen)
        
        return (
            <Main 
                ref={(node) => this.Main = node}
                click={this.state.click} 
                className={this.props.className}
                fullScreen={this.state.fullScreen}
            >
                <Card
                    click={this.state.click}
                    fullScreen={this.state.fullScreen}
                    ref={(node) => this.Circular = node}
                    onClick={this.onStart}
                    y={this.state.y}
                    x={this.state.x}
                    headerImage={this.props.headerImage}
                />

                <Content
                    contentColor={this.props.contentColor}
                    fullScreen={this.state.fullScreen}
                    ref={(node) => this.Content = node}
                    x={this.state.x}
                    >
                    {Array.isArray(this.props.children) ? this.props.children.map( i => i) : this.props.children}
                </Content>
            </Main >
        )
    }
}

export default CircularClip 
