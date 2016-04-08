var ChequeadoBubbleTree;

;(function(global, document, $, _, d3){

    "use strict";

    //Fix strange bug using jquery2 and bootstra3
    HTMLDivElement.prototype.remove = function(){};

    ChequeadoBubbleTree = global.ChequeadoBubbleTree = global.ChequeadoBubbleTree || {};

    ChequeadoBubbleTree.RAW_DATA=[];

    ChequeadoBubbleTree.details=$('#detail-container-template');

    ChequeadoBubbleTree.titles=$('#titles-container');

	ChequeadoBubbleTree.init = function(){
 		var key = ChequeadoBubbleTree.getParam('key');
        if(key){
            try {
                Tabletop.init( { key: key,
                        callback: function(data, tabletop) { ChequeadoBubbleTree.prepareData(data) },
                        parseNumbers: true
                    });
            }
            catch(err) {
                alert('Error al leer la planilla: '+err.message);
            }
        }else{
            alert('Falta el parámetro "key" en la url.');
        }

	};

	ChequeadoBubbleTree.prepareData = function(data){
//		console.log(data);
		ChequeadoBubbleTree.RAW_DATA = data.DATA.elements;
		ChequeadoBubbleTree.RAW_DATA_CREDITS = data.CREDITS.elements[0];
		
		var directives = {
		  data: {
		    href: function(params) {
		      return this.data;
		    },
		    html: function(params) {
		      return 'En Planilla';
		    }
		  }
		};

		$('.modal').render(ChequeadoBubbleTree.RAW_DATA_CREDITS,directives);

		ChequeadoBubbleTree.titles.render(ChequeadoBubbleTree.RAW_DATA_CREDITS,{});

		var finalData = ChequeadoBubbleTree.RAW_DATA[0];

		finalData.name = 'main-bubble';
		finalData.taxonomy = 'bubbles';
		finalData.children = _.filter(ChequeadoBubbleTree.RAW_DATA,{'parent':finalData.id});
		finalData.id = 'main-bubble';
		
		ChequeadoBubbleTree.completeChildren(finalData.children);

		ChequeadoBubbleTree.render(finalData);

	};

	ChequeadoBubbleTree.completeChildren = function(children){

		_.each(children,function(e){
			e.name = 'normal-bubble';
			e.taxonomy = 'bubbles';
			e.children = _.filter(ChequeadoBubbleTree.RAW_DATA,{'parent':e.id});
			if(e.children.length>0){
				ChequeadoBubbleTree.completeChildren(e.children);
			}
		});

	};

	ChequeadoBubbleTree.render = function(finalData){
		//console.log(finalData);
		//var styles = _.filter(ChequeadoBubbleTree.RAW_DATA,function(e){return e!=''});
		//console.log('pala',styles);

		var bubbleStyles = {
		    /*bubbles: {
		        'main-bubble': { 
		        	icon: 'government-uk.svg', 
		        	color: '#C75746',
		        	bubbleType: 'icon' 
		        },
		        'normal-bubble': { icon: 'defence.svg', color: '#0AB971' }
		    }*/
		};

		new BubbleTree({
			data: finalData,
			container: '.bubbletree',
			bubbleType: ['icon', 'plain', 'donut']
			//bubbleStyles: bubbleStyles
		}
		,function(a){
			//console.log('click',a);
			if(a.puesto != ''){
				ChequeadoBubbleTree.showDetailBox(a);
			}
		}
		,function(a){
			//console.log('hover',a);
			if(a.puesto != ''){
				ChequeadoBubbleTree.showDetailBox(a);
			}
		}
		,function(a){
			//console.log('unhover',a);
			ChequeadoBubbleTree.details.render({}).hide();
		}
		,function(rootUrl,currentHash){
			//console.log('change url',rootUrl,currentHash);
			if('/~/'+rootUrl == currentHash){
				$('#btn-back').hide();
			} else {
				$('#btn-back').show();
			}
		}
		);



		setTimeout(function(){
			$('#loader-container').fadeOut();
	        $('#button-container').fadeIn();
	        $('#titles-container').fadeIn();
	        
			$('#btn-back').on('click',function(){
				window.history.back();
			});

	        $('.bubbletree').addClass('loaded');
		
			//agregar imagen

			if(ChequeadoBubbleTree.RAW_DATA_CREDITS.imagen){
		        //find main bubble and append the image
		        var mainBubble = d3.select('circle.main-bubble');
				var svg = d3.select("svg");

				//then append the defs and the pattern
				svg.insert("defs",":first-child")
					.attr('id','mdef')
					.append("pattern")
					.attr('id','image')
		            .attr("patternUnits", "userSpaceOnUse")
		            /*.attr("x", svg.attr('width')/2 - mainBubble.attr('r'))
		            .attr("y", svg.attr('height')/2 - mainBubble.attr('r'))
				    .attr("width", mainBubble.attr('r')*2)
				    .attr("height", mainBubble.attr('r')*2)*/
				    .append("svg:image")
		            .attr("xlink:href", ChequeadoBubbleTree.RAW_DATA_CREDITS.imagen)
		            /*.attr("x", 0)
		            .attr("y", 0)
				    .attr("width", mainBubble.attr('r')*2)
				    .attr("height", mainBubble.attr('r')*2);*/

				    ChequeadoBubbleTree.updateImage();

			}


		},1500);


	};

	ChequeadoBubbleTree.showDetailBox = function(details){
		var directives = {
		  colorin: {
		    style: function(params) {
		      return 'background-color:'+details.color;
		    }
		  }
		};
		ChequeadoBubbleTree.details.render(details,directives).show();	
	};

	ChequeadoBubbleTree.updateImage = function(){

		var image = d3.select('#image');
		var mainBubble = d3.select('circle.main-bubble');
		var svg = d3.select("svg");

		image.attr("x", svg.attr('width')/2 - mainBubble.attr('r'))
        	.attr("y", svg.attr('height')/2 - mainBubble.attr('r'))
		    .attr("width", mainBubble.attr('r')*2)
		    .attr("height", mainBubble.attr('r')*2);

		image.select('image')
			.attr("x", 0)
        	.attr("y", 0)
		    .attr("width", mainBubble.attr('r')*2)
		    .attr("height", mainBubble.attr('r')*2);

		d3.selectAll('circle').each(function(d) {
	    	if(
	    		d3.select(this).attr('cx')==mainBubble.attr('cx') &&
	    		d3.select(this).attr('cy')==mainBubble.attr('cy') &&
	    		d3.select(this).attr('r') ==mainBubble.attr('r')
	    	){
	    		d3.select(this).style("fill", "url(#image)");
	    	}
		});

	};

	ChequeadoBubbleTree.initGenerador = function(){
        $('#test').on('click',function(){
            var sheet = $('#sheet').val();
            var height = $('#height').val();

            if(sheet && height){
                var url = location.origin + location.pathname + 'viz.html?key='+sheet;
                $('iframe').attr('src',url).attr('height',height);
                $('textarea').html('<iframe src="'+url+'" frameborder="0" height="'+height+'" width="100%"></iframe>');
            } else {
            	alert('Debe completar los campos!');
            }
        });
    };

    ChequeadoBubbleTree.getParam = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };


})(window, document,jQuery, _, d3);

