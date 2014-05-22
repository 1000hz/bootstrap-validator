Changelog
========

### 0.4.0
* Adding `html` option to allow html in error messages. Defaults to false.
* Validator now ignores disabled fields and won't consider them to be invalid. Fixes #13.
* Validator only disables buttons with `[type="submit"]`. Best practice is still to give a `[type="button"]` for all non-submit buttons. Fixes #17.
* Fixing `.noConflict()` as per twbs/bootstrap#11464.
* Namespacing all data attributes the plugin sets with `bs.validator`.

### 0.3.0
* Adding support for required radio buttons and checkboxes. Fixes #7.
* Changing jekyll to serve docs from `/` instead of `/validator` when running docs locally

### 0.2.1
* Validating fields on blur so empty required fields are subject to validation once they've been touched. Fixes #3.

### 0.2.0
* Initial public release