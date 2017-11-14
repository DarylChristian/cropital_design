$(document).ready(function() {
  $('#inner-message').on('click', function(e){
    e.preventDefault();
    localStorage.setItem('beta', '1');
  });
  
  if(localStorage.getItem('beta') !== '1'){
    $('#message').removeClass('hide');
  }
  
  $('.help-submenu').on('click', function(e){
    var tag = $(this).attr('tag').substring(2);
    $('html,body').animate({
      scrollTop: $(".help-heading").offset().top},
      'slow');
  });
	$('.dropdown-toggle').dropdown();
  $('#menu-1').css('border-left', '2px solid #036564');
  $('#amount').priceFormat({
    prefix: ''
  });
  $('#amount').attr({size: 4});
  $('#amount').keyup(function(){
    $(this).attr({width: 'auto', size: $(this).val().length});
  });
  var path = window.location.pathname;
  $('input[type="range"]').rangeslider({ polyfill: false });
  $('[data-toggle="tooltip"]').tooltip()
  if(path === "/" || path === "/get-started" || path.indexOf('apply') > -1 || path.indexOf('help') > -1){
    $(window).scroll(function(event) {
      var scroll = $(window).scrollTop();
      if(scroll > 50){
        $('#header').addClass('navbar-scroll');
        $('.subheading').addClass('text-color-1').removeClass('text-color-3');
        $('#login-btn').addClass('btn-3-inverse').removeClass('btn-3');
        $('.logo').attr('src', 'images/v1.png');
        $('.icon-bar').css('background-color', 'black');
      } else {
        $('#header').removeClass('navbar-scroll');
        $('.subheading').addClass('text-color-3').removeClass('text-color-1');
        $('#login-btn').addClass('btn-3').removeClass('btn-3-inverse');
        $('.logo').attr('src', 'images/v3.png');
        $('.icon-bar').css('background-color', 'white');
      }
    });
    $('#navbar-toggle').on('click', function(e){
      if($(this).attr('aria-expanded') === "false"){
        $('#header').addClass('navbar-scroll');
        $('.subheading').addClass('text-color-1').removeClass('text-color-3');
        $('#login-btn').addClass('btn-3-inverse').removeClass('btn-3');
        $('.logo').attr('src', 'images/v1.png');
        $('.icon-bar').css('background-color', 'black');
      } else {
        $('#header').removeClass('navbar-scroll');
        $('.subheading').addClass('text-color-3').removeClass('text-color-1');
        $('#login-btn').addClass('btn-3').removeClass('btn-3-inverse');
        $('.logo').attr('src', 'images/v3.png');
        $('.icon-bar').css('background-color', 'white');
      }
    });
  } else {
    $('#header').addClass('navbar-scroll');
    $('.subheading').addClass('text-color-1').removeClass('text-color-3');
    $('#login-btn').addClass('btn-3-inverse').removeClass('btn-3');
    $('.logo').attr('src', 'images/v1.png');
    $('.icon-bar').css('background-color', 'black');
  }
  
  if(path.indexOf('/user') > -1 || path.indexOf('/farms') > -1 || path.indexOf('/admin') > -1 || path.indexOf('/partners') > -1){
		$('body').css('background-color', '#f7fafa');
  }
  
  if(path.indexOf('/learn/how-it-works') > -1){
		$('body').css('background-color', '#f0f2f2');
  }

  $('#i-slider').on('change', function() {
    var val = $(this).val();
    var fee = val * 0.05;
    $('#i-amount').text(val);
    $('#amt-actual').text(val - fee);
    $('#amt-fee').text(fee);
    $('#amt-total').text(val);
    $('#amt-actual-mb').text(val - fee);
    $('#amt-fee-mb').text(fee);
    $('#amt-total-mb').text(val);
  });

  $('#add-btn').on('click', function(e) {
    $('#addTransaction').modal('show');
  });
  
  $('#add-btn').on('click', function(e) {
    $('#addTransaction').modal('show');
  });
  
  $('.approve').on('click', function(e) {
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    $('#addTransaction').modal('show');
    $('#i-user').val(id);
    $('#w-user').text(name);
  });
  
  $('#hti-link').on('click', function(e){
    $('#how-to-invest').modal()
  });
  
  $('#risk-link').on('click', function(e){
    $('#risk').modal()
  });
  
  $('.pledge-cancel-btn').on('click', function(e){
    var id = $(this).attr('data-id');
    if(confirm('Are you sure you want to cancel this pledge?')) {
      $.ajax({
        type: 'GET',
        url: '/pledges/' + id + '/cancel',
        dataType: "json"
      }).done(function(result) {
        if(result) {
          location.reload(true);
        } else {
          alert('Error in cancelling pledge ' + id);
        }
      });
    }
  });
  
  $('#returns-link').on('click', function(e){
    $('#returns').modal()
  });
  
  $('.profile-btn').on('click', function(e){
    if($(this).hasClass('clicked')){
      $(this).removeClass('clicked');
      $('.profile-table').addClass('hide');
    } else {
      var id = $(this).attr('dataTable');
      $('.profile-table').addClass('hide');
      $('.profile-btn').removeClass('clicked');
      $(this).addClass('clicked');
      $('#' + id + '-table').removeClass('hide');
    }
  });

  if ($('#claimupload').length) {
    Dropzone.autoDiscover = false;
    $('#claim-success').hide();
    $('#claim-error').hide();
    var dz = new Dropzone('#claimupload', {
      paramName: 'file',
      maxFilesize: 5,
      acceptedFiles: 'image/*',
      maxFiles: 1,
      dictDefaultMessage: 'Drop files here or click to upload'
    });

    dz.on('success', function(file) {
      $('#claim-success').slideDown();
    });

    dz.on('error', function(file, err) {
      $('#inclaim-error').text(err);
      $('#claim-error').slideDown();
    });
  }

  function calcNapier(amount, view) {
    var cycles = ['0 Months - 6 Months (Cycle 1)',
                  '7 Months - 12 Months (Cycle 2)',
                  '13 Months - 18 Months (Cycle 3)',
                  '19 Months - 24 Months (Cycle 4)',
                  '25 Months - 30 Months (Cycle 5)',
                  '31 Months - 36 Months (Cycle 6)',
                  '37 Months - 42 Months (Cycle 7)',
                  '43 Months - 48 Months (Cycle 8)',
                  '49 Months - 54 Months (Cycle 9)',
                  '55 Months - 60 Months (Cycle 10)'];
    var yields = {
      yield1: [80000,
               100000,
               130000,
               160000,
               160000,
               160000, 
               160000, 
               160000, 
               160000, 
               160000],
      yield2: [100000,
               120000,
               150000,
               180000,
               180000,
               180000,
               180000,
               180000,
               180000,
               180000],
      yield3: [120000,
               150000,
               200000,
               250000,
               250000,
               250000,
               250000,
               250000,
               250000,
               250000]
    };
    var returnMul = [0,0,1,1,1,1,1,1,0,0];
    var mul1 = 333;
    var mul2 = 0.35;

    var area = (amount / 5000) * mul1;
    var total = 0;

    for (var i = 0; i < 10; i++) {
      var yd = yields[view][i];
      var creturn  = Math.round((amount / 6) * returnMul[i]);
      var tyd = Math.round((yd / 10000) * area);
      var sales = Math.round(tyd * mul2);
      var opex = Math.round((19000 / 10000) * area);
      var profit = Math.round(sales - opex - creturn);
      var share = Math.round(profit * 0.3);
      var payOut = Math.round(share + creturn);

      total += payOut;

      if (creturn == 0) creturn = '';

      var tr = '<tr class="lt-data">' +
               '<td class="strong">' + cycles[i].toLocaleString() + '</td>' +
               '<td>' + creturn.toLocaleString() + '</td>' +
               '<td>' + tyd.toLocaleString() + '</td>' +
               '<td>' + sales.toLocaleString() + '</td>' +
               '<td>' + opex.toLocaleString() + '</td>' +
               '<td>' + profit.toLocaleString() + '</td>' +
               '<td>' + share.toLocaleString() + '</td>' +
               '<td>' + payOut.toLocaleString() + '</td>' +
               '</tr>';

      $('#lt-calculator tr:last').after(tr);
    }

    var returns = total - amount;
		var roi = Math.round((returns / amount) * 100);
    var totatr = '<tr class="lt-data">' +
                 '<td colspan="7"></td>' +
                 '<td></td>' +
                 '</tr>' + 
                 '<tr class="lt-data">' +
                 '<td colspan="7" class="lt-lbl">Total</td>' +
                 '<td class="strong">&#x20B1; ' + total.toLocaleString() + '</td>' +
                 '</tr>' + 
                 '<tr class="lt-data">' +
                 '<td colspan="7" class="lt-lbl">Cost</td>' +
                 '<td class="strong">&#x20B1; ' + amount.toLocaleString() + '</td>' +
                 '</tr>' + 
                 '<tr class="success lt-data">' +
                 '<td colspan="7" class="lt-lbl">Returns</td>' +
                 '<td class="strong">&#x20B1; ' + returns.toLocaleString() + '</td>' +
                 '</tr>' +
                 '<tr class="success lt-data">' +
                 '<td colspan="7" class="lt-lbl">ROI Percentage </td>' +
                 '<td class="strong">' + roi.toLocaleString() + '% </td>' +
                 '</tr>';
    $('#lt-calculator tr:last').after(totatr);
    
    $('.help-box').on('click', function(e){
      $('.help-box').css('border-left', '2px solid #f6f6f6');
      $(this).css('border-left', '2px solid #036564');
    });
    
    $('#help-browse').on('click', function(e){
      $('#help-topics').removeClass('mobile-off')
    });
    
    $('.help-submenu').on('click', function(e){
      $(".help-details").hide();
      $("#" + $(this).attr('tag')).removeClass('hide').fadeIn();
    });
    
    if ($('#back-to-top').length) {
      var scrollTrigger = 500, // px
        backToTop = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $('#back-to-top').addClass('show');
          } else {
            $('#back-to-top').removeClass('show');
          }
        };
      backToTop();
      $(window).on('scroll', function () {
        backToTop();
      });
      $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
      });
    }

  }

  var defYield = 'yield2';

  calcNapier(25000, defYield);
  $('#lt-amt-slider').on('change', function() {
    var val = $(this).val();
    $('#lt-amount').text(val.toLocaleString());
    $('.lt-data').remove();
    calcNapier(parseInt(val), defYield);
  });

  $('.ybtn').on('click', function(e) {
    e.preventDefault();
    $('.ybtn').removeClass('btn-1');
    $('.ybtn').addClass('btn-2');
    $(this).removeClass('btn-2');
    $(this).addClass('btn-1');
    var y = $(this).attr('data-y');
    defYield = y;
    $('.lt-data').remove();
    calcNapier(parseInt($('#lt-amt-slider').val()), defYield);
  });

  //Withdraw Page Functions
  $('#withdraw-bank').on('change', function() {
    if(this.value == 'bdo') {
      $('#withdraw-bank-note').removeClass('hide');
    } else {
      $('#withdraw-bank-note').addClass('hide');
    }
  });
  
  //Browse Page Functions
  $('#browse-returns').on('change', function() {
    $('#browse-note').removeClass('hide');
  });
  
  $('#show-previous').on('click', function() {
    console.log("hey")
    $('#browse-note').removeClass('hide');
  });
  
  $('.close').on('click', function (e) {
    e.preventDefault();
    $('#' + $(this).attr('target')).fadeOut()
  });
  
  $('.read-more').on('click', function(e) {
    e.preventDefault();
    if($(this).prev().hasClass('one-long-line')){
      $(this).prev().removeClass('one-long-line');
      $(this).text('Read Less');
    } else {
      $(this).prev().addClass('one-long-line');
      $(this).text('Read More');
    }
  });

});
