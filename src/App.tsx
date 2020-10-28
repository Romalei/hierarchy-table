import React from 'react';
import './App.scss';
import HomePage from './pages/home-page/HomePage';

class App extends React.Component<any, any> {
    render() {
        return (
            <div className="app">
                <HomePage/>
            </div>
        );
    }
}

export default App;
