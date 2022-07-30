# Dovellous Snippets [![Build Status](https://travis-ci.org/bendrucker/numeric-pattern.svg?branch=master)](http://dovellous.com/libs/jsnippets/)

> The numeric pattern (triggers the number pad on mobile)

[![keypad](assets/keypad.png)](http://dovellous.com/libs/jsnippets/) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/numeric-pattern.svg)](http://dovellous.com/libs/jsnippets/)

## Install

```
$ npm install --save dovellous-jsnippets
```


## Usage

```html
<script src="./js/dovellous.snippets.min.js"></script>
```

## Usage

```js
window.addEventListener("ON_DOVELLOUS_SNIPPETS_READY", function (eventParams){

  const dovellous = eventParams.detail[0];

  const eventData = eventParams.detail[1];

  dovellous.jSnippets.test.helloWorld().then(function (res) {

    console.log(":: RES ::", res);

  });

});

const params = {
  a: "A",
  b: [1, 2, 3, 4, 5]
};

initDovellousJSnippets(params);
```


## License

MIT © [Dovellous](http://dovellous.com)
