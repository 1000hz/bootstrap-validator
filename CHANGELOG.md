Changelog
=========

### 0.9.0
* Adding new `feedback` option to override the classes used for feedback icons (#97)
* Exposing selector used to determine which inputs to validate as `Validator.INPUT_SELECTOR`
* Removing inline styles on submit button no longer needed in Bootstrap v3.3.5 (#166)
* Add `jquery >= 1.8.3` to bower.json (#160)

###### Docs Changes
* Upgrade to Bootstrap v3.3.5
* Added a form-feedback example to the docs
* Added a custom validator server example to the docs

### 0.8.1
* No longer running validators on button elements. Fixes #93.
* No longer running validators on invisible input elements. Fixes #65.
* Adding support for `button[form="myForm"]`. Fixes #74.

### 0.8.0
* Adding custom validators option.
* Only adding .has-success class if there is a `.form-control-feedback` present.

### 0.7.3
* No longer validating `input[type="hidden"]` fields. Fixes #84.
* Adding support for Bootstrap's feedback icons.

### 0.7.2
* Namespacing the manually-triggered `input` events. Fixes #38.
* Adding a note to the docs about polyfills and cross-browser compatibility in IE9 and older. Fixes #18.
* Adding a note to the docs about conditionally handling the submit event if the form is invalid. Fixes #44.

### 0.7.0
* Adding a `disable` option to control whether or not the form submit is disabled if the form is invalid. Defaults to true. See #46.
* URI-encoding params sent via remote validator. Fixes #56.

### 0.6.0
* Adding `.validator('destroy')` method. Fixes #10.
* Not calling window.setTimeout() if options.delay == 0
* Fixing broken docs example
* Moved docs content to /docs directory of project

### 0.5.0
* Adding `remote` validator to send an AJAX request to determine a fields validity. Fixes #2.
* Making the disabled submit button clickable to reveal what errors are keeping the form disabled. Fixes #8.
* Fixing small issue with errored radio buttons that made the form stay disabled until you toggled through each radio button. Fixes #21.

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