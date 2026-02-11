$(document).ready(function () {

    $('.preloader').fadeOut();

    /******************** Nav JS ********************/

    $('.menu-btn').on('click', function () {
        $('.header').toggleClass('is-open');

        // ✅ ONLY MOBILE → BODY SCROLL LOCK
        if (window.innerWidth <= 991) {
            $('body').toggleClass('no-scroll');
        }
    });

    $('.close-btn').on('click', function () {
        $('.header').removeClass('is-open');

        // ✅ ONLY MOBILE → REMOVE SCROLL LOCK
        if (window.innerWidth <= 991) {
            $('body').removeClass('no-scroll');
        }
    });


    let lastScroll = 0;
    const header = document.querySelector('.header');

    // 🔥 INITIAL STATE → HEADER VISIBLE
    header.classList.add('show');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // MENU OPEN → FORCE SHOW
        if (header.classList.contains('is-open')) {
            header.classList.add('show');
            lastScroll = currentScroll;
            return;
        }

        // SCROLL DOWN → HIDE
        if (currentScroll > lastScroll && currentScroll > 80) {
            header.classList.remove('show');
        }

        // SCROLL UP → SHOW
        if (currentScroll < lastScroll) {
            header.classList.add('show');
        }

        lastScroll = currentScroll;
    });




    /******************** Video Play JS ********************/


    // const $wrapper = $('.video-wrapper');
    // const $playBtn = $('.play-button');
    // const $thumb = $('.video-thumb');
    // const $video = $('.video-element');

    // function resetBtn() {
    //     $playBtn.css({
    //         left: '50%',
    //         top: '50%',
    //         transform: 'translate(-50%, -50%)'
    //     });
    // }

    // resetBtn();

    // /* follow cursor only when NOT playing */
    // $wrapper.on('mousemove', function (e) {
    //     if ($wrapper.hasClass('is-playing')) return;

    //     const offset = $wrapper.offset();
    //     const w = $wrapper.outerWidth();
    //     const h = $wrapper.outerHeight();
    //     const btnHalf = $playBtn.outerWidth() / 2;

    //     let x = e.pageX - offset.left;
    //     let y = e.pageY - offset.top;

    //     x = Math.max(btnHalf, Math.min(x, w - btnHalf));
    //     y = Math.max(btnHalf, Math.min(y, h - btnHalf));

    //     $playBtn.css({
    //         left: x,
    //         top: y,
    //         transform: 'translate(-50%, -50%)'
    //     });
    // });

    // /* leave → center */
    // $wrapper.on('mouseleave', function () {
    //     if (!$wrapper.hasClass('is-playing')) {
    //         resetBtn();
    //     }
    // });

    // /* ▶ PLAY */
    // $playBtn.on('click', function (e) {
    //     e.stopPropagation();

    //     $wrapper.addClass('is-playing');

    //     $thumb.hide();
    //     $playBtn.hide();

    //     $video
    //         .show()
    //         .css('pointer-events', 'auto')[0]
    //         .play();
    // });

    // /* ⏸ PAUSE */
    // $video.on('click', function () {
    //     this.pause();

    //     $(this).hide();
    //     $thumb.show();
    //     $playBtn.show();

    //     $wrapper.removeClass('is-playing');
    //     resetBtn();
    // });



    $('.video-wrapper').each(function () {
        const $wrapper = $(this);
        const $playBtn = $wrapper.find('.play-button');
        const $thumb = $wrapper.find('.video-thumb');
        const $video = $wrapper.find('.video-element');

        function resetBtn() {
            $playBtn.css({
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            });
        }

        function stopAllVideos() {
            $('.video-wrapper').each(function () {
                const $w = $(this);
                const $v = $w.find('.video-element')[0];

                if ($v && !$v.paused) {
                    $v.pause();
                }

                $w.removeClass('is-playing');
                $w.find('.video-element').hide();
                $w.find('.video-thumb').show();
                $w.find('.play-button').show().css({
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                });
            });
        }

        resetBtn();

        /* mouse move */
        $wrapper.on('mousemove', function (e) {
            if ($wrapper.hasClass('is-playing')) return;

            const offset = $wrapper.offset();
            const w = $wrapper.outerWidth();
            const h = $wrapper.outerHeight();
            const btnHalf = $playBtn.outerWidth() / 2;

            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top;

            x = Math.max(btnHalf, Math.min(x, w - btnHalf));
            y = Math.max(btnHalf, Math.min(y, h - btnHalf));

            $playBtn.css({
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)'
            });
        });

        $wrapper.on('mouseleave', function () {
            if (!$wrapper.hasClass('is-playing')) resetBtn();
        });

        /* ▶ PLAY */
        $playBtn.on('click', function (e) {
            e.stopPropagation();

            // 🔴 stop all other videos
            stopAllVideos();

            // ▶ play current
            $wrapper.addClass('is-playing');
            $thumb.hide();
            $playBtn.hide();

            $video.show()[0].play();
        });

        /* ⏸ PAUSE */
        $video.on('click', function () {
            this.pause();

            $video.hide();
            $thumb.show();
            $playBtn.show();

            $wrapper.removeClass('is-playing');
            resetBtn();
        });
    });


    /******************** Healthcare detail page Thumbnail slider JS ********************/

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav',
        dots: false,
        arrows: true,
        prevArrow: '<button class="slick-prev custom-arrow" aria-label="Previous"></button>',
        nextArrow: '<button class="slick-next custom-arrow" aria-label="Next"></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: true,
                dots: false
            }
        }]
    });
    $('.slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true,
    });
    $('.slick-prev-custom').on('click', function () {
        $('.slider-for').slick('slickPrev');
    });

    $('.slick-next-custom').on('click', function () {
        $('.slider-for').slick('slickNext');
    });

    /******************** Events Banner slider JS ********************/

    $('.single-item').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2000
    });

    /******************** Events Load more JS ********************/

    // $(document).ready(function () {

    //     const initialShow = 9;
    //     const loadMoreCount = 3;

    //     const $items = $(".other_project_blog");
    //     const $loadMore = $("#loadMore");
    //     const $loadMoreText = $("#loadMore span");

    //     // Show first 6 items on load
    //     $items.slice(0, initialShow).fadeIn(500);

    //     // Load more click
    //     $loadMore.on("click", function (e) {
    //         e.preventDefault();

    //         const hiddenItems = $items.filter(":hidden").slice(0, loadMoreCount);

    //         hiddenItems
    //             .css({
    //                 opacity: 0,
    //                 transform: "translateY(20px)"
    //             })
    //             .show()
    //             .animate({
    //                 opacity: 1
    //             }, 400)
    //             .css("transform", "translateY(0)");

    //         // If no more items left
    //         if ($items.filter(":hidden").length === 0) {
    //             $loadMoreText.text("No More Events");
    //             $loadMore.addClass("noContent").css("pointer-events", "none");
    //         }
    //     });

    // });

    $(document).ready(function () {

        let initialShow, loadMoreCount;

        function setValues() {
            const w = $(window).width();

            if (w <= 767) {
                // Mobile
                initialShow = 8;
                loadMoreCount = 2;
            } else if (w <= 991) {
                // Tablet
                initialShow = 8;
                loadMoreCount = 2;
            } else {
                // Desktop
                initialShow = 9;
                loadMoreCount = 3;
            }
        }

        setValues();

        const $items = $(".other_project_blog");
        const $loadMore = $("#loadMore");
        const $loadMoreText = $("#loadMore span");

        // Hide all items first
        $items.hide();

        // Show initial items
        $items.slice(0, initialShow).fadeIn(500);

        // Load more click
        $loadMore.on("click", function (e) {
            e.preventDefault();

            const hiddenItems = $items.filter(":hidden").slice(0, loadMoreCount);

            hiddenItems
                .css({
                    opacity: 0,
                    transform: "translateY(20px)"
                })
                .show()
                .animate({
                    opacity: 1
                }, 400)
                .css("transform", "translateY(0)");

            if ($items.filter(":hidden").length === 0) {
                $loadMoreText.text("No More Events");
                $loadMore
                    .addClass("noContent")
                    .css("pointer-events", "none");
            }
        });

    });



});

