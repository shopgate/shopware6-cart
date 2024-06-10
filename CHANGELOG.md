# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres
to [Semantic Versioning](http://semver.org/).

## 1.5.5

- fixed getCart with empty product Selling Unit (purchaseUnit)

## 1.5.4

- fixed new languages not being used

## 1.5.3

- added IT, FR, ES translations

## 1.5.2

- added new pipeline to help retrieve token for sync purposes
- fixed correct cart item thumbnails not showing up for guest/customers at certain points

## 1.5.1

- changed cart image to use the base image URL to avoid black background
- fixed possible issue with checking that the product cached image list exists
- updated utility dependency to suppress error from getRegistrationUrl/getCart due to race condition

## 1.5.0

- changed cart image to use the SG service thumbnail with a fallback to Shopware's

## 1.4.1

- changed PWA version
- fixed Product detail subscriber error catcher

## 1.4.0

- added cart hooks to easily add custom content to cart
- changed cart enrich functionality to ignore errors
- fixed empty cart enrichment step loads all products

## 1.3.1

- changed usage of `Intl` formatter to 3rd party due to Node 10 incompatibility

## 1.3.0

- added data to case where the purchase unit is equal to 1 reference unit (e.g. `1 kilo (20,00 € / 1 kilo`)
- updated utility dependency to 1.0.0

## 1.2.1

- fixed `nullish coalescing operator` usage

## 1.2.0

- added `unit price / unit name` info in the cart page for products that support it

## 1.1.1

- added logging when getting the checkout URL
- fixed favorites placeholder in case SW6 favorites extension is not deployed
- fixed URL concatenation logic to accommodate folders within an endpoint

## 1.1.0

- added translation for `Tax` label in cart totals
- changed token URL slug from `sgconnect` to `sgwebcheckout`

## 1.0.0

- changed alpha versioning to release

## 0.1.0-beta.2

- added translated errors when coupons/auto-promo's are no longer valid for cart
- added message for when promotions are conflicting
- added message for when promo is added (also after conflicting one is removed)
- added shipping totals to cart page (with translations)
- added logic to handle coupon removal by UID as well
- changed logic around tax display on cart page
- changed logic around totals on cart page
- fixed issue with guest tokens mixing with logged in customer tokens
- removed `Discount: -0.0` when no discount is applied on cart page
- removed service classes (moved to separate module)
- removed locales (moved to separate module)

## 0.1.0-beta.1

- added initial plugin release for beta testing
