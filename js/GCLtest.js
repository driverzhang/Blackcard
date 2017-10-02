/********************************************************************************************************
 * 作者: 郭重良
 * 最后修改日期: 2015-10-15
 * 修改记录:

 
 * 更新版本:GCLRun02
 * 更新时间:2016-05-31
 * 更新目的；扩展计算器插件，以便用让更多操作能用鼠标完成
 * 调用方式:$(Element).Calculator(),Element即使你需要获取计算器值的元素，触发返回值得按钮为界面上的√符号

 * 更新版本:GCLRun01
 * 更新时间:2016-01-21
 * 更新目的；添加通用API方法
 * 调用方式:di({
                ac: [
                    { C: "Postion", V: "临时工" },
                    { C: "Remark", V: "试用工人，按小时结账" }
                ],
                T: "JHPostion",
                un: "GCL",
                ad: [
                    {}
                ]
            });
           ts({
                T: "JHBoard",
                JC: [
                    { N: "Id", V: clickBood }
                ],
                JS: [
                    { CN: "BoardStare", CV: "正常" }
                ],
                un: "GCL"
            }, "开台成功");
        });


 * 更新版本:GCLTest02
 * 更新时间:2015-10-15:
 * 更新目的：优化弹出层、扩展拖动、扩展执行回调
 * 调用方式： $('#VipLogin').POPUP("VipLoginOpenPOPUP", "VipLoginClosenPOPUP", "#viplg", "F5Ends");
 * #VipLogin 参数需要转换为弹出层的元素(限制外部节点 并且需要设置弹出层widht与height,必须为ID)
 * VipLoginOpenPOPUP 触发展示弹出层的元素
 * ClosenRepassPOPUP 是给ID 为ClosenRepassPOPUP的注册点击事件 目的是为了关闭或者打开弹出层。并且设置thisIsOpen的状态 即窗体是开的还是关闭的  
 * #viplg 可以为ID 可以为class  目的是绑定拖动的层元素
 * F5Ends ClosenRepassPOPUP元素点击后，回调执行函数
 * 扩展信息:
 * 1、弹出层支持拖动
 * 2、弹出层内部Input默认附上class:gclInput,目的为了支持TabControl选项卡控件
 * 3、弹出层为了实现input绑定keydown keycode为13的按键事件，给所有无Id的Input控件赋值上了ID
 * 4、扩展自动Enter提交事件，但是提交的按钮class需含有GclSubmit
 * 注意事项；
 * 在页面中不要存在于Id一样的class样式，会抛出异常内存溢出或者该class元素被隐藏!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

 * 更新版本:TEST141110
 * 更新时间:2014-11-10:
 * 更新目的：扩展插件元素弹出层定位
  * 调用方式：  $('#VipLogin').POPUP("VipLoginOpenPOPUP", "VipLoginClosenPOPUP", "#viplg");
 * #VipLogin 参数需要转换为弹出层的元素(限制外部节点 并且需要设置弹出层widht与height,必须为ID)
 * VipLoginOpenPOPUP 触发展示弹出层的元素
 * ClosenRepassPOPUP 是给ID 为ClosenRepassPOPUP的注册点击事件 目的是为了关闭或者打开弹出层。并且设置thisIsOpen的状态 即窗体是开的还是关闭的  
 * #viplg 可以为ID 可以为class  目的是绑定拖动的层元素

 * 创建时间：2014/5/19
 ********************************************************************************************************/

