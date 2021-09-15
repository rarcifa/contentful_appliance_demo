import '../assets/styles/main.css'
import '../assets/styles/layout.css'
import '../assets/styles/main.min.css'

import "@fortawesome/fontawesome-svg-core/styles.css";
// This default export is required in a new `pages/_app.js` file.

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}