function main() {
    $(window).scroll(function() {
        if ($(document).scrollTop() > 0) {
          $('#nav-bar').addClass('active');
        } else {
          $('#nav-bar').removeClass('active');
        }
    });
}

$(document).ready(main);