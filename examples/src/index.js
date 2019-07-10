import React, { Component } from 'react'
import ReactDom from 'react-dom'
import CircularClip from "../../lib/CircularClip"
import './index.css'

export default class App extends Component {
    render() {
        return (
            <div className="main">
                <CircularClip 
                    className="circ"
                    headerImage="https://www.worldatlas.com/r/w728-h425-c728x425/upload/46/cb/e1/shutterstock-252338818.jpg"
                    contentColor="#dadee6"
                >
                    <div className="child">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec tortor scelerisque, elementum neque ut, volutpat dolor. Integer ac tristique nibh, maximus porttitor mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque facilisis leo, porttitor viverra eros tempus nec. Integer eu blandit dui. Donec posuere pretium mi in laoreet. Integer nisl enim, dapibus vel elementum sed, volutpat eu urna. Nulla lorem dolor, scelerisque et euismod vel, fringilla sed justo. Pellentesque varius nisl a lobortis varius. Donec ullamcorper erat non ipsum dignissim vestibulum non eget quam. Integer fermentum et ante id pulvinar. Sed hendrerit lorem sit amet tellus viverra, sit amet viverra tortor mollis. In sit amet gravida erat, in iaculis felis. Mauris non maximus enim. Sed luctus elit non nisi laoreet tincidunt.

                    Proin porta eleifend dictum. Sed maximus lacinia consequat. Vestibulum nec tincidunt metus. Nam consectetur, est eget malesuada porta, magna odio maximus nunc, non mattis dui nunc non massa. Nulla rutrum posuere varius. Aenean ut placerat elit, et facilisis quam. Fusce bibendum eros at lorem cursus, ac feugiat sapien tempus. Proin eu felis malesuada, lobortis nunc sit amet, venenatis diam.

                    Nam consequat, odio eget suscipit lacinia, orci mi molestie sem, non maximus dolor magna a urna. Praesent quis ante ligula. Maecenas feugiat mollis nunc non imperdiet. Suspendisse est erat, iaculis ac diam vel, malesuada suscipit neque. Fusce eget ex scelerisque, auctor felis non, molestie justo. Duis ultrices nisi in libero sollicitudin imperdiet quis nec elit. In nec eros placerat, vehicula sapien ut, luctus orci. Duis sit amet urna nunc.

                    Maecenas consectetur facilisis dolor non egestas. Sed facilisis, mauris quis consequat pretium, leo ipsum molestie arcu, sed tincidunt turpis purus at risus. Pellentesque et ultrices nisi. Maecenas quis feugiat ipsum, eget egestas tortor. Sed a tortor laoreet, ornare purus a, pharetra enim. Donec porttitor nunc tempus dictum laoreet. Curabitur suscipit fringilla ipsum. Maecenas convallis molestie facilisis. Aenean nibh elit, luctus a diam eget, dictum maximus dui.

                    Curabitur in leo sit amet ante gravida suscipit. Maecenas accumsan metus sit amet nunc condimentum tempus. Vivamus iaculis, risus id eleifend pulvinar, nibh ante dapibus enim, ac elementum mauris ligula vitae est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer at lorem semper, porta purus quis, congue tortor. Sed pharetra, orci ac vehicula placerat, arcu velit venenatis magna, id consectetur risus sem rutrum orci. Nam in ex tincidunt, consectetur est a, aliquam tortor. Donec ornare tellus at justo convallis euismod. Nunc tincidunt pharetra pretium. 
                    </div>
                </CircularClip>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById("root"));