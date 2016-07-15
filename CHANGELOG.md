Changelog
=========
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