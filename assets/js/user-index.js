const layer = layui.layer;
const form = layui.form;
// 自定义校验规则
form.verify({
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },
  email: [/@/, "邮箱输入格式错误"],
});

// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: null,
    success: (res) => {
      const { status, message, data } = res;
      if (status !== 0) return layer.msg(message);
      form.val("formUserInfo", data);
    },
  });
};

initUserInfo();

$("#resetBtn").click(function (e) {
  e.preventDefault();
  initUserInfo();
});

$(".layui-form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/userinfo",
    data: form.val("formUserInfo"),
    success: (res) => {
      const { status, message } = res;
      if (status !== 0) return layer.msg(message);
      window.parent.getUserInfo();
    },
  });
});