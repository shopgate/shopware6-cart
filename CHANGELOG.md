# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 0.1.0-beta.3

- fixed issue with guest tokens mixing with logged in customer tokens
- removed service classes (moved to separate module)
- removed locales (moved to separate module)
- removed tests (moved to separate module)

## 0.1.0-beta.2

- added translated errors when coupons/auto-promo's are no longer valid for cart
- added message for when promotions are conflicting
- added message for when promo is added (also after conflicting one is removed)
- added shipping totals to cart page (with translations)
- added logic to handle coupon removal by UID as well
- removed `Discount: -0.0` when no discount is applied on cart page
- changed logic around tax display on cart page
- changed logic around totals on cart page

## 0.1.0-beta.1

- added initial plugin release for beta testing