function GCLShowOption(id) {
    var img = $('#' + id);
    if (img[0].complete) {
        var left = (($("body").width() - $('#gclshowImg').width()) / 2);
        var top = (($(window).height() - $('#gclshowImg').height()) / 2);
        $('#GCLhiShow').css("left", left);
        $('#GCLhiShow').css("top", top);
        $('.gclwaitingImg').css("display", "none");
        $('#gclshowImg').css("display", "block");
    } else {
        img.onload = function () {
            img.onload = null;
        };
        setTimeout("GCLShowOption('" + id + "');", 50);

    };
}
function GCLCloseImgToDiv(cl) {
    var $img = cl;

    var imgCount = $img.length;

    $img.load(function () {

        imgCount--;

        if (imgCount == 0) {

            $('.GCLwaitimg').css("display", "none");

        }

    });
    setTimeout(function () { GCLCloseImgToDiv(cl); }, 50);
}
var bodyW = document.documentElement.clientWidth;
var bodyH = document.documentElement.clientHeight;
var thisIsOpen = false;
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//$(document).ready(function () {
//    var vhtml = '<div id="allmap"  style="display:none;"></div>';
//    $("body").append(vhtml);
//    var map = new BMap.Map("allmap");
//    var point = new BMap.Point(104.65423, 28.7696748);
//    map.centerAndZoom(point, 12);
//    var geolocation = new BMap.Geolocation();
//    geolocation.getCurrentPosition(function (r) {
//        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//            var mk = new BMap.Marker(r.point);
//            map.addOverlay(mk);
//            map.panTo(r.point);
//            $('#LONG').val(r.point.lng);
//            $('#disme').val(r.point.lat);
//            eval('tomap('+r+')');
//            var ar = new Array();
//            ar.LONG = r.point.lng;
//            ar.Dismension = r.point.lat;
//            ar.InterfaceAddress = "api/Mapapi";
//            var openId = getQueryString('nickname') == null ? "" : getQueryString('nickname');
//            var nickname = getQueryString('openid') == null ? "" : getQueryString('openid');
//            ar.openId = openId;
//            ar.nickname = nickname;
//            aes(ar, "endClick");
//        }
//        else {
//            alert('failed' + this.getStatus());
//        }
//    }, { enableHighAccuracy: true })
//    function endClick(rs) {
//    }
   
