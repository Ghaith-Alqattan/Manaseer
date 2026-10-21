// scroll
if (indexIn == 0) {
    $('.index-main-header .bg-light').addClass('new-header-background inner-header');
    $("header .navbar-brand img").attr("src", "images/white-logo.svg");
}
if ($(window).width() > 992 && indexIn == 1) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.index-main-header .bg-light').addClass('new-header-background');
            $("header .navbar-brand img").attr("src", "images/white-logo.svg");
            $("header .lang-icon img").attr("src", "images/lang-scroll.svg"); // second scroll icon
            $("header .search-icon img").attr("src", "images/search-scroll.svg"); // second scroll icon
            $("header .home-icon img").attr("src", "images/home-icon-scroll.svg"); // second scroll icon
            $("header .header-right-menu-icon img").attr(
                    "src",
                    "images/menu-scroll.svg"
                    ); // second scroll icon
        } else {
            $('.index-main-header .bg-light').removeClass('new-header-background');
            $("header .navbar-brand img").attr("src", "images/logo.svg");
            $("header .lang-icon img").attr("src", "images/lang-icon.svg"); // second scroll icon
            $("header .home-icon img").attr("src", "images/home-icon.svg"); // second scroll icon
            $("header .search-icon img").attr("src", "images/search-icon.svg"); // second scroll icon
            $("header .header-right-menu-icon img").attr(
                    "src",
                    "images/menu-icon.svg"
                    ); // second scroll icon
        }
    });
}
// hover change image

$(function () {

    var image = $('.second-sec-left-right-img').find("img").attr("src");
    $(".index-boxes-hover-data li").mouseover(function () {
        var currentImage = $(this).attr("data-img");
        $(this).parents(".second-sec-left-right-img").find("img").attr("src", currentImage);
        $(this).parents(".second-sec-left-right-img").find(".overlay").hide();
    });
    $(".index-boxes-hover-data li").mouseout(function () {
        var originalClass = $(this).parents('.index-boxes-hover-data').attr("data-className");
        var original = $(this).parents('.' + originalClass).find(".def-img").attr("data-default");
        console.log(originalClass);
        console.log(original);
        $(this).parents('.' + originalClass).find("img").attr("src", original);
        $(this).parents(".second-sec-left-right-img").find(".overlay").show();
    });
});
// menu
var open = false;
$('#toggle').click(function (e) {
    e.preventDefault();
    if (!open) {
        showMenu();
    } else {
        hideMenu();
    }
});
$('.cont-navRight nav a').click(function () {
    hideMenu();
});
function hideMenu() {
    $('.cont-navRight nav').removeClass('menu-left-open');
    $('.big-div-push').removeClass('menu-push-right');
    open = false;
}
;
function showMenu() {
    $('.cont-navRight nav').addClass('menu-left-open');
    $('.big-div-push').addClass('menu-push-right');
    open = true;
}
;
$(document).on('click', function (e) {
    var container = $("#toggle");
    if (!$(e.target).closest(container).length) {
        hideMenu();
    }
});
// end menu
$('.index-first-section .carousel').flickity({
    pageDots: false,
    draggable: false,
    prevNextButtons: false,
    arrowShape: {
        x0: 15,
        x1: 60, y1: 35,
        x2: 60, y2: 35,
        x3: 60
    }
});
// ifram index
$(document).on('click', '.js-videoPoster', function (ev) {
    ev.preventDefault();
    var $poster = $(this);
    var $wrapper = $poster.closest('.js-videoWrapper');
    videoPlay($wrapper);
});
// play the targeted video (and hide the poster frame)
function videoPlay($wrapper) {
    var $iframe = $wrapper.find('.js-videoIframe');
    var src = $iframe.data('src');
    // hide poster
    $wrapper.addClass('videoWrapperActive');
    // add iframe src in, starting the video
    $iframe.attr('src', src);
}

