$(function () {

  $.mockjaxSettings.logging = false

  $.mockjax({
    url: '/success',
    status: 200,
    responseText: 'cool'
  })

  $.mockjax({
    url: '/error',
    status: 418,
    responseText: 'dang'
  })

  // need this or else the validator won't run headlessly
  var inputSelector = $.fn.validator.Constructor.INPUT_SELECTOR.replace(':visible', '')
  $.fn.validator.Constructor.INPUT_SELECTOR = inputSelector

  QUnit.module("validator")

  QUnit.test("should provide no conflict", function (assert) {
    var validator = $.fn.validator.noConflict()
    assert.ok(!$.fn.validator, 'validator was set back to undefined (org value)')
    $.fn.validator = validator
  })

  QUnit.test("should be defined on jquery object", function (assert) {
    var div = $('<div></div>')
    assert.ok(div.validator, 'validator method is defined')
  })

  QUnit.test("should return element", function (assert) {
    var form = $('<form></form>')
    assert.ok(form.validator()[0] == form[0], 'same element returned')
  })

  QUnit.test("should expose defaults var for settings", function (assert) {
    assert.ok($.fn.validator.Constructor.DEFAULTS, 'default object exposed')
  })

  QUnit.test('should not fire validated when validate is prevented', function (assert) {
    var done = assert.async()
    $('<form><input type="email"></form>')
      .on('validate.bs.validator', function (e) {
        e.preventDefault()
        assert.ok(true)
        done()
      })
      .on('validated.bs.validator', function (e) {
        assert.ok(false)
      })
      .validator('validate')
  })

  QUnit.test('should validate match', 2, function (assert) {
    var done = assert.async()
    var form = '<form>'
     + '<input type="text" id="canon" value="pizza">'
     + '<input type="text" id="wannabe" value="hotpocket" data-match="#canon">'
     + '</form>'

    form = $(form)
      .appendTo($('#qunit-fixture'))
      .on('invalid.bs.validator', function (e) {
        var $el = $(e.relatedTarget)
        if ($el.attr('id') !== 'wannabe') return
        assert.ok(true)
        $el.val('pizza').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        var $el = $(e.relatedTarget)
        if ($el.attr('id') !== 'wannabe') return
        assert.ok(true)
        done()
      })
      .validator('validate')
  })

  QUnit.test('should validate minlength', 2, function (assert) {
    var done = assert.async()
    $('<form><input type="text" data-minlength="6" value="pizza"></form>')
      .on('invalid.bs.validator', function (e) {
        assert.ok(true)
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        assert.ok(true)
        done()
      })
      .validator('validate')
  })

  QUnit.test('should allow custom generic error message', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-error="generic error" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() == 'generic error', 'generic error message was set')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should allow custom error-specific message', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-minlength-error="minlength error" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() == 'minlength error', 'specific error message was set')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should give precedence to specific error message over generic error message', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-error="generic error" data-minlength-error="minlength error" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() == 'minlength error', 'specific error message displayed instead of generic error')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should escape html in error messages if html option is false', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-minlength-error="<em>Too short</em>" value="pizza">'
      +   '<div class="help-block with-errors"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() == '<em>Too short</em>', 'html escaped from error message')
        done()
      })
      .validator({html: false})
      .validator('validate')
  })

  QUnit.test('should allow html in error messages if html option is true', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-minlength-error="<em>Too short</em>" value="pizza">'
      +   '<div class="help-block with-errors"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() == 'Too short', 'html allowed in error message')
        done()
      })
      .validator({html: true})
      .validator('validate')
  })

  QUnit.test('should restore .help-block content once valid', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() != '6 characters', 'error message was set')
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        assert.ok($(this).find('.help-block.with-errors').text() == '6 characters', 'help text was restored')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should add .has-error class to the closest .form-group', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.form-group').hasClass('has-error'), '.has-error class added to form-group')
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        assert.ok(!$(this).find('.form-group').hasClass('has-error'), '.has-error class removed from form-group')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should add feedback classes to .form-control-feedback elements when the form group .has-feedback', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group has-feedback">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      +   '<div class="form-control-feedback"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.form-control-feedback').hasClass('glyphicon-remove'), 'error feedback class added to .form-control-feedback')
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        assert.ok($(this).find('.form-control-feedback').hasClass('glyphicon-ok'), 'success feedback class added to .form-control-feedback')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should not add feedback classes to .form-control-feedback elements when the form group does not .has-feedback', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      +   '<div class="form-control-feedback"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok(!$(this).find('.form-control-feedback').hasClass('glyphicon-remove'), 'error feedback class not added to .form-control-feedback')
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        assert.ok(!$(this).find('.form-control-feedback').hasClass('glyphicon-ok'), 'success feedback class not added to .form-control-feedback')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should not add success feedback classes to empty fields', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<div class="form-group has-feedback">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      +   '<div class="form-control-feedback"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        assert.ok($(this).find('.form-control-feedback').hasClass('glyphicon-remove'), 'error feedback class added to .form-control-feedback')
        $(e.relatedTarget).val('').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        assert.ok(!$(this).find('.form-control-feedback').hasClass('glyphicon-ok'), 'success feedback class not added to .form-control-feedback')
        assert.ok(!$(this).find('.form-group').hasClass('has-success'), '.has-success not added to .form-group')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should disable submit button unless form is complete and valid', function (assert) {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<input id="minlength" type="text" data-minlength="6">'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete and invalid')
    $('#required').val('hamburgers').trigger('input')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled because form is sufficiently complete and no fields are invalid')
    $('#minlength').val('pizza').trigger('input')
    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is invalid')
    $('#minlength').val('pizzas').trigger('input')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete and valid')
  })

  QUnit.test('should not disable submit button if disable option is set to false', function (assert) {
    var form = '<form>'
    + '<input id="required" type="text" required>'
    + '<input id="minlength" type="text" data-minlength="6">'
    + '<button type="submit" id="btn">Submit</button>'
    + '</form>'

    form = $(form)
    .appendTo('#qunit-fixture')
    .validator({ disable: false })

    var $btn = $('#btn')

    assert.ok($btn.not('.disabled'), 'submit button enabled although form is incomplete and invalid because disabling of submit is disabled')
    $('#required').val('hamburgers').trigger('input')
    $('#minlength').val('pizza').trigger('input')
    assert.ok($btn.not('.disabled'), 'submit button enabled although form is invalid because disabling of submit is disable')
  })

  QUnit.test('should only disable the submit buttons', function (assert) {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<button type="submit" id="submit">Submit</button>'
      + '<button type="button" id="cancel">Cancel</button>'
      + '<button id="btn">Undefined Type</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $submit = $('#submit')
    var $cancel = $('#cancel')
    var $btn    = $('#btn')

    assert.ok($submit.hasClass('disabled'), 'submit button disabled')
    assert.ok(!$cancel.hasClass('disabled'), 'cancel button not disabled')
    assert.ok(!$btn.hasClass('disabled'), 'button without a type not disabled')
  })

  QUnit.test('should respect the required attribute on checkboxes', function (assert) {
    var form = '<form>'
      + '<input id="required" type="checkbox" required>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete')
    $('#required').prop('checked', true).trigger('change')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete')
    $('#required').prop('checked', false).trigger('change')
    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete')
    $('#required').prop('checked', true).trigger('change')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete')
  })

  QUnit.test('should respect the required attribute on radio button groups', function (assert) {
    var form = '<form>'
      + '<input type="radio" id="required1" name="radioGroup" required>'
      + '<input type="radio" id="required2" name="radioGroup" required>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete')
    $('#required1').prop('checked', true).trigger('change')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete')
    $('#required2').prop('checked', false).trigger('change')
    assert.ok(!$btn.hasClass('disabled'), 'submit button still enabled')
  })

  QUnit.test('should support [form] attribute on submit buttons outside of form element', function (assert) {
    var form = '<form id="myForm">'
      + '<input type="text" id="input" required>'
      + '</form>'
      + '<button type="submit" form="myForm" id="btn">Submit</button>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    assert.ok($btn.hasClass('disabled'), 'submit button outside of referenced form is disabled')
    $('#input').val('sup').trigger('change')
    assert.ok(!$btn.hasClass('disabled'), 'submit button outside of referenced form reacted to changes')
  })

  QUnit.test('should ignore disabled fields', function (assert) {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<input id="disabled" type="text" required disabled>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete and invalid')
    $('#required').val('hamburgers').trigger('input')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled regardless of disabled form elements being incomplete')
  })

  QUnit.skip('should ignore hidden fields', function (assert) {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<input type="hidden" required>'
      + '<input type="text" required hidden>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    assert.ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete and invalid')
    $('#required').val('hamburgers').trigger('input')
    assert.ok(!$btn.hasClass('disabled'), 'submit button enabled regardless of hidden form elements being incomplete')
  })

  QUnit.test('should ignore button fields', function (assert) {
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-error="error" required>'
      +   '<div id="errors" class="help-block with-errors">valid</div>'
      + '</div>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator('validate')

    var $errors = $('#errors')

    assert.equal($errors.text(), 'error', 'buttons did not inadvertently get validated and clear the form-group errors')
  })

  QUnit.test('should validate remote endpoints with success if response is 200', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<input id="remote" type="text" value="foo" data-remote="/success">'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .on('valid.bs.validator', function (e) {
        assert.ok(e.relatedTarget === $('#remote')[0], 'remote endpoint validated successfully with a 200 response')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should validate remote endpoints with error if response is 4xx', function (assert) {
    var done = assert.async()
    var form = '<form>'
      + '<input id="remote" type="text" value="foo" data-remote="/error">'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .on('invalid.bs.validator', function (e) {
        assert.ok(e.relatedTarget === $('#remote')[0], 'remote endpoint validated with error with a 4xx response')
        done()
      })
      .validator('validate')
  })

  QUnit.test('should clean up after itself when destroy called', function (assert) {
    var form = '<form>'
      + '<div class="form-group has-feedback">'
      +   '<input type="text" data-error="error message" required>'
      +   '<div class="form-control-feedback"></div>'
      +   '<div class="help-block with-errors">original content</div>'
      + '</div>'
      + '<button type="submit">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator('validate')
      .validator('destroy')

    assert.ok(!form.data('bs.validator'), 'removed data reference to plugin instance')
    assert.ok(!form.attr('novalidate'), 'removed novalidate browser override')
    assert.ok(Object.keys(form.find('input').data()).length === 1, 'removed data left on inputs (excluding data-* attrs)')
    assert.ok(!form.find('.has-error').length, 'removed has-error class from all inputs')
    assert.ok(!form.find('.glyphicon-remove').length, 'removed feedback class from all inputs')
    assert.ok(form.find('.help-block').html() === 'original content', 'help block content restored')
    assert.ok(!form.find('button').is('.disabled'), 're-enabled submit button')
  })

  QUnit.test('should throw an error if custom validator has no default error message', function (assert) {
    assert.raises(function () {
      $('<form></form>').validator({custom: {foo: function () {}}})
    })
  })

  QUnit.test('should run custom validators', function (assert) {
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" id="foo" data-foo="foo" value="foo">'
      +   '<div class="help-block with-errors"></div>'
      + '</div>'
      + '<div class="form-group">'
      +   '<input type="text" id="bar" data-foo="foo" value="bar">'
      +   '<div class="help-block with-errors"></div>'
      + '</div>'
      + '<button type="submit">Submit</button>'
      + '</form>'

    var options = {
      custom: {
        foo: function ($el) {
          return $el.data('foo') == $el.val()
        }
      },
      errors: {
        foo: 'not equal to foo'
      }
    }

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator(options)
      .validator('validate')

    assert.ok($('#foo').data('bs.validator.errors').length === 0, 'foo input is valid')
    assert.ok($('#bar').data('bs.validator.errors').length === 1, 'bar input is invalid')
    assert.ok($('#bar').data('bs.validator.errors')[0] === options.errors.foo, 'bar error is custom error')
  })
})