//    function tomap(r) {
//        var ar = new Array();
//        ar.LONG = r.point.lng;
//        ar.Dismension = r.point.lat;
//        ar.InterfaceAddress = "api/Mapapi";
//        aes(ar, "endClick");
//    }
//});
var isCancleButton = false;
(function ($) {
    $.extend($.fn, {
        gclClear: function (Element, HtmlElement) {
            $("" + Element + " " + HtmlElement).val();
        },
        POPUP: function (Element, isPaste, showMask, CloseBackFun, openBackFun, RVToID) {
            //$('#popuptocss').POPUP("ClosenRepassPOPUP", "repassID");调用方式
            //Element 参数需要转换为弹出层的元素(限制外部节点 并且需要设置弹出层widht与height)
            //isPaste 触发弹出层的元素 事件为click
            var $this = $(this);
            var POPhtml = "";
            bodyW = document.documentElement.clientWidth;
            bodyH = document.documentElement.clientHeight;
            var left = $(this).width();
            var top = $(this).height();
            var zleft = (bodyW - left) / 2;
            var ztop = (bodyH - top) / 2;
            var popcshtml = $(this).html();
            $(this).attr("style", "display:block");
            if (ztop < 0) { ztop = 0; }
            if (zleft < 0) { zleft = 0; }
            POPhtml += '<div style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:1000;display:none;" class="' + Element + ' GCLAllPopup">';
            POPhtml += '<div style="width:100%;height:100%;position: absolute; opacity: 0.4; filter: alpha(opacity=40);background-color:#070707;"  ></div>';
            POPhtml += '<div style="position: absolute;margin:auto auto; left: ' + zleft + 'px; top: ' + ztop + 'px;z-index:10000;"  tabIndex="1" class="GCLPOP ' + isPaste + '">';
            POPhtml += '<input type="text" style="display:none;">';
            POPhtml += popcshtml;
            //POPhtml += '<input type="button" value="关闭" class="btClose"></div>';
            POPhtml += '</div>';
            POPhtml += '</div>';
            $(this).html(POPhtml);

            var $index = 0;
            $('.' + Element + ' input[type=text]').addClass("gclInput");
            $('.' + Element + ' input[type=password]').addClass("gclInput");
            $('.' + Element + ' .gclInput').each(function () {//避免Input元素无ID，给无Id的Input元素赋值，格式为转换元素id+Input索引
                var $t = $(this);
                if ($t.attr("id") == undefined) {
                    $t.attr("id", $this.attr("id") + $index);
                    $index++;
                }
            });

            $('.' + Element + ' .gclInput').click(function () {//Input元素必须包含ID
                $this.bind("keydown", function (kd) {
                    if (kd.keyCode == 13) {
                        var $this = $(this);
                        var i = 0;
                        $('.' + Element + ' .gclInput').each(function () {
                            i++;
                            if ($(this).attr("id") == $this.attr("id")) {
                                var $index = i;
                                if ($index == $('.' + Element + ' .gclInput').size()) {
                                    if ($('.' + Element + ' .gclInput').size() > 0)
                                        $('.' + Element + ' .GclSubmit')[0].click();
                                }
                                else {
                                    $('.' + Element + ' .gclInput')[$index].focus();
                                }
                            }
                        });
                        $('body').unbind("keydown");
                        return false;
                        //$('.btn-primary').click();
                    }
                    else if (kd.keyCode == 27) {
                        if ($('.' + Element + ' .gclCancleButton').size() > 0)
                            $('.' + Element + ' .gclCancleButton').click();
                        else
                            $('#' + isPaste).click();
                        $('body').unbind("keydown");
                        //$(this).css("style", "none");
                        return false;
                    }

                });

            });
            $('#' + Element + '').click(function () {
                $('.' + Element + '').toggle();
                isCancleButton = false;
                if ($('.' + Element + ' .gclInput').size() > 0) {
                    $('.' + Element + ' .gclInput')[0].click();

                }
                if (thisIsOpen) thisIsOpen = false;
                else thisIsOpen = true;
                if (openBackFun != undefined)
                    if (!thisIsOpen) {
                        if (RVToID == undefined)
                            eval('' + openBackFun + '(thisIsOpen)');
                        else
                            eval('' + openBackFun + '(' + RVToID + ')');
                    }
            });
            $('#' + isPaste + '').click(function () {
                $('.' + Element + '').toggle();
                isCancleButton = true;
                if ($('.' + Element + ' .gclInput').size() > 0) {
                    $('.' + Element + ' .gclInput')[0].click();

                }
                if (thisIsOpen) thisIsOpen = false;
                else thisIsOpen = true;
                if (CloseBackFun != undefined)
                    eval('' + CloseBackFun + '(thisIsOpen)');
            });

            $(showMask).drag('.' + isPaste);
        },
        Calculator: function (Element) {
            ///只需要前面的元素为你需要返回值的元素就ok
            if ($('#calcuatorBod').size() > 0) {

            }
            else {
                var CalHtml = '';
                CalHtml += ' <div id="calcuatorBod" style="width: 200px;height: 245px;">';
                CalHtml += ' <div id="calcuator">';
                CalHtml += ' <input type="text" id="input-box" value="0" size="21" maxlength="21" readonly="readonly" name="type">';
                CalHtml += ' <div id="btn-list">';
                CalHtml += ' <div class=" btn-30 btn-radius color-red clear-marginleft">C</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue">+/-</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue">%</div>';
                CalHtml += ' <div class=" btn-70 btn-radius color-red font-14">←</div>';
                CalHtml += ' <div class=" btn-30 btn-radius clear-marginleft">7</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">8</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">9</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue font-14">+</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue font-14">-</div>';
                CalHtml += ' <div class=" btn-30 btn-radius clear-marginleft">4</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">5</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">6</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue font-14">×</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue font-12">÷</div>';
                CalHtml += ' <div class=" btn-30 btn-radius clear-marginleft">1</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">2</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">3</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue font-14">×²</div>';
                CalHtml += ' <div class=" btn-30 btn-radius color-blue font-12" id="calcuatorYES">√</div>';
                CalHtml += ' <div class=" btn-70 btn-radius clear-marginleft">0</div>';
                CalHtml += ' <div class=" btn-30 btn-radius">.</div>';
                CalHtml += ' <div class=" btn-70 btn-radius color-red font-14">=</div>';
                CalHtml += ' <div id="Mock" style="display:none"></div></div>';
                CalHtml += ' </div>';
                CalHtml += ' </div>';
                $("body").append(CalHtml);
                $('#calcuatorBod').POPUP("Mock", "", "");

            }
            var LastNum = 0;
            var LastSign = "";
            var InventSign = "";
            var $Tthis = $(this);
            $('.btn-radius').unbind("click");
            $('.btn-radius').click(function () {
                var $this = $(this).text();
                var reg = /^[\.0-9]+$/;
                var numm = $('#input-box').val() == "0" ? "" : $('#input-box').val();//当前屏幕显示
                var boole = false;
                if ($this == "√") {
                    var doDocumentType = document.getElementById($Tthis.attr("Id")).nodeName;
                    $Tthis.focus();
                    if (doDocumentType == "INPUT") {
                        $Tthis.val(parseFloat($('#input-box').val()));
                    }
                    else {
                        $Tthis.text(parseFloat($('#input-box').val()));
                    }
                    $('#Mock').click();
                }
                else {
                    if ($this == "=") {

                    }
                    else if ($this == "C") {
                        LastSign = "";
                        LastNum = 0; boole = true;
                    }
                    else if ($this == "←") {
                        numm = numm.substring(0, numm.length - 1);
                        LastNum = numm; boole = true;
                    }
                    else {
                        if (!reg.test(numm.substring(numm.length - 1)) && !reg.test($this)) {
                            numm = numm.substring(0, numm.length - 1);
                        }
                        LastNum = numm + $this;
                    }
                    if (!reg.test($this)) //输入不为数字
                        if (!reg.test(numm)) //当前框不为数字
                            $('#input-box').val(MathToSign(LastNum, LastSign, $this));
                        else
                            $('#input-box').val(MathToSign(LastNum, LastSign, $this));
                    else//输入为数字
                        $('#input-box').val(LastNum);
                    if (!reg.test($this) && !boole) {//输入不为数字
                        LastSign = $this;
                    }
                }
            });//注册事件

        },
        showimgToBig: function (Element, isPaste, showMask) {
            //$("body").waitimg();
            var left = (bodyW - 200) / 2;
            var top = (bodyH - 200) / 2;
            var winW = $(window).width();
            var winH = $(window).height();
            var html = '';
            html += '<div style="position: fixed; left: 0; top: 0; width: 100%; height: 100%;z-index:10001" class="GCLShowimg">';
            html += ' <div style="width:100%;height:100%;position: absolute; opacity: 0.4; filter: alpha(opacity=40);background-color:#070707;" ></div>';
            html += '<div style="position: absolute;margin:auto auto; left: ' + left + 'px; top: ' + top + 'px;z-index:10000;" id="GCLhiShow">';
            html += ' <img src="/Content/imgs/imgLoading.gif?1=1" class="gclwaitingImg" />';
            html += '<img src="' + Element + '?temp=' + (new Date().getTime().toString()) + '" style="display:none;max-width:' + (winW - 10) + 'px;max-height:' + (winH - 10) + 'px" id="gclshowImg" />';
            html += '</div>';
            html += '</div>';
            $("body").append(html);
            $('.GCLShowimg').on("click", function () {
                $(this).remove();
            });
            $('#GCLhiShow').on("click", function () {
                return false;
            });
            left = ((bodyW - $('#gclshowImg').width()) / 2);
            top = ((bodyH - $('#gclshowImg').height()) / 2);
            //$('img').on("onload", function () {
            //    $('#GCLhiShow').css("left", left);
            //    $('#GCLhiShow').css("top", (top > 0 ? top + "px" : $('#GCLhiShow').css("top")));
            //});
            GCLShowOption("gclshowImg");
        },
        GCLH5UploadFile: function (imgData, success) {
            if ($('#gCLH5UploadFiles').size() == 0) {
                var h5UploadFile = '<div id="gCLH5UploadFiles" style="width: 580px; display: none; height: 400px; position: fixed;">';
                h5UploadFile += '<div style="width: 580px; height: 470px; border-radius: 8px; border: 1px solid; background-color: #64b7f6; margin: auto auto;">';
                h5UploadFile += '<div style="height: 4%; min-height: 34px; width: 100%; font-size: 30px; color: #ffffff; cursor: pointer;" id="gCLH5UploadFilesHeader">&nbsp;文件上传</div>';
                h5UploadFile += '<div style="background-color: #e0eef9; width: 99%; height: 89%; margin: auto auto;">';
                h5UploadFile += '   <div class="row">';
                h5UploadFile += '       <label for="fileToUpload">Select a File to Upload</label><br />';
                h5UploadFile += '       <input type="file" name="fileToUpload" multiple id="fileToUpload" onchange="fileSelected();" />';
                h5UploadFile += '    </div>';
                h5UploadFile += '   <div id="list"></div>';
                h5UploadFile += '   <div id="fileSize"></div>';
                h5UploadFile += '   <div id="fileType"></div>';
                h5UploadFile += '   <div class="row">';
                h5UploadFile += '       <input type="button" onclick="uploadFile()" value="Upload" />';
                h5UploadFile += '       <input type="button" id="gCLH5UploadFilesOpen" class="gclCancleButton" style="display: none;"  onclick="uploadFile()" value="Upload" />';
                h5UploadFile += '   </div>';
                h5UploadFile += '   <div id="progressNumber"></div>';
                h5UploadFile += '   <div id="gCLH5UploadFilesOpen"></div>';
                h5UploadFile += ' </div>';
                h5UploadFile += ' </div>';
                h5UploadFile += '</div>';
                $('body').append(h5UploadFile);
                $('#gCLH5UploadFiles').POPUP("gCLH5UploadFilesOpen", "", "#gCLH5UploadFilesHeader");
            } else {
                uploadComplete(imgData);
                $('#gCLH5UploadFilesOpen').click();
            }

        }
    });
    $.extend($.fn, {
        waitimg: function (Element, isPaste, showMask) {
            var left = ($("body").width() - 200) / 2;
            var top = ($("body").height() - 200) / 2;
            var html = '';
            html += '<div style="position: fixed; left: 0px; top: 0; width: 100%; height: 100%; opacity: 0.4; filter: alpha(opacity=40);z-index:9999;" class="' + Element + '">';
            html += ' <div style="width:100%;height:100%;background-color:#070707;position: absolute; opacity: 0.4; filter: alpha(opacity=40);" ></div>';
            html += '<div style="position: fixed; left: ' + left + 'px; top: ' + top + 'px; width: 200px; height: 200px;" id="hiwait">';
            html += '<img src="/Content/themes/gcl/Img/wait.gif" />';
            html += '</div>';
            html += '</div>';
            if ($('.' + Element).size() > 0) {
                $('.' + Element).click();
            }
            else {
                $("body").append(html);
                $('.' + Element).click(function () {//可要可不要
                    $('.' + Element).toggle();
                });
            }
        }
    });
    $.extend($.fn, {
        waitimgToDiv: function (Element, isPaste, showMask) {
            var width = $(this).eq(0).width();
            var heigth = $(this).eq(0).height();
            var margintop = $(this).eq(0).css("margin-top");
            var marginright = $(this).eq(0).css("margin-right");
            if (!(margintop.indexOf("px") || margintop.indexOf("PX"))) { margintop += "px"; }
            if (width < 200) { width = 200; }
            if (heigth < 200) { heigth = 200; }
            var left = (width - 200) / 2;
            var top = (heigth - 200) / 2;
            if (top < 0) { top = 0; }
            var cshtml = $(this).eq(0).html();
            var html = '';
            html += ' <div style="position: absolute;width:' + width + 'px;height:' + heigth + 'px;margin-top:' + margintop + '; opacity: 0.4; filter: alpha(opacity=40);" class="GCLwaitimg">';
            html += '  <div style="width:100%;height:100%;background-color:#070707;position: absolute; opacity: 0.4; filter: alpha(opacity=40);" ></div>';
            html += '<div style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; width: 200px; height: 200px;" id="hiwait">';
            html += ' <img src="/Content/themes/gcl/Img/wait.gif" />';
            html += '</div>';
            html += '</div>';
            $(this).before(html);
            GCLCloseImgToDiv(this);
        }
    });

})(jQuery);


