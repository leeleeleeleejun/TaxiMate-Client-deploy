import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;  
  ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
  }
    
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


a {
    color: black;
    text-decoration: none;
}

button {
    display: block;
    cursor: pointer;
    border: none;
    background: none;
}


:root {
  --rsbs-max-w: 450px;
  --rsbs-ml: auto;
  --rsbs-mr: auto;
    
  --header-height: 56px;
  --footer-height: 60px;  
    
	// Colors
  --color-main: #313D4C;
  --color-background: #F3F4F6;
  --color-white: #FFFFFF;  
  --color-contrast: #181F29;
  --color-shadow : #F4F5F7;
  --color-press : #F2F3F5;
  --color-gray-100: #6C7887;
  --color-gray-200: #B0B9C2;
  --color-gray-300: #F3F4F6;
  --color-red: #EA4156;
  --color-blue: #3182F7;
    
  --color-unavailable-background : #F9E1E1;
  --color-unavailable-text : #EA5659;
    
  --color-warning-background : #F9ECDB;
  --color-warning-text : #F7982A;
    
  --color-available-background : #DDE8FC;
  --color-available-text : #4283F6;  
  
  --color-orange: #FF6229;

  // Font size
  --font-large: 26px;
  --font-medium: 20px;
  --font-regular: 16px;
  --font-small: 14px;
  --font-semi-micro: 12px;  
  --font-micro: 10px;
    
  // Font weight
  --weight-extra-bold: 800;   
  --weight-bold: 700;
  --weight-semi-bold: 600;
  --weight-medium: 500;
  --weight-regular: 400;  
  --weight-light: 300;
}
`;

export default GlobalStyle;
