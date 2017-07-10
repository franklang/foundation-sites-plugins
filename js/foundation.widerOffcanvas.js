;(function ($, window, undefined){
  
  /**
   * foundation.widerOffcanvas.js plugin
   *
   * Extends "Foundation for Sites" v6.4.1 off-canvas plugin
   * to provide a wider than 250px-standard width off-canvas.
   *
   * [WARNING] Working for right-positioned off-canvas only so far.
   *
   * Required third-party components:
   * - foundation.core.js
   * - foundation.offcanvas.js (and it's own dependencies)
   * - foundation.util.mediaQuery.js
   * - foundation.util.box.js
   *
   * Usage:
   * - Make sure you have a DOM element which width points to the _settings.scss 
   *   "$global-width" variable value.
   *   Has to be an ID. Default: <div id="globalWidth"></div>.
   *
   * $(document).widerOffcanvas({
   *   globalWidth: 'globalWidth',
   *   divider: 2.33333,
   *   triggeringBreakpoint: 'large',
   *   offCanvasID: '#offCanvasRight',
   *   pageID: '#page-wrapper'
   * });
   */

  $.fn.widerOffcanvas = function(options){

    var defaults = {
      globalWidth: 'globalWidth', // ID of a DOM element which width's value points to the _settings.scss "$global-width" variable value.
      triggeringBreakpoint: 'large', // One of Foundation's breakpoint (small, medium, large, ...). Triggers the plugin.
      divider: 2.33333, // value to divide browser window width by. Sets your wider off-canvas width.
      offCanvasID: '#offCanvasRight', // Target offcanvas element ID.
      pageID: '#page-wrapper' // Page ID.
    }

    var settings = $.extend({}, defaults, options);

    /**
     * Destroy function (more of a DOM reset actually...)
     */
    function destroyWiderOffCanvas() {
      $(settings.offCanvasID, settings.pageID).attr('style', '');
    }

    /**
     * Set wider off-canvas specific width
     */
    function setWiderOffCanvasWidth() {
      var globalWidth = Foundation.Box.GetDimensions(document.getElementById(settings.globalWidth));
      var widerOffCanvasWidth = globalWidth.parentDims.width/settings.divider;

      $(settings.offCanvasID).css({
        'width': widerOffCanvasWidth,
        '-webkit-transform': 'translateX(' + widerOffCanvasWidth + 'px)',
        '-ms-transform': 'translateX(' + widerOffCanvasWidth + 'px)',
        'transform': 'translateX(' + widerOffCanvasWidth + 'px)'
      });
    }

    /**
     * Set page indent value (page slides to the opposite side regarding where off-canvas opens)
     */
    function setPageIndentValue() {
      var globalWidth = Foundation.Box.GetDimensions(document.getElementById(settings.globalWidth));
      var pageSideMarginWidth = (globalWidth.parentDims.width - globalWidth.width)/2;
      var widerOffCanvasWidth = globalWidth.parentDims.width/settings.divider;      
      var pageIndentValue = widerOffCanvasWidth - pageSideMarginWidth;
      
      $(settings.offCanvasID).on('opened.zf.offcanvas', function() {
        $(settings.pageID).css({
          '-webkit-transform': 'translateX(-' + pageIndentValue + 'px)',
          '-ms-transform': 'translateX(-' + pageIndentValue + 'px)',
          'transform': 'translateX(-' + pageIndentValue + 'px)'
        });
      }).on('closed.zf.offcanvas', function() {
        $(settings.pageID).attr('style', ' ');
      });
    }

    /**
     * On document ready...
     */
    // [TODO] Add a .hidden class on off-canvas element; remove it on first triggering.
    if (Foundation.MediaQuery.atLeast(settings.triggeringBreakpoint)) {
      setWiderOffCanvasWidth();
      setPageIndentValue();
    }

    /**
     * On window resize...
     */
    $(window).on('resize', function() {
      destroyWiderOffCanvas();
      $(settings.offCanvasID).foundation('close');

      if (Foundation.MediaQuery.atLeast(settings.triggeringBreakpoint)) {
        setWiderOffCanvasWidth();
        setPageIndentValue(); 
      }
    });
  };

}(jQuery, window));