//转json数组
function JsonToStrByArray(o) {
    var arr = [];
    var isArr = function (v) {
        return toString.apply(v[0]) === '[object Array]' || toString.apply(v[0]) === '[object Object]' || toString.apply(v[0]) === '[object String]';
    }
    var fmt = function (s) {
        if (typeof s == 'object' && s != null)
            return JsonToStrByArray(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    }
    if (isArr(o)) {
        for (var i in o) {//如果O是数组 I第一次为实体
            if (i != "contains") {
                arr.push(fmt(o[i]));//实体传入后等待遍历执行完毕返回参数
            }
        }
        return '[' + arr.join(',') + ']';
    }
    for (var i in o) {
        if (i != "contains") {
            arr.push("'" + i + "':" + fmt(o[i]));
        }
    }
    return '{' + arr.join(',') + '}';
}
//拖动
(function ($) {
    $.extend($.fn, {
        drag: function (dragElement, isPaste, showMask) {
            var ieVersion = (function () {
                var undef,
                    v = 3,
                    div = document.createElement('div'),
                    all = div.getElementsByTagName('i');
                while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );
                return v > 4 ? v : undef;

            }());
            var $this = $(this).eq(0);
            var $drg = $(dragElement).eq(0);
            //if (!$drg.parent().is("body")) {
            //    return this;
            //}
            if (ieVersion <= 6) {
                $drg.wrap('<div style="position:absolute;width:0px;height:0px;left:expression(eval(document.documentElement.scrollLeft));top:expression(eval(document.documentElement.scrollTop));"></div>');
            }
            else {
                $drg.wrap('<div style="position:fixed;left:0px;top:0px;width:0px;height:0px;"></div>');
            }
            var $parent = $drg.parent();
            var $mask = $('<div style="position:absolute;top:0px;left:0px;display:none;"></div>');
            if (showMask) {
                if (ieVersion <= 6) {
                    $mask.css({
                        "background-image": "url(1)"
                    });
                }
                else {
                    $mask.css({
                        "background-color": "#000"
                    });
                }
                $parent.prepend($mask);
                $mask = $parent.children(":eq(0)");
                $mask.css({
                    width: $(window).width(),
                    height: $(window).height(),
                    "z-index": $drg.css("z-index")
                });
                $mask.fadeTo("fast", 0.3);
                $(window).on("resize", function () {
                    $mask.css({
                        width: $(window).width(),
                        height: $(window).height()
                    });
                });
            }
            $parent.css("z-index", $drg.css("z-index"));
            var downMousePos = {
                x: 0,
                y: 0
            };
            var nowMousePos = {
                x: 0,
                y: 0
            };
            var downTargetPos = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            var nowTargetPos = {
                x: 0,
                y: 0
            };

            var windowSize = {
                width: 0,
                height: 0
            };
            var _dragHandler = function (ev) {
                nowMousePos.x = ev.clientX;
                nowMousePos.y = ev.clientY;
                nowTargetPos.x = downTargetPos.x + (nowMousePos.x - downMousePos.x) - $(window).scrollLeft();
                nowTargetPos.y = downTargetPos.y + (nowMousePos.y - downMousePos.y) - $(window).scrollTop();
                if (isPaste) {
                    if (nowTargetPos.x + downTargetPos.width + 20 > windowSize.width) {
                        nowTargetPos.x = windowSize.width - downTargetPos.width;
                    }
                    if (nowTargetPos.y + downTargetPos.height + 20 > windowSize.height) {
                        nowTargetPos.y = windowSize.height - downTargetPos.height;
                    }
                    if (nowTargetPos.x < 20) {
                        nowTargetPos.x = 0;
                    }
                    if (nowTargetPos.y < 20) {
                        nowTargetPos.y = 0;
                    }
                }
                $drg.css({
                    left: Math.floor(nowTargetPos.x),
                    top: Math.floor(nowTargetPos.y)
                });
                return false;
            };
            var _mouseUpHandler = function () {
                $drg.fadeTo(100, 1);
                $(document).off("mousemove", _dragHandler);
                $(document).off("mouseup", _mouseUpHandler);
                return false;
            }
            $this.on("mousedown", function (ev) {
                if (ev.which == 1) {
                    downMousePos.x = ev.clientX;
                    downMousePos.y = ev.clientY;
                    var offs = $drg.offset();
                    downTargetPos.x = offs.left;
                    downTargetPos.y = offs.top;
                    downTargetPos.width = $drg.outerWidth(false);
                    downTargetPos.height = $drg.outerHeight(false);
                    windowSize.width = $(window).width();
                    windowSize.height = $(window).height();
                    $drg.fadeTo(100, 0.6);
                    $(document).on("mousemove", _dragHandler);
                    $(document).on("mouseup", _mouseUpHandler);
                    return false;
                }
            });
            return this;
        }
    });
})(jQuery);

