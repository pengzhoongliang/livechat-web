<template>
  <div>
    <canvas class="mycanvas" width="80" height="40" @click="changeCode">抱歉，您的浏览器不支持canvas元素，换个浏览器试试？</canvas>
  </div>
</template>
<script>
export default {
  name: "my-captcha",
  props: {
    codeValue: {
      type: String
    }
  },
  data() {
    return {
      value: "",
      code: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    };
  },
  mounted() {
    this.fourCode();
  },
  methods: {
    randomColor() {
      //得到随机的颜色值
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    fourCode() {
      this.value = "";
      for (let a = 0; a < 4; a++) {
        this.value += this.code1();
      }
      this.doDraw();
    },
    code1() {
      let index = Math.floor(Math.random() * (this.code.length - 1) + 1);
      return this.code[index];
    },
    doDraw() {
      var x = 20;
      var y = 20 + Math.random() * 8;
      var deg = (Math.random() * 30 * Math.PI) / 180;
      //  获取canvas
      var canvas = document.getElementsByClassName("mycanvas");
      canvas[0].width = canvas[0].width; //清空画布
      canvas[0].height = canvas[0].height;
      var canvas_width = canvas[0].width;
      var canvas_height = canvas[0].height;
      var context = canvas[0].getContext("2d");
      context.font = "bold 23px 微软雅黑";
      context.fillText(this.value, 15, 30);
      context.translate(x, y); //canvas原点的偏移量
      context.rotate(deg); //旋转度数
      context.fillStyle = this.randomColor(); //设置颜色
      context.strokeStyle = this.randomColor(); //设置颜色
      context.rotate(-deg);
      context.translate(-x, -y);
      for (var i = 0; i <= 15; i++) {
        //验证码上显示线条
        context.strokeStyle = this.randomColor(); //轮廓风格
        context.beginPath();
        context.moveTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.lineTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.stroke();
      }
      for (var i = 0; i <= 30; i++) {
        //验证码上显示小点
        context.strokeStyle = this.randomColor();
        context.beginPath(); //新建一条路径
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y); //吧画笔移动到指定位置
        context.lineTo(x + 1, y + 1); //想指定位置移动
        context.stroke();
      }
    },
    changeCode() {
      this.fourCode();
    }
  },
  watch: {
    codeValue(newVal, oldValue) {
      var isCorrect = false;
      if (newVal.toLowerCase() == this.value.toLowerCase()) {
        isCorrect = true;
      }
      this.$emit("codeCheck", isCorrect);
    }
  }
};
</script>
<style>
.mycanvas {
  border: 0px solid rgb(199, 198, 198);
}
</style>