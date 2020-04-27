/*
 * @Author: https://github.com/WangEn
 * @Author: https://gitee.com/lovetime/
 * @Date:   2018-01-01
 * @lastModify 2018-3-27 15:00:35
 * +----------------------------------------------------------------------
 * | Weadmin [ 鍚庡彴绠＄悊妯℃澘 ]
 * | 鍩轰簬Layui http://www.layui.com/
 * +----------------------------------------------------------------------
 */

layui.define(['jquery', 'form', 'layer', 'element'], function(exports) {
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer,
		element = layui.element;
	var menu = [];
	var curMenu;

	/*
	 * @todo 鍒濆鍖栧姞杞藉畬鎴愭墽琛屾柟娉�
	 * 鎵撳紑鎴栧埛鏂板悗鎵ц
	 */
	$(function() {
		/*
		 * @todo 璇诲彇鏈湴瀛樺偍涓褰曠殑宸叉墦寮€鐨則ab椤�
		 * 鍒锋柊鍚庯紝璇诲彇璁板綍锛屾墦寮€鍘熸潵宸叉墦寮€鐨則ab椤�
		 */

		/*
		 * @todo table浜嬩欢
		 */
		tableCheck = {
			init: function() {
				$(".layui-form-checkbox").click(function(event) {
					if($(this).hasClass('layui-form-checked')) {
						$(this).removeClass('layui-form-checked');
						if($(this).hasClass('header')) {
							$(".layui-form-checkbox").removeClass('layui-form-checked');
						}
					} else {
						$(this).addClass('layui-form-checked');
						if($(this).hasClass('header')) {
							$(".layui-form-checkbox").addClass('layui-form-checked');
						}
					}
				});
			},
			getData: function() {
				var obj = $(".layui-form-checked").not('.header');
				var arr = [];
				obj.each(function(index, el) {
					arr.push(obj.eq(index).attr('data-id'));
				});
				return arr;
			}
		}
		//寮€鍚〃鏍煎閫�
		tableCheck.init();
		//寤舵椂鍔犺浇
		setTimeout(function() {
			if(sessionStorage.getItem("menu")) {
				menu = JSON.parse(sessionStorage.getItem("menu"));
				for(var i = 0; i < menu.length; i++) {
					tab.tabAdd(menu[i].title, menu[i].url, menu[i].id);
				}
			} else {
				return false;
			}
			if(sessionStorage.getItem("curMenu")) {
				$('.layui-tab-title').find('layui-this').removeClass('layui-class');
				curMenu = JSON.parse(sessionStorage.getItem("curMenu"));
				id = curMenu.id;
				if(id) { //鍥犱负榛樿妗岄潰棣栭〉涓嶅瓨鍦╨ay-id,鎵€浠ヨ瀵规鍒ゆ柇
					$('.layui-tab-title li[lay-id="' + id + '"]').addClass('layui-this');
					tab.tabChange(id);
				} else {
					$(".layui-tab-title li").eq(0).addClass('layui-this'); //鏈敓鏁�
					$('.layui-tab-content iframe').eq(0).parent().addClass('layui-show');
				}
			} else {
				$(".layui-tab-title li").eq(0).addClass('layui-this'); //鏈敓鏁�
				$('.layui-tab-content iframe').eq(0).parent().addClass('layui-show');
			}
		}, 100);
		//鐐瑰嚮tab鏍囬鏃讹紝瑙﹀彂reloadTab鍑芥暟
		$('#tabName').on('click','li',function(){
			reloadTab(this);
		});

		//鍒濆鍖栧姞杞界粨鏉�
	});

	/*
	 * @todo 宸︿晶瀵艰埅鑿滃崟鐨勬樉绀哄拰闅愯棌
	 */
	$('.container .left_open i').click(function(event) {
		if($('.left-nav').css('left') == '0px') {
			//姝ゅ宸︿晶鑿滃崟鏄樉绀虹姸鎬侊紝鐐瑰嚮闅愯棌
			$('.left-nav').animate({
				left: '-221px'
			}, 100);
			$('.page-content').animate({
				left: '0px'
			}, 100);
			$('.page-content-bg').hide();
		} else {
			//姝ゅ宸︿晶鑿滃崟鏄殣钘忕姸鎬侊紝鐐瑰嚮鏄剧ず
			$('.left-nav').animate({
				left: '0px'
			}, 100);
			$('.page-content').animate({
				left: '221px'
			}, 100);
			//鐐瑰嚮鏄剧ず鍚庯紝鍒ゆ柇灞忓箷瀹藉害杈冨皬鏃舵樉绀洪伄缃╄儗鏅�
			if($(window).width() < 768) {
				$('.page-content-bg').show();
			}
		}
	});
	//鐐瑰嚮閬僵鑳屾櫙锛屽乏渚ц彍鍗曢殣钘�
	$('.page-content-bg').click(function(event) {
		$('.left-nav').animate({
			left: '-221px'
		}, 100);
		$('.page-content').animate({
			left: '0px'
		}, 100);
		$(this).hide();
	});

	/*
	 * @todo 宸︿晶鑿滃崟浜嬩欢
	 * 濡傛灉鏈夊瓙绾у氨灞曞紑锛屾病鏈夊氨鎵撳紑frame
	 */
	$('.left-nav #nav li').click(function(event) {
		if($(this).children('.sub-menu').length) {
			if($(this).hasClass('open')) {
				$(this).removeClass('open');
				$(this).find('.nav_right').html('&#xe697;');
				$(this).children('.sub-menu').stop().slideUp();
				$(this).siblings().children('.sub-menu').slideUp();
			} else {
				$(this).addClass('open');
				$(this).children('a').find('.nav_right').html('&#xe6a6;');
				$(this).children('.sub-menu').stop().slideDown();
				$(this).siblings().children('.sub-menu').stop().slideUp();
				$(this).siblings().find('.nav_right').html('&#xe697;');
				$(this).siblings().removeClass('open');
			}
		} else {
			var url = $(this).children('a').attr('_href');
			var title = $(this).find('cite').html();
			var index = $('.left-nav #nav li').index($(this));

			for(var i = 0; i < $('.weIframe').length; i++) {
				if($('.weIframe').eq(i).attr('tab-id') == index + 1) {
					tab.tabChange(index + 1);
					event.stopPropagation();
					return;
				}
			};

			tab.tabAdd(title, url, index + 1);
			tab.tabChange(index + 1);
		}
		event.stopPropagation(); //涓嶈Е鍙戜换浣曞墠杈堝厓绱犱笂鐨勪簨浠跺鐞嗗嚱鏁�
	});

	/*
	 * @todo tab瑙﹀彂浜嬩欢锛氬鍔犮€佸垹闄ゃ€佸垏鎹�
	 */
	var tab = {
		tabAdd: function(title, url, id) {
			//鍒ゆ柇褰撳墠id鐨勫厓绱犳槸鍚﹀瓨鍦ㄤ簬tab涓�
			var li = $("#WeTabTip li[lay-id=" + id + "]").length;
			//console.log(li);
			if(li > 0) {
				//tab宸茬粡瀛樺湪锛岀洿鎺ュ垏鎹㈠埌鎸囧畾Tab椤�
				//console.log(">0");
				element.tabChange('wenav_tab', id); //鍒囨崲鍒帮細鐢ㄦ埛绠＄悊
			} else {
				//璇d涓嶅瓨鍦紝鏂板涓€涓猅ab椤�
				//console.log("<0");
				element.tabAdd('wenav_tab', {
					title: title,
					content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="weIframe"></iframe>',
					id: id
				});
				//褰撳墠绐楀彛鍐呭
				setStorageMenu(title, url, id);

			}
			CustomRightClick(id); //缁戝畾鍙抽敭鑿滃崟
			FrameWH(); //璁＄畻妗嗘灦楂樺害

		},
		tabDelete: function(id) {
			element.tabDelete("wenav_tab", id); //鍒犻櫎
			removeStorageMenu(id);

		},
		tabChange: function(id) {
			//鍒囨崲鍒版寚瀹歍ab椤�
			element.tabChange('wenav_tab', id);
		},
		tabDeleteAll: function(ids) { //鍒犻櫎鎵€鏈�
			$.each(ids, function(i, item) {
				element.tabDelete("wenav_tab", item);
			})
			sessionStorage.removeItem('menu');
		}
	};

	/*
	 * @todo 鐩戝惉鍙抽敭浜嬩欢,缁戝畾鍙抽敭鑿滃崟
	 * 鍏堝彇娑堥粯璁ょ殑鍙抽敭浜嬩欢锛屽啀缁戝畾鑿滃崟锛岃Е鍙戜笉鍚岀殑鐐瑰嚮浜嬩欢
	 */
	function CustomRightClick(id) {
		//鍙栨秷鍙抽敭 
		$('.layui-tab-title li').on('contextmenu', function() {
			return false;
		})
		$('.layui-tab-title,.layui-tab-title li').on('click', function() {
			$('.rightMenu').hide();
		});
		//妗岄潰鐐瑰嚮鍙冲嚮 
		$('.layui-tab-title li').on('contextmenu', function(e) {
			var aid = $(this).attr("lay-id"); //鑾峰彇鍙抽敭鏃秎i鐨刲ay-id灞炴€�
			var popupmenu = $(".rightMenu");
			popupmenu.find("li").attr("data-id", aid);
			//console.log("popopmenuId:" + popupmenu.find("li").attr("data-id"));
			l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
			t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
			popupmenu.css({
				left: l,
				top: t
			}).show();
			//alert("鍙抽敭鑿滃崟")
			return false;
		});
	}
	$("#rightMenu li").click(function() {
		var type = $(this).attr("data-type");
		var layId = $(this).attr("data-id")
		if(type == "current") {
			//console.log("close this:" + layId);
			tab.tabDelete(layId);
		} else if(type == "all") {
			//console.log("closeAll");
			var tabtitle = $(".layui-tab-title li");
			var ids = new Array();
			$.each(tabtitle, function(i) {
				ids[i] = $(this).attr("lay-id");
			})
			tab.tabDeleteAll(ids);
		} else if(type == "fresh") {
			//console.log("fresh:" + layId);
			tab.tabChange($(this).attr("data-id"));
			var othis = $('.layui-tab-title').find('>li[lay-id="' + layId + '"]'),
				index = othis.parent().children('li').index(othis),
				parents = othis.parents('.layui-tab').eq(0),
				item = parents.children('.layui-tab-content').children('.layui-tab-item'),
				src = item.eq(index).find('iframe').attr("src");
			item.eq(index).find('iframe').attr("src", src);
		} else if(type == "other") {
			var thisId = layId;
			$('.layui-tab-title').find('li').each(function(i, o) {
				var layId = $(o).attr('lay-id');
				if(layId != thisId && layId != 0) {
					tab.tabDelete(layId);
				}
			});
		}
		$('.rightMenu').hide();
	});

	/*
	 * @todo 閲嶆柊璁＄畻iframe楂樺害
	 */
	function FrameWH() {
		var h = $(window).height() - 164;
		$("iframe").css("height", h + "px");
	}
	$(window).resize(function() {
		FrameWH();
	});

	/*
	 * @todo 寮瑰嚭灞傦紝寮圭獥鏂规硶
	 * layui.use 鍔犺浇layui.define 瀹氫箟鐨勬ā鍧楋紝褰撳閮� js 鎴� onclick璋冪敤 use 鍐呴儴鍑芥暟鏃讹紝闇€瑕佸湪 use 涓畾涔� window 鍑芥暟渚涘閮ㄥ紩鐢�
	 * http://blog.csdn.net/xcmonline/article/details/75647144 
	 */
	/*
	    鍙傛暟瑙ｉ噴锛�
	    title   鏍囬
	    url     璇锋眰鐨剈rl
	    id      闇€瑕佹搷浣滅殑鏁版嵁id
	    w       寮瑰嚭灞傚搴︼紙缂虹渷璋冮粯璁ゅ€硷級
	    h       寮瑰嚭灞傞珮搴︼紙缂虹渷璋冮粯璁ゅ€硷級
	*/
	window.WeAdminShow = function(title, url, w, h) {
		if(title == null || title == '') {
			title = false;
		};
		if(url == null || url == '') {
			url = "404.html";
		};
		if(w == null || w == '') {
			w = ($(window).width() * 0.9);
		};
		if(h == null || h == '') {
			h = ($(window).height() - 50);
		};
		layer.open({
			type: 2,
			area: [w + 'px', h + 'px'],
			fix: false, //涓嶅浐瀹�
			maxmin: true,
			shadeClose: true,
			shade: 0.4,
			title: title,
			content: url
		});
	}
	/*寮瑰嚭灞�+浼犻€扞D鍙傛暟*/
	window.WeAdminEdit = function(title, url, id, w, h) {
		if(title == null || title == '') {
			title = false;
		};
		if(url == null || url == '') {
			url = "404.html";
		};
		if(w == null || w == '') {
			w = ($(window).width() * 0.9);
		};
		if(h == null || h == '') {
			h = ($(window).height() - 50);
		};
		layer.open({
			type: 2,
			area: [w + 'px', h + 'px'],
			fix: false, //涓嶅浐瀹�
			maxmin: true,
			shadeClose: true,
			shade: 0.4,
			title: title,
			content: url,
			success: function(layero, index) {
				//鍚慽frame椤电殑id=house鐨勫厓绱犱紶鍊�  // 鍙傝€� https://yq.aliyun.com/ziliao/133150
				var body = layer.getChildFrame('body', index);
				body.contents().find("#dataId").val(id);
				console.log(id);
			},
			error: function(layero, index) {
				alert("aaa");
			}
		});
	}

	/**
	 *@todo tab鐩戝惉锛氱偣鍑籺ab椤瑰搴旂殑鍏抽棴鎸夐挳浜嬩欢
	 */
	$('.layui-tab-close').click(function(event) {
		$('.layui-tab-title li').eq(0).find('i').remove();
	});
	/**
	 *@todo tab鍒囨崲鐩戝惉
	 * tab鍒囨崲鐩戝惉涓嶈兘鍐欏瓧鍒濆鍖栧姞杞�$(function())鏂规硶鍐咃紝鍚﹀垯涓嶆墽琛�
	 */
	element.on('tab(wenav_tab)', function(data) {
		//console.log(this); //褰撳墠Tab鏍囬鎵€鍦ㄧ殑鍘熷DOM鍏冪礌
		setStorageCurMenu();
	});
	/*
	 * @todo 鐩戝惉layui Tab椤圭殑鍏抽棴鎸夐挳锛屾敼鍙樻湰鍦板瓨鍌�
	 */
	element.on('tabDelete(wenav_tab)', function(data) {
		var layId = $(this).parent('li').attr('lay-id');
		//console.log(layId);
		removeStorageMenu(layId);
	});
	/**
	 *@todo 鏈湴瀛樺偍 localStorage
	 * 涓轰簡淇濇寔缁熶竴锛屽皢sessionStorage鏇存崲涓哄瓨鍌ㄥ懆鏈熸洿闀跨殑localStorage
	 */
	//鏈湴瀛樺偍璁板綍鎵€鏈夋墦寮€鐨勭獥鍙�
	function setStorageMenu(title, url, id) {
		var menu = JSON.parse(sessionStorage.getItem('menu'));
		if(menu) {
			var deep = false;
			for(var i = 0; i < menu.length; i++) {
				if(menu[i].id == id) {
					deep = true;
					menu[i].title = title;
					menu[i].url = url;
					menu[i].id = id;
				}
			}
			if(!deep) {
				menu.push({
					title: title,
					url: url,
					id: id
				})
			}
		} else {
			var menu = [{
				title: title,
				url: url,
				id: id
			}]
		}
		sessionStorage.setItem('menu', JSON.stringify(menu));
	}
	//鏈湴瀛樺偍璁板綍褰撳墠鎵撳紑绐楀彛
	function setStorageCurMenu() {
		var curMenu = sessionStorage.getItem('curMenu');
		var text = $('.layui-tab-title').find('.layui-this').text();
		text = text.split('醼�')[0];
		var url = $('.layui-tab-content').find('.layui-show').find('.weIframe').attr('src');
		var id = $('.layui-tab-title').find('.layui-this').attr('lay-id');
		//console.log(text);
		curMenu = {
			title: text,
			url: url,
			id: id
		}
		sessionStorage.setItem('curMenu', JSON.stringify(curMenu));
	}
	//鏈湴瀛樺偍涓Щ闄ゅ垹闄ょ殑鍏冪礌
	function removeStorageMenu(id) {
		var menu = JSON.parse(sessionStorage.getItem('menu'));
		//var curMenu = JSON.parse(localStorage.getItem('curMenu'));
		if(menu) {
			var deep = false;
			for(var i = 0; i < menu.length; i++) {
				if(menu[i].id == id) {
					deep = true;
					menu.splice(i, 1);
				}
			}
		} else {
			return false;
		}
		sessionStorage.setItem('menu', JSON.stringify(menu));
	}

	/**
	 *@todo 妯℃嫙鐧诲綍
	 * 鍒ゆ柇鍒濇鐧诲綍鏃讹紝璺宠浆鍒扮櫥褰曢〉
	 */
	var login = localStorage.getItem('login');
	$('.loginout').click(function() {
		login = 0;
		localStorage.setItem('login', login);
	});
	$('.loginin').click(function() {
		login = 1;
		localStorage.setItem('login', login);
	});
	
	/*
	 *Tab鍔犺浇鍚庡埛鏂�
	 * 鍒ゆ柇鏄埛鏂板悗绗竴娆＄偣鍑绘椂锛屽埛鏂癴rame瀛愰〉闈�
	 * */
	window.reloadTab = function(which){
		var len = $('.layui-tab-title').children('li').length;
		var layId = $(which).attr('lay-id');
		var i=1;	   
		if($(which).attr('data-bit')){
			return false; //鍒ゆ柇椤甸潰鎵撳紑鍚庣涓€娆＄偣鍑伙紝鎵ц鍒锋柊
		}else{
			$(which).attr('data-bit',i);  	
			var frame = $('.weIframe[tab-id='+layId+']');
			frame.attr('src', frame.attr('src'));
			console.log("reload:"+$(which).attr('data-bit'));
		} 
    }
	/**
	 *@todo Frame鍐呴儴鐨勬寜閽偣鍑绘墦寮€鍏朵粬frame鐨則ab
	 */

	exports('admin', {});
});