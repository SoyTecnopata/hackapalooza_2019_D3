(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{"73lR":function(e,i,t){"use strict";gbCommonInfo.lang;var s=gbSsrData;s.cat_info,s.filterAttrs,s.language;window.listNavList=!0,window.gb_querys=window.location.search.slice(1).split("&").reduce(function(e,i){var t=i.split("=");return e[t[0]]=decodeURIComponent(t[1]||""),e},{});var r=new function(){this.container=$(".container-fluid-2200"),this.filters=[],this.attrsData={attrs:[]},this.data={hasClickedPrice:!1,hasClickedDiscount:!1,isDisc:gb_querys.is_disc||"",selectPir:gb_querys.selectPir||-1},this.actionLock=0,this.initData=function(){if("function"==typeof GB_SHEIN_sideSmartScroll&&GB_SHEIN_sideSmartScroll(),gb_querys.min_price&&($(".j-range-min-price").val(gb_querys.min_price),$(".j-price-lajitong").show()),gb_querys.max_price&&($(".j-range-max-price").val(gb_querys.max_price),$(".j-price-lajitong").show()),!gb_querys.is_disc||gb_querys.min_disc||gb_querys.max_disc?$(".j-discount-inner").find("input[type=checkbox]").prop("checked",!1):($(".j-discount-inner").find("input[type=checkbox]").prop("checked",!0),$(".j-discount-lajitong").show()),gb_querys.min_disc){var e=(100*gb_querys.min_disc).toFixed(2);$(".j-discount-min-price").val(e),$(".j-discount-lajitong").show()}if(gb_querys.max_disc){var i=(100*gb_querys.max_disc).toFixed(2);$(".j-discount-max-price").val(i),$(".j-discount-lajitong").show()}$(".j-autoprice-list").each(function(e,i){gb_querys.selectPir==$(this).data("pindex")?$(this).find("input[type=radio]").prop("checked",!0):$(this).find("input[type=radio]").prop("checked",!1)})},this.bindEvent=function(){var e=!1,i=this;this.container.on("click",".j-clear-this-attr",function(i){e||($(i.target).parents(".j-attr-filter").find(".j-auto-attrlink").each(function(e,i){$(i).removeClass("attr-check-box-active")}),e=!0)}).on("click",".j-leftnav-date",function(e){$(e.target).closest(".leftnav-first-title").length&&$(e.target).closest(".leftnav-first-title").find(".iconfont").toggleClass("icon-jiahao").parent().next(".list-classify-filter").toggleClass("she-hide")}).on("click",".j-leftnav-cate",function(e){$(e.target).closest(".iconfont").length?$(e.target).closest(".iconfont").toggleClass("icon-jiahao").parent().next(".list-classify-filter").toggleClass("she-hide"):$(e.target).closest(".leftnav-first-title").length&&$(e.target).closest(".leftnav-first-title").find(".iconfont").toggleClass("icon-jiahao").parent().next(".list-classify-filter").toggleClass("she-hide")}).on("click",".j-leftnav-attr",function(e){if($(e.target).closest("li").length&&!$(e.target).hasClass("j-clear-this-attr"))(i=$(e.target).closest("li")).next(".attr-group").hasClass("default-show")?(i.next(".attr-group").removeClass("default-show"),i.find(".iconfont").hasClass("icon-jiahao")||i.next(".attr-group").toggleClass("she-hide")):i.next(".attr-group").toggleClass("she-hide"),i.find(".iconfont").toggleClass("icon-jiahao");else if($(e.target).closest(".attr-item").length){var i;(i=$(e.target).closest(".attr-item")).find("a").toggleClass("attr-check-box-active")}}).on("click",".j-autolinkfold",function(){$(this).toggleClass("icon-jiahao"),$(this).parent().siblings(".j-dropdown-fit").toggleClass("she-hide")}).on("click",".j-sphinx-priceset",function(){var e=$(".j-range-min-price").val(),t=$(".j-range-max-price").val(),s=i.data.hasClickedPrice;if(s)$(this).prop("disabled",!1);else{$(this).prop("disabled",!0),s=!0,gb_querys.currency=$(".price-range .j-range-currency:first").text().trim(),""==e&&""==t?(delete gb_querys.min_price,delete gb_querys.max_price,delete gb_querys.currency):""==e?(gb_querys.max_price=t,delete gb_querys.min_price):""==t?(gb_querys.min_price=e,delete gb_querys.max_price):parseFloat(e)>parseFloat(t)?(gb_querys.min_price=t,gb_querys.max_price=e):(gb_querys.min_price=e,gb_querys.max_price=t),gb_querys.page&&delete gb_querys.page,gb_querys.selectPir&&delete gb_querys.selectPir;var r=i.commonLink();window.location=r}}).on("click",".j-sphinx-pricediscount",function(){var e=i.data.hasClickedDiscount,t=$(".j-discount-min-price").val(),s=$(".j-discount-max-price").val();if(e)$(this).prop("disabled",!1);else{$(this).prop("disabled",!0),e=!0;var r=t/100,a=s/100;""==t&&""==s?(delete gb_querys.min_disc,delete gb_querys.max_disc,delete gb_querys.is_disc):""==t?(gb_querys.max_disc=a,delete gb_querys.min_disc,gb_querys.is_disc=1):""==s?(gb_querys.min_disc=r,delete gb_querys.max_disc,gb_querys.is_disc=1):(parseFloat(t)>parseFloat(s)?(gb_querys.min_disc=a,gb_querys.max_disc=r):(gb_querys.min_disc=r,gb_querys.max_disc=a),gb_querys.is_disc=1),gb_querys.page&&delete gb_querys.page;var n=i.commonLink();window.location=n}}).on("click",".j-discount-inner",function(){if(!i.actionLock){i.actionLock=1,1==gb_querys.is_disc?($(this).find("input[type=checkbox]").prop("checked",!1),delete gb_querys.is_disc):($(this).find("input[type=checkbox]").prop("checked",!0),gb_querys.is_disc=1),gb_querys.page&&delete gb_querys.page;var e=i.commonLink();window.location=e}}).on("click",".j-sphinx-autoprice",function(){var e=parseFloat($(this).find(".j-auto-min").text()),t=parseFloat($(this).find(".j-auto-max").text());i.data.selectPir=$(this).parent(".j-autoprice-list").data("pindex"),i.data.selectPir==$(this).parent(".j-autoprice-list").data("pindex")?$(this).find("input[type=radio]").prop("checked",!0):$(this).find("input[type=radio]").prop("checked",!1),$(this).find("input[type=radio]").is(":checked")&&("lt"==$(this).find("span").data("autoprice")?(gb_querys.max_price=t,delete gb_querys.min_price,gb_querys.selectPir=$(this).parent(".j-autoprice-list").data("pindex")):"between"==$(this).find("span").data("autoprice")?(gb_querys.min_price=e,gb_querys.max_price=t,gb_querys.selectPir=$(this).parent(".j-autoprice-list").data("pindex")):"gt"==$(this).find("span").data("autoprice")&&(gb_querys.min_price=e,delete gb_querys.max_price,gb_querys.selectPir=$(this).parent(".j-autoprice-list").data("pindex"))),gb_querys.page&&delete gb_querys.page,gb_querys.currency=$(".price-range .j-range-currency:first").text().trim();var s=i.commonLink();window.location=s}).on("click",".j-show-more-attr-item",function(e){$(this).hide().parents(".j-attr-group").find(".j-attr-item").removeClass("she-hide")}).on("click",".j-price-lajitong",function(e){$(".j-range-min-price").val(""),$(".j-range-max-price").val(""),$(".j-sphinx-priceset").click()}).on("click",".j-discount-lajitong",function(e){if(!gb_querys.is_disc||gb_querys.min_disc||gb_querys.max_disc)$(".j-discount-min-price").val(""),$(".j-discount-max-price").val(""),$(".j-sphinx-pricediscount").click();else{i.data.isDisc=0,$(this).find("input[type=checkbox]").prop("checked",!0),delete gb_querys.is_disc,gb_querys.page&&delete gb_querys.page;var t=i.commonLink();window.location=t}})},this.commonLink=function(e){e=e||location.origin+location.pathname;var i=Object.keys(gb_querys);gb_querys.attr_values&&(i.splice(i.indexOf("attr_values"),1),i.unshift("attr_values"));var t=e+i.reduce(function(e,i){return""!=i&&(e+=i+"="+gb_querys[i]+"&"),e},"?").slice(0,-1);return t=SHEIN_W.replaceHrefSpeCha(t)},this.transformCatUrlName=function(e){return e.replace(/\s/g,"-")}};r.initData(),r.bindEvent(),window.leftBarObj=r},OEaw:function(e,i,t){"use strict";t("73lR")}}]);
//# sourceMappingURL=list-filter-module.cf7072.js.map