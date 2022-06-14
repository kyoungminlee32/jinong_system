$(document).ready(function(){
	$('#topSc').click(function(e){
		$(window).scrollTop(0)
		e.preventDefault();
	})
	$(".wrap_deptitle").css("cursor","pointer");
	$(".wrap_deptitle").click(function () {
		if($(this).next(".wrap_list").is(':visible')){
			$(this).next(".wrap_list").css("display","none");
		}else{
			$(".wrap_list").css("display","none");
			$(this).next(".wrap_list").css("display","block");
			//$(window).scrollTop($(this).offset().top);
		}
	});

	$("table td a").click(function() {
		$("table td a").css("color", "#333");
		$(this).css("color", "red");
	});

	//화면 아이디와 경로 매칭 
	
	$(".wrap_list tr td.conid").each(function(){
		var $thisText = $(this).text().substr(0,8);
		//console.log($thisText);
		$(this).next("td").find("a").append($(this).text() + ".html");
		//$(this).next("td").find("a").attr("href",("./" + $(this).parent().parent().parent().attr("id") + "/" + $(this).text() + ".html"));
		$(this).next("td").find("a").attr("href",('./html/' + $thisText + '/' + $(this).text() + ".html"));
	});
/*
	$(".wrap_list tr td.mod_date").each(function(){
		var $thisid = $(this).text();
		var $thisidRow = $thisid.toLowerCase();
		if ($thisidRow.length > 0){
			$(this).parents("tr").addClass("wcms");
			var $thisid_dep1 = $thisidRow.substring(0,2);
			var $thisid_dep2 = $thisidRow.substring(2,4);
			var $thisid_dep3 = $thisidRow.substring(4,6);
			if ($thisid_dep1 === 'mp'){
				$thisid_dep1 = 'html_itbmp';
			}else{
				$thisid_dep1 = 'html_itbme';
			}
			$(this).empty();
			$(this).prepend('<a target="_blank" />');
			$(this).find("a").attr("href",("./" + $thisid_dep1 + "/"  + $thisid_dep2 + "/" + $thisid_dep3 + "/" + $thisid + ".html")).text($thisid);
			//$(this).parents("tr").find("a").append($(this).text() + ".html");
			//$(this).parents("tr").find("a").attr("href",("./" + $thisid_dep1 + "/"  + $thisid_dep2 + "/" + $thisid_dep3 + "/" + $(this).text() + ".html"));
		}
	});
*/

	//뎁스별 번호
	$(".cont_list").each(function(){
		var idx = 0;
		$(this).find(".num").each(function(i) {
			idx = i + 1;
			$(this).append(idx);
		});
	});
	
	$(".cont_list tbody tr td:nth-child(12)").filter(function(index){
		return  $(this).text() == "";
	}).removeClass('date');
	
	$(".cont_list tbody").find('tr').each(function(){
		if($(this).find('td:last').text().indexOf('디자인')>-1){
			/*비고에 디자인 문구 들어간 텍스트 찾기*/
			$(this).find('td:last').addClass('pointD');
		}else if($(this).find('td:last').text().indexOf('기획')>-1){
			/*비고에 기획 문구 들어간 텍스트 찾기*/
			$(this).find('td:last').addClass('pointP');
		}
		if($(this).find('td:last').text().indexOf('공통')>-1 || $(this).find('td:last').text().indexOf('N/A')>-1 || $(this).find('td:last').text().indexOf('??')>-1 || $(this).find('td:last').text().indexOf('통합')>-1 || $(this).find('td:last').text().indexOf('페이지없음')>-1|| $(this).find('td:last').text().indexOf('상이')>-1|| $(this).find('td:last').text().indexOf('웹비즈')>-1){
			/* 공통이나 퍼블영역 아닌 페이지 분류분류해 */
			$(this).addClass('not');
			$(this).find('.conid').next('td').empty();
		}
		/*상태에 퍼블 문구 들어간 텍스트 찾기
		if($(this).find('td.stat').text().indexOf('퍼블')>-1||$(this).find('td.stat').text().indexOf('개발')>-1){
			if($.trim($(this).find('td.date').html())==''){
			   $(this).find('td.date').html('-')
			}
			$(this).addClass('pub_no');
		}*/
	});

	$(".dpoint").each(function(){
		var dpoint = $(this).parent().parent().parent().next().children(".cont_list").find(".pointD:parent").length;
		$(this).append(dpoint);
		//alert(compl)
		});
	$(".ppoint").each(function(){
		var dpoint = $(this).parent().parent().parent().next().children(".cont_list").find(".pointP:parent").length;
		$(this).append(dpoint);
		//alert(compl)
		});


	// 뎁스별 본수
	$(".total").each(function(){
		//var compl = $(this).parents(".wrap_deptitle").next().children(".cont_list").find('tbody tr:not(".not")').length;
		var compl = $(this).parents(".wrap_deptitle").next().children(".cont_list").find('tbody tr:not(".not")').find(".prid:parent").length;
		$(this).append(compl);
		});
	$(".compnum").each(function(){
		var compl_num = $(this).parents(".wrap_deptitle").next().children(".cont_list").find('tr:not(".not")').find(".date:parent").length;
		console.log(compl_num)
		$(this).append(compl_num);
		//alert(compl)
		});

	//작업대상 본수
		/*$(".total").each(function(){
			var compl = $(this).parents(".wrap_deptitle").next().children(".cont_list").find('.prid:not(".not")').length;
			$(this).append(compl);
			});*/
	

			
	//총 본수
	$(".total_0").each(function(){
		var complT = $(this).parents(".tab_content").children(".wrap_list").children(".cont_list").find('tbody tr:not(".not")').length;
		console.log(complT)
		$(this).append(complT);
		 //$(this).parents("tab_content").children("wrap_list").css("border","solid 1px red");
		});
		
	$(".compnum_0").each(function(){
		var complT = $(this).parents(".tab_content").children(".wrap_list").children(".cont_list").find('tr:not(".not")').find(".date:parent").length;
		$(this).append(complT);
		});

	//진척율
	$(".total_sum").each(function(){
		var $comp_total = $(this).children(".total_0").text();
		var $comp_num = $(this).children(".compnum_0").text();
		//alert($comp_total)
		var $comp_per = $comp_num / $comp_total * 100;
		$(this).children(".complate_per").append($comp_per.toPrecision(4) + '%');
	});


	//업무별 탭
	$(".tab_site li a").click(function(){
		$(".tab_site li").removeClass("on");
		$(".tab_content").removeClass("on");

		$(this).parent().addClass("on");

		var thindex = $(this).parent().index();
		$(".tab_content").eq(thindex).addClass("on")
		localStorage.setItem('TV',thindex);
		
	});
	if(localStorage.getItem('TV')!=null){
		$(".tab_site li").removeClass('on').eq(localStorage.getItem('TV')).addClass('on')
		$(".tab_content").removeClass("on").eq(localStorage.getItem('TV')).addClass("on")
	}

	//전체열기
	$(".all_open").click(function(){
		$(this).parents(".tab_content").toggleClass("active");
		if ($(this).parents(".tab_content").hasClass("active")){
			$(this).parents(".tab_content").children(".wrap_list").show();
			$(this).text("전체닫기")
		}else {
			$(this).parents(".tab_content").children(".wrap_list").hide();
			$(this).text("전체열기")
		}
	});

	var total_allTxt = [];
	var compnum_allTxt = [];
	var total_num = 0
		,compnum_num = 0;
	$('.tab_content').each(function() {
		total_num += parseInt($(this).find('.total_0').text());
		compnum_num += parseInt($(this).find('.compnum_0').text());
		total_allTxt.push($(this).find('.total_0').text());
		compnum_allTxt.push($(this).find('.compnum_0').text());
	});
	total_allTxt = total_allTxt.join('+');
	compnum_allTxt = compnum_allTxt.join('+');
	$('.total_sum2').show();
	$('.total_sum2').find('.total_all').html(total_num);
	$('.total_sum2').find('.compnum_all').html(compnum_num)
	$('.total_sum2').find('.complate_per_all').html(((compnum_num/total_num)*100).toPrecision(4)+'%');

}); 

window.onload = function(){
}