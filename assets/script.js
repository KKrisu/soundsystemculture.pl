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
      },
    });

    event.preventDefault();
  });
} (jQuery));
