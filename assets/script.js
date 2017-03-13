(function($) {
  'use strict';
  var $addEventForm = $('.add-event-form');
  var $addEventSubmitBtn = $addEventForm.find('button:submit');
  var $contactForm = $('.contact-form form');
  var $contactSubmitBtn = $contactForm.find('button:submit');

  $('.add-event-btn').on('click', function() {
    $addEventForm.slideToggle();
  });

  $('.close-add-event-form').on('click', function() {
    $addEventForm.slideToggle();
  });

  $addEventForm.on('submit', function(event) {
    var $form = $(this);
    $addEventSubmitBtn.prop('disabled', true);

    var data = $form.serializeArray().reduce(function(m, o) {
      m[o.name] = o.value;
      return m;
    }, {});

    $.ajax({
      url: 'https://formspree.io/soundsystemculturepl@gmail.com',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function() {
        $addEventForm.slideToggle();
        $form.find('input[type=text], textarea').val('');
        modalsManager.open('.event-submit-success');
        $addEventSubmitBtn.prop('disabled', false);
      },
      error: function() {
        modalsManager.open('.submit-error');
        $addEventSubmitBtn.prop('disabled', false);
      },
    });

    event.preventDefault();
  });

  $contactForm.on('submit', function(event) {
    var $form = $(this);
    $contactSubmitBtn.prop('disabled', true);

    var data = $form.serializeArray().reduce(function(m, o) {
      m[o.name] = o.value;
      return m;
    }, {});

    $.ajax({
      url: 'https://formspree.io/soundsystemculturepl@gmail.com',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function() {
        $form.find('input[type=text], textarea').val('');
        modalsManager.open('.contact-submit-success');
        $contactSubmitBtn.prop('disabled', false);
      },
      error: function() {
        modalsManager.open('.submit-error');
        $contactSubmitBtn.prop('disabled', false);
      },
    });

    event.preventDefault();
  });

  $('.open-modal').on('click', function() {
    var modalSelector = $(this).attr('data-modal');
    modalsManager.open(modalSelector);
  });

  var modalsManager = window.modalsManager = (function() {
    var $modalsContainer = $('.modals-container');
    var $modals = $modalsContainer.find('.modal');
    var api = {
      open: function(modalSelector) {
        $modals.hide();
        $modalsContainer.css('display', 'flex').hide().fadeIn();
        $modalsContainer.find(modalSelector).fadeIn();
      },
      close: function() {
        $modals.fadeOut();
        $modalsContainer.fadeOut();
      },
    };

    // click on backdrop
    $('.modals-container').on('click', function(event) {
      var $target = $(event.target);
      if (!$target.is('.modal') && !$target.parents('.modal').length) {
        api.close();
      }
    });

    $('.close-modal-icon').on('click', function() {
      api.close();
    });

    return api;
  } ());

} (jQuery));
