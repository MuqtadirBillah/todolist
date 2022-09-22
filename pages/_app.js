import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from "react-ga4";

function MyApp({ Component, pageProps }) {

  
  ReactGA.initialize("G-5QDBET34C2");
  ReactGA.send("pageview");

  return(
    <>
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      <script
        dangerouslySetInnerHTML={
                      {
          __html: `
              (function(c,l,a,r,i,t,y){
                  c[a] = c[a] || function () { (c[a].q = c[a].q || 
                  []).push(arguments) };
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "drqe91y2o2");`,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
