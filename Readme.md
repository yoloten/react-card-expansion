# React-Card-Expansion

Unique card animation for react. Inspired by tympanus.net. 
See the demo https://yoloten.github.io/react-stack-cards/

Feautures: 

- The path along the curve
- Full screen expansion
- Adding styles, text, images and etc.
- Typescript support

Available component:

- `CircularClip`

## Installation

You can install react-card-expansion from npm

```
npm i -S react-card-expansion
```
Or use yarn

```
yarn add react-card-expansion
```
## Simple usage

```javascript
import { CircularClip } from 'react-card-expansion'

class Example extends React.Component {
 
  render() {
    const arr = ["first", "second", "third", "fourth"]
    const numbers = [0, 1, 2, 3]
    return (
      <div>
        <CircularClip 
            className="circ"
            headerImage="http://i.imgur.com/J5wR1pO.jpg"
            contentColor="#2a2b2b"
            width="250px"
            height="250px"
            duration={3000}
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
      </div>
    );
  }
}

```
## Props

- `children` - allows to add children elements (React.Element)
- `className` - apply a className to the control (string)
- `contentColor` - set background color of content section (string)
- `duration` - set duration of animation (number)
- `headerImage` - image to set on the background of card(strings)
- `headerColor` - color to set on the background of card(strings)
- `height` - height of the card (string)
- `width` - width of the card (string)

## License
MIT Licensed. Copyright (c) 2019 yoloten