// 获取 表格数据
const initArtCateList = () => {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: (res) => {
      // 调用 template
      const htmlStr = template("tpl-table", res);
      $("tbody").empty().html(htmlStr);
    },
  });
};

initArtCateList();
let indexAdd = null;
const form = layui.form;

$("#addCateBtn").click(function () {
  indexAdd = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-add").html(),
  });
});

// 通过代理监听 submit 事件
$("body").on("submit", "#form-add", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: (res) => {
      if (res.status !== 0) return; //layer.msg("新增分类失败！");
      initArtCateList();
      layer.msg("新增分类成功！");
      layer.close(indexAdd);
    },
  });
});

$("#tb").on("click", ".btn-edit", function () {
  layerEdit = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-edit").html(),
  });
  let id = $(this).attr("data-id");
  $.ajax({
    type: "GET",
    url: "/my/article/cates/" + id,
    success: (res) => {
      const { status, message, data } = res;
      if (status !== 0) return layer.msg(message);
      form.val("formEdit", data);
    },
  });
});
$("body").on("submit", "#form-edit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/updatecate",
    data: form.val("formEdit"),
    success: (res) => {
      const { status, message } = res;
      layer.msg(message);
      if (status !== 0) return;
      initArtCateList();
      layer.close(layerEdit);
    },
  });
});

$("tbody").on("click", ".btn-delete", function () {
  const id = $(this).attr("data-id");
  // 提示用户是否删除
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
    $.ajax({
      method: "GET",
      url: "/my/article/deletecate/" + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("删除分类失败！");
        }
        layer.msg("删除分类成功！");
        layer.close(index);
        initArtCateList();
      },
    });
  });
});