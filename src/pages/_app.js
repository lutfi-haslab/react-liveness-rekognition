import { ThemeProvider, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';
import awsExports from "../aws-exports";
import "../styles/globals.css"
Amplify.configure(awsExports);


function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}


export default withAuthenticator(App);
