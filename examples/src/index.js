import React, { Component } from 'react'
import ReactDom from 'react-dom'
import CircularClip from "../../lib/CircularClip"
import './index.css'
import github from "./github.svg"

export default class App extends Component {
    render() {
        return (
            <div className="main">
                <div className="headerText">
                    <h1 className="headerH1">React Card Expansion</h1>
                    <h2 className="headerH2">Unique card animation for react</h2>
                    <h2 className="headerH2">Inspired by Tympanus.net</h2>
                </div>
                <div className="cards">
                    <div className="card">
                        <CircularClip
                            className="first"
                            headerImage="https://img2.goodfon.ru/wallpaper/nbig/f/24/koshka-siluet-cat-chernyy-fon.jpg"
                            contentColor="#2a2b2b"
                            width="350px"
                            height="300px"
                            easing="easeInQuad"
                            duration={1000}
                        >
                            <h1>React Card Expansion</h1>
                            <div className="child">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                                ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                                ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </div>
                        </CircularClip>
                        <div className="properties">
                            <p>easing: <span>easeInQuad</span></p>
                            <p>duration: <span>1000</span></p>
                        </div>
                    </div>
                    <div className="card">
                        <CircularClip
                            className="second"
                            headerImage="https://img4.goodfon.ru/wallpaper/nbig/8/ea/chernyi-fon-chernyi-kot-noch-len.jpg"
                            contentColor="#2a2b2b"
                            width="350px"
                            height="300px"
                            easing="easeInOutCubic"
                            duration={1000}
                        >
                            <h1>React Card Expansion</h1>
                            <div className="child">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                                ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                                ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                                </div>
                        </CircularClip>
                        <div className="properties">
                            <p>easing: <span>easeInOutCubic</span></p>
                            <p>duration: <span>1000</span></p>
                        </div>
                    </div>
                    <div className="card">
                        <CircularClip
                            className="second"
                            headerImage="https://2560x1440-bakgrunnsbilder-1440p.russianwomen.club/bildene/1440p-gratis-bakgrunner-for-bilder-232.jpg"
                            contentColor="#2a2b2b"
                            width="350px"
                            height="300px"
                            duration={2000}
                            easing="easeInOutQuart"
                        >
                            <h1>React Card Expansion</h1>
                            <div className="child">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                                ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                                ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </div>
                        </CircularClip>
                        <div className="properties">
                            <p>easing: <span>easeInOutQuart</span></p>
                            <p>duration: <span>2000</span></p>
                        </div>
                    </div>
                </div>
                <div className="install">
                    <h1>Installation</h1>
                    <div className="npm">
                        <p className="npmP">npm i -S react-card-expansion</p>
                        <p># or yarn</p>
                        <p>yarn add react-card-expansion</p>
                    </div>
                </div>
                <div className="footer">
                    <p className="powered">Powered by Rustam Sahatov</p>
                    <div className="link">
                        <img className="git" src={github} alt=""/>
                        <a href="https://github.com/yoloten/react-card-expansion" className="footerA">Project on Github</a>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById("root"));