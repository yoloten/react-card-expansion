"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popmotion_1 = require("popmotion");
const styled_components_1 = require("styled-components");
const React = require("react");
const easing_1 = require("@popmotion/easing");
var Style;
(function (Style) {
    Style.left = ({ fullScreen, click, x }) => fullScreen === 0 || click === 0 ? "0" : `${-x}`;
    Style.zIndex = ({ fullScreen, click }) => fullScreen === 0 || click === 0 ? "0" : "100";
    Style.display = ({ contentHeight }) => contentHeight === 0 ? "none" : "";
    Style.heightContent = ({ contentHeight, children }) => {
        if (contentHeight === 0) {
            return "0";
        }
        if (children && children.length !== 0) {
            return "";
        }
        return "60vh";
    };
    Style.cardHeight = ({ fullScreen, click, height }) => {
        return fullScreen === 0 || click === 0 ? height : "500px";
    };
    Style.bgImage = ({ headerImage }) => headerImage;
    Style.cardWidth = ({ fullScreen, click, width }) => {
        return fullScreen === 0 || click === 0 ? width : "99.4vw";
    };
    Style.contentBgColor = ({ contentColor }) => contentColor;
    Style.cardTop = ({ fullScreen, click, y }) => {
        return fullScreen === 0 || click === 0 ? "" : `${-y * 2}`;
    };
})(Style || (Style = {}));
const Card = styled_components_1.default.div `
    background: url(${Style.bgImage}) no-repeat center center;
    background-repeat: no-repeat;
    background-size: cover;
    height:  ${Style.cardHeight};
    width: ${Style.cardWidth};
    top: ${Style.cardTop};
    left: ${Style.left};
    position: absolute;
`;
const Content = styled_components_1.default.div `
    background: ${Style.contentBgColor};
    height:  ${Style.heightContent};
    display: ${Style.display};
    left: ${Style.left};
    position: absolute;
    width: 99.4vw;
    top: 0;
`;
const Main = styled_components_1.default.div `
    z-index: ${Style.zIndex};
    position: absolute;
    left: ${Style.left};
`;
class CircularClip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: 0,
            fullScreen: 0,
            click: 0,
            x: 0,
            y: 0,
        };
        this.onStart = () => {
            const card = this.Circular;
            const content = this.Content;
            const circular = popmotion_1.styler(card);
            const animateContent = popmotion_1.styler(content);
            const { click, x, y } = this.state;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const translateToY = windowHeight / 8 - y;
            const translateToX = windowWidth / 2.2 - x;
            const contentY = 500 - y;
            console.log(contentY, y);
            const initialY = () => {
                return y !== 0 ? 0 : y;
            };
            const initialX = () => {
                return x !== 0 ? 0 : x;
            };
            if (click < 1) {
                popmotion_1.chain(popmotion_1.tween({
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
                }), popmotion_1.tween({
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
                    ease: easing_1.easeInOut
                }))
                    .start(circular.set);
                setTimeout(() => {
                    popmotion_1.tween({
                        from: {
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
                        .start(circular.set);
                    this.setState({ fullScreen: 1, click: 1 });
                }, 1900);
                setTimeout(() => {
                    popmotion_1.tween({
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
                        .start(animateContent.set);
                    this.setState({ contentHeight: 1 });
                }, 2300);
            }
            else {
                popmotion_1.tween({
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
                    .start(animateContent.set);
                setTimeout(() => {
                    popmotion_1.tween({
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
                        .start(circular.set);
                    setTimeout(() => {
                        popmotion_1.chain(popmotion_1.tween({
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
                        }), popmotion_1.tween({
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
                        }))
                            .start(circular.set);
                    }, 800);
                    this.setState({ fullScreen: 1, click: 0 });
                }, 300);
            }
        };
        this.Circular = null;
        this.Content = null;
        this.Main = null;
    }
    componentDidMount() {
        this.setState({
            x: this.Main.getBoundingClientRect().left,
            y: this.Main.getBoundingClientRect().top,
        });
    }
    render() {
        return (React.createElement(Main, { ref: (node) => this.Main = node, fullScreen: this.state.fullScreen, className: this.props.className, click: this.state.click, x: this.state.x },
            React.createElement(Card, { ref: (node) => this.Circular = node, headerImage: this.props.headerImage, fullScreen: this.state.fullScreen, height: this.props.height, width: this.props.width, click: this.state.click, onClick: this.onStart, y: this.state.y, x: this.state.x }),
            React.createElement(Content, { ref: (node) => this.Content = node, contentHeight: this.state.contentHeight, contentColor: this.props.contentColor, fullScreen: this.state.fullScreen, x: this.state.x, y: this.state.y }, Array.isArray(this.props.children) ? this.props.children.map((i) => i) : this.props.children)));
    }
}
exports.CircularClip = CircularClip;
exports.default = CircularClip;
//# sourceMappingURL=CircularClip.js.map