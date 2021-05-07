import withRoot from "../components/withRoot";
import React from "react";
import ProductHero from "../components/ProductHero";

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
    </React.Fragment>
  );
}

export default withRoot(Index);
