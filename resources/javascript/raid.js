var _____WB$wombat$assign$function_____ = function(name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    function click_outside(ignore, handler) {
        $(document).on('click', function(event) {
            if (!$(event.target).closest(ignore).length) {
                handler();
            }
        })
    }
    function copyToClipboard(text) {
        const $tempInput = $("<input>");
        $("body").append($tempInput);
        $tempInput.val(text).select();
        document.execCommand("copy");
        $.jGrowl("Copied", {
            theme: 'jgrowl_success'
        });
        $tempInput.remove();
    }
    function spoilerHandler(selector) {
        const $spoilerContent = $(selector).next('.spoiler__main');
        $spoilerContent.toggle(100, function() {
            if ($(this).is(':visible'))
                $(selector).find($('.fas')).removeClass('fa-angle-down').addClass('fa-angle-up');
            else
                $(selector).find($('.fas')).removeClass('fa-angle-up').addClass('fa-angle-down');
        })
    }
    $.fn.shake = function(settings) {
        if (!$(this).is(':animated'))
            return $(this).shakeHelper(settings.times, settings.degrees, false);
        return false;
    }
    $.fn.shakeHelper = function(times, degrees, recursive) {
        if (recursive)
            degrees = degrees - (degrees / times);
        $(this).animate({
            textIndent: degrees
        }, {
            step: function(now) {
                $(this).css('transform', 'rotate(' + now + 'deg)');
            },
            duration: 100
        }, 'linear');
        if (times > 1) {
            $(this).animate({
                textIndent: -degrees
            }, {
                step: function(now) {
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                },
                duration: 100
            }, 'linear');
        }
        if (--times)
            return $(this).shakeHelper(times, degrees, true);
    }
    $(function() {
        const rwdDetect = {
            mobile: $('#sidenav .sidenav__menu').css('display') == "none",
            tablet: $('#panel .panel__user').css('position') == "absolute"
        };
        if (rwdDetect.mobile) {
            $('.h-captcha').attr('data-size', 'compact');
        }
        if (rwdDetect.mobile) {
            const $navBars = $('#sidenav .sidenav__bars');
            $navBars.on('click', function() {
                $('#sidenav .sidenav__menu').fadeToggle('fast');
            })
            click_outside('#sidenav', function() {
                $('#sidenav .sidenav__menu').fadeOut('fast');
            })
        }
        if (rwdDetect.mobile || rwdDetect.tablet) {
            const $dropdownButton = $('.dropdown .dropdown-button');
            $dropdownButton.on('click', function(event) {
                event.preventDefault();
                $(this).closest('.dropdown').find('.dropdown-content').fadeToggle('fast');
            })
            const $dropdownContent = $('.dropdown .dropdown-content');
            click_outside('.dropdown', function() {
                $dropdownContent.fadeOut('fast');
            })
        } else {
            let $dropdownContent;
            const $dropdown = $('.dropdown');
            $dropdown.hover(function() {
                $dropdownContent = $('.dropdown-content', this);
                const position = parseInt($dropdownContent.data("position"), 10) || 0;
                $dropdownContent.stop().css({
                    opacity: 0,
                    marginTop: 8 + position
                }).show().animate({
                    opacity: 1,
                    marginTop: 0 + position
                }, 'fast');
            }, function() {
                $dropdownContent.stop().fadeOut('fast', function() {
                    $(this).hide();
                })
            })
        }
        const $toggleButton = $('.toggle .toggle-button');
        $toggleButton.on('click', function(event) {
            event.preventDefault();
            $(this).closest('.toggle').find('.toggle-content').toggle(100, function() {
                if ($(this).is(':visible'))
                    $(this).parent().find($('.fas')).removeClass('fa-angle-down').addClass('fa-angle-up');
                else
                    $(this).parent().find($('.fas')).removeClass('fa-angle-up').addClass('fa-angle-down');
            })
        })
        const $toggleContent = $('.toggle .toggle-content');
        click_outside('.toggle', function() {
            $toggleContent.hide(100, function() {
                $(this).parent().find($('.fas')).removeClass('fa-angle-up').addClass('fa-angle-down');
            })
        })
        if (!rwdDetect.mobile) {
            const $quickSearch = $('#quick-search');
            const $quickSearchButton = $('#sidenav .sidenav__quick-search');
            $quickSearchButton.on('click', function(event) {
                event.preventDefault();
                $quickSearch.slideDown('fast');
            })
            const $quickSearchClose = $('#quick-search .quick-search__close');
            $quickSearchClose.on('click', function(event) {
                $quickSearch.slideUp('fast');
            })
            click_outside('#sidenav .sidenav__quick-search, #quick-search', function() {
                $quickSearch.slideUp('fast');
            })
        }
    })
    const $stylizer = $('.stylizer');
    $stylizer.on('click', function(event) {
        event.preventDefault();
        const modalSelector = $(this).data('selector');
        $(modalSelector).modal({
            fadeDuration: 250,
            keepelement: true
        })
        return false;
    })
    const $wrapper = $('.wrapper');
    $(document).on('input', '#stylizer-select input[name="wrapper"]', function() {
        $wrapper.css('width', $(this).val() + "%");
        Cookie.set('wrapper_width', $(this).val());
    })
    const $optionsTheme = $('.stylizer-select__options select');
    $optionsTheme.change(function() {
        const $textLogo = $('.logo__text');
        const $imageLogo = $('.logo__image');
        switch ($(this).val()) {
        case "anime":
            $textLogo.hide();
            $imageLogo.show();
            changeColorLogo(Cookie.get('theme_color') || 'default', 'anime');
            Cookie.set('logo_style', 'anime');
            break;
        case "new":
            $textLogo.hide();
            $imageLogo.show();
            changeColorLogo(Cookie.get('theme_color') || 'default', 'new');
            Cookie.set('logo_style', 'new');
            break;
        case "textual":
            $textLogo.show();
            $imageLogo.hide();
            Cookie.set('logo_style', 'textual');
            break;
        }
    })
    const wrapperWidthValue = Cookie.get('wrapper_width');
    if (wrapperWidthValue) {
        const $wrapperWidthInput = $('#stylizer-select input[name="wrapper"]');
        $wrapperWidthInput.val(wrapperWidthValue);
    }
    const logoStyle = Cookie.get('logo_style');
    if (logoStyle && $.inArray(logoStyle, ['anime', 'new', 'textual']) != -1) {
        const $logoStyleInput = $('#stylizer-select select[name="logo_style"]');
        $logoStyleInput.find('option[value="' + logoStyle + '"]').prop('selected', true);
    }
    const $forumRow = $('table.forums__bit tr');
    $forumRow.mouseenter(function() {
        $('.forum_on i', this).shake({
            times: 3,
            degrees: 4
        })
    })
    const $modalImage = $('.modal_image');
    $modalImage.on('click', function(event) {
        event.preventDefault();
        const imageSrc = $(this).data('image-modal');
        let imageOriginalSrc = $(this).data('image-modal-original');
        if (!imageOriginalSrc)
            imageOriginalSrc = imageSrc;
        if ($(this).data('image-modal-safe'))
            imageOriginalSrc = "misc.php?action=safelinks&url=" + encodeURIComponent(imageOriginalSrc);
        let $imageModal = $('.modal[data-image-modal="' + imageSrc + '"]');
        if (!$imageModal.length) {
            $imageModalContainer = $('<div class="modal image-modal-content" style="display:none" data-image-modal="' + imageSrc + '">' + '<img src="' + imageSrc + '">' + '<a href="' + imageOriginalSrc + '" class="image-modal-original rounded" target="_blank">Open original</a>' + '</div>');
            $imageModal = $imageModalContainer.appendTo('body');
        }
        $imageModal.modal({
            fadeDuration: 250,
            keepelement: true
        });
        $imageModal.find('img').on('load', function() {
            $imageModal.height(this.height);
        })
    })
    let tooltip;
    const $elementWithTooltip = $('[data-tooltip]');
    $elementWithTooltip.hover(function() {
        const tooltipData = $(this).data('tooltip');
        tooltip = $(this).next('.tooltip');
        if (!tooltip.length)
            tooltip = $('<span class="tooltip">' + tooltipData + '</span>').insertAfter($(this));
        tooltip.stop().fadeIn(200);
    }, function() {
        tooltip.stop().fadeOut(200);
    })
    $('.hide-parent-onclick').each(function() {
        const $parent = $(this).parent();
        if (!Cookie.get('hide-' + $parent.attr('id')))
            $parent.fadeIn(500);
    })
    const $hideParentButton = $('.hide-parent-onclick');
    $hideParentButton.on('click', function() {
        const $parent = $(this).parent();
        Cookie.set('hide-' + $parent.attr('id'), 1);
        $parent.hide();
    })

}
/*
     FILE ARCHIVED ON 17:19:07 Jan 30, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:42:31 Mar 07, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1140.192
  exclusion.robots: 0.338
  exclusion.robots.policy: 0.324
  RedisCDXSource: 0.859
  esindex: 0.011
  LoadShardBlock: 1117.723 (3)
  PetaboxLoader3.datanode: 1306.148 (5)
  CDXLines.iter: 16.395 (3)
  load_resource: 336.462 (2)
  PetaboxLoader3.resolve: 122.887 (2)
*/
