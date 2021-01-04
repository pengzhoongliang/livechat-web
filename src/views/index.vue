<template>
  

</template>

<script>
  import PanelGroup from './dashboard/PanelGroup'
  import { caseMainInfo, getProblem, listProblem } from '@/api/buz/case/comment'
  import { caseCaseTypes } from '@/api/buz/case/problem'
  import { listZone } from '@/api/buz/case/geocoding'
  import { getToken } from '@/utils/auth'
  import { getDicts } from '@/api/sys/dict/data'
  // 引入地图map.js
  import { Map } from '@/map'

  export default {
  components: {
    PanelGroup,
  },
  data() {
    return {
      heightBox:500,
       // 区域村列表
      regionalArr:[],
      // 图片域名拼接
      domain:process.env.VUE_APP_URL+'/weChat/case/file/',
      // 问题状态
      statusOptions: [],
      // 问题显示状态
      statusOptionsObj: {},
      title:'',
      // 表单参数
      form: {},
      // 图片数组
      srcList:[],
       // 是否显示弹出层
      open: false,
      evaluate: false,
      areaVal: '',
      countyVal: '',
      ak:"xeXyjk05YzsUYhsoeD4ZDYIqQIPvUlLP",
      isActive:false,
      arrayList: [
        {latitude:121.403532,longitude:31.24603,status:1},
        {latitude:121.481477,longitude:31.240103,status:1},
        {latitude:121.493262,longitude:31.237015,status:1},
        {latitude:121.494987,longitude:31.230099,status:0},
        {latitude:121.489382,longitude:31.225034,status:1},
        {latitude:121.512953,longitude:31.219846,status:0},
        {latitude:121.510222,longitude:31.228122,status:1},
        {latitude:121.520715,longitude:31.232198,status:0},
        {latitude:121.515828,longitude:31.239485,status:1},
      ],
      points:[],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 1000,
        status:'',
      },
      // 调度信息
      schedulingData:[],
      schedulingTotal:0,
      // 处理信息
      handleData:[],
      handleTotal:0,
      // 统计数据
      mainInfoData:{},
       // 初始化区域
      boundaries:[],
      // 区域列表
      regionList:[],
      // 用户信息
      userId:this.$store.state.user.user.id,
    };
  },
  mounted() {
    // this.listZones();
    // this.problemList();
    // this.caseCase();
    // this.mainInfo();
    // this.openSocket();
    // this.regionalVillage();
    // this.scheduling();
    console.log('用户信息---',this.$store.state.user.user.id)

  },
  methods: {
    // 切换区域选择触发
    region(type){
      console.log('this.countyVal',this.countyVal);
      if(type==1){
        this.countyVal = '';
      }
      this.listZones(type)
    },

    // 区域村类型列表
    regionalVillage(){
      getDicts('buz_zone_village').then((res)=>{
        this.regionalArr = res.data;
        res.data.map((tiem,index)=>{
          this.regionalArr[index].dictValue = tiem.dictValue+'';
        });
      })
    },
    // websocket操作
    openSocket() {
        let that = this;
        let socket;
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else{
            console.log("您的浏览器支持WebSocket");
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            // let socketUrl="http://cc.link.newsupplytech.com/wsServer/"+this.userId;
            let socketUrl=process.env.VUE_APP_URL + process.env.VUE_APP_BASE_API + '/wsServer/' + this.userId;
            // let socketUrl="http://wmhm.longxindg.com/dev-api/wsServer/"+this.userId;
            socketUrl=socketUrl.replace("https","ws").replace("http","ws");
            console.log(socketUrl);
            if(socket!=null){
                socket.close();
                socket=null;
            }
            socket = new WebSocket(socketUrl,[getToken()]);
            //打开事件
            socket.onopen = function() {
                console.log("websocket已打开");
				// writeChatContent("websocket已打开")
                //socket.send("这是来自客户端的消息" + location.href + new Date());
            };
            //获得消息事件
            socket.onmessage = function(msg) {
                console.log('监听响应');
                console.log(msg.data);
                that.problemList();
				// writeChatContent(msg.data)
                //发现消息进入    开始处理前端触发逻辑
            };
            //关闭事件
            socket.onclose = function() {
                console.log("websocket已关闭");
				// writeChatContent("websocket已关闭")
            };
            //发生了错误事件
            socket.onerror = function() {
                console.log("websocket发生了错误");
				// writeChatContent("websocket发生了错误")
            }
        }
    },


     // /初始化区域列表
    listZones(type){
      console.log("类型===", type);
      this.queryParams.belongVillage = this.areaVal
      this.boundaries = [];
      console.log("参数===", this.queryParams);
      listZone(this.queryParams).then((res)=>{
        console.log("listZone===");
        this.regionList = res.data.records;
        this.regionList.map((val,index)=>{
          console.log("map===");
          let obj = JSON.parse(val.zoneData);
          console.log(index,val);
          let string = '';
          let arr = [];
          obj.map(tiem=>{
            string += tiem.lng+","+tiem.lat+';'
          })
          arr.push(string);
          this.boundaries.push(arr)
        });
        this.BaiduMap(16,type);
      })
    },
    // 概要统计
    mainInfo(){
      caseMainInfo().then((res)=>{
        this.mainInfoData = res.data;
      })
    },
    // 初始化问题列表
    problemList(){
      this.schedulingTotal = 0;
      this.handleTotal = 0;
      this.points = [];
      listProblem(this.queryParams).then((res)=>{
        let data = res.data.records;
        data.map((tiem,index)=>{
          if(tiem.status=='20'){
            this.points.push({"lng":tiem.longitude,"lat":tiem.latitude,"id":tiem.id,"status":tiem.status})
            this.handleTotal++;
          }
          if(tiem.status=='00'){
            this.points.push({"lng":tiem.longitude,"lat":tiem.latitude,"id":tiem.id,"status":tiem.status})
            this.schedulingTotal++;
          }
        })
        this.BaiduMap();
        console.log('this.points',this.points)
        // this.handleData = res.data.records
        // this.handleTotal = res.data.total
      });
    },

    // 问题类型列表
    caseCase(){
      caseCaseTypes().then((res)=>{
        let caseTypes = {
          data:res.data,
          obj:{}
          }
        res.data.map((tiem)=>{
            tiem.text = tiem.typeName;
            caseTypes.obj[tiem.id] = tiem.typeName;
        })
         // 问题类型列表
        this.statusOptions = caseTypes.data;
        // 问题类型展示列表
        this.statusOptionsObj = caseTypes.obj;

      }).catch((error)=>{

      })
    },
    /** 查看问题详情 */
    handleUpdate(id) {
      this.srcList = [];
      getProblem(id).then(response => {
        const data = response.data;
        this.form = data;
        this.open = true;
        this.title = "查看问题";
        data.imagePaths.map((res)=>{
          this.srcList.push(this.domain+res+'.jpeg')
        })
      });
    },

    // 地图全屏切换
    isActiveClick(){
      this.isActive = !this.isActive;
      console.log('sfadfa',this.isActive)
    },
    // 地图初始化操作
    BaiduMap(size,type) {
      let that = this;
      Map(this.ak).then( BMap => {				//调用map.js中Map()方法，引入百度地图秘钥作为参数
          var map = new BMap.Map('allmap');
          var cityName = new BMap.Point(113.621193,22.99683);
          map.centerAndZoom(cityName, size || 15);//设置城市，缩放级别
          map.enableScrollWheelZoom();  //启用滚轮放大缩小
          var _this = this;
          map.addEventListener("touchend", function (e) {
            console.log(e.point)
            var marker = new BMap.Marker(e.target.NC);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
              // map.enableDragging();
              // alert('事件监听')
          });

          console.log('this.boundaries[0][0].lng,this.boundaries[0][0].lat',this.boundaries);
          //  map.panTo(new BMap.Point(this.points[0].lng,this.points[0].lat)); //设置中心点
          // 随机向地图添加25个标
          for (var i = 0; i < this.points.length; i ++) {

          var point = new BMap.Point(this.points[i].lng, this.points[i].lat);
          if(this.points[i].status == '00'){
            addMarker(point,require('@/assets/image/calibration1.png'),this.points[i]);
          }else if(this.points[i].status == '20'){
            addMarker(point,require('@/assets/image/calibration2.png'),this.points[i]);
          }
          }
        // 点击获取经纬度
          map.addEventListener("click", (e)=>{
            console.log('点击获取经纬度e.point',e.point);
          });
          // 创建区域
          var count = this.boundaries.length; //行政区域的点有多少个
          console.log('行政区域的点有多少个'+count)
          // if (count === 0) {
          //     // alert('未能获取当前输入行政区域');
          //     return ;
          // }
           this.boundaries.map((tiem,index)=>{
             console.log('选择区域',this.countyVal==index,this.countyVal,index)
              var pointArray = [];
              for (var i = 0; i < tiem.length; i++) {
                console.log('添加覆盖物'+tiem[i])
                  var ply = new BMap.Polygon(tiem[i], {strokeWeight: 2, strokeColor: this.countyVal===index?"#0014ff":"#ff0000"}); //建立多边形覆盖物
                  map.addOverlay(ply);  //添加覆盖物
                  pointArray = pointArray.concat(ply.getPath());
                  // ply.addEventListener("click", (e)=>{
                  //   console.log('添加覆盖物事件',index,e)
                  //   console.log('添加覆盖物事件list',that.regionList)
                  //   // 打开信息弹框
                  //   that.open = true;
                  //   that.title = '编辑区域';
                  //   that.tiemDetailed(that.regionList[index].id);
                  // });
                  console.log('ply',ply)
                  if(i==0){
                      var x = 0,
                      y = 0;
                      var path = ply.zo //.getPath();//返回多边型的点数组；ply是多边形覆盖物
                      console.log('看看多少个',path)
                      for(var k = 0;k<path.length-1;k++){
                                x=x+ parseFloat(path[k].lng);
                                y=y+ parseFloat(path[k].lat);
                      }
                      x=x/path.length;
                      y=y/path.length;
                      console.log('x===y',x,y);
                      map.addOverlay(new BMap.Polygon(x,y));
                    }
                  }

              // }
           });



          // 编写自定义函数,创建标注
          function addMarker(point,imgUrl,data){
          var myIcon = new BMap.Icon(imgUrl, new BMap.Size(40,60));
          var marker = new BMap.Marker(point,{icon:myIcon});

            // 点击获取经纬度
          marker.addEventListener("click", (e)=>{
            console.log('点击获取经纬度e.point',e.point);
            console.log('point',point);
            console.log('所有',data);
            // console.log('点击获取经纬度data',data);
            if(point.lat==data.lat && point.lng==data.lng){
                that.handleUpdate(data.id);
            }

          });

          //跳动的动画
          if(data.status=='20'){
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          }
          //调用函数来为每个标点添加标注
    	    // createTag(marker);
          map.addOverlay(marker);
          //   var opts = {
          //     width : 200,     // 信息窗口宽度
          //     height: 100,     // 信息窗口高度
          //     title : "故宫博物院" , // 信息窗口标题
          //     message:"这里是故宫"
          // }
          // var infoWindow = new BMapGL.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象
          // marker.addEventListener("click", function(){
          //   console.log('sdfasdfsd');
          //   map.openInfoWindow(infoWindow, point); //开启信息窗口
          // });
          }





      });
    },
  },
};
</script>


<style>
body,
html,
#allmap {
  width: 100%;
  height: 800px;
  margin: 0;
  font-family: "微软雅黑";
}
.mapBox{
  position: relative;
}
.screen{
    position: absolute;
    left: 0;
    top: 15px;
    display: flex;
    height: 48px;
    z-index: 100;
    line-height: 48px;
    font-size: 13px;
}
.screen>div{
    box-shadow: 0px 3px 5px #c7c5c5;
}
.screenItem{
  width: 126px;
  text-align: center;
  background: #fff;
}
.screen img{
  vertical-align: sub;
}
.elSelect{
  background: #fff;
  margin-right: 20px;
  padding: 0 13px;
}
.adjust{
  position: absolute;
  right: 0;
  top: 15px;
  z-index: 100;
}

.actives{
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1100;
}

.mapBox .el-input--medium .el-input__inner{
  width: 120px;
  border: none;
}
</style>
