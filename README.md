##mSlide.js 简单的轻量级slider插件，依赖jsfinger.js作为手势库

###特点

- 原生js，依赖jsfinger.js
- 小巧，Uglify压缩后7k
- 支持手势和鼠标
- 易用，可自定义

###用法

	var slide = new mSlide('#wrapper',{
		hasTriggers: false, //是否有触发点
		hasPrevTrigger: false, //是否有上一帧触点
		hasNextTrigger: false, //是否有下一帧的触点
		prevTriggerClass:'.btn-prev', //上一帧触点选择器
		nextTriggerClass:'.btn-next', //下一帧触点选择器
		isLoop: false, //是否循环首尾衔接
		activeIndex: 0, //当前索引
		container: '.wrapper', //容器选择器
		panelClass: '.page', //面板选择器
		triggerClass: '.trigger', //触发器选择器
		activeClass: 'toIn', //正序入场类名
		blurClass: 'toOut', //正序出场类名
		backActiveClass: 'backIn', //反序入场类名
		backBlurClass: 'backOut' //反序入场类名
	});


