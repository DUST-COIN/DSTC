import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { routes } from "./constants";

import AboutSection from "./sections/AboutSection";
import CollectionSection from "./sections/CollectionSection";
import FAQSection from "./sections/FAQSection";
import FeaturesSection from "./sections/FeaturesSection";
import FooterSection from "./sections/FooterSection";
import MainSection from "./sections/MainSection";
import Popularity from "./sections/Popularity";
import PromoSection from "./sections/PromoSection";
import Animate from "./components/Animate";
import Contribute from "./components/Contribute";
import Learn from "./components/Learn";
import Article from "./components/Article";
import { theme, APP_BODY_ID } from "./utils";
import WalletPopup from "./components/Wallet";

export const DEFAULT_IMG =
  "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a";

const HomeComponents = [
  { El: Header, id: routes.home },
  { El: MainSection, id: routes.home },
  { El: AboutSection, id: routes.about },
  { El: FeaturesSection, id: routes.features },
  { El: FooterSection, id: routes.footer },
];

function App() {
  const [showPopup, setShowPopup] = React.useState(false);
  const handleConnectWallet = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const loader = document.querySelector(".loader");
    if (loader) loader.remove();
    theme.initiate();
  }, []);

  const Home = ({ handleConnectWallet }: any) => (
    <section className="max-w-6xl xl:px-0 px-4 flex center col mx-auto pb-8 md:gap-36 gap-12">
      <div id={APP_BODY_ID} className="fixed inset-0 light round-gradient" />
      {HomeComponents.map(({ El, id }, i) => (
        <Animate id={id} n={i + 1} key={id + i}>
          <El handleConnectWallet={handleConnectWallet} />
        </Animate>
      ))}
    </section>
  );

  return (
    <Router>
      {showPopup && <WalletPopup onClose={handleClosePopup} />}
      {/* {showPurchasePopUp && (
        //  <PurchasePopup onClose={closePurchasePopup} />
        )} */}
      <main className="app-bg min-h-[100dvh] overflow-x-hidden max-w-full">
        <Routes>
          <Route
            path={routes.home}
            element={<Home handleConnectWallet={handleConnectWallet} />}
          />
          <Route path="/share" element={<Contribute />} />
          <Route
            path="/dusts"
            element={
              <>
                <Learn />
              </>
            }
          />
          <Route
            path="/learn/:dustId"
            element={
              <>
                <Article />
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
