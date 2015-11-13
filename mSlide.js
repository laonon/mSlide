/**
 * slide.js   
 * @authors  laonon2012@gmail.com
 * @date     2015.1
 */
;
(function(window, undefined) {
	"use strict"

	var _util = {};
	/**
	 * DOM选择器
	 * @param  {string} selector 选择符
	 * @return {object} DOM节点
	 */
	_util.$ = function(selector) {
		var reg = /(#)+/g;
		var type = Object.prototype.toString.call(selector).slice(8, -1);
		switch (type) {
			case 'Object':
				return selector;
				break;
			case 'String':
				if (reg.test(selector)) {
					return document.querySelector(selector);
				}
				return document.querySelectorAll(selector);
				break;
		}
	};

	/**
	 * 添加类名
	 * @param {HTMLelement} el [操作目标]
	 * @param {string} value   [待添加类名]
	 */
	_util.addClass = function(el, value) {
		if (!el.className) {
			el.className = value;
		} else {
			var oValue = el.className;
			oValue += ' ';
			oValue += value;
			el.className = oValue;
		}
	};
	/**
	 * 移除类名
	 * @param {HTMLelement} el [操作目标]
	 * @param {string} value   [待删除类名]
	 */
	_util.removeClass = function(el, className) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		if (el.className.match(reg)) {
			el.className = el.className.replace(reg, '');
		}
	};
	/**
	 * 包含类名
	 * @param  {[type]}  el        [description]
	 * @param  {[type]}  className [description]
	 * @return {Boolean}           [description]
	 */
	_util.hasClass = function(el, className) {
		var reg = new new RegExp('(\\s|^)' + className + '(\\s|$)');
		if (reg.test(el.className)) {
			return true;
		} else {
			return false;
		}
	};
	/**
	 * 获取样式函数css(ele,style)，2个参数，必选
	 * @param  {HTMLElement} selector [html元素]
	 * @param  {string} selector [css属性]
	 */
	_util.getStyle = function(ele, style) {
		var oStyle = style.replace(/\-(\w)/g, function(all, letter) {
			return letter.toUpperCase();
		});
		if (ele.style[oStyle]) { //内联样式
			return ele.style[oStyle];
		} else {
			return ele.currentStyle ? ele.currentStyle.getAttribute(oStyle) : document.defaultView.getComputedStyle(ele, null).getPropertyValue(oStyle);
		}
	};
	/**
	 * 添加样式
	 * @param  {object} el    目标元素
	 * @param  {object} attrs 添加属性键值对
	 * @return {undefined}
	 */
	_util.applyStyle = function(el, attrs) {
		var type = Object.prototype.toString.call(attrs).slice(8, -1);
		if (type == 'Object') {
			for (var attr in attrs) {
				if (attrs.hasOwnProperty(attr)) {
					el.style[attr] = attrs[attr];
				}
			}
		}
	};
	/**
	 * 判断元素是否满足条件
	 * @param  {[type]}  el    [description]
	 * @param  {[type]}  other [description]
	 * @return {Boolean}       [description]
	 */
	_util.is = function(el, term) {
		var term = arguments[1];
		if (typeof term == 'string') {
			var re = new RegExp('(\\s|^)' + term + '(\\s|$)');
			var re1 = /(\s|^)\.[\w-]+(\s|$)/
			var re2 = /(\s|^)#[\w-]+(\s|$)/;
			var re3 = /(\s|^)[\w-]+(\s|$)/;
			if (re1.test(term)) {
				term = term.replace(/\./, '');
				re = new RegExp('(\\s|^)' + term + '(\\s|$)')
				if (re.test(el.className)) {
					return true;
				}
			}
			if (re2.test(term)) {
				term = term.replace(/\#/, '');
				re = new RegExp('(\\s|^)' + term + '(\\s|$)')
				if (re.test(el.getAttribute('id'))) {
					return true;
				}
			}
			if (re3.test(term) && re.test(el.tagName.toLowerCase())) {
				return true;
			}
			return false;
		} else if (typeof term == 'object') {
			if (term == el) {
				return true;
			} else {
				return false;
			}
		}
	};
	/* 检测对象类型
	 * @param: obj {JavaScript Object}
	 * @param: type {String} 以大写开头的 JS 类型名
	 * @return: {Boolean}
	 */
	_util.isType = function(obj, type) {
		return Object.prototype.toString.call(obj).slice(8, -1) === type;
	};
	/**
	 * 检测一个元素是否包含另一个元素
	 * @param  {HTMLelement} parent [待检测父元素]
	 * @param  {HTMLelement} child  [待检测子元素]
	 * @return {boolean}       [返回true or false]
	 */
	_util.contain = function(parent, child) {
		if (typeof parent.contains == 'function') {
			return parent.contains(child);
		} else if (typeof parent.compareDocumentPosition == 'function') {
			return !!(parent.compareDocumentPosition(child) && 16);
		} else {
			var node = child.parentNode;
			do {
				if (node === parent) {
					return true;
				} else {
					node = node.parentNode;
				}
			} while (node !== null);
			return false;
		}
	};
	/**
	 * 遍历函数each
	 * @param  {HTMLElement}  obj      [待遍历对象]
	 * @param  {Function}     fn       [操作函数]
	 * @param  {String}       params   [可选，传入操作函数]
	 * @return {Object}       obj      [返回对象本身]
	 */
	_util.each = function(obj, fn, params) {
		var name, i = 0,
			len = obj.length;
		if (params) {
			if (len == undefined) {
				for (name in obj) {
					if (fn.apply(obj[name], params) === false) {
						break;
					}
				}
			} else {
				for (; i < len;) {
					if (fn.apply(obj[i++], params) === false) {
						break;
					}
				}
			}
		} else {
			if (len == undefined) {
				for (name in obj) {
					if (fn.call(obj[name], name, obj[name]) === false) {
						break;
					}
				}
			} else {
				for (var value = obj[0]; i < len && fn.call(value, i, value) !== false; value = obj[++i]) {}
			}
		}
		return obj;
	};
	/**
	 * 拓展对象
	 * @param  {object} target 目标对象
	 * @param  {object} source 合并源对象
	 * @return {object} 合并后的新对象
	 */
	_util.extend = function() {
		var params = arguments;
		var len = params.length;
		var result = {};

		if (!len) {
			return;
		}
		for (var i = len - 1; i >= 0; i--) {
			var target = arguments[i];
			var source = result;
			for (var property in target) {
				if (target.hasOwnProperty(property)) {
					//如果均为对象，则递归
					if (_util.isType(target[property], 'Object') && _isType(source[property], 'Object')) {
						arguments.callee(target[property], source[property]);
					}
					//如果source已存在property属性则继续
					if (source.hasOwnProperty(property)) {
						continue;
					} else {
						source[property] = target[property];
					}
				}
			}
		}
		return result;
	};

	/**
	 * mSlide
	 * @param {string} container 目标容器
	 * @param {object} config    自定义配置
	 */
	function mSlide(config) {
		var _self = this;
		var config = config || {};

		var defaults = {
			hasTriggers: false, //是否有触发点
			hasPrevTrigger: false, //是否有上一帧触点
			hasNextTrigger: false, //是否有下一帧的触点
			prevTriggerClass:'.btn-prev', //上一帧触点选择器
			nextTriggerClass:'.btn-next', //下一帧触点选择器
			isLoop: false, //是否循环首尾衔接
			activeIndex: 0, //当前索引
			container: '#wrapper', //容器选择器
			panelClass: '.page', //面板选择器
			triggerClass: '.trigger', //触发器选择器
			activeClass: 'toIn', //正序入场
			blurClass: 'toOut', //正序出场
			backActiveClass: 'backIn', //反序入场
			backBlurClass: 'backOut' //反序入场
		};

		config = _util.extend(defaults, config);

		//配置数据
		_self.config = config;

		//获取目标
		_self.container = _util.$(_self.config.container)[0];
		
		//当前索引
		_self.activeIndex = config.activeIndex;

		//初始化
		_self.init();
	}

	mSlide.Plugins = [];

	mSlide.prototype = {
		/**
		 * 初始化
		 */
		init: function() {
			var _self = this;
			var cfg = _self.config;

			//解析markup
			_self.parseMarkup();

			//切换到指定项
			if (cfg.switchTo) {
				_self.switchTo(cfg.switchTo, direction);
			}

			//绑定触发器
			if (cfg.hasTriggers) {
				_self.bindTrigger();
			}

			if (cfg.hasNextTrigger) {
				_self.bindNext();
			}

			if (cfg.hasPrevTrigger) {
				_self.bindPrev();
			}

			_self.bindSwitch();

			//初始化插件
			_util.each(mSlide.Plugins, function(plugin) {
				if (plugin.init) {
					plugin.init(_self);
				}
			});

			_self.activeIndex == 0 && _self.fireAni(0);
		},
		/**
		 * 解析markup
		 */
		parseMarkup: function() {
			var _self = this;
			var container = _self.container;
			var cfg = _self.config;
			var index = _self.activeIndex;
			var panels;
			var triggers;

			// 获取
			panels = document.querySelectorAll(cfg.panelClass);
			_self.length = panels.length;
			_self.panels = panels;

			if (cfg.hasTriggers) {
				var isNew = document.querySelectorAll('.operate').length > 0 ? false : true;
				var operate;
				if (isNew) {
					operate = document.createElement('div');
					operate.setAttribute('class', 'operate');
				} else {
					operate = document.querySelector('.operate');
				}
				var temp = '';

				for (var i = 0, len = _self.length; i < len - 1; i++) {
					if (i == index) {
						temp += '<li class="trigger active"></li>';
					}
					temp += '<li class="trigger"></li>';
				}
				operate.innerHTML = '<ul class="trigger-list">' + temp + '</ul>';
				container.appendChild(operate);
				triggers = document.querySelectorAll(cfg.triggerClass);
				_self.triggers = triggers;
			}

			if (cfg.hasPrevTrigger) {
				var isNew = document.querySelectorAll('.operate').length > 0 ? false : true;
				var operate;
				if (isNew) {
					operate = document.createElement('div');
					operate.innerHTML = '<div class="btn-prev"></div>';
					container.appendChild(operate);
				} else {
					var btnPrev = document.createElement('div');
					btnPrev.setAttribute('class', 'btn-prev');
					operate = document.querySelector('.operate');
					operate.appendChild(btnPrev);
				}
			}

			if (cfg.hasNextTrigger) {
				var isNew = document.querySelectorAll('.operate').length > 0 ? false : true;
				var operate;
				if (isNew) {
					operate = document.createElement('div');
					operate.innerHTML = '<div class="btn-next"></div>';
					container.appendChild(operate);
				} else {
					var btnNext = document.createElement('div');
					btnNext.setAttribute('class', 'btn-next');
					operate = document.querySelector('.operate');
					operate.appendChild(btnNext);
				}
			}
		},
		/**
		 * 触发器聚焦
		 * @param  {number} index 触发索引
		 * @return {undefined}
		 */
		onFocusTrigger: function(nextIndex) {
			var _self = this;
			if (!_self.triggerIsValid(index)) {
				return;
			}
			var index = _self.activeIndex;
			var direction = parseInt(nextIndex) > parseInt(index) ? 'to' : 'back';
			_self.switchTo(nextIndex, direction);
		},
		/**
		 * 触发器事件绑定
		 * @return {undefined}
		 */
		bindTrigger: function() {
			var _self = this;
			var cfg = _self.config;
			var container = _self.container;
			var triggerObj = _util.$(cfg.triggerClass);
			var len = triggerObj.length;

			for (var i = len - 1; i >= 0; i--) {
				(function(index) {
					triggerObj[index].addEventListener('tap', function() {
						_self.onFocusTrigger(index);
					});
				})(i);
			}
		},
		/**
		 * 绑定内链跳转
		 * @param  {object} target 当前目标对象
		 * @return {undefined}
		 */
		bindInlineLink: function(target, nextIndex) {
			var _self = this;
			var index = _self.activeIndex;
			var oTarget = target;
			var nextIndex = nextIndex;
			var direction = parseInt(nextIndex) > parseInt(index) ? 'to' : 'back';
			oTarget.addEventListener('tap', function() {
				alert('sds')
				_self.switchTo(nextIndex, direction);
			});
		},
		/**
		 * 触发判断，如果触发索引为当前索引则false
		 * @param  {number} index 触发索引
		 * @return {undefined}
		 */
		triggerIsValid: function(index) {
			var _self = this;
			return _self.activeIndex !== index;
		},
		/**
		 * 消除定时器
		 * @return {undefined}
		 */
		cancelSwitchTimer: function() {
			var _self = this;
			if (_self.switchTimer) {
				_self.switchTimer.cancel();
				_self.switchTimer = undefined;
			}
		},
		/**
		 * 切换到索引
		 * @param  {number} index     索引
		 * @param  {string} direction 方向
		 * @return {undefined}
		 */
		switchTo: function(index, direction) {
			var _self = this;
			var cfg = _self.config;
			if (!_self.triggerIsValid(index)) {
				return;
			}

			var fromEl = _self.panels[_self.activeIndex];
			var toEl = _self.panels[index];

			_self.switchView(fromEl, toEl, index, direction);
			_self.switchTrigger(index);
		},
		/**
		 * 触发当前动画
		 * @param  {Number} index 当前索引
		 */
		fireAni: function(index) {
			var _self = this;
			var curContext = _self.panels[index];
			var alls = document.querySelectorAll('[node-type="module"]');
			var eles = curContext.querySelectorAll('[node-type="module"]');
			for (var i = alls.length - 1; i >= 0; i--) {
				var aniClass = alls[i].getAttribute('data-ani');
				_util.removeClass(alls[i], aniClass);
			}
			for (var i = eles.length - 1; i >= 0; i--) {
				var aniClass = eles[i].getAttribute('data-ani');
				_util.addClass(eles[i], aniClass);
			}
		},
		/**
		 * 切换视图
		 * @param  {object} fromEl 退出元素
		 * @param  {object} toEl   进入元素
		 * @param  {number} index
		 * @param  {string} direction 方向
		 * @return {undefined}
		 */
		switchView: function(fromEl, toEl, index, direction) {
			var _self = this;
			var cfg = _self.config;

			if (direction == 'to') {
				//其它元素移除动画
				for (var i = _self.panels.length - 1; i >= 0; i--) {
					_util.removeClass(_self.panels[i], cfg.blurClass);
					_util.removeClass(_self.panels[i], cfg.backBlurClass);
					_util.removeClass(_self.panels[i], cfg.activeClass);
					_util.removeClass(_self.panels[i], cfg.backActiveClass);
					_util.removeClass(_self.panels[i], 'active');
				};

				_util.removeClass(toEl, cfg.blurClass);
				_util.addClass(toEl, cfg.activeClass);

				_util.removeClass(fromEl, cfg.activeClass);
				_util.addClass(fromEl, cfg.blurClass);
			}
			if (direction == 'back') {
				//其它元素移除动画
				for (var i = _self.panels.length - 1; i >= 0; i--) {
					_util.removeClass(_self.panels[i], cfg.blurClass);
					_util.removeClass(_self.panels[i], cfg.backBlurClass);
					_util.removeClass(_self.panels[i], cfg.activeClass);
					_util.removeClass(_self.panels[i], cfg.backActiveClass);
					_util.removeClass(_self.panels[i], 'active');
				};

				_util.removeClass(toEl, cfg.backBlurClass);
				_util.addClass(toEl, cfg.backActiveClass);

				_util.removeClass(fromEl, cfg.backActiveClass);
				_util.addClass(fromEl, cfg.backBlurClass);
			}
			//更新当前索引
			_self.activeIndex = index;

			//触发动画
			_self.fireAni(index);
		},
		/**
		 * 切换触点
		 * @return {undefined}
		 */
		switchTrigger: function(index) {
			var _self = this;
			var cfg = _self.config;
			for(var i=0,len= _self.triggers.length;i<len;i++){
				_util.removeClass(_self.triggers[i],'active');
			}
			_util.addClass(_self.triggers[index],'active');
		},
		/**
		 * 触发切换事件
		 * @return {undefined}
		 */
		bindSwitch: function() {
			var _self = this;
			document.body.addEventListener('swipeUp',function(){
				_self.next();
			});
			document.body.addEventListener('swipeDown',function(){
				_self.prev();
			});
		},
		/**
		 * 触发上一帧
		 * @return {undefined}
		 */
		bindPrev: function(){
			var _self = this;
			var cfg = _self.config;
			var btnPrev = document.querySelector(cfg.prevTriggerClass);
			btnPrev.addEventListener('tap',function(){
				_self.prev();
			});
		},
		/**
		 * 触发下一帧
		 * @return {undefined}
		 */
		bindNext: function(){
			var _self = this;
			var cfg = _self.config;
			var btnNext = document.querySelector(cfg.nextTriggerClass);
			btnNext.addEventListener('tap',function(){
				_self.next();
			});
		},
		/**
		 * 上一帧
		 * @return {undefined}
		 */
		prev: function() {
			var _self = this;
			var cfg = _self.config;
			var index = _self.activeIndex;

			if (cfg.isLoop) {
				index = index > 0 ? index - 1 : _self.length - 1;
			} else {
				index = index > 0 ? index - 1 : 0;
			}
			_self.switchTo(index, 'back');
		},
		/**
		 * 下一帧
		 * @return {Function} [description]
		 */
		next: function() {
			var _self = this;
			var cfg = _self.config;
			var index = _self.activeIndex;

			if (cfg.isLoop) {
				index = index < _self.length - 1 ? index + 1 : 0;
			} else {
				index = index < _self.length - 1 ? index + 1 : _self.length - 1;
			}
			_self.switchTo(index, 'to');
		}
	};

	window.mSlide = mSlide;

})(window);
