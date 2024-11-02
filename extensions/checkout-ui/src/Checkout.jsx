import { useEffect } from "react";

import {
  reactExtension,
  Banner,
  useApi,
  useTranslate,
  useApplyCartLinesChange,
  useCartLines,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  
  const { cost } = useApi()

  const freeShippingtThreshold = 60;
  const addonProductVariantId = "gid://shopify/ProductVariant/45479672905958";
  const mainProductSku = "fbmd-01";
  const addonProductSku = "hook-1";

  const applyCartLinesChange = useApplyCartLinesChange();
  const cart = useCartLines();

  async function handleAddToCart() {
    const result = await applyCartLinesChange({
      type: "addCartLine",
      merchandiseId: addonProductVariantId,
      quantity: 1,
    });
    if (result.type === "error") {
      console.error(result.message);
    }
  }

  useEffect(()=> {
    const isMainProduct = cart.find(item => item.merchandise.sku === mainProductSku)
    const isAddonProduct = cart.find(item => item.merchandise.sku === addonProductSku)

    if (isMainProduct && !isAddonProduct) {
      handleAddToCart();
    }

  }, [])
 
  return (
    <>
      {
        cost.subtotalAmount.current.amount >= freeShippingtThreshold &&
          <Banner title={translate("freeShippingMessage")} />
      }
    </>
  );

  
}