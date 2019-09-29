"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popmotion_1 = require("popmotion");
const styled_components_1 = require("styled-components");
const React = require("react");
let id = null;
let i = 0;
let j = 0;
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
            xArrReversed: [],
            yArrReversed: [],
            contentHeight: 0,
            fullScreen: 0,
            reversedY: 0,
            duration: 4,
            click: 0,
            start: 0,
            xArr: [],
            yArr: [],
            toX: 0,
            x: 0,
            y: 0,
        };
        this.lerp = (start, end, amt) => (1 - amt) * start + amt * end;
        this.easeIn = (t) => t * t;
        this.path = (start, end, ease) => {
            let R;
            let x;
            let y;
            if (start < end) {
                R = (end - start);
            }
            else {
                R = -(start - end);
            }
            x = R * (this.lerp(1, 0, ease));
            y = Math.sin(this.lerp(100, 0, ease) / 20) * this.state.y + 30;
            return { x, y };
        };
        this.onStart = (timestamp) => {
            const card = this.Circular;
            const content = this.Content;
            const circular = popmotion_1.styler(card);
            const animateContent = popmotion_1.styler(content);
            const { click, x, y, toX } = this.state;
            const { duration } = this.props;
            start === 0 ? start = performance.now() : "";
            const elapsed = performance.now() - start;
            console.log(card.getBoundingClientRect().y);
            if (click < 1) {
                card.style.left = this.path(0, toX, this.easeIn(duration / (elapsed + duration))).x;
                card.style.top = this.path(0, y, this.easeIn(duration / (elapsed + duration))).y;
                i++;
                id = window.requestAnimationFrame(this.onStart);
            }
            else {
            }
        };
        this.cancel_animation = () => cancelAnimationFrame(id);
        this.Circular = null;
        this.Content = null;
        this.Main = null;
    }
    componentDidMount() {
        const x = this.Circular.getBoundingClientRect().left;
        const y = this.Circular.getBoundingClientRect().top;
        const translateToX = (window.innerWidth - x - this.Circular.getBoundingClientRect().width) / 2;
        this.setState({
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