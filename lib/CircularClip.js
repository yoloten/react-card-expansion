"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popmotion_1 = require("popmotion");
const styled_components_1 = require("styled-components");
const React = require("react");
let id = null;
let i = 0;
let j = 0;
var Style;
(function (Style) {
    Style.left = () => "0";
    Style.zIndex = ({ click }) => click === 0 ? "0" : "100";
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
    Style.cardHeight = ({ height }) => height;
    Style.bgImage = ({ headerImage }) => headerImage;
    Style.cardWidth = ({ width }) => width;
    Style.contentBgColor = ({ contentColor }) => contentColor;
    Style.cardTop = ({ click, y }) => {
        return click === 0 ? "" : `${-y * 2}`;
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
        };
        this.onStart = (timestamp) => {
            const card = this.Circular;
            const content = this.Content;
            const circular = popmotion_1.styler(card);
            const animateContent = popmotion_1.styler(content);
            const { click, x, y, xArr, yArr, xArrReversed, yArrReversed, reversedY, width } = this.state;
            const { duration } = this.props;
            const xNow = card.getBoundingClientRect().left;
            const yNow = card.getBoundingClientRect().top;
            const contentY = 500 - y;
            if (click < 1) {
                if (i === 0) {
                    popmotion_1.tween({
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
                    }).start(circular.set);
                }
                card.style.left = xArrReversed[i];
                card.style.top = yArrReversed[i];
                i++;
                id = window.requestAnimationFrame(this.onStart);
                if (yArr.slice(i).length === 0) {
                    this.cancel_animation();
                    setTimeout(() => {
                        popmotion_1.tween({
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
                                x: -(xNow - width / 3.35),
                                y: y < 40 ? -y : -35,
                            },
                            duration: 550,
                        })
                            .start(circular.set);
                    }, 300);
                    setTimeout(() => {
                        popmotion_1.tween({
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
                            .start(animateContent.set);
                        this.setState({ contentHeight: 1, click: 1 });
                    }, 700);
                    i = 0;
                }
            }
            else {
                if (j === 0) {
                    popmotion_1.tween({
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
                        .start(animateContent.set);
                    popmotion_1.tween({
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
                    }).start(circular.set);
                }
                card.style.top = yArr[j];
                if (j > reversedY) {
                    card.style.left = xArr[j - reversedY];
                }
                j++;
                id = requestAnimationFrame(this.onStart);
                if (yArrReversed.slice(j).length === 0) {
                    this.cancel_animation();
                    popmotion_1.tween({
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
                    }).start(circular.set);
                    this.setState({ click: 0 });
                    j = 0;
                }
            }
        };
        this.cancel_animation = () => cancelAnimationFrame(id);
        this.Circular = null;
        this.Content = null;
        this.Main = null;
    }
    componentDidMount() {
        const { duration } = this.props;
        const x = this.Circular.getBoundingClientRect().left;
        const y = this.Circular.getBoundingClientRect().top;
        const translateToX = window.innerWidth - x - this.Circular.getBoundingClientRect().width;
        let time = duration / 1000;
        let dur1 = time > 4 ? ((6 + (time - 5)) - time) : (5 - time);
        let dur2 = (duration / 100) > 29 ? ((35 + (duration / 100 - 30) - (duration / 100))) : (30 - (duration / 100));
        let R;
        let newX;
        let newY;
        let xArr = [];
        let yArr = [];
        if (x < translateToX) {
            R = (translateToX - x) / 2.2;
        }
        else {
            R = -(x - translateToX) / 2.2;
        }
        for (let i = 0; i < 180; i += dur1) {
            if (x < translateToX) {
                newX = (R * Math.cos(i * .5 * Math.PI / 180));
                xArr.push(newX);
                newY = ((R * 0.39) * Math.sin(i * Math.PI / 180));
                yArr.push(newY);
            }
            else {
                newX = (R * Math.cos(i * 0.5 * Math.PI / 180));
                xArr.push(newX);
                newY = -((R * 0.49) * Math.sin(i * Math.PI / 180));
                yArr.push(newY);
            }
        }
        for (let i = 0; i <= y - 30; i++) {
            newY = -i * dur2;
            if (-Math.floor(newY) <= y - 30) {
                yArr.unshift(newY);
                this.setState({ reversedY: i });
            }
        }
        const xArrReversed = [...xArr].reverse();
        const yArrReversed = [...yArr].reverse();
        this.setState({
            width: this.Circular.getBoundingClientRect().width,
            xArrReversed,
            yArrReversed,
            xArr,
            yArr,
            x,
            y,
        });
    }
    render() {
        return (React.createElement(Main, { ref: (node) => this.Main = node, click: this.state.click, x: this.state.x },
            React.createElement(Card, { className: this.props.className, ref: (node) => this.Circular = node, headerImage: this.props.headerImage, fullScreen: this.state.fullScreen, height: this.props.height, width: this.props.width, click: this.state.click, onClick: this.onStart, y: this.state.y, x: this.state.x, duration: this.props.duration }),
            React.createElement(Content, { ref: (node) => this.Content = node, contentHeight: this.state.contentHeight, contentColor: this.props.contentColor, fullScreen: this.state.fullScreen, x: this.state.x, y: this.state.y }, Array.isArray(this.props.children) ? this.props.children.map((i) => i) : this.props.children)));
    }
}
exports.CircularClip = CircularClip;
exports.default = CircularClip;
//# sourceMappingURL=CircularClip.js.map