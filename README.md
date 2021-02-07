# Ikon Pass Chrome Extension

* You'll need an Ikon pass
* Login to https://acccount.ikonpass.com
* Follow the `build` instructions
* Know how to [load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked)

## Installation

```bash
# clone it
$ git clone https://github.com/evanjohnso/ikon-reservations-chrome-extension.git

# Install dependencies
$ npm install
```

## Development

- Run script

```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```

- Select the `dev` folder under "Load unpacked" in chrome://extensions

## Build

```bash
# start fresh
$ rm -rf build
# builds files to './build'
$ npm run build
```

- Select the `build` folder under "Load unpacked" in chrome://extensions

## LICENSE

[MIT](LICENSE)
