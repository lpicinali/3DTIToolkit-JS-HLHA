import { injectGlobal } from 'styled-components'

export default function injectGlobalStyles() {
  injectGlobal`
    @font-face {
      font-family: 'PT-Sans';
      src:
        local('PT Sans'),
        local('PTSans-Regular'),
        url('/assets/fonts/PT_Sans-Web-Regular.ttf');
      font-style: normal;
      font-weight: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'PT-Sans';
      src:
        local('PT Sans Bold'),
        local('PTSans-Bold'),
        url('/assets/fonts/PT_Sans-Web-Bold.ttf');
      font-style: normal;
      font-weight: bold;
      text-rendering: optimizeLegibility;
    }

    * {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #f7f7f7;
      font-family: 'PT-Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  `
}
