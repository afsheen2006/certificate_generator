import React from 'react';
import SingleGenerator from './components/SingleGenerator';
import templateImg from './assets/template.png';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>Claim Your Certificate</h1>
                <p>Enter your details to claim your certificate</p>
            </header>

            <main>
                <SingleGenerator templateImageSrc={templateImg} />
            </main>
        </div>
    );
}

export default App;
