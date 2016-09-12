/** Nutné importy */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Třída Names, kterou používáme pro render jmen
 */
class Names extends React.Component {
    render = () => {
        return <div>{this.props.names.map((name,index) => <div key={index}>{name} </div>)}</div>
    }
}

/**
 * Třída Test, kterou následně můžeme použít jako html Element <Test />
 */
class Test extends React.Component {
    render = () => {
        return <div>Ahoj <Names names={['Jano', 'Karle', 'Martine']} /></div>
    };
}

ReactDOM.render(<Test />, document.getElementById("root"));
