import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

// import ComponentRenderer from "ComponentRenderer.js";
import HeaderBase from "components/headers/light.js";
import ThankYouPage from "ThankYouPage.js";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import BlogIndexPage from "pages/BlogIndex.js";
import BlogPosts from "pages/BlogPosts";



import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ServiceLandingPage from "demos/ServiceLandingPage";
import Footer from "components/footers/MiniCenteredFooter";
import WithStatsAndImageFeatures from "components/features/TwoColSingleFeatureWithStats.js";


export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;
  const Header = tw(HeaderBase)`max-w-none`;

  return (
    <AnimationRevealPage>
<Header/>
    <Router>
      <Switch>
        {/* <Route path="/components/:type/:subtype/:name">
          <ComponentRenderer />
        </Route> */}
        <Route path="/blogs/:postName">
          <BlogPosts />
        </Route> 
        <Route path="/blogs">
          <BlogIndexPage />
        </Route>
        <Route path="/thank-you">
          <ThankYouPage />
        </Route>
        <Route path="/">
          <ServiceLandingPage />
        </Route>
      </Switch>
    </Router>
    <Footer /> 
</AnimationRevealPage>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
