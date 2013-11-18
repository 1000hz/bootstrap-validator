# Bootstrap 3: validator.js
The Validator plugin is offers automatic form validation configurable via mostly HTML5 standard attributes.
It also provides an unobtrusive user experience, because nobody likes a naggy form.

### Features
- Configurable via data-api and standard HTML5 attributes
- Patient to inform user of errors and eager to let them know the errors have been resolved
- Submit is disabled until the form is valid and all required fields are complete
- Customizable error messages


## Examples

[[ TODO ]]

## Usage
Form validation can be enabled in markup via the data-api or via JavaScript.

Automatically enable form validation by adding `data-toggle="validator"` to your form element.

``` HTML
<form role="form" data-toggle="validator">
  ...
</form>
```

Or activate validation via JavaScript:

``` js
$('#myForm').validator()
```

### Markup
Follow Bootstrap's [examples](http://getbootstrap.com/css/#forms) for appropriate form markup.

Validation rules are specified on form inputs via the following standard attributes:
- `type="email"`
- `type="url"`
- `type="number"`, with additional constraints via `max` and `min` attributes
- `pattern="Reg(ular )?Exp(ression)?"` (for input types of `text`, `search`, `tel`, `url` or `email`)
- `required`

As well as the following non-standard attributes:
- `data-match="#inputToMatch"` to ensure two fields match, e.g. password confirmations
- `data-minlength="5"` to enforce a minimum amount of characters.


To display error messages, include a container after the input field with both `help-block` and `with-errors` classes.


``` HTML
<form role="form" data-toggle="validator">
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="email" id="inputEmail" name="inputEmail">
    <div class="help-block with-errors"></div>
  </div>
</form>
```


### Methods
#### $().validator(options)
Attaches a validator to a form collection.

#### $().validator('validate')
Immediately validates the entire form.

### Events
All events are fired on the form element and provide a reference to the form field to which the event pertains via `event.relatedTarget`.

| Event Type             | Description                                                  |
|:---------------------- |:------------------------------------------------------------ |
| validate.bs.validator  | This event fires immediately when a form field is validated. |
| invalid.bs.validator   | This event is fired when a form field becomes invalid. Field errors are provided via `event.detail`.   |
| valid.bs.validator     | This event is fired when a form field becomes valid. Previous field errors are provided via `event.detail`.|
| validated.bs.validator | This event is fired after a form field has been validated.   |

## Contributing
#### Found an issue?
Be sure to include a reproducible test case on JSbin with your report.
#### Submitting a pull request?
Fork this repo and create a new branch for your patch. Try to adhere to the code style of Bootstrap 3's JS as much as possible. Be sure to add any relevant unit tests. Make sure everything's still ok by running `grunt test`. Lastly, don't pollute your patch branch with any unrelated changes.

## Author

**Cina Saffary**
- http://twitter.com/1000hz
- http://github.com/1000hz

Thanks to  [@mdo](https://github.com/mdo) and [@fat](https://github.com/fat) for [Bootstrap](http://getbootstrap.com). <3

## Copyright and license
Copyright 2013 Spiceworks, Inc under the MIT license.