/******************** Expertise animation JS ********************/


document.addEventListener("DOMContentLoaded", () => {

    /* ================== ALL CONFIG GROUPS ================== */
    const GROUPS = [{
            section: ".expertise-bottom",
            color: "rgb(0,23,255)", // blue
            svgs: [{
                    svgId: "resultSVG",
                    img: "./assets/images/creative.png",
                    detect: (r, g, b) => b > 110 && b > r + 35 && b > g + 35
                },
                {
                    svgId: "resultSVG2",
                    img: "./assets/images/pm.png",
                    detect: (r, g, b) => b > 130 && b > r + 25 && b > g + 25
                },
                {
                    svgId: "resultSVG3",
                    img: "./assets/images/experimental.png",
                    detect: (r, g, b) => b > 150 && r < 50 && g < 50
                },
                {
                    svgId: "resultSVG4",
                    img: "./assets/images/collaborate-solutions.png",
                    detect: (r, g, b) => b > 120 && b > r + 30 && b > g + 30
                }
            ]
        },
        {
            section: ".creative_blog_cont",
            color: "#ffffff", // white
            svgs: [{
                    svgId: "resultSVG5",
                    img: "./assets/images/creative.png",
                    detect: (r, g, b) => b > 110 && b > r + 35 && b > g + 35
                },
                {
                    svgId: "resultSVG6",
                    img: "./assets/images/pm.png",
                    detect: (r, g, b) => b > 130 && b > r + 25 && b > g + 25
                },
                {
                    svgId: "resultSVG7",
                    img: "./assets/images/experimental.png",
                    detect: (r, g, b) => b > 150 && r < 50 && g < 50
                },
                {
                    svgId: "resultSVG8",
                    img: "./assets/images/collaborate-solutions.png",
                    detect: (r, g, b) => b > 120 && b > r + 30 && b > g + 30
                }
            ]
        }
    ];

    /* ================== SVG BUILDER ================== */
    function buildSVG(config, color, force = false) {
        const svg = document.getElementById(config.svgId);
        if (!svg) return;

        if (svg.dataset.done && !force) {
            svg.classList.remove("animate", "fast");
            void svg.offsetWidth;
            svg.classList.add("fast", "animate");
            return;
        }

        svg.innerHTML = "";
        svg.classList.remove("animate", "fast");

        const img = new Image();
        img.src = config.img;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const data = ctx.getImageData(0, 0, img.width, img.height).data;
            const svgW = svg.viewBox.baseVal.width;
            const svgH = svg.viewBox.baseVal.height;

            for (let y = 0; y < img.height; y++) {
                let inLine = false;
                let startX = 0;

                for (let x = 0; x < img.width; x++) {
                    const i = (y * img.width + x) * 4;
                    if (config.detect(data[i], data[i + 1], data[i + 2])) {
                        if (!inLine) {
                            inLine = true;
                            startX = x;
                        }
                    } else if (inLine) {
                        drawLine(startX, x, y);
                        inLine = false;
                    }
                }
                if (inLine) drawLine(startX, img.width, y);
            }

            function drawLine(x1, x2, y) {
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                const yPos = Math.round((y / img.height) * svgH);

                rect.setAttribute("x", Math.round((x1 / img.width) * svgW));
                rect.setAttribute("y", yPos);
                rect.setAttribute("width", Math.ceil(((x2 - x1) / img.width) * svgW));
                rect.setAttribute("height", 2);
                rect.setAttribute("fill", color);
                rect.setAttribute("shape-rendering", "crispEdges");

                rect.classList.add("line");
                rect.style.animationDelay = `${yPos * 0.006}s`;

                svg.appendChild(rect);
            }

            svg.dataset.done = "true";
            requestAnimationFrame(() => svg.classList.add("animate"));
        };
    }

    /* ================== OBSERVERS ================== */
    GROUPS.forEach(group => {
        const section = document.querySelector(group.section);
        if (!section) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                group.svgs.forEach(cfg => buildSVG(cfg, group.color));
                observer.disconnect();
            }
        }, {
            threshold: 0.2
        });

        observer.observe(section);
    });

    /* ================== HOVER REPLAY ================== */
    document.querySelectorAll(".exp-item a").forEach(anchor => {
        const svg = anchor.querySelector("svg");
        if (!svg) return;

        GROUPS.forEach(group => {
            const cfg = group.svgs.find(c => c.svgId === svg.id);
            if (cfg) {
                anchor.addEventListener("mouseenter", () => {
                    buildSVG(cfg, group.color, true);
                });
            }
        });
    });

});

/* ================== Our Work detail - Other Projects slider ================== */


$(document).ready(function () {

    function setProgressBar(slick, currentSlide) {
        var totalSlides = slick.slideCount;
        var percent = ((currentSlide + 1) / totalSlides) * 100;
        $('.other-project-progress .progress-bar').css('width', percent + '%');
    }

    function initOtherProjectSlider() {

        if ($(window).width() < 767) {

            if (!$('.other-project-slider').hasClass('slick-initialized')) {

                $('.other-project-slider')
                    .on('init', function (event, slick) {
                        setProgressBar(slick, 0);
                    })
                    .on('afterChange', function (event, slick, currentSlide) {
                        setProgressBar(slick, currentSlide);
                    })
                    .slick({
                        slidesToShow: 1.1,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false,
                        infinite: false,
                        mobileFirst: true,
                        adaptiveHeight: true
                    });
            }

        } else {

            if ($('.other-project-slider').hasClass('slick-initialized')) {
                $('.other-project-slider').slick('unslick');
                $('.other-project-progress .progress-bar').css('width', '0%');
            }
        }
    }

    initOtherProjectSlider();
    $(window).on('resize', initOtherProjectSlider);

});