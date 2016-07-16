Changelog
=========
### 0.11.5
* Fixed an event binding order issue when the form is reset. ([#375](https://github.com/1000hz/bootstrap-validator/pull/375))

### 0.11.3
* Fixed `.has-success` not being cleared if a field `.has-feedback` and has it's value cleared.  Shoutout to [@net](https://github.com/1000hz/bootstrap-validator/pull/375) for bringing the bugs fixed in 0.11.1 - 0.11.3 to my attention.

### 0.11.2
* Added `input[type="reset"]` to the ignored input filter

### 0.11.1
* Added a `reset` event listener on the form to reinitialize the plugin
* Fixed a missed bit of cleanup in `.validator('destroy')` where it wasn't removing the `.has-success` class

### 0.11.0
###### BREAKING CHANGES:
* Custom validators are now expected to return an error string if the field is invalid.
* The errors option has been removed. Override `$.fn.validator.Constructor.DEFAULTS.errors` if you want to change the default `match` and `minlength` errors.
* The validator no longer skips disabled/invisible fields. If you want this behavior back, add `$.fn.validator.Constructor.INPUT_SELECTOR += ':enabled:visible'` to your code. ([#115](https://github.com/1000hz/bootstrap-validator/issues/115)) ([#134](https://github.com/1000hz/bootstrap-validator/issues/134)) ([#317](https://github.com/1000hz/bootstrap-validator/issues/317))

###### Enhancements:
* Added support for distinct custom errors for the standard HTML5 attribute validators. No more being stuck with `data-native-error=""` for all of them. ([#222](https://github.com/1000hz/bootstrap-validator/issues/222)) ([#241](https://github.com/1000hz/bootstrap-validator/issues/241)) ([#285](https://github.com/1000hz/bootstrap-validator/issues/285))
* Added a `.validator('update')` method to refresh the set of fields that will be validated ([#306](https://github.com/1000hz/bootstrap-validator/issues/306))
* Added support of `data-validate="true|false"` on inputs to force validation of that field
* Immediately validating fields that already have a value upon validator initialization ([#350](https://github.com/1000hz/bootstrap-validator/issues/350))

###### Bugfixes:
* Fixed a bug in Safari where `element.checkValidity()` was returning stale values ([#293](https://github.com/1000hz/bootstrap-validator/issues/293))
* Fixed a bug where spaces at the end of inputs were being trimmed off before being run through validators ([#338](https://github.com/1000hz/bootstrap-validator/issues/338))
* Custom validators no longer leak to other instances of Validator. ([#176](https://github.com/1000hz/bootstrap-validator/issues/176))
* Scrolling with `focus: true` option is now triggered on `$('html, body')` instead of `$(document.body)` for better cross-browser support ([#282](https://github.com/1000hz/bootstrap-validator/issues/282))
* Removed (value == previousValue => skip) optimization. It was breaking the match validator and wasn't improving perf that much. ([#316](https://github.com/1000hz/bootstrap-validator/issues/316)) ([#340](https://github.com/1000hz/bootstrap-validator/issues/340))
* Added `$.fn.validator.Constructor.VERSION` property for parity with core Bootstrap plugins

###### Docs Changes:
* Docs: Added an Overview section which calls out that whatever conventions apply to Bootstrap's core plugins also apply here
* Docs: Added a callout blurb about the standard attribute validators
* Docs: Added a "Validated fields" section to document the Validator.INPUT_SELECTOR field
* Docs: Removed `$()` from method headers, which was confusing some people ([#202](https://github.com/1000hz/bootstrap-validator/issues/202))


### 0.10.2
* Fixed a bug with the form still submitting even with errors when using the `disable: false` option. ([#310](https://github.com/1000hz/bootstrap-validator/issues/310))
* Fixed a bug with the error field not being focused when using the `disable: false` option. ([#310](https://github.com/1000hz/bootstrap-validator/issues/310))

### 0.10.1
* You can now override `$.fn.validator.Constructor.FOCUS_OFFSET` to set a custom offset from the top of the window the page should scroll to when the `focus` option is true. Defaults to 20px.

### 0.10.0
* Adding the `focus` option to scroll to and focus the first field with an error ([#128](https://github.com/1000hz/bootstrap-validator/issues/128))
* Add support for Bootstrap 4 `.has-danger` class ([#271](https://github.com/1000hz/bootstrap-validator/issues/271))
* Only running validators if the field has a value or is required ([#214](https://github.com/1000hz/bootstrap-validator/issues/214))
* Immediately validate on blur ([#130](https://github.com/1000hz/bootstrap-validator/issues/130))
* Caching selected form fields to greatly improve performance ([#234](https://github.com/1000hz/bootstrap-validator/issues/234))
* Only validate a field if it is dirty or invalid ([#258](https://github.com/1000hz/bootstrap-validator/issues/258), [#152](https://github.com/1000hz/bootstrap-validator/issues/152))
* Handle feedback icons in .destroy() ([#123](https://github.com/1000hz/bootstrap-validator/issues/123))
* Change feedback to check if .form-group .has-feedback
* Only show success feedback if field has value ([#252](https://github.com/1000hz/bootstrap-validator/issues/252))
* Scoping `input`/`change`/`focusout` event handlers to `INPUT_SELECTOR` elements ([#251](https://github.com/1000hz/bootstrap-validator/issues/251))
* Updated the `main` path in bower.json ([#219](https://github.com/1000hz/bootstrap-validator/issues/219))

### 0.9.0
* Adding new `feedback` option to override the classes used for feedback icons ([#97](https://github.com/1000hz/bootstrap-validator/issues/97))
* Exposing selector used to determine which inputs to validate as `Validator.INPUT_SELECTOR`
* Removing inline styles on submit button no longer needed in Bootstrap v3.3.5 ([#166](https://github.com/1000hz/bootstrap-validator/issues/166))
* Add `jquery >= 1.8.3` to bower.json ([#160](https://github.com/1000hz/bootstrap-validator/issues/160))

###### Docs Changes
* Upgrade to Bootstrap v3.3.5
* Added a form-feedback example to the docs
* Added a custom validator server example to the docs

### 0.8.1
* No longer running validators on button elements. Fixes [#93](https://github.com/1000hz/bootstrap-validator/issues/93).
* No longer running validators on invisible input elements. Fixes [#65](https://github.com/1000hz/bootstrap-validator/issues/65).
* Adding support for `button[form="myForm"]`. Fixes [#74](https://github.com/1000hz/bootstrap-validator/issues/74).

### 0.8.0
* Adding custom validators option.
* Only adding .has-success class if there is a `.form-control-feedback` present.

### 0.7.3
* No longer validating `input[type="hidden"]` fields. Fixes [#84](https://github.com/1000hz/bootstrap-validator/issues/84).
* Adding support for Bootstrap's feedback icons.

### 0.7.2
* Namespacing the manually-triggered `input` events. Fixes [#38](https://github.com/1000hz/bootstrap-validator/issues/38).
* Adding a note to the docs about polyfills and cross-browser compatibility in IE9 and older. Fixes [#18](https://github.com/1000hz/bootstrap-validator/issues/18).
* Adding a note to the docs about conditionally handling the submit event if the form is invalid. Fixes [#44](https://github.com/1000hz/bootstrap-validator/issues/44).

### 0.7.0
* Adding a `disable` option to control whether or not the form submit is disabled if the form is invalid. Defaults to true. See [#46](https://github.com/1000hz/bootstrap-validator/issues/46).
* URI-encoding params sent via remote validator. Fixes [#56](https://github.com/1000hz/bootstrap-validator/issues/56).

### 0.6.0
* Adding `.validator('destroy')` method. Fixes [#10](https://github.com/1000hz/bootstrap-validator/issues/10).
* Not calling window.setTimeout() if options.delay == 0
* Fixing broken docs example
* Moved docs content to /docs directory of project

### 0.5.0
* Adding `remote` validator to send an AJAX request to determine a fields validity. Fixes [#2](https://github.com/1000hz/bootstrap-validator/issues/2).
* Making the disabled submit button clickable to reveal what errors are keeping the form disabled. Fixes [#8](https://github.com/1000hz/bootstrap-validator/issues/8).
* Fixing small issue with errored radio buttons that made the form stay disabled until you toggled through each radio button. Fixes [#21](https://github.com/1000hz/bootstrap-validator/issues/21).

### 0.4.0
* Adding `html` option to allow html in error messages. Defaults to false.
* Validator now ignores disabled fields and won't consider them to be invalid. Fixes [#13](https://github.com/1000hz/bootstrap-validator/issues/13).
* Validator only disables buttons with `[type="submit"]`. Best practice is still to give a `[type="button"]` for all non-submit buttons. Fixes [#17](https://github.com/1000hz/bootstrap-validator/issues/17).
* Fixing `.noConflict()` as per twbs/bootstrap[#11464](https://github.com/1000hz/bootstrap-validator/issues/11464).
* Namespacing all data attributes the plugin sets with `bs.validator`.

### 0.3.0
* Adding support for required radio buttons and checkboxes. Fixes [#7](https://github.com/1000hz/bootstrap-validator/issues/7).
* Changing jekyll to serve docs from `/` instead of `/validator` when running docs locally

### 0.2.1
* Validating fields on blur so empty required fields are subject to validation once they've been touched. Fixes [#3](https://github.com/1000hz/bootstrap-validator/issues/3).

### 0.2.0
* Initial public release
