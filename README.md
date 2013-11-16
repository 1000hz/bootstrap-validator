# Bootstrap 3 Form Validator
###### validator.js

### Features
- HTML5 Forms compliant
- Configurable via Data-API and HTML5 attributes
- Patient validation on input / Impatient validation on error
- Submit is disabled until form is valid and complete
- Customizable error messages

---

## Examples
Here's an easy to integrate, user-friendly form validator for Bootstrap 3.

[[ TODO ]]

## Usage
Form validation can be enabled in markup via the data-api or via JavaScript.

### Markup
Follow Bootstrap's [examples](http://getbootstrap.com/css/#forms) for appropriate form markup.

Automatically enable form validation by adding `data-toggle="validator"` to your form element.

```
<form role="form" data-toggle="validator">
  ...
</form>
```

Validation rules are specified on form inputs via the following standard attributes:

- `type="email"`

- `type="url"`

- `type="number"`, with additional constraints via `max` and `min` attributes

- `pattern="Reg(ular )?Exp(ression)?.*"` (for input types of `text`, `search`, `tel`, `url` or `email`)

- `required`

As well as the following non-standard attributes:

- `data-match="#inputToMatch"` to ensure two fields match, e.g. password confirmations

- `data-minlength="5"` to enforce a minimum amount of characters. A hard limit can be on the maximum length of a field via the standard `maxlength` attribute

To display error messages, include a container after the input field with a the `error-only` and `help-block` classes.


```
<form role="form" data-toggle="validator">
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="email" id="inputEmail" name="inputEmail">
    <div class="error-only help-block"></div>
  </div>
</form>
```


### Methods
#### $().validator(options)
Attaches a validator to a form collection

### Events
[[ TODO ]]

## Contributing
Adhere to the code style of Bootstrap 3's JS.

## Author

**Cina Saffary**
- http://twitter.com/1000hz
- http://github.com/1000hz

## Copyright and license
Copyright 2013 Spiceworks, Inc under the MIT license.