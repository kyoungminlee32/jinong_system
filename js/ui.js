/*
 * JINONG UI Script
 */

function dataTabFixBody(){
	$('.data-table').each(function(){
		var $this = $(this);
		var $parent = $this.parents('.wrapDataTable').length;
		if ($parent < 1) {
			$this.wrap('<div class="wrapDataTable"></div>');
		}else{
			$this.parents('.wrapDataTable').scrollLeft(0);
		}
		
		if ($this.is('[data-fixed-body]')) {
			var $fixEq = $this.attr('data-fixed-body');
			$this.find('tr').each(function(){
				var num = 0;
				var num2 = 0;
				$(this).children('td,th').eq($fixEq).addClass('fixLast');
				for (var i = 0; i <= $fixEq; i++) {
					$(this).children('td').eq(num++).addClass('tdFixed');
				}
				for (var j = 0; j <= $fixEq; j++) {
					$(this).children('th').eq(num2++).addClass('thFixed');
				}
			});
			$('.tdFixed,.thFixed').each(function(){
				var $num2 = Math.round($(this).position().left);
				var $thisIndex = $(this).index();
				if ($thisIndex == 0) {
					$(this).css('left','0')
				}
				else{
					$(this).css('left',($num2) - ($thisIndex * 2 + 4))
				}
			});
		}
	});
}



//data table 스크롤 이벤트
function dataTableScroll() {
	$('.wrapDataTable').each(function(){
		var $this = $(this);
		//var table = $this.children('.data-table');
		$this.scroll(function(){
			var $thisTop = $this.scrollTop();
			var $childHeight = $this.children('.data-table');
			//console.log($thisTop)
			//console.log($thisTop,$childHeight.height() - $this.height())
			if($thisTop > $childHeight.height() - $this.height()){
				table.page.loadMore()
				dataTabFixBody()
			}
		});
	})
	
}

//data tables 공통 초기화
$.extend($.fn.dataTable.defaults, {
	searching: false,
	ordering:  false,
	"pageLength": 15,
	"language": {
		"info": "전체 (_MAX_)",
	}
});

//주제별 분석 앵커 이동
function anchorWrap() {
	$('.anchorListdWrap').each(function(){
		$('.anchorListdWrap .tiele_area').attr('tabindex','0');
		var $winHeight = $(window).outerHeight();
		var $heightHeader = $('.header').outerHeight();
		var $heightTab = $('.anchorSubject').outerHeight();
		var $heightTab = $('.anchorListd').outerHeight();
		$('.anchorContWrap .subject_anchorCont:last-child').css('min-height',$winHeight - ($heightHeader + $heightTab));
	});

	$('.anchorSubject a').click(function(){
		var $this = $(this);
		var $thisAttr = $this.attr('data-anchor-title');
		$('.subject_anchorCont').each(function(){
			var $thisTarget = $(this);
			var $targetPo = $(this).offset().top;
			//var $headerOffset = $('.header').position().top;
			var $heightHeader = $('.header').outerHeight();
			var $heightTab = $('.anchorSubject').outerHeight();
			var $hightM = $heightHeader + $heightTab;
			if ($(this).attr('data-anchor-cont') == $thisAttr ) {
				$(this).addClass('active');
				$('html, body').stop().animate({scrollTop:$targetPo - $hightM},400,function(){
					$('.anchorSubject > li').removeClass('selected');
					$this.parent('li').addClass('selected');
					$thisTarget.find('h3.tit').focus();
				});
			}
			//console.log($targetPo)
		});
	});

	$('.anchorListdWrap').each(function(){
		$(window).on('scroll',function(){
			$('.subject_anchorCont').each(function(){
				///var $headerOffset = $('.header').position().top;
				var $targetPo = $(this).offset().top;
				var $heightHeader = $('.header').outerHeight();
				var $heightTab = $('.anchorSubject').outerHeight();
				var $hightM = $heightHeader + $heightTab;
				var $thisCur = $targetPo - $hightM ;
				var $scrollTop = $('html, body').scrollTop();
				var $thisAttr = $(this).attr('data-anchor-cont');
				var $targetAttr = $('anchorSubject a').attr('data-anchor-title');
				//console.log($thisCur,$scrollTop)
				if ($thisCur <= $scrollTop ) {
					$('.anchorSubject > li > a').each(function(){
						if ($(this).attr('data-anchor-title') == $thisAttr ) {
							$('.anchorSubject > li').removeClass('selected');
							$('.anchorSubject > li a').attr('aria-selected','false');
							$(this).parent('li').addClass('selected');
							$(this).attr('aria-selected','true');
						}
					});
					//$(this).addClass('active');
					//console.log($targetPo)
				}
			});
		});
	});
}

