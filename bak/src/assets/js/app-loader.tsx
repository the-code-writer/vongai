// Import React and ReactDOM
// @ts-ignore
import React from 'react';

import { createRoot } from 'react-dom/client';

// Import Framework7
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

import Framework7Keypad from 'framework7-plugin-keypad';
import 'framework7-plugin-keypad/css';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';
import '../css/styles.scss';

import DovellousF7Plugin from '../../system/libs/dovellous-f7';

// Import App Component
import MainApp from '../../components/main-app.jsx';

// Init F7 React Plugin
Framework7.use(Framework7React)

// Init keypad plugin to Framework7
Framework7.use(Framework7Keypad);

// Init dovellous plugin to Framework7
Framework7.use(DovellousF7Plugin);

// Mount React App
const root = createRoot(document.getElementById('app'));
root.render(React.createElement(MainApp));