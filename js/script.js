$(document).ready(function () {

  var clicked, lastClicked;
  var inTransition = false;
  var pages = [$('#page-1'), $('#page-2'), $('#page-3'), $('#page-4')]

  if (clicked == null) {
    clicked = [$('li#0.current')];
  }

  var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"

  function doScroll (direction) {
    var activePage = clicked[clicked.length - 1];
    var nextPage = Number($(activePage).attr('id')) + Number(direction);
    clicked.push($('li#' + nextPage));

    $('li').removeClass('current');
    $('li#' + nextPage).addClass('current');

    setAnimation($(clicked[clicked.length - 2]).attr('id'), $('li#' + nextPage).attr('id'));
    inTransition = true;
  }

  $(document).bind(mousewheelevt, function(e){
    if (inTransition == false) {
      var evt = window.event || e
      evt = evt.originalEvent ? evt.originalEvent : evt;
      var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta

      if (delta > 0 && !$('li#0').hasClass('current')) {
        doScroll(-1);
      }

      if (delta < 0 && !$('li#3').hasClass('current')) {
        doScroll(1);
      }
    }
  });

  $('li#0, li#1, li#2, li#3').click(function () {
    if (inTransition == false && (!$(this).hasClass('current'))) {
      clicked.push($(this));

      $('li').removeClass('current');
      $(this).addClass('current');

      setAnimation($(clicked[clicked.length - 2]).attr('id'), $(this).attr('id'));
      inTransition = true;
    }
  });

  function setAnimation(lastId, currentId) {
    pages[currentId].removeClass('zoomOut slideInDown slideInUp');
    pages[lastId].removeClass('zoomOut slideInDown slideInUp');

    pages[lastId].addClass('animated zoomOut');

    pages[currentId].css('z-index','2');
    pages[lastId].css('z-index','1');

    setTimeout(function () {
      pages[currentId].css('display','block');

      if (lastId > currentId) {
        pages[currentId].addClass('animated slideInDown');
      } else {
        pages[currentId].addClass('animated slideInUp');
      }

      if (currentId == 2) {
        $(lastId).css({'background' : '#2E2E2E',
                       'box-shadow' : 'none'});

        $('li a').css({'background' : '#2E2E2E',
                      'box-shadow' : 'none'});
      } else {
        $(lastId).css({'background' : 'white',
                       'box-shadow' : 'none'});

        $('li a').css({'background' : 'white',
                       'box-shadow' : 'none'});
      }
    }, 250);

    setTimeout(function () {
      currentItem = 'li#' + currentId + ' a';

      if (currentId == 2) {
        $(currentItem).css({'box-shadow' : 'inset 0 0 0 0.25rem #2E2E2E',
                            'background' : 'Transparent'});
      } else {
        $('li a').css({'background' : 'white',
                       'box-shadow' : 'none'});

        $(currentItem).css({'box-shadow' : 'inset 0 0 0 0.25rem white',
                            'background' : 'Transparent'});
      }
    }, 500);

    setTimeout(function () {
      pages[lastId].css('display','none');
      inTransition = false;
    }, 1000);
  }
});