//文件上传
function fileSelected() {
    var output = [];
    var files = document.getElementById('fileToUpload').files;
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    //var file = document.getElementById('fileToUpload').files[0];
    //if (file) {
    //    var fileSize = 0;
    //    if (file.size > 1024 * 1024)
    //        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    //    else
    //        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

    //    document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
    //    document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
    //    document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    //}
}

function uploadFile(urlId, commend, url, uploadComplete) {
    var output = [];
    var files = document.getElementById(urlId).files;
    var fd = new FormData();
    for (var i = 0, f; f = files[i]; i++) {
        fd.append(commend, f);
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    fd.append("userName", "gcl");
    if (document.getElementById('list') != undefined)
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    eval('xhr.addEventListener("load", ' + uploadComplete + ', false)');
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", url);
    xhr.send(fd);
}

function uploadProgress(evt) {
    if (document.getElementById('progressNumber') != undefined) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
        }
        else {
            document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }
}

//function uploadComplete(evt) {
//    /* This event is raised when the server send back a response */
//    evt.target.responseText;
//    //alert(evt.target.responseText);
//}

function uploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}

function CurreRowSpan(row, cell, merge) {
    this.Row = row;
    this.Cell = cell;
    this.Merge = merge;
}

function autoRowSpan(tbID, row, col) {
    var value = "";
    var pos = 1;
    var CurreRowSpanA = new Array();
    var isMoreRowspan = false;
    var MoreNumCol = 0;
    if (col == 0) {
        col = tbID.rows[0].cells.length;
    }
    for (var j = 0; j < col; j++) {
        var lastValue = "GclUndefined1000*"; var MoreNumRow = 0; var cellHasNum = 0;
        for (var i = 1; i < tbID.rows.length; i += tbID.rows[i].cells[j - cellHasNum].rowSpan) {
            for (var ii = 0; ii < CurreRowSpanA.length; ii++) {
                if (CurreRowSpanA[ii].Row == i) {
                    cellHasNum = CurreRowSpanA[ii].Merge;
                }
            }
            value = tbID.rows[i].cells[j - cellHasNum].innerHTML;
            if (lastValue == value) {
                //if (tbID.rows[i - pos].cells[row].innerHTML == tbID.rows[i].cells[j - cellHasNum].innerHTML) {
                tbID.rows[i].deleteCell(j - cellHasNum);
                tbID.rows[i - pos].cells[j].rowSpan = tbID.rows[i - pos].cells[j].rowSpan + 1;
                pos++;
                var numnum = 0;
                for (var ii = 0; ii < CurreRowSpanA.length; ii++) {
                    if (CurreRowSpanA[ii].Row == i) {
                        numnum++;
                    }
                }
                var a = new CurreRowSpan();
                a.Row = i;
                a.Cell = j;
                a.Merge = ++numnum;
                CurreRowSpanA.push(a);
                //}
            } else {
                lastValue = value;
                pos = 1;
            }
        }
    }
}

