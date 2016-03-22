var ChequeadoBubbleTree;

;(function(global, document, $, _){

    "use strict";

    //Fix strange bug using jquery2 and bootstra3
    HTMLDivElement.prototype.remove = function(){};

    ChequeadoBubbleTree = global.ChequeadoBubbleTree = global.ChequeadoBubbleTree || {};

    ChequeadoBubbleTree.RAW_DATA=[];

	ChequeadoBubbleTree.init = function(){
 		var key = ChequeadoBubbleTree.getParam('key');
        if(key){
            try {
                Tabletop.init( { key: key,
                        callback: function(data, tabletop) { ChequeadoBubbleTree.prepareData(data) },
                        parseNumbers: true,
                        simpleSheet: true 
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
		ChequeadoBubbleTree.RAW_DATA = data;

		var finalData = ChequeadoBubbleTree.RAW_DATA[0];

		finalData.children = _.filter(ChequeadoBubbleTree.RAW_DATA,{'parent':finalData.id});

		ChequeadoBubbleTree.completeChildren(finalData.children);

		ChequeadoBubbleTree.render(finalData);
	};

	ChequeadoBubbleTree.completeChildren = function(children){

		_.each(children,function(e){
			console.log(e.id);
			e.children = _.filter(ChequeadoBubbleTree.RAW_DATA,{'parent':e.id});
			if(e.children.length>0){
				ChequeadoBubbleTree.completeChildren(e.children);
			}
		});

	};

	ChequeadoBubbleTree.render = function(finalData){
		console.log(finalData);
		//var styles = _.filter(ChequeadoBubbleTree.RAW_DATA,function(e){return e!=''});
		//console.log('pala',styles);

		new BubbleTree({
			data: finalData,
			container: '.bubbletree',
		//	bubbleType: 'icon',
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


})(window, document,jQuery, _);

