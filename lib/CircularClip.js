"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popmotion_1 = require("popmotion");
const styled_components_1 = require("styled-components");
const React = require("react");
const easings_1 = require("./easings");
const lerp_1 = require("./lerp");
let start = 0;
var Style;
(function (Style) {
    Style.left = () => "0";
    Style.zIndex = ({ click }) => click === 0 ? "1" : "100";
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
    Style.headerBgColor = ({ headerColor }) => headerColor;
    Style.cardWidth = ({ width }) => width;
    Style.contentBgColor = ({ contentColor }) => contentColor;
    Style.cardTop = ({ click, y }) => {
        return click === 0 ? "" : `${-y * 2}`;
    };
    Style.positionOfElement = ({ position }) => position;
})(Style || (Style = {}));
const Card = styled_components_1.default.div `
    background: ${Style.headerBgColor};
    background-image: url(${Style.bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height:  ${Style.cardHeight};
    width: ${Style.cardWidth};
    top: ${Style.cardTop};
    left: ${Style.left};
    position: ${Style.positionOfElement};
`;
const Content = styled_components_1.default.div `
    background: ${Style.contentBgColor};
    height:  ${Style.heightContent};
    display: ${Style.display};
    left: ${Style.left};
    position: ${Style.positionOfElement};
    width: 100vw;
    top: 0;
`;
const Main = styled_components_1.default.div `
    height:  ${Style.cardHeight};
    width: ${Style.cardWidth};
    z-index: ${Style.zIndex};
    position: relative;
`;
class CircularClip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "absolute",
            contentHeight: 0,
            fullScreen: 0,
            cardHeight: 0,
            cardWidth: 0,
            click: 0,
            reverse: 0,
            toX: 0,
            x: 0,
            y: 0,
        };
        this.handleOnScroll = () => {
            const x = this.Circular.getBoundingClientRect().left;
            const y = this.Circular.getBoundingClientRect().top;
            const translateToX = (window.innerWidth - this.Circular.getBoundingClientRect().width) / 2;
            this.setState({
                toX: translateToX,
                x,
                y,
            });
        };
        this.path = (begin, end, ease) => {
            const { y, click } = this.state;
            let radious;
            let newX;
            let newY;
            if (begin < end) {
                radious = (end - begin);
            }
            else {
                radious = -(begin - end);
            }
            if (click < 1) {
                newX = radious * (lerp_1.default(1.1, 0, ease));
                newY = Math.sin(lerp_1.default(110, 0, ease) / 20) * y + 30;
            }
            else {
                newX = radious * (lerp_1.default(-0.1, 0.9, ease));
                newY = Math.sin(lerp_1.default(-12.3, 110, ease) / 20) * y;
            }
            return { x: newX, y: newY };
        };
        this.initialCircular = (circular) => {
            const { width } = this.props;
            popmotion_1.tween({
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
            }).start(circular.set);
        };
        this.expansion = (circular, animateContent, xNow, yNow) => {
            const { y, x } = this.state;
            setTimeout(() => {
                popmotion_1.tween({
                    from: {
                        borderRadius: 200,
                        height: 250,
                        width: 250,
                        scale: 0.3,
                        x,
                        y,
                    },
                    to: {
                        borderRadius: 0,
                        height: 501,
                        width: window.innerWidth,
                        scale: 1,
                        x: x - xNow + 70,
                        y: y - yNow,
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
        this.backToCircular = (circular, animateContent, toX) => {
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
            }).start(circular.set);
        };
        this.backToInitial = (circular) => {
            const { cardWidth, cardHeight } = this.state;
            popmotion_1.tween({
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
            }).start(circular.set);
        };
        this.onStart = () => {
            const circular = popmotion_1.styler(this.Circular);
            const animateContent = popmotion_1.styler(this.Content);
            let id = null;
            const { click, x, y, toX, reverse } = this.state;
            const { duration } = this.props;
            if (start === 0) {
                start = performance.now();
            }
            const elapsed = performance.now() - start - 350;
            const xNow = this.Circular.getBoundingClientRect().x;
            const yNow = Math.floor(this.Circular.getBoundingClientRect().y * 0.3);
            const easing = easings_1.default[this.props.easing];
            if (click < 1) {
                if (elapsed < 0) {
                    if (Math.round(xNow) <= x || Math.floor(xNow) <= x) {
                        this.initialCircular(circular);
                    }
                }
                else {
                    if (Math.floor(x / 100), Math.floor(toX / 100)) {
                        this.Circular.style.left = this.path(x, toX + 100, easing(duration / ((elapsed * 2) + duration))).x;
                        this.Circular.style.top = this.path(0, y, easing(duration / ((elapsed * 2) + duration))).y;
                    }
                    else {
                        this.Circular.style.left = this.path(x, toX, easing(duration / ((elapsed * 2) + duration))).x;
                        this.Circular.style.top = this.path(0, y, easing(duration / ((elapsed * 2) + duration))).y;
                    }
                }
                id = window.requestAnimationFrame(this.onStart);
                if (yNow === 31) {
                    cancelAnimationFrame(id);
                    this.setState({ position: "fixed" });
                    this.expansion(circular, animateContent, xNow, yNow);
                    start = 0;
                }
            }
            else {
                if (elapsed < 0) {
                    if (reverse === 0) {
                        this.setState({ position: "absolute" });
                        this.backToCircular(circular, animateContent, toX);
                        this.setState({ reverse: 1 });
                    }
                }
                else {
                    if (Math.floor(x / 100), Math.floor(toX / 100)) {
                        this.Circular.style.left = this.path(x, toX + 100, easing(duration / ((elapsed * 2) + duration))).x;
                        this.Circular.style.top = this.path(0, y, easing(duration / ((elapsed * 2) + duration))).y;
                    }
                    else {
                        this.Circular.style.left = this.path(x, toX, easing(duration / ((elapsed * 2) + duration))).x;
                        this.Circular.style.top = this.path(0, y, easing(duration / ((elapsed * 2) + duration))).y;
                    }
                }
                id = window.requestAnimationFrame(this.onStart);
                console.log(x, toX);
                if (Math.round(xNow - 75) === Math.round(x)
                    || Math.round(xNow - 75) === Math.round(x + 1)
                    || Math.round(xNow - 75) === Math.round(x - 1)) {
                    console.log(Math.round(xNow - 75), Math.round(x));
                    cancelAnimationFrame(id);
                    this.backToInitial(circular);
                    this.setState({ click: 0, reverse: 0 });
                    start = 0;
                }
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
        window.addEventListener('scroll', this.handleOnScroll);
        this.setState({
            cardHeight: this.Circular.getBoundingClientRect().height,
            cardWidth: this.Circular.getBoundingClientRect().width,
            toX: translateToX,
            x,
            y,
        });
    }
    render() {
        return (React.createElement(Main, { ref: (node) => this.Main = node, className: this.props.className, click: this.state.click, height: this.props.height, width: this.props.width, x: this.state.x },
            React.createElement(Card, { ref: (node) => this.Circular = node, headerImage: this.props.headerImage, headerColor: this.props.headerColor, fullScreen: this.state.fullScreen, height: this.props.height, width: this.props.width, click: this.state.click, onClick: this.onStart, y: this.state.y, x: this.state.x, easing: this.props.easing, duration: this.props.duration, position: this.state.position }),
            React.createElement(Content, { ref: (node) => this.Content = node, contentHeight: this.state.contentHeight, contentColor: this.props.contentColor, fullScreen: this.state.fullScreen, position: this.state.position, x: this.state.x, y: this.state.y }, Array.isArray(this.props.children) ? this.props.children.map((i) => i) : this.props.children)));
    }
}
exports.CircularClip = CircularClip;
exports.default = CircularClip;
//# sourceMappingURL=CircularClip.js.map