;
(function($, window, document) {
  var navSliderObj = function(ele, opt) {
    this.screenWidth = $(window).width();
    this.$element = ele;
    this.default = {
      'transform': 'translate3d(0,0,0)',
      '-webkit-transform': 'translate3d(0,0,0)',
    };

    // 判断宽度的两种取值(百分比和px值)
    if (opt["width"].indexOf("%") != -1) {
      var positionWidth = this.screenWidth * parseFloat(opt.width) / 100 + "px"
      opt.position == "left" ? this.position = positionWidth : this.position = "-" + positionWidth;
    } else {
      opt.position == "left" ? this.position = opt.width : this.position = "-" + opt.width;
    }

    this.option = {
      "width": opt.width,
      'transform': "translate3d(" + this.position + ",0,0)",
      '-webkit-transform': "translate3d(" + this.position + ",0,0)",
    };

    this.setting = $.extend({}, this.default, this.option);
    this.bgStyleObj = {
      'transform': this.setting["transform"],
      '-webkit-transform': this.setting["-webkit-transform"]
    }
    this.styleObj = {
      "width": this.setting["width"],
      'transform': this.setting["transform"],
      '-webkit-transform': this.setting["-webkit-transform"]
    }

    this.isBgMove = opt.bgMove || "";

    this.setDefaultSty = function() {
      var positionWidth = null;
      var init = {
        width: opt.width
      }

      if (opt["width"].indexOf("%") != -1) {
        positionWidth = this.screenWidth * parseFloat(opt.width) / 100 + "px"
        init[opt.position] = "-" + positionWidth;
      } else {
        positionWidth = opt.width;
        init[opt.position] = "-" + positionWidth;
      }
      $(".slider-" + opt.position + "-panel").css(init);
    }

    this.appendMask = function() {
      var maker = "<div class='nav-masker'></div>";
      var navMasker = $(".nav-masker");
      if (navMasker.length == 0) {
        $('.wrap').append(maker);
        this.closeMask;
      }
    }

    this.closeMask = function() {
      var $ele = this.$element;
      var $default = this.default;
      var $isBgMove = this.isBgMove;
      if ($(".nav-masker")) {
        $(".nav-masker").on("click", function() {
          $(this).remove();
          $ele.css($default);
          if ($isBgMove) {
            $(".wrap").css($default);
          }
        })
      }
    }

    this.navSlider = function() {
      this.setDefaultSty();
      var self = this;
      var $ele = this.$element;
      var $bgStyleObj = this.bgStyleObj;
      var $styleObj = this.styleObj;
      var $isBgMove = this.isBgMove;
      $(".slider-" + opt.position + "-btn").click(function() {
        self.appendMask();
        self.closeMask();
        if ($isBgMove) {
          $(".wrap").css($bgStyleObj);
          $ele.css($styleObj)
        } else {
          $ele.css($styleObj)
        }
      })
    }
  }

  $.fn.myNavSlider = function(options) {
    var navSliderCase = new navSliderObj(this, options);
    navSliderCase.navSlider();
  }

})(jQuery, window, document)
