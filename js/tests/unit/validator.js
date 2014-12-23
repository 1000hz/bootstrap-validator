$(function () {

  module("validator")

  test("should provide no conflict", function () {
    var validator = $.fn.validator.noConflict()
    ok(!$.fn.validator, 'validator was set back to undefined (org value)')
    $.fn.validator = validator
  })

  test("should be defined on jquery object", function () {
    var div = $('<div></div>')
    ok(div.validator, 'validator method is defined')
  })

  test("should return element", function () {
    var form = $('<form></form>')
    ok(form.validator()[0] == form[0], 'same element returned')
  })

  test("should expose defaults var for settings", function () {
    ok($.fn.validator.Constructor.DEFAULTS, 'default object exposed')
  })

  test('should not fire validated when validate is prevented', function () {
    stop()
    $('<form><input type="email"></form>')
      .on('validate.bs.validator', function (e) {
        e.preventDefault()
        ok(true)
        start()
      })
      .on('validated.bs.validator', function (e) {
        ok(false)
      })
      .validator('validate')
  })

  test('should validate match', 2, function () {
    stop()
    var form = '<form>'
     + '<input type="text" id="canon" value="pizza">'
     + '<input type="text" id="wannabe" value="hotpocket" data-match="#canon">'
     + '</form>'

    form = $(form)
      .appendTo($('#qunit-fixture'))
      .on('invalid.bs.validator', function (e) {
        var $el = $(e.relatedTarget)
        if ($el.attr('id') !== 'wannabe') return
        ok(true)
        $el.val('pizza').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        var $el = $(e.relatedTarget)
        if ($el.attr('id') !== 'wannabe') return
        ok(true)
        start()
      })
      .validator('validate')
  })

  test('should validate minlength', 2, function () {
    stop()
    $('<form><input type="text" data-minlength="6" value="pizza"></form>')
      .on('invalid.bs.validator', function (e) {
        ok(true)
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        ok(true)
        start()
      })
      .validator('validate')
  })

  test('should allow custom generic error message', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-error="generic error" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() == 'generic error', 'generic error message was set')
        start()
      })
      .validator('validate')
  })

  test('should allow custom error-specific message', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-minlength-error="minlength error" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() == 'minlength error', 'specific error message was set')
        start()
      })
      .validator('validate')
  })

  test('should give precedence to specific error message over generic error message', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-error="generic error" data-minlength-error="minlength error" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() == 'minlength error', 'specific error message displayed instead of generic error')
        start()
      })
      .validator('validate')
  })

  test('should escape html in error messages if html option is false', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-minlength-error="<em>Too short</em>" value="pizza">'
      +   '<div class="help-block with-errors"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() == '<em>Too short</em>', 'html escaped from error message')
        start()
      })
      .validator({html: false})
      .validator('validate')
  })

  test('should allow html in error messages if html option is true', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" data-minlength-error="<em>Too short</em>" value="pizza">'
      +   '<div class="help-block with-errors"></div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() == 'Too short', 'html allowed in error message')
        start()
      })
      .validator({html: true})
      .validator('validate')
  })

  test('should restore .help-block content once valid', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      +   '<div class="help-block with-errors">6 characters</div>'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() != '6 characters', 'error message was set')
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        ok($(this).find('.help-block.with-errors').text() == '6 characters', 'help text was restored')
        start()
      })
      .validator('validate')
  })

  test('should add .has-error class to the closest .form-group', function () {
    stop()
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-minlength="6" value="pizza">'
      + '</div>'
      + '</form>'

    $(form)
      .on('invalid.bs.validator', function (e) {
        ok($(this).find('.form-group').hasClass('has-error'), '.has-error class added to form-group')
        $(e.relatedTarget).val('pizzas').trigger('input')
      })
      .on('valid.bs.validator', function (e) {
        ok(!$(this).find('.form-group').hasClass('has-error'), '.has-error class removed from form-group')
        start()
      })
      .validator('validate')
  })

  test('should disable submit button unless form is complete and valid', function () {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<input id="minlength" type="text" data-minlength="6">'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete and invalid')
    $('#required').val('hamburgers').trigger('input')
    ok(!$btn.hasClass('disabled'), 'submit button enabled because form is sufficiently complete and no fields are invalid')
    $('#minlength').val('pizza').trigger('input')
    ok($btn.hasClass('disabled'), 'submit button disabled because form is invalid')
    $('#minlength').val('pizzas').trigger('input')
    ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete and valid')
  })

  test('should not disable submit button if disable option is set to false', function () {
    var form = '<form>'
    + '<input id="required" type="text" required>'
    + '<input id="minlength" type="text" data-minlength="6">'
    + '<button type="submit" id="btn">Submit</button>'
    + '</form>'

    form = $(form)
    .appendTo('#qunit-fixture')
    .validator({ disable: false })

    var $btn = $('#btn')

    ok($btn.not('.disabled'), 'submit button enabled although form is incomplete and invalid because disabling of submit is disabled')
    $('#required').val('hamburgers').trigger('input')
    $('#minlength').val('pizza').trigger('input')
    ok($btn.not('.disabled'), 'submit button enabled although form is invalid because disabling of submit is disable')
  })

  test('should only disable the submit buttons', function () {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<input id="minlength" type="text" data-minlength="6">'
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

    ok($submit.hasClass('disabled'), 'submit button disabled')
    ok(!$cancel.hasClass('disabled'), 'cancel button not disabled')
    ok(!$btn.hasClass('disabled'), 'button without a type not disabled')
  })

  test('should respect the required attribute on checkboxes', function () {
    var form = '<form>'
      + '<input id="required" type="checkbox" required>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete')
    $('#required').prop('checked', true).trigger('change')
    ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete')
    $('#required').prop('checked', false).trigger('change')
    ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete')
    $('#required').prop('checked', true).trigger('change')
    ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete')
  })

  test('should respect the required attribute on radio button groups', function () {
    var form = '<form>'
      + '<input type="radio" id="required1" name="radioGroup" required>'
      + '<input type="radio" id="required2" name="radioGroup" required>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete')
    $('#required1').prop('checked', true).trigger('change')
    ok(!$btn.hasClass('disabled'), 'submit button enabled because form is complete')
    $('#required2').prop('checked', false).trigger('change')
    ok(!$btn.hasClass('disabled'), 'submit button still enabled')
  })

  test('should ignore disabled fields', function () {
    var form = '<form>'
      + '<input id="required" type="text" required>'
      + '<input id="disabled" type="text" required disabled>'
      + '<button type="submit" id="btn">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator()

    var $btn = $('#btn')

    ok($btn.hasClass('disabled'), 'submit button disabled because form is incomplete and invalid')
    $('#required').val('hamburgers').trigger('input')
    ok(!$btn.hasClass('disabled'), 'submit button enabled regardless of disabled form being incomplete')
  })

  test('should clean up after itself when destroy called', function () {
    var form = '<form>'
      + '<div class="form-group">'
      +   '<input type="text" data-error="error message" required>'
      +   '<div class="help-block with-errors">original content</div>'
      + '</div>'
      + '<button type="submit">Submit</button>'
      + '</form>'

    form = $(form)
      .appendTo('#qunit-fixture')
      .validator('validate')
      .validator('destroy')

    ok(!form.data('bs.validator'), 'removed data reference to plugin instance')
    ok(!form.attr('novalidate'), 'removed novalidate browser override')
    ok(Object.keys(form.find('input').data()).length === 1, 'removed data left on inputs (excluding data-* attrs)')
    ok(!form.find('.has-error').length, 'removed has-error class from all inputs')
    ok(form.find('.help-block').html() === 'original content', 'help block content restored')
    ok(!form.find('button').is('.disabled'), 're-enabled submit button')
  })
})
