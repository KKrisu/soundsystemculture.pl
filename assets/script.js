(function($) {
  'use strict';
  var $addEventForm = $('.add-event-form');

  $('.add-event-btn').on('click', function() {
    $addEventForm.slideToggle();
  });

  $('.close-add-event-form').on('click', function() {
    $addEventForm.slideToggle();
  });

  $('form.add-event-form').on('submit', function(event) {
    var $form = $(this);

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
      },
      error: function() {
        modalsManager.open('.submit-error');
      },
    });

    event.preventDefault();
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
