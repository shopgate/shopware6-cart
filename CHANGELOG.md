# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres
to [Semantic Versioning](http://semver.org/).

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
