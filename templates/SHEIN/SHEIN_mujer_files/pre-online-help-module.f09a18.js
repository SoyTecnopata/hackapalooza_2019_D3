(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{"4k/o":function(o,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=t(n("im6h")),l=t(n("e9ww"));function t(o){return o&&o.__esModule?o:{default:o}}i.default={ga:e.default,Ba:l.default}},HlIf:function(o,i,n){"use strict";var e=function(o){return o&&o.__esModule?o:{default:o}}(n("dUc8"));n("4k/o"),window.preRobotLogin=new Vue({template:e.default,el:".pre-robot-login-container",data:{showloginModal:!1,showVisitConfrimModal:!1,forgetPassword:!1,true:!0,false:!1,loginContent:1,visit_confrim_tip:SHEIN_W.htmlDecode(GB_S_LoginCom_labels.visit_confrim_tip),loginType:"liveChat",noText:GB_S_LoginCom_labels.btn_no,yesText:GB_S_LoginCom_labels.btn_yes,loading:!1,loginModalText:{}},methods:{loginModalShow:function(){this.showloginModal=!0,window&&(window.biClickLoginPageFrom="liveChat")},loadingShow:function(){this.loading=!0},loadingClose:function(){this.loading=!1},loginModalClose:function(o){if(this.showloginModal=!1,o){var i=1==this.loginContent?"Sign-ClickLiveChat":"Register -ClickLiveChat";onlineHelpLoginPopGA({action:"ClosePopUps",label:i}),this.loginContent=1}window&&(window.biClickLoginPageFrom=null)},showVisitConfrim:function(){this.loginModalClose(),onlineHelpLoginPopGA({action:"PopUpsSignIn-LiveChat",label:"ClickVisitorMode"}),this.confrimModalShow()},confrimModalShow:function(){this.showVisitConfrimModal=!0,onlineHelpLoginPopGA({action:"PopUps",label:"VisitorModeTips"})},confrimModalClose:function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=this;if(this.showVisitConfrimModal=!1,"btn"==o)setTimeout(function(){i.loginModalShow(),null},400);onlineHelpLoginPopGA("icon"==o?{action:"ClosePopUps",label:"VisitorModeTips"}:{action:"PopUps-LiveChatTips",label:"ClickOk"})},confrimOk:function(){SHEIN_W.setCookie("visitConfrim","1",900),this.showVisitConfrimModal=!1,onlineHelpLoginPopGA({action:"PopUps-LiveChatTips",label:"ClickYes"}),BI_pageId_38982583("click_no_login_pop_yes",{}),this.loadingClose(),window.open(location.origin+"/robot?page=NoLoginPage")},loginRegSwitch:function(o){var i=this;this.loginModalClose(),this.loginContent="login"==o?1:2,onlineHelpLoginPopGA("login"==o?{action:"PopUpsRegister-LiveChat",label:"ClickSignIn"}:{action:"PopUpsSignIn-LiveChat",label:"ClickRegister "});setTimeout(function(){i.loginModalShow(),null},400)},loginModalSucCb:function(){if(this.loginModalClose(),void 0!==window.zESettings&&(window.zESettings.webWidget.offset.horizontal="365px"),1!=SHEIN_W.getCookie("visitConfrim"))try{sessionStorage.setItem("reloadforChat","true"),window.location.reload(!0)}catch(o){console.error(o)}else SHEIN_W.userModule.update_top_login(),showPreRobot()}}}),window.showPreRobot=function(){$.ajax({type:"POST",url:"/user/auth/getUserInfo",success:function(o){null!=o.username?window.open(location.origin+"/robot?page=navigationBar"):1==SHEIN_W.getCookie("visitConfrim")?window.open(location.origin+"/robot?page=NoLoginPage"):(preRobotLogin.loginModalShow(),BI_pageId_38982583("expose_login_pop",{trigger:"live_chat"}),onlineHelpLoginPopGA({action:"PopUps",label:"Sign-ClickLiveChat"}))}})}},dUc8:function(o,i){o.exports='<div class="pre-robot-login-container"  v-cloak>\n    \x3c!-- 登陆注册弹窗 --\x3e\n    <modal-vue :show="showloginModal" :relative-width-m="false" padding="40px 30px 30px" :smaller="true" :force="true" @cancel="loginModalClose" class="c-login">\n            <div slot="title"></div>\n            <login-vue ref="mainLogin" :login-modal-text="loginModalText" :loginType="loginType" :loginContent="loginContent" @loginRegSwitch="loginRegSwitch" @showVisitConfrim="showVisitConfrim" @login-suc-callback="loginModalSucCb" :forget-password="forgetPassword"></login-vue>\n            <div slot="footer"></div>\n        </modal-vue>\n    \x3c!-- 访客弹窗 --\x3e\n    <modal-vue :show="showVisitConfrimModal" :oktext="yesText" :canceltext="noText" :relative-width-m="false" padding="40px 65px 30px" :full="true" :force="true" @ok="confrimOk" @cancel="confrimModalClose">\n            <div slot="title"></div>\n            <p class="she-text" v-if="loginModalText" v-html="loginModalText.secondPrompt"></p>\n        </modal-vue>\n    \x3c!-- loading --\x3e\n    <div class="full-loading-container" v-if="loading">\n        <div  class="la-ball-pulse la-ball-pulse-2x  la-ball-pulse loading-content">\n            <div></div>\n            <div></div>\n            <div></div>\n        </div>\n    </div>\n\n\n</div>\n'},e9ww:function(o,i,n){"use strict";window.BI_pageId_38982583=function(o,i){void 0===window.SaPageInfo&&(window.SaPageInfo={page_id:0,page_name:"page_other",page_param:{},start_time:(new Date).getTime()});var n=$.extend({},window.SaPageInfo,{activity_name:o,activity_param:i});sa("send",n)},$(document).on("click",".j-ga-submit-ticket",function(){BI_pageId_38982583("click_top_site_help_ticket")}),$(document).on("click",".j-ga-submit-faq",function(){var o=$.extend({},{page_id:1,page_name:"page_home",page_param:"",activity_name:"click_faq",activity_param:{ent1:"customer"}});sa("send",o)}),$(document).on("click",".j-ga-submit-call",function(){BI_pageId_38982583("click_top_site_help_call_reservation")})},im6h:function(o,i,n){"use strict";window.onlineAskGa={clickAskGa:function(o,i){GBGaSend({category:o,action:"ClickAsk",label:i})},clickViewOriginalGa:function(o,i){GBGaSend({category:o,action:"ClickViewOriginalArticle",label:i})},clickManualService:function(o){GBGaSend({category:o,action:"ClickManualService"})},clickLikeGa:function(o){GBGaSend({category:o,action:"ClickLike",label:"Yes"})},clickDislikeGa:function(o){GBGaSend({category:o,action:"ClickDislike",label:"No"})},ClickMessengeGa:function(){GBGaSend({category:"导航栏",action:"ClickMessenge",label:"No"})},ClickCustomerServiceGa:function(){GBGaSend({category:"导航栏",action:"ClickCustomerService",label:"No"})}},window.onlineArticleGa=function(o){var i=o.target.innerHTML;onlineAskGa.clickViewOriginalGa("导航栏",i)},window.onlineHelpLoginPopGA=function(o){GBGaSend({category:"登录注册页",action:o.action,label:o.label})}}}]);
//# sourceMappingURL=pre-online-help-module.f09a18.js.map