// search
(function ($) {

    $('#search-button').on('click', function (e) {
        if ($('#search-input-container').hasClass('hdn')) {
            e.preventDefault();
            $('#search-input-container').removeClass('hdn')
            return false;
        }
    });
    $('#hide-search-input-container').on('click', function (e) {
        e.preventDefault();
        $('#search-input-container').addClass('hdn')
        return false;
    });
})(jQuery);
if ($(window).width() > 992) {
// product background image
    $service = $('.product-box-section-big');
    $('.greay-box').hover(function () {
        $service.css('background-image', 'url(' + $(this).attr("data-uri") + ')');
    }, function () {
        $service.css('background-image', '');
    });
// product background image
}


$('.policy-dismiss').click(function () {
    $('.index-PrivacyCookiePolicy').hide();
});
//$(".menu-left-open").parents("header").find('.navbar').addClass("new-menu-right-pos");
$(window).on('shown.bs.modal', function () {
    $('.modal-right').modal('show');
    $(".btn-order").hide();
    $(".modal-open").attr("style", "padding-right:0 !important;");
});
$(window).on('hidden.bs.modal', function () {
    $('.modal-right').modal('hide');
    $(".btn-order").show();
});
//multiple orders
$('.add-order').on('click', function (e) {
    var company = $('#companySelect').children("option:selected").text();
    var product = $('#productSelect').children("option:selected").text();
    var qty = $('#qty').val();
    var order_history = company + ": " + product + " - " + qty + ", ";
    var htmlInput = '<input name="orders[]" type="hidden" id="form_allOrderes" value="' + order_history + '"/>';
    $('.ordersInputs').append(htmlInput);
    $(".multiple-orders").append(order_history);
    $('#companySelect').val("");
    $('#productSelect').val("");
    $('#qty').val("");
});
var homeDomain = window.parent.document.location.protocol + '//' + document.domain + '/Home';
$(document).on("click", "#submitFormButton", function (e) {
    var company = $('#companySelect').children("option:selected").text();
    var product = $('#productSelect').children("option:selected").text();
    var productVal = $('#productSelect').children("option:selected").val();
    var qty = $('#qty').val();
    var Name = $('#form_name').val();
    var email = $('#form_email').val();
    var tel = $('#form_tel').val();
    var allOrderes = $('#form_allOrderes').val();
//    alert(Boolean(productVal));
//    alert(productVal);
//    alert(Boolean(allOrderes));
    if (productVal == '' && !Boolean(allOrderes)) {

        var error = "Please Choose Product";
        $(".reqError").html(error);
        $(".reqError").removeClass("d-none");

    } else if (Name == '') {
        var error = "Please Enter Your Name";
        $(".reqError").html(error);
        $(".reqError").removeClass("d-none");
    } else if (email == '') {
        var error = "Please Enter Your Email";
        $(".reqError").html(error);
        $(".reqError").removeClass("d-none");
    } else if (tel == '') {
        var error = "Please Enter Your Phone Number";
        $(".reqError").html(error);
        $(".reqError").removeClass("d-none");

    } else {

        var order_history = company + ": " + product + " - " + qty + ", ";
        var htmlInput = '<input name="orders[]" type="hidden" id="form_allOrderes" value="' + order_history + '"/>';
        var formData = $("#orderNowForm").serialize();

        $('.ordersInputs').append(htmlInput);
        $.ajax({
            type: "GET",
            url: homeDomain + "/getData.php",
            dataType: 'json',
            data: "type=submitOrderNowform&" + formData + "&jsoncallback=?",
            async: false,
            success: function (data) {
                location.reload();
                preSubmit();
            }
        });
//        $('#orderButtonForm').submit();
    }
//    else {
//        var error = "Please Choose Product";
//        $(".reqError").html(error);
//        $(".reqError").removeClass("d-none");
//    }



});

function preSubmit() {
    var company = $('#companySelect').children("option:selected").text();
    var product = $('#productSelect').children("option:selected").text();
    var qty = $('#qty').val();
    var order_history = company + ": " + product + " - " + qty + ", ";
    var htmlInput = '<input name="orders[]" type="hidden" id="form_allOrderes" value="' + order_history + '"/>';
    $('.ordersInputs').append(htmlInput);
    $(".multiple-orders").append(order_history);
    $('#companySelect').val("");
    $('#productSelect').val("");
    $('#qty').val("");
}

//$(document).on('DOMNodeInserted', function (e) {
//$("#map_inner div a").text("");    
//});
