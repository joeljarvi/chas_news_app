import "@/styles/globals.css";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-workSans",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className={`${workSans.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
