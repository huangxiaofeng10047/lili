define("dist/index",["./models/ajax","./models/popbox","./models/validate","highcharts","kalendae"],function(t){var e=t("./models/ajax"),a=t("./models/popbox");if(t("./models/validate"),$(".ajax-form").on("submit",e.ajaxForm),document.getElementById("charts")&&document.getElementById("data-charts")){t("highcharts");var i=JSON.parse($("#data-charts").val()),n={categories:[],data:[]};for(var r in i)n.categories.push(r),n.data.push(i[r]);n.title="teach"===$("#data-charts").attr("data-flg")?"被提问":"提问",$("#charts").highcharts({chart:{},title:{text:n.title+"走势图",style:{color:"#900f49",fontSize:"28px",fontFamily:"MicroSoft YaHei"}},xAxis:{categories:n.categories},yAxis:{title:{text:n.title+"个数",style:{color:"#ff775c",fontFamily:"MicroSoft YaHei",fontWeight:"normal",fontSize:"14px"}}},legend:{enabled:!1},credits:{enabled:!1},tooltip:{formatter:function(){var t;return t=""+this.x+n.title+"个数： "+this.y+"个"}},series:[{type:"column",name:"问题个数",data:n.data}]})}-1!==location.href.indexOf("notice")&&(t("kalendae"),new Kalendae.Input("date",{months:1,format:"YYYY-MM-DD"})),$(".btn-del").on("click",function(){if(!confirm("确定删除吗？"))return!1;var t=$(this).attr("href"),e=new a.tinyTips;return $.post(t,{},function(t){1===t.flg?($(".tiny-tips").html('<span class="tiny-right"></span>'+t.msg+'<span class="tiny-end"></span>'),setTimeout(function(){t.redirect?window.location.href=t.redirect:window.location.reload()},2e3)):(e.close(),new a.tinyTips("error",t.msg))}),!1}),$(".teach-reply .btn-reply").on("click",function(){var t,e=$(this).parents("tbody");e.find(".answer").length?e.find("textarea").focus():(t='<tr class="answer form-inline"><td class="q">回答：</td><td class="aleft"><textarea name="reply"></textarea><a class="btn-reply btn q-reply">提交回答</a><a class="btn-reply btn cancel">取消</a></td></tr>',$(t).appendTo(e),e.find(".answer").hide().fadeIn("fast"))}),$("tbody").delegate(".q-reply","click",function(){var t=$(this).parents("tbody");if(!t.find("textarea").val().length)return new a.tinyTips("error","内容总不能为空吧？"),void 0;var e={id:t.attr("data-id"),answer:$.trim(t.find("textarea").val())};$.post("/teach/question",e,function(e){1===e.flg?(new a.tinyTips("right",e.msg),setTimeout(function(){t.fadeOut()},1500)):new a.tinyTips("error",e.msg)})}),$("tbody").delegate(".cancel","click",function(){var t=$(this).parents("tr");t.fadeOut("fast",function(){t.remove()})}),$("#thecat").on("change",function(){var t=$(this);if(!parseInt(t.val(),10))return window.location.href=window.location.pathname,void 0;var e=window.location.pathname+"/cat/get?cat="+t.val();$.get(e,function(e){if(e.success){for(var a,i="",n=0,r=e.list.length;r>n;n++)a=e.list[n].name,i+='<option value="'+a+'">'+a+"</option>";var o=t.parent();o.find("#getCat").remove(),i&&o.append('<select name="getCat" id="getCat"><option value="0">请选择..</option>'+i+"</select>")}else alert("服务器卖萌了！")})}),$("#select-cat").delegate("#getCat","change",function(){window.location.href=window.location.pathname+"?cat="+$("#thecat").val()+"&tag="+this.value})}),define("dist/models/ajax",["./popbox","./validate"],function(t,e){var a=t("./popbox"),i=t("./validate"),n=function(){for(var t=0,e=$(".require"),n=e.length;n>t;t++)if(!i.require.call(e[t]))return!1;var r=this.id,o=$(this).serialize();if("toteacher"==r&&0>o.indexOf("toteacher"))return new a.tinyTips("error","请选择老师"),!1;var s=new a.tinyTips;return $.ajax({url:$(this).attr("action"),type:$(this).attr("method"),data:o,dataType:"json",beforsend:function(){},success:function(t){1===t.flg?($(".tiny-tips").html('<span class="tiny-right"></span>'+t.msg+'<span class="tiny-end"></span>'),setTimeout(function(){t.redirect?window.location.href=t.redirect:window.location.reload()},500)):2===t.flg?(s.close(),$("#answers").html('<div class="grey-tips">'+t.answers.a+"</div>")):(s.close(),new a.tinyTips("error",t.msg))}}),!1};e.ajaxForm=n}),define("dist/models/popbox",[],function(t,e){function a(t,e){var a=this;this.render(),e||this.el.on("click",function(){a.close(),t.hide()})}function i(t,e,i){this.flag=t||"load",this.tips=e||'<em class="tiny-loading"></em>给力提交中……',this.time=i||2e3,this._overlay=new a(this,!0),this.render(t,e,i)}a.prototype.render=function(){this.el=$('<div class="overlay"></div>').appendTo("body")},a.prototype.close=function(){var t=this.el;t.remove()},e.overlay=a,e.init=function(t,e){var i=e?"":'<a class="close-btn close"></a>',n=$('<div class="popbox" style="opacity:0">'+i+'<div class="popbox-bd">'+t+"</div></div>").appendTo("body"),r=new a(n,!0);return n.css("margin-top",-Math.ceil(n.height()/2+150)),n.animate({marginTop:"+=50",opacity:1},500),n.find(".close").on("click",function(){n.animate({marginTop:"-=50",opacity:0},500,function(){n.remove(),r.close()})}),!1},i.prototype.render=function(){this.box=$('<div id="ajax_tips" class="tiny-tips-wrap" style="opacity:0"><div class="tiny-tips"><span class="tiny-'+this.flag+'"></span>'+this.tips+'<span class="tiny-end"></span></div></div>').appendTo("body");var t=this.box;if(t.css("margin-top",-Math.ceil(t.height()/2+150)),t.animate({marginTop:"-=50",opacity:1},500),"load"!=this.flag){var e=this;setTimeout(function(){e.close()},e.time)}},i.prototype.close=function(){var t=this.box,e=this;return"load"==this.flag?(t.remove(),e._overlay.close(),void 0):(t.animate({marginTop:"-=50",opacity:0},500,function(){t.remove(),e._overlay.close()}),void 0)},e.tinyTips=i}),define("dist/models/validate",["./popbox"],function(t,e){function a(t,e,a){$(t).next("span").html('<em class="help-'+e+'"></em>'+a)}var i=t("./popbox"),n={realname:{name:"真实姓名",rex:"^[一-龥]{2,}$",tips:"请输入真实姓名！",error:"真实姓名由中文组成！"},username:{name:"用户名",rex:"^[\\w]{3,10}",tips:"请输入用户名！",error:"用户名由字母、数字、下划线组成！"},email:{name:"邮箱",rex:"^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$",tips:"请输入邮箱",error:"邮箱格式出错！"},password:{name:"密码",rex:"^[\\w]{6,12}$",tips:"请输入6位以上的密码",error:"请输入6位以上的密码！"},repassword:{name:"重复密码",rex:"^[\\w]{6,12}$",tips:"请重复输入密码",error:"请输入6位以上的密码！"},website:{name:"网站名称",rex:"^[^\\s]+$",tips:"请输入网站名称",error:"网站名称至少两个字！"},url:{name:"网站地址",rex:"^[a-zA-z]+://[^\\s]*$",tips:"请输入网站地址",error:"网站地址出错！"},q:{name:"问题",rex:"^[^\\s]+$",tips:"请输入问题！",error:"问题不能为空哦！"}},r=function(){var t=this.name,e=$.trim(this.value);if("repassword"===t&&e!==$.trim($("#password").val()))return a(this,"error","两次密码不一致！"),!1;var i=RegExp(n[t].rex,"gi");if(i.test(e)){if("e-login"===$(this).attr("data-flag"))return $(this).next().html(""),!1;a(this,"right",""),this.style.cssText=""}else a(this,"error",n[t].error)};e.blurValidate=r,e.defTips=function(){a(this,"tips",n[this.name].tips)};var t=function(){var t=this.name,e=$.trim(this.value);if(0==e.length)return new i.tinyTips("error",n[t].name+"不能为空！"),!1;if("repassword"===t&&e!==$.trim($("#password").val()))return new i.tinyTips("error","两次密码不一致！"),!1;var a=RegExp(n[t].rex,"gi");return a.test(e)?!0:(new i.tinyTips("error",n[t].error),!1)};e.require=t});