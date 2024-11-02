import {
  reactExtension,
  Banner,
  useApi,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  
  const { cost } = useApi()

  const freeShippingtThreshold = 60;
 
  return (
    <>
      {
        cost.subtotalAmount.current.amount >= freeShippingtThreshold &&
          <Banner title={translate("freeShippingMessage")} />
      }
    </>
  );

  
}