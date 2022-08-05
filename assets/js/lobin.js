//!绑定点击事件 点击去注册账号让 登录框隐藏，注册框显示
$('#link_reg').on('click', () => {
	$('.login-box').hide()
	$('.reg-box').show()
})
//! 点击去登录让 注册框隐藏，登录框显示
$('#link_login').on('click', () => {
	$('.login-box').show()
	$('.reg-box').hide()
})
//! 从 LayUI 中获取 form 对象
const form = layui.form

// const baseUrl = "http://www.liulongbin.top:3007";
// 
const layer = layui.layer;

form.verify({
	//!再次确认密码的要求 校验两次密码是否一致的规则
	repass: value => { //value：表单的值
		//? 如果判断失败,则return一个提示消息即可
		//!自定义一个叫 pwd 的校验规则
		const pwd = $('.reg-box [name=password').val();
		if (pwd !== value) return "两次密码不一致"
	}
	//我们既支持上述函数式的方式，也支持下述数组的形式
	//数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
	, pass: [
		/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
});

//!登录表单，发送登录请求
$('#form_reg').on('submit', function (e) {
	e.preventDefault()//阻止默认提交功能
	const data = $(this).serialize()
	$.ajax({
		type: 'POST',
		url:  '/api/reguser',
		data,
		success: res => {
			const { message, status } = res
			if (status !== 0) return layer.msg(message)
			$('#link_login').click()
		}
	})
})

//!点击登录跳转
$('#y').on('submit', function (e) {
	e.preventDefault()
	//阻止默认提交功能
	const data = $(this).serialize()

	$.ajax({
		type: 'POST',
		url: '/api/login',
		data,
		success: res => {
			const { status, message, token } = res

			if (status !== 0) return layer.msg(message)
			//将登录成功得到的 token 字符串保存到localStorage 中
			localStorage.setItem('token', token)
			//location本地地址 跳转到主页
			location.href='/index.html'
		}
	})
})
