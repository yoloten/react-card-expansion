import { tween, styler, chain, delay } from "popmotion"
import styled from "styled-components"
import * as React from "react"
import { easeInOut } from "@popmotion/easing"

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
        click: number
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
        click: 0,
        x: 0,
        y: 0,
    }

    public componentDidMount() {
        //console.log(this.props.children[0])
        this.setState({
            x: this.Main.getBoundingClientRect().left, 
            y: this.Main.getBoundingClientRect().top,
        })
    }

    public onStart = () => {
        const card = this.Circular
        const content = this.Content
        const circular = styler(card)
        const animateContent = styler(content)
        const { click, x, y} = this.state
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const translateToY = windowHeight / 8 - y
        const translateToX = windowWidth / 2.2 - x
        const contentY = 500 - y//windowHeight  * 0.45 - y 
        console.log(contentY, y)
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
                        height: this.props.width,
                        borderRadius: 200,
                        y: initialY(),
                        x: initialX(),
                        scale: 1,
                    },
                    to: {
                        height: this.props.width,
                        borderRadius: 200,
                        y: initialY(),
                        x: initialX(),
                        scale: 0.3,
                    },
                    duration: 300
                }),
                tween({
                    from: {
                        height: this.props.width,
                        borderRadius: 200,
                        y: initialY(),
                        x: initialX(),
                        scale: 0.3, 
                    }, 
                    to: {
                        height: this.props.width,
                        borderRadius: 200,
                        y: translateToY,
                        x: translateToX,
                    },
                    duration: 1500,
                    ease: easeInOut
                }),
            )
            .start(circular.set)

            setTimeout(() => {
                tween({
                    from : { 
                        borderRadius: 900,
                        height: "500px",
                        y,
                        x,
                        scaleX: 0.7,
                    },
                    to: {
                        borderRadius: 0,
                        height: "500px",
                        scaleX: 1,
                        y,
                        x,
                    },
                    duration: 400,
                })
                    .start(circular.set)

                this.setState({ fullScreen: 1, click: 1 })
            }, 1900)

            setTimeout(() => {
                tween({
                    from: {
                        y: contentY * 2,
                        scaleY: 0.1,
                        x,  
                    },
                    to: {
                        y: contentY,
                        scaleY: 1,
                        x,
                    },
                    duration: 300,
                })
                    .start(animateContent.set)

                this.setState({ contentHeight: 1 })
            }, 2300)
        } else {
            
            tween({
                from: {
                    y: contentY,
                    scaleY: 1,
                    x: 0,
                },
                to: {
                    y: contentY * 2,
                    scaleY: 0,
                    x: 0,
                },
                duration: 400
            })
            .start(animateContent.set)
            
            setTimeout(() => {
                tween({
                    from: {
                        height: this.props.width,
                        borderRadius: 200,
                        y: translateToY,
                        x: translateToX,
                        scale: 2.3,
                    },
                    to: {
                        height: this.props.width,
                        borderRadius: 200,
                        y: translateToY,
                        x: translateToX,
                        scale: .3,
                    },
                    duration: 900
                })
                .start(circular.set)

                setTimeout(() => {
                    chain(
                        tween({
                            from: {
                                height: this.props.width,
                                borderRadius: 200,
                                y: translateToY,
                                x: translateToX,
                                scale: .3,
                            },
                            to: {
                                height: this.props.width,
                                borderRadius: 200,
                                y: initialY(),
                                x: initialX(),
                                scale: 0.6
                            },
                            duration: 1500
                        }),
                        tween({
                            from: {
                                height: this.props.width,
                                borderRadius: 200, 
                                scale: 0.6
                            },
                            to: {
                                height: this.props.height,
                                borderRadius: 0, 
                                scale: 1,
                            },
                            duration: 800
                        }),
                    )
                    .start(circular.set)
                }, 800)
                
                this.setState({ fullScreen: 1, click: 0 })
            }, 300)
            
        }
    }

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
