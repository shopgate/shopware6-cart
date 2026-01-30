# Translation Files (ApiteSW6Utility)

## Overview

These translation files contain the `ApiteSW6Utility` namespace translations that are used across **multiple Shopware 6 extensions**, not just the cart extension.

## Important Notes

- **Shared Across Extensions**: These translations are referenced by error handling code in the `@apite/shopware6-utility` package, which is used by:
  - `ext-shopware6-cart` (this extension)
  - `ext-shopware6-user` (for login errors)
  - `ext-shopware6-favorites`
  - `ext-shopware6-premsoft-wishlist`

- **Central Deployment**: The cart extension is the **authoritative source** for these translations. The Shopgate platform deploys these locale files from this extension, making them available to all other extensions.

- **How It Works**: Other extensions throw errors with translation keys (e.g., `ApiteSW6Utility.notice.loginBadCredentials`), and the frontend looks up those keys in these deployed translation files.

## Translation Categories

### `cart.*`
Cart-related translations used directly in cart mapping code:
- `summaryShipping`, `summaryTax`, `subTotal`, `grandTotal`

### `notice.*`
Error messages used by the utility package's error handling:
- Product errors: `product-not-found`, `product-out-of-stock`, `product-stock-reached`
- Promotion errors: `promotion-not-found`, `promotion-not-eligible`, `auto-promotion-not-found`
- Auth errors: `loginBadCredentials`, `inactiveAccountAlert`
- Payment/Shipping errors: `shipping-method-blocked`, `payment-method-blocked`
- Generic errors: `message-default`, `message-403`, `rateLimitExceeded`

### `general.*`
General application messages:
- `maintenanceModeHeader`, `maintenanceModeDescription`

### `app.*`
Application state messages:
- `not-in-sync` (session expired)

## Maintenance

When updating these translations:
1. Update all language files (de-DE, en-US, es-ES, fr-FR, it-IT) to maintain consistency
2. Test across all extensions that use the utility package's error handling
3. Remember these translations are infrequently updated - they're relatively stable

## History

Previously, these translation files were maintained in the `shopware6-utility` package and copied during installation via a `post-install.sh` script. This caused permissions issues during server deployment. The files have been moved here permanently to resolve those issues while maintaining the shared functionality.
