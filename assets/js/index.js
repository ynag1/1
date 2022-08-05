//! 获取用户基本信息
function getUserInfo() {

	$.ajax({
		type: 'GET',
		url: '/my/userinfo',
		data: null,
		success: res => {
			const { status, message } = res
			if (status !== 0) return layer.msg(message)
			renderAvatar(res.data)
		}
	})
}
//! 渲染用户头像
const renderAvatar = data => {
	// 获取用户名字
	let name = data.nickname || data.username
	// 设置欢迎文本
	$('#welcome').html('欢迎' + name)
	// 按需渲染用户头像
	if (data.user_pic !== null) {
		$('.layui-nav-img').attr('src', data.user_pic)
		$(".text-avatar").hide()
	} else {
		// 渲染文本头像 隐藏
		$(".layui-nav-img").hide();
		//没有头像就首字母大写
		let firstName = name[0].toUpperCase();
		//给头像赋值
		$(".text-avatar").html(firstName);
	}
}
getUserInfo()

//! 退出登录
$("#dxitBtn").click(() => {
	layer.confirm(
		"确定退出登录？",
		{ icon: 3, title: "提示" },
		function (index) {
			// 重新跳转到登录页面
			location.href = "/login.html";
			// 清空本地存储里面的 token
			localStorage.removeItem("token");
			layer.close(index)
		}
	);
});