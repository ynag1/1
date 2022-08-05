const baseUrl = 'http://big-event-api-t.itheima.net'

$.ajaxPrefilter(option => {
	if (option.url.includes('/my/')) {
		option.headers = {
			Authorization: localStorage.getItem("token"),
		}
	}
	//在发起真正的ajax请求之前 
	option.url = baseUrl + option.url

	option.complete = res => {
		if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
			// 强制跳转到登录页面
			location.href = '/login.html'
			//  强制清空 token
			localStorage.removeItem('token')
		}
	}
})