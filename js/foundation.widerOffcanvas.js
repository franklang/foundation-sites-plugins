;(function ($, window, undefined){
  
  /**
   * foundation.widerOffcanvas.js plugin
   *
   * Extends "Foundation for Sites" v6.4.1 off-canvas plugin
   * to provide a wider than 250px-standard width off-canvas.
   *
   * [WARNING] Tested for right-positioned off-canvas only so far.
   *
   * Required third-party components:
   * - foundation.core.js
   * - foundation.offcanvas.js
   * - foundation.util.box.js
   *
   * Usage:
   * $(document).widerOffcanvas({
   *   triggeringBreakpoint: 'medium',
   *   offCanvasID: '#offCanvasRight',
   *   pageID: '#page-wrapper'
   * });
   */

  $.fn.widerOffcanvas = function(options){

    var defaults = {
      triggeringBreakpoint: 'medium', // one of Foundation's breakpoint (small, medium, large, ...)
      offCanvasID: '#offCanvasRight', // target offcanvas element ID
      pageID: '#page-wrapper' // page ID
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
      var globalWidth = Foundation.Box.GetDimensions(document.getElementById('globalWidth'));
      var pageSideMarginWidth = (globalWidth.parentDims.width - globalWidth.width)/2;
      var baseWiderOffCanvasWidth = globalWidth.parentDims.width/2.33333;
      var widerOffCanvasWidth = pageSideMarginWidth + baseWiderOffCanvasWidth;
      console.log(pageSideMarginWidth + ', ' + baseWiderOffCanvasWidth + ', ' + widerOffCanvasWidth);
      
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
      var globalWidth = Foundation.Box.GetDimensions(document.getElementById('globalWidth'));
      var baseWiderOffCanvasWidth = globalWidth.parentDims.width/2.33333;
      
      $(settings.offCanvasID).on('opened.zf.offcanvas', function() {
        $(settings.pageID).css({
          '-webkit-transform': 'translateX(-' + baseWiderOffCanvasWidth + 'px)',
          '-ms-transform': 'translateX(-' + baseWiderOffCanvasWidth + 'px)',
          'transform': 'translateX(-' + baseWiderOffCanvasWidth + 'px)'
        });
      }).on('closed.zf.offcanvas', function() {
        $(settings.pageID).attr('style', ' ');
      });
    }

    /**
     * On document ready...
     */
    if (Foundation.MediaQuery.atLeast(settings.triggeringBreakpoint)) {
      setWiderOffCanvasWidth();
      setPageIndentValue();
    }    

    /**
     * On window resize...
     */
    $(window).on('resize', function() {
      destroyWiderOffCanvas();
      
      var globalWidth = Foundation.Box.GetDimensions(document.getElementById('globalWidth'));

      if (Foundation.MediaQuery.atLeast(settings.triggeringBreakpoint)) {
        setWiderOffCanvasWidth();
        setPageIndentValue();
      }
    });
  };

}(jQuery, window));
