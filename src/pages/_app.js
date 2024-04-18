import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider, withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../aws-exports";
import { Auth, Amplify } from 'aws-amplify';
Amplify.configure(awsExports);


function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
