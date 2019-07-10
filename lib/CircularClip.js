"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popmotion_1 = require("popmotion");
const styled_components_1 = require("styled-components");
const React = require("react");
var Style;
(function (Style) {
    Style.cardTop = ({ fullScreen, click, y }) => fullScreen === 0 || click === 0 ? "" : `${-y}`;
    Style.left = ({ fullScreen, click, x }) => fullScreen === 0 || click === 0 ? "" : `${-x}`;
    Style.zIndex = ({ fullScreen, click }) => fullScreen === 0 || click === 0 ? "0" : "100";
    Style.contentDisplay = ({ fullScreen, click }) => fullScreen === 0 ? "none" : "block";
    Style.contentHeight = ({ fullScreen, click }) => {
        return fullScreen === 0 || click === 0 ? "0" : "50vh";
    };
    Style.contentWidth = ({ fullScreen, click }) => {
        return fullScreen === 0 || click === 0 ? "0" : "100vw";
    };
    Style.cardHeight = ({ fullScreen, click }) => {
        return fullScreen === 0 || click === 0 ? "200px" : "50vh";
    };
    Style.bgImage = ({ headerImage }) => headerImage;
    Style.cardWidth = ({ fullScreen, click }) => {
        return fullScreen === 0 || click === 0 ? "200px" : "100vw";
    };
    Style.contentBgColor = ({ contentColor }) => contentColor;
})(Style || (Style = {}));
const Card = styled_components_1.default.div `
    background-image: url(${Style.bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    height:  ${Style.cardHeight};
    width: ${Style.cardWidth};
    top: ${Style.cardTop};
    left: ${Style.left};
    position: fixed;
`;
const Content = styled_components_1.default.div `
    background: ${Style.contentBgColor};
    display: ${Style.contentDisplay};
    height:  ${Style.contentHeight};
    width: ${Style.contentWidth};
    left: ${Style.left};
    position: fixed;
    bottom: 0;
`;
const Main = styled_components_1.default.div `
    z-index: ${Style.zIndex};
    position:  absolute;
`;
class CircularClip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: 0,
            click: 0,
            x: 0,
            y: 0
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
            console.log(y);
            const initialY = () => {
                return y !== 0 ? 0 : y;
            };
            const initialX = () => {
                return x !== 0 ? 0 : x;
            };
            if (click < 1) {
                popmotion_1.chain(popmotion_1.tween({
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
                }), popmotion_1.tween({
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
                }))
                    .start(circular.set);
                setTimeout(() => {
                    popmotion_1.tween({
                        from: {
                            borderRadius: 900,
                            scaleX: 0.4,
                            y: y,
                            x: x,
                        },
                        to: {
                            borderRadius: 0,
                            scaleX: 1,
                            y: y,
                            x: x,
                        },
                        duration: 200
                    })
                        .start(circular.set);
                    popmotion_1.tween({
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
                        .start(animateContent.set);
                    this.setState({ fullScreen: 1, click: 1 });
                }, 1700);
            }
            else {
                popmotion_1.tween({
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
                    .start(circular.set);
                popmotion_1.tween({
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
                    .start(animateContent.set);
                setTimeout(() => {
                    popmotion_1.chain(popmotion_1.tween({
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
                    }), popmotion_1.tween({
                        from: {
                            borderRadius: 730,
                            scale: 0.6
                        },
                        to: {
                            borderRadius: 0,
                            scale: 1
                        },
                        duration: 800
                    }))
                        .start(circular.set);
                }, 800);
                this.setState({ fullScreen: 1, click: 0 });
            }
        };
        this.Circular = null;
        this.Content = null;
        this.Main = null;
    }
    componentDidMount() {
        this.setState({
            x: this.Main.getBoundingClientRect().left,
            y: this.Main.getBoundingClientRect().top
        });
    }
    render() {
        return (React.createElement(Main, { ref: (node) => this.Main = node, click: this.state.click, className: this.props.className, fullScreen: this.state.fullScreen },
            React.createElement(Card, { click: this.state.click, fullScreen: this.state.fullScreen, ref: (node) => this.Circular = node, onClick: this.onStart, y: this.state.y, x: this.state.x, headerImage: this.props.headerImage }),
            React.createElement(Content, { contentColor: this.props.contentColor, fullScreen: this.state.fullScreen, ref: (node) => this.Content = node, x: this.state.x }, Array.isArray(this.props.children) ? this.props.children.map(i => i) : this.props.children)));
    }
}
exports.CircularClip = CircularClip;
exports.default = CircularClip;
//# sourceMappingURL=CircularClip.js.map