// popup
var popup = (function(){
	var Gbutton;
	var open = function(layer, button){
		var $popupcount = $('body').find('.popuopWrap.active').length;
		var _this = this;
		_this.layer = $(layer);
		Gbutton = _this.button =$(button);
		//$('.wrapper').attr('aria-hidden','true');
		_this.layer.show().css('z-index',1001 + $popupcount);
		$('body').css('overflow','hidden');
		setTimeout(function(){
			_this.layer.addClass('active')
		},1)
	};
	var close = function(layer,button){
		var _this = this;
		var $popupcount = $('body').find('.popuopWrap.active').length;
		_this.layer = $(layer);
		_this.button = Gbutton;
		//$('.wrapper').removeAttr('aria-hidden');
		if ($popupcount < 2){
			$('body').css('overflow','');
		}
		_this.layer.removeClass('active').hide()
		_this.button.focus();
	};
	return{
		close : close,
		open : open
	};
})();

$(document).ready(function(){
	$('.btn_navi').click(function(){
		$('.container').toggleClass('naviHide');
	});

	$('.subNaviList > li > a').click(function(){
		var $this = $(this);
		if ($this.parent('li').hasClass('active')) {
			$this.parent('li').removeClass('active');
		}else{
			$('.subNaviList > li').removeClass('active');
			$this.parent('li').addClass('active');
		}
	});

	$('.jstabMenu button').click(function(){
		var $this = $(this);
		var $thisAn = $this.attr('data-tab-link');
		if (!$this.hasClass('active')) {
			$this.closest('.jstabMenu').find('.active').removeClass('active');
			$this.addClass('active');
			$this.closest('.jsTabWrap').children('.tabContent').removeClass('active');
			$tabTarget = $this.closest('.jsTabWrap').children('.tabContent');
			$tabTarget.each(function(){
				$tabTargetAttr = $(this).attr('data-tab-cont');
				if ($tabTargetAttr == $thisAn) {
					$(this).addClass('active');
					 $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
					dataTabFixBody();
				}
			});
		}
	});

	$('.btn_jsToggle').click(function(){
		var $this = $(this);
		var $thisTxt = $this.find('span').text()
		var $thisToggle = $this.attr('data-jstoggle-link');
		console.log($thisToggle);
		if ($thisTxt == '닫기') {
			$this.find('span').text('열기');
			$this.addClass('toggleClose')
			$('.jsToggleCont').each(function(){
				var $toggleTarget = $(this).attr('data-jstoggle-cont');
				if ($toggleTarget == $thisToggle) {
					$(this).addClass('toggleHide');
					$(this).slideUp(300);
				}
			});
		}else if ($thisTxt == '열기') {
			$this.find('span').text('닫기')
			$this.removeClass('toggleClose')
			$('.jsToggleCont').each(function(){
				var $toggleTarget = $(this).attr('data-jstoggle-cont');
				if ($toggleTarget == $thisToggle) {
					$(this).removeClass('toggleHide')
					$(this).slideDown(300);
				}
			});
		}
	});

	//비교분석 클릭
	$('.btn_deviation_area > li .btn').click(function(){
		$('.btn_deviation_area > li .btn').removeClass('active');
		$(this).addClass('active')
	})

	//메인 지도보기 지역선택 버튼
	$('.map_area_list > li .btn').click(function(){
		$('.map_area_list > li .btn').removeClass('active');
		$(this).addClass('active')
	})
	

	dataTabFixBody();
	dataTableScroll()
	anchorWrap()
});