//定义窗口的 宽和高
function bodyResize() {
    var creenWidth = $(window).width();
    var creenHerght = $(window).height();
    $('body').height(creenHerght);
    $('body').width(creenWidth);
    $('.posTableS').css("min-height", creenHerght * 0.643);
}



var toi = 0;
//更新小部分字段
function ts(search, SayToWindow, CloseBackFun) {
    $("body").waitimg();
    toi++;
    $.ajax("/api/ApiUpdateData?" + toi, {
        dataType: "json",
        type: "Post",
        data: search,
        error: function (xhr) {
            if (xhr.statusCode == 401 || xhr.status == 403) {
                simplenoty("无权限访问数据", "error");
                if (CloseBackFun != undefined)
                    eval('' + CloseBackFun + '(xhr)');
            }
            else {
                simplenoty("获取数据失败", "error");
                if (CloseBackFun != undefined)
                    eval('' + CloseBackFun + '(xhr)');
            }
            $("body").waitimg();

        },
        success: function (result) {
            if (result == "" || result == undefined) {
                simplenoty("没有数据!", "error");
                if (CloseBackFun != undefined)
                    eval('' + CloseBackFun + '(result)');
            }
            else {
                if (!(SayToWindow == '' || SayToWindow == undefined))
                    simplenoty(SayToWindow, "success");
                if (CloseBackFun != undefined)
                    eval('' + CloseBackFun + '(result)');

            }
            $("body").waitimg();
        }
    });
}


