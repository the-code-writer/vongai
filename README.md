# Vongai

Vongai is an AI app that allows users to create and explore various types of content using Generative AI. Users can choose from different categories, such as stories, poems, songs, code, and art, and generate content based on their preferences and inputs. Users can also customize the appearance, voice, and personality of their AI assistant, who can guide them through the creative process and provide feedback and suggestions. Vongai aims to inspire users to unleash their creativity and imagination, and to discover new possibilities with AI.

Vongai is currently in development and has not been officially launched yet. However, users can sign up for early access and updates on their official website. Vongai is also active on social media platforms, such as Twitter, Instagram, and TikTok, where they share samples of their generated content and interact with their followers. Vongai claims to use cutting-edge AI technologies, such as natural language processing, computer vision, and deep learning, to produce high-quality and diverse content that can appeal to various audiences and purposes.

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "C:\\apps\\project-vongai-app",
  "type": [
    "capacitor",
    "pwa",
    "web"
  ],
  "name": "Vongai",
  "framework": "react",
  "template": "single-view",
  "bundler": "vite",
  "cssPreProcessor": "scss",
  "theming": {
    "customColor": true,
    "color": "#7700ff",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": true
  },
  "customBuild": false,
  "pkg": "vong.ai",
  "capacitor": {
    "platforms": [
      "ios",
      "android"
    ]
  }
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production
* 📱 `build-capacitor-ios` - build app and copy it to iOS capacitor project
* 📱 `build-capacitor-android` - build app and copy it to Android capacitor project

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Capacitor

This project created with Capacitor support. And first thing required before start is to add capacitor platforms, run in terminal:

```
npx cap add ios && npx cap add android
```

Check out [official Capacitor documentation](https://capacitorjs.com) for more examples and usage examples.



## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```

## Capacitor Assets

Capacitor assets are located in `resources` folder which is intended to be used with `cordova-res` tool. To generate  mobile apps assets run in terminal:
```
npx cordova-res
```

Check out [official cordova-res documentation](https://github.com/ionic-team/cordova-res) for more usage examples.

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)

* [Framework7 React Documentation](https://framework7.io/react/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7
