"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popmotion_1 = require("popmotion");
const styled_components_1 = require("styled-components");
const React = require("react");
let start = 0;
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
            contentHeight: 0,
            fullScreen: 0,
            cardWidth: 0,
            click: 0,
            start: 0,
            toX: 0,
            x: 0,
            y: 0,
        };
        this.lerp = (start, end, amt) => (1 - amt) * start + amt * end;
        this.easeIn = (t) => t * t;
        this.path = (start, end, ease) => {
            const { y } = this.state;
            let radious;
            let newX;
            let newY;
            if (start < end) {
                radious = (end - start) + 50;
            }
            else {
                radious = -(start - end) - 45;
            }
            newX = radious * (this.lerp(1, 0, ease));
            newY = Math.sin(this.lerp(100, 0, ease) / 20) * y + 30;
            return { x: newX, y: newY };
        };
        this.initialCircular = (circular) => {
            const { width } = this.props;
            popmotion_1.tween({
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
            }).start(circular.set);
        };
        this.expansion = (circular, animateContent, xNow, yNow) => {
            const { width } = this.props;
            const { cardWidth, y } = this.state;
            setTimeout(() => {
                popmotion_1.tween({
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
        };
        this.backToCircular = (circular, animateContent) => {
            const { width } = this.props;
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
                    height: width,
                    width,
                    x: 0,
                    y: 0,
                    scale: .4,
                },
                duration: 900
            }).start(circular.set);
        };
        this.backToInitial = (circular) => {
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
        };
        this.onStart = () => {
            const circular = popmotion_1.styler(this.Circular);
            const animateContent = popmotion_1.styler(this.Content);
            let id = null;
            const { click, x, y, toX } = this.state;
            const { duration } = this.props;
            start === 0 ? start = performance.now() : "";
            const elapsed = performance.now() - start;
            const xNow = this.Circular.getBoundingClientRect().x;
            const yNow = Math.floor(this.Circular.getBoundingClientRect().y * 0.3);
            if (click < 1) {
                if (xNow === x) {
                    this.initialCircular(circular);
                }
                this.Circular.style.left = this.path(x, toX, this.easeIn(duration / (elapsed + duration))).x;
                this.Circular.style.top = this.path(0, y, this.easeIn(duration / (elapsed + duration))).y;
                id = window.requestAnimationFrame(this.onStart);
                if (yNow === 31) {
                    cancelAnimationFrame(id);
                    this.expansion(circular, animateContent, xNow, yNow);
                }
            }
            else {
                if (yNow === 0) {
                    this.backToCircular(circular, animateContent);
                }
                this.Circular.style.left = this.path(x, toX, this.easeIn(duration / (elapsed + duration))).x;
                this.Circular.style.top = this.path(0, y, this.easeIn(duration / (elapsed + duration))).y;
                id = window.requestAnimationFrame(this.onStart);
            }
        };
        this.Circular = null;
        this.Content = null;
        this.Main = null;
    }
    componentDidMount() {
        const x = this.Circular.getBoundingClientRect().left;
        const y = this.Circular.getBoundingClientRect().top;
        const translateToX = (window.innerWidth - this.Circular.getBoundingClientRect().width) / 2;
        this.setState({
            cardWidth: this.Circular.getBoundingClientRect().width,
            toX: translateToX,
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