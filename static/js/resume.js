$(document).ready(function () {
    matchContainerHeight("#education-body-container","#education-body-transbox");
    matchContainerHeight("#experience-body-container","#experience-body-transbox");
    alternatingBlocks();
    showNavBar();
    waitForAnimationToFinish("load");
});

$(window).on("resize", function () {
    layoutAdjustForBigerScreen();
    showNavBar();
    alternatingBlocks();
    matchContainerHeight("#education-body-container","#education-body-transbox");
    matchContainerHeight("#experience-body-container","#experience-body-transbox");
    waitForAnimationToFinish("resize");
});


$(window).scroll(function() {
    matchContainerHeight("#education-body-container","#education-body-transbox");
    matchContainerHeight("#experience-body-container","#experience-body-transbox");
    showNavBar();
    waitForAnimationToFinish("scroll");
});

$("form").submit(function () {
    //validateForm();
    var error = "";

    if($("#form-name").val() === "") {
        error += "Your name field is empty<br>";
    } else {}

    if($("#form-email").val() === "") {
        error += "Your email field is empty<br>";
    } else if( isEmail($("#form-email").val()) === false) {
        error += "<p>Your email address is not valid.</p>";
    } else {}

    if($("#form-subject").val() === "") {
        error += "Your subject field is empty<br>";
    } else {}

    if($("#form-message").val() === "") {
        error += "Your message field is empty<br>";
    } else {}

    if(error != "") {
        $("#form-confirmation").html('<div class="alert alert-danger" role="alert"><p><strong>There were some error(s) in your form</strong></p>'+ error +'</div>');
        return false;
    } else {
        return true;
    }
});

$("#button, #media-about, #media-education, #media-experience, #media-contact").click(function() {
    $("#dropdown-list").toggle();
});

$(".dropdown").click(function() {
    $(".dropdown-content").toggle();
    showNavBar();
});

$("#media-portfolio-div").click(function() {
    $(".media-portfolio-dropdown").toggle();
});

$("#about, #education, #experience, #contact").click(function() {
    if(isShowing(".dropdown-content")) {
        $(".dropdown-content").hide();
    } else {}
});

$("#media-about, #media-education, #media-experience, #media-contact").click(function() {
    if(isShowing(".media-portfolio-dropdown")) {
        $(".media-portfolio-dropdown").hide();
    } else {}
});

$(".institution .flip").click (function() {
   $(this).toggleClass("active");
});

$("#experience, media-experience").click(function() {
    $(".timeline ul li").addClass("active");
    //this code will wait for the addClass above to finish - there is a CSS transition tied to that add class and this will wait for that to finish.
    $(".timeline ul li").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   function(e) {
        window.addEventListener("click", callbackFunc);
    });
});


function showNavBar() {
    if ($(document).scrollTop() > 0) {
        $('#myTopnav').addClass("active");
    } else if($(window).width() <= 775) {
             $('#myTopnav').addClass('active');
    } else {
        $('#myTopnav').removeClass('active');

        if(isShowing(".dropdown-content")) {
            $('#myTopnav').addClass('active');
        } else {}
    }
}

function matchContainerHeight(element, element_transbox) {
    var height = $(element).height();
    $(element_transbox).css("height", height);
}

function waitForAnimationToFinish(windowEffect) {
    if($(document).scrollTop() > $(".timeline").offset().top-800) {
        $(".timeline ul li").addClass("active");

        //this code will wait for the addClass above to finish - there is a CSS transition tied to that add class and this will wait for that to finish.
        $(".timeline ul li").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   function(e) {
            window.addEventListener(windowEffect, callbackFunc);
        });
    } else {}
}

function layoutAdjustForBigerScreen() {
    if ($(window).width() > 774) {
        $("#dropdown-list").hide();
        $('#myTopnav').removeClass('active');
    } else if ($(window).width() <= 774) {
        $('#myTopnav').addClass('active');
    } else {}
}

let skills = ['Python', 'JavaScript', 'HTML', 'CSS', 'jQuery',
              'Responsive Web Design', 'Git & GitHub', 'Flask Framework',
              'PHP', 'PostgreSQL', 'MySQL', 'SQLAlchemy', `API's`];
let my_skills = document.getElementById('my-skills');

function alternatingBlocks() {
    /*for(var i = 0; i<skills.length; i++) {
        let figure = document.createElement('figure');
        if (i % 2 === 1) {
            figure.setAttribute('class', 'odd');
        } else {
            figure.setAttribute('class', 'even');
        }
        let para = document.createElement('p', {class: 'skill'});
        let text = document.createTextNode(skills[i]);
        para.appendChild(text);
        figure.appendChild(para);
        my_skills.appendChild(figure);
    }
    */
    if($(window).width() < 850 ) {
        $("#one, #four, #five, #eight, #nine, #twelve").css("background-color", "#404551");
        $("#one, #four, #five, #eight, #nine, #twelve").css("border-color", "#404551");
        $("#two, #three, #six, #seven, #ten, #eleven").css("background-color", "#ff9244");
        $("#two, #three, #six, #seven, #ten, #eleven").css("border-color", "#ff9244");
    } else {
        $("#one, #four, #five, #eight, #nine, #twelve").css("background-color", "");
        $("#one, #four, #five, #eight, #nine, #twelve").css("border-color", "");
        $("#two, #three, #six, #seven, #ten, #eleven").css("background-color", "");
        $("#two, #three, #six, #seven, #ten, #eleven").css("border-color", "");
    }
}


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}




function isShowing(el) {
    if($(el).is(":visible")) {
        return true;
    } else {
        return false;
    }
}


// check if an element is in viewport
function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

var items = document.querySelectorAll(".timeline li");

function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}
