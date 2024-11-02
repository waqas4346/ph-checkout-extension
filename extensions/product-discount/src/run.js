// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};
/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {

  const mainProductSku = "fbmd-01";
  const addonProductSku = "hook-1";

  const fixedAmountDiscount = "2";
  const percentageDiscount = "100";

  const isMainProduct = input.cart.lines.find(item => item.merchandise?.sku === mainProductSku)
  
  const targets = input.cart.lines.filter(item => item.merchandise?.sku === addonProductSku)?.map(line => {
    return /** @type {Target} */ ({
      // Use the cart line ID to create a discount target
      cartLine: {
        id: line.id,
      },
    });
  })
  if (Number(isMainProduct?.quantity) === 1) {
   
    if (targets.length) {
      return {
        discounts: [
          {
            // Apply the discount to the collected targets
            targets,
            // Define a percentage-based discount
            value: {
              fixedAmount: {
                amount: fixedAmountDiscount,
              },
            },
          },
        ],
        discountApplicationStrategy: DiscountApplicationStrategy.First,
      };
    }

  } else if (Number(isMainProduct?.quantity) > 1) {
    if (!!targets.length) {
      return {
        discounts: [
          {
            // Apply the discount to the collected targets
            targets,
            // Define a percentage-based discount
            value: {
              percentage: {
                value: percentageDiscount,
              },
            },
          },
        ],
        discountApplicationStrategy: DiscountApplicationStrategy.First,
      };
    }

  }
  return EMPTY_DISCOUNT;
}
