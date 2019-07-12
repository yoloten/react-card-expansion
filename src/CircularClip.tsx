import { tween, styler, chain } from "popmotion"
import styled from "styled-components"
import * as React from "react"

namespace Style {
    export const cardTop = ({ fullScreen, click, y }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "" : `${-y * 2}`
    }
    export const left = ({ fullScreen, click, x }: Circular.State) => fullScreen === 0 || click === 0 ? "0" : `${-x}`
    export const zIndex = ({ fullScreen, click }: Circular.State) => fullScreen === 0 || click === 0 ? "0" : "100"
    export const display = ({ fullScreen, click }: Circular.State) => fullScreen === 0 ? "none" : ""
    export const heightContent = ({ fullScreen, click, children }: Circular.State) => {
        const windowHeight = window.innerHeight
        //console.log(windowHeight / 2, contentHeight)
        if (fullScreen === 0 || click === 0) { return "0" }
        if ( children && children.length !== 0 ) { return ""}
        return "60vh"
    }
    export const cardHeight = ({ fullScreen, click }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "200px" : "500px"
    } 
    export const bgImage = ({ headerImage }: Circular.Props) => headerImage
    export const cardWidth = ({ fullScreen, click }: Circular.State) => {
        return fullScreen === 0 || click === 0 ? "200px" : "99.4vw"
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
    display: ${Style.display};
    width: 99.4vw;
    height:  ${Style.heightContent};
    top: 0;
    left: ${Style.left};
    position: absolute;
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
                    duration: 1500
                }),
            )
            .start(circular.set)

            setTimeout(() => {
                tween({
                    from : { 
                        borderRadius: 900,
                        y,
                        x,
                    },
                    to: {
                        borderRadius: 0,
                        scaleX: 1,
                        y,
                        x,
                    },
                    duration: 300
                })
                    .start(circular.set)
                tween({
                    from: {
                        scaleY: 0.1,
                        y: contentY * 2,
                        x,  
                    },
                    to: {
                        scaleY: 1,
                        y: contentY,
                        x,
                    },
                    duration: 1000
                })
                    .start(animateContent.set)

                this.setState({ fullScreen: 1, click: 1 })
            }, 2000)

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
                    y: contentY,
                    x: 0,
                },
                to: {
                    scaleY: 0,
                    y: contentY * 2,
                    x: 0,
                },
                duration: 1000
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
                    }),
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
         //console.log(this.state.contentHeight)
         return (
            <Main 
                ref={(node: any) => this.Main = node}
                click={this.state.click} 
                className={this.props.className}
                fullScreen={this.state.fullScreen}
                x={this.state.x}
            >
                <Card
                    click={this.state.click}
                    fullScreen={this.state.fullScreen}
                    ref={(node: any) => this.Circular = node}
                    onClick={this.onStart}
                    y={this.state.y}
                    x={this.state.x}
                    headerImage={this.props.headerImage}
                />

                <Content
                    contentColor={this.props.contentColor}
                    fullScreen={this.state.fullScreen}
                    ref={(node: any) => this.Content = node}
                    x={this.state.x}
                    y={this.state.y}
                    contentHeight={this.state.contentHeight}
                    >
                    {Array.isArray(this.props.children) ? this.props.children.map( (i) => i) : this.props.children}
                </Content>
            </Main >
        )
    }
}

export default CircularClip 
