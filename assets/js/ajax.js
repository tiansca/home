async function httpRequest(paramObj,fun,errFun) {
  return new Promise((resolve, reject) => {
    var xmlhttp = null;
    /*创建XMLHttpRequest对象，
     *老版本的 Internet Explorer（IE5 和 IE6）使用 ActiveX 对象：new ActiveXObject("Microsoft.XMLHTTP")
     * */
    if(window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    }else if(window.ActiveXObject) {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    /*判断是否支持请求*/
    if(xmlhttp == null) {
      alert('你的浏览器不支持XMLHttp');
      return;
    }
    xmlhttp.withCredentials = true;
    /*请求方式，并且转换为大写*/
    var httpType = (paramObj.type || 'GET').toUpperCase();
    /*数据类型*/
    var dataType = paramObj.dataType || 'json';
    /*请求接口*/
    var httpUrl = paramObj.httpUrl || '';
    /*是否异步请求*/
    var async = paramObj.async || true;
    /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
    var paramData = paramObj.data || [];
    var requestData = '';
    for(var name in paramData) {
      requestData += name + '='+ paramData[name] + '&';
    }
    requestData = requestData == '' ? '' : requestData.substring(0,requestData.length - 1);
    // console.log(requestData)

    function ready() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        /*成功回调函数*/
        if (fun) {
          fun(xmlhttp.responseText);
        } else {
          resolve(JSON.parse(xmlhttp.responseText))
        }
      }else if(xmlhttp.readyState == 4){
        /*失败回调函数*/
        if (errFun) {
          errFun(xmlhttp)
        } else {
          reject(xmlhttp)
        }
      }
    }

    /*请求接收*/
    xmlhttp.onreadystatechange = ready

    /*接口连接，先判断连接类型是post还是get*/
    if(httpType == 'GET') {
      xmlhttp.open("GET",httpUrl,async);
      xmlhttp.send(null);
    }else if(httpType == 'POST'){
      xmlhttp.open("POST",httpUrl,async);
      //发送合适的请求头信息
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(requestData);
    }
  })
}
