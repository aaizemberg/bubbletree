var ChequeadoBubbleTree;!function(e,t,a,r,l){"use strict";HTMLDivElement.prototype.remove=function(){},ChequeadoBubbleTree=e.ChequeadoBubbleTree=e.ChequeadoBubbleTree||{},ChequeadoBubbleTree.RAW_DATA=[],ChequeadoBubbleTree.details=a("#detail-container-template"),ChequeadoBubbleTree.titles=a("#titles-container"),ChequeadoBubbleTree.init=function(){var e=ChequeadoBubbleTree.getParam("key");if(e)try{Tabletop.init({key:e,callback:function(e,t){ChequeadoBubbleTree.prepareData(e)},parseNumbers:!0})}catch(t){alert("Error al leer la planilla: "+t.message)}else alert('Falta el parámetro "key" en la url.')},ChequeadoBubbleTree.prepareData=function(e){ChequeadoBubbleTree.RAW_DATA=e.DATA.elements,ChequeadoBubbleTree.RAW_DATA_CREDITS=e.CREDITS.elements[0];var t={data:{href:function(e){return this.data},html:function(e){return"en planilla"}}};a(".modal").render(ChequeadoBubbleTree.RAW_DATA_CREDITS,t),ChequeadoBubbleTree.titles.render(ChequeadoBubbleTree.RAW_DATA_CREDITS,{});var l=ChequeadoBubbleTree.RAW_DATA[0];l.name="main-bubble",l.taxonomy="bubbles",l.children=r.filter(ChequeadoBubbleTree.RAW_DATA,{parent:l.id}),l.id="main-bubble",ChequeadoBubbleTree.completeChildren(l.children),ChequeadoBubbleTree.render(l)},ChequeadoBubbleTree.completeChildren=function(e){r.each(e,function(e){e.name="normal-bubble",e.taxonomy="bubbles",e.children=r.filter(ChequeadoBubbleTree.RAW_DATA,{parent:e.id}),e.children.length>0&&ChequeadoBubbleTree.completeChildren(e.children)})},ChequeadoBubbleTree.render=function(e){new BubbleTree({data:e,container:".bubbletree",bubbleType:["icon","plain","donut"]},function(e){""!=e.puesto&&ChequeadoBubbleTree.showDetailBox(e)},function(e){""!=e.puesto&&ChequeadoBubbleTree.showDetailBox(e)},function(e){ChequeadoBubbleTree.details.render({}).hide()},function(e,t){"/~/"+e==t?a("#btn-back").hide():a("#btn-back").show()}),setTimeout(function(){if(a("#loader-container").fadeOut(),a("#button-container").fadeIn(),a("#titles-container").fadeIn(),a("#btn-back").on("click",function(){window.history.back()}),a(".bubbletree").addClass("loaded"),ChequeadoBubbleTree.RAW_DATA_CREDITS.imagen){var e=(l.select("circle.main-bubble"),l.select("svg"));e.insert("defs",":first-child").attr("id","mdef").append("pattern").attr("id","image").attr("patternUnits","userSpaceOnUse").append("svg:image").attr("xlink:href",ChequeadoBubbleTree.RAW_DATA_CREDITS.imagen),ChequeadoBubbleTree.updateImage()}},1500)},ChequeadoBubbleTree.showDetailBox=function(e){var t={colorin:{style:function(t){return"background-color:"+e.color}}};ChequeadoBubbleTree.details.render(e,t).show()},ChequeadoBubbleTree.updateImage=function(){var e=l.select("#image"),t=l.select("circle.main-bubble"),a=l.select("svg");e.attr("x",a.attr("width")/2-t.attr("r")).attr("y",a.attr("height")/2-t.attr("r")).attr("width",2*t.attr("r")).attr("height",2*t.attr("r")),e.select("image").attr("x",0).attr("y",0).attr("width",2*t.attr("r")).attr("height",2*t.attr("r")),l.selectAll("circle").each(function(e){l.select(this).attr("cx")==t.attr("cx")&&l.select(this).attr("cy")==t.attr("cy")&&l.select(this).attr("r")==t.attr("r")&&l.select(this).style("fill","url(#image)")})},ChequeadoBubbleTree.initGenerador=function(){a("#test").on("click",function(){var e=a("#sheet").val(),t=a("#height").val();if(e&&t){var r=location.origin+location.pathname+"viz.html?key="+e;a("iframe").attr("src",r).attr("height",t),a("textarea").html('<iframe src="'+r+'" frameborder="0" height="'+t+'" width="100%"></iframe>')}else alert("Debe completar los campos!")})},ChequeadoBubbleTree.getParam=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)"),a=t.exec(location.search);return null===a?"":decodeURIComponent(a[1].replace(/\+/g," "))}}(window,document,jQuery,_,d3);