function di(search, SayToWindow, CloseBackFun) {
    toi++;
    $("body").waitimg();

    $.ajax("/api/ApiAddData?" + toi, {
        dataType: "json",
        type: "Post",
        data: search,
        error: function (xhr) {
            if (xhr.statusCode == 401 || xhr.status == 403) {
                simplenoty("无权限访问数据", "error");
                eval('' + CloseBackFun + '(thisIsOpen)');
            }
            else {
                simplenoty("获取数据失败", "error");
                eval('' + CloseBackFun + '(thisIsOpen)');
            }
            $("body").waitimg();

        },
        success: function (result) {
            if (result == "" || result == undefined) {
                simplenoty("执行出错!", "error");
                eval('' + CloseBackFun + '(thisIsOpen)');
            }
            else {
                if (!(SayToWindow == '' || SayToWindow == undefined))
                    simplenoty(SayToWindow, "success");
                if (CloseBackFun != undefined)
                    eval('' + CloseBackFun + '(thisIsOpen)');
            }
            $("body").waitimg();
        }
    });
}

//    时间截取   ar.Handshake_Time = CurentTime('-', true);
function CurentTime(fengefu, IsHasHM) {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var clock = year + fengefu;
    if (month < 10)
        clock += "0";  // 1994-0
    clock += month + fengefu; //1992-09-
    if (day < 10)
        clock += "0"; //1994-09-0
    if (IsHasHM) {
        clock += day + " "; //1994-09-01 

        if (hh < 10)
            clock += "0"; //1994-09-01 0

        clock += hh + ":"; //1994-09-01 09:
        if (mm < 10) clock += '0';
        clock += mm; // 1994-09-01 09:04
    }
    else {
        clock += day; //J-845  没有时 分 只有 1994-09-01 
    }
    return (clock);
}




function MathToSign(Num, Sign, ThisSign) {
    if (Num == 0 && Sign == "") return 0;
    var n = Num.split(Sign);
    if (n.length > 1 && n[1] != "") {
        n[1] = n[1].replace(ThisSign, "");
        if (ThisSign == "=") ThisSign = "";
        if (Sign == "-") {
            return parseFloat(n[0]) - parseFloat(n[1]) + ThisSign;
        }
        else if (Sign == "+") {
            return parseFloat(n[0]) + parseFloat(n[1]) + ThisSign;
        }
        else if (Sign == "×") {
            return parseFloat(n[0]) * parseFloat(n[1]) + ThisSign;
        }
        else if (Sign == "÷") {
            return parseFloat(n[0]) / parseFloat(n[1]) + ThisSign;
        }
    }
    return Num;
}
