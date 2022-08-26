// Import React
import React from 'react';

// Import ReactDOM
import { createRoot } from 'react-dom/client';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';

// Import Framework7-Keypad Plugin
import Framework7Keypad from 'framework7-plugin-keypad';
import '../../node_modules/framework7-plugin-keypad/framework7-keypad.css';

// Import DovellousF7 Plugin
import Framework7Dovellous from "../dovellous/index";

// Import App Component
import MainApplication from '../components/main-application';

// Init F7 React Plugin
Framework7.use(Framework7React);

// install keypad plugin to Framework7
Framework7.use(Framework7Keypad);

// install dovellous plugin to Framework7
Framework7.use(Framework7Dovellous);

// Mount React App
const root = createRoot(document.getElementById('app'));

// Render the Main App
root.render(React.createElement(MainApplication));
