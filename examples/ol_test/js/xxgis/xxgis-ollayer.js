var XXGIS = window.XXGIS || {};

XXGIS.WorkMap = (function() {


    function WorkMap(mapdiv) {

        var _seft = this; //

        _seft.w = $(mapdiv).outerWidth();
        _seft.h = $(mapdiv).outerHeight();

        _seft.curTool = 0 ;  //默认选人click

        /*这里声明私有变量*/
        //工人
        _seft.bounds = [-40039384.91, -38939.59, -39611337.56, 266808.53];
        _seft.origin = [-39815990.3, 140105.8]; //坐标原点定义在这里
        //基站
        _seft.styleBA = new ol.style.Style({
                image: new ol.style.Icon({
                    color: '#fff',
                    src: 'assets/images/station.bmp'
                })
        })
            //局部变量
        var vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'data/c3857shp_MapToKML.js',
                format: new ol.format.KML({
                    extractStyles: false
                })
            })
        });


        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(0),
            // comment the following two lines to have the mouse position
            // be placed within the map.
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });

        _seft.map = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([ mousePositionControl , new ol.control.FullScreen({source: 'fullscreen'})]),
            interactions: ol.interaction.defaults().extend([
              new ol.interaction.DragRotateAndZoom()
            ]),
            target: mapdiv,
            layers: [vector],
            view: new ol.View({
                rotation: 0
            })
        });

        _seft.map.getView().fit(_seft.bounds, _seft.map.getSize());
    }

    WorkMap.prototype.getMap = function() {
        return this.map;
    };

    //private method for Icon 
    function Icon(feature) {
        if (feature != null) {
            var ss = "assets/images/gr.png";
            var type = feature.get("fields").type;
            switch (type) {
                case 0:
                    ss = "assets/images/mr.png";
                    break;
                case 1:
                    ss = "assets/images/lr.png";
                    break;
                case 2:
                    ss = "assets/images/zr.png";
                    break;
                case 3: //基站
                    ss = "assets/images/station.bmp";
                    break;
            }
            return ss;
        }
    }
    //private method for Style
    function GPStyle(feature, resolution) {
        return new ol.style.Style({
            image: new ol.style.Icon({
                color: '#fff',
                src: Icon(feature)
            }),
            text: new ol.style.Text({
                textAlign: 'left',
                textBaseline: 'top',
                font: '宋体',
                text: feature.get('fields').name,
                fill: new ol.style.Fill({ color: '#aa3300' }),
                stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 }),
                offsetX: -15,
                offsetY: 15,
                rotation: 0
            })
        });
    }

    WorkMap.prototype.setTool = function(itool) {
       this.curTool = itool ; 
    }

    function createOverlay(_seft , title1 , content1 , pos1)
    {
            var popup_element = document.createElement('div');
            popup_element.className = 'ol-popup';
            var closer = document.createElement('a');
            closer.href = '#';
            closer.className = 'ol-popup-closer';
            var title = document.createElement('div');
            title.className = 'title';
            var content = document.createElement('div');
            content.className = 'popup-content';
            $(popup_element).append(closer);
            $(popup_element).append(title);
            $(popup_element).append(content);

            var popupOverlay = new ol.Overlay(({
                element: popup_element,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250 //当Popup超出地图边界时，地图移动的速度
                }
            }));
            _seft.map.addOverlay(popupOverlay);

            // 点击关闭的按钮
            $(closer).on('click', function(event) {
                event.preventDefault();
                popupOverlay.setPosition(undefined);
                _seft.map.removeOverlay(popupOverlay);
            });


            title.innerHTML = '<div><strong>' + title1 + '</strong></div></div>';
            content.innerHTML = '<div>' + content1 + '<div>';
            popupOverlay.setPosition(pos1);
            return popupOverlay ; 
    }

    WorkMap.prototype.initLayers = function() {
        var _seft = this;
        _seft.layerGRS = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: []
            }),
            style: GPStyle
        });
        _seft.map.addLayer(_seft.layerGRS);
        //点击弹出
        _seft.map.on('click', function(evt) {

            var coord = evt.coordinate;
            if( _seft.curTool == 1 )
            {
                var px =  ( coord[0]   - _seft.origin[0] ) /10.0 ; 
                var py =  ( _seft.origin[1] - coord[1] ) /10.0  ; 
                createOverlay(_seft , "坐标" , [px.toFixed(0) ,py.toFixed(0) ].toString() ,coord) ; 
                return ; 
            }
            var sourceGR = _seft.layerGRS.getSource();
            var featureL = sourceGR.getClosestFeatureToCoordinate(coord);
            if (featureL == null)
            {
                return;
            }    
            var fields = featureL.get("fields");
            coord = featureL.getGeometry().getCoordinates() ; 

            var px =  ( coord[0]   - _seft.origin[0] ) /10.0 ; 
            var py =  ( _seft.origin[1] - coord[1] ) /10.0  ; 

            var popupOverlay = createOverlay(_seft , fields.name , [px.toFixed(2) ,py.toFixed(2) ].toString() , coord) ; 

           


        });


        //启动超时判断
        setInterval(function() {
            var sourceGR = _seft.layerGRS.getSource();
            var feats = sourceGR.getFeatures();
            for (var i = 0; i < feats.length; i++) {
                var featOne = feats[i];
                var timeL = featOne.get("dt");
                var timeC = new Date();
                var millSeconds = timeC.getTime() - timeL.getTime();
                //console.log(millSeconds / 1000);
                if (millSeconds > 60000) //超时一分钟，下线去掉
                    sourceGR.removeFeature(featOne);
            }
        }, 1000); //秒判断器

      
    };

    WorkMap.prototype.getStatistics = function(person) {
        var _seft = this;
        var sourceL = _seft.layerGRS.getSource();

    };



    //添加或者更新人员位置
    WorkMap.prototype.updatePerson = function(person) {
        var _seft = this;
        var sourceL = _seft.layerGRS.getSource();

        if (!("id" in person)) {
            throw "no id error";
        }
        var featureL = sourceL.getFeatureById(person.id);
        if (featureL != null)
            sourceL.removeFeature(featureL);

        var px =  person.x * 10 + _seft.origin[0] ; 
        var py =  _seft.origin[1] - person.y * 10  ; 

        var pt = new ol.Feature({
            geometry: new ol.geom.Point([px, py]),
            //geometry: new ol.geom.Point([person.x * 10, person.y * 10]),
            fields: person,
            dt: new Date() /*数据时间*/
        });
        pt.setId(person.id);
        sourceL.addFeature(pt);
    };

    //添加或者更新多个人员位置
    WorkMap.prototype.addPersonArray = function(personArr) {
        var _seft = this;
        if (!Array.isArray(personArr)) {
            throw "not array error";
        }
        for (var i = 0; i < personArr.length; i++) {
            _seft.updatePerson(personArr[i]);
        }
    };

    WorkMap.prototype.clearPersons = function() {
        var _seft = this;
        var sourceGR = _seft.layerGRS.getSource();
        sourceGR.clear();
    };

    WorkMap.prototype.ZoomAll = function() {
        var _seft = this;
        _seft.map.getView().fit(_seft.bounds, _seft.map.getSize());
    };

    WorkMap.prototype.ZoomTo = function(id) {
        var _seft = this;
        var sourceL = _seft.layerGRS.getSource();
        var featureL = sourceL.getFeatureById(id);
        if (featureL == null) {
            throw "no this feature id";
        }

        //var dt = featureL.get("dt") ; 
        //console.log(dt) ; 
        //var dp = featureL.get("fields") ; 
        //console.log(dp) ; 

        var view = _seft.map.getView();
        //debugger ; 
        //view.animate({
        //  center: featureL.getGeometry().getCoordinates(),
        //  duration: 2000
        //});
        var size = _seft.map.getSize();
        view.setZoom(11);
        view.centerOn(featureL.getGeometry().getCoordinates(), size, [size[0] / 2, size[1] / 2]);

        //----------------------
        var popup_element = document.createElement('div');
        popup_element.className = 'ol-popup';
        var closer = document.createElement('a');
        closer.href = '#';
        closer.className = 'ol-popup-closer';
        var title = document.createElement('div');
        title.className = 'title';
        var content = document.createElement('div');
        content.className = 'popup-content';
        $(popup_element).append(closer);
        $(popup_element).append(title);
        $(popup_element).append(content);

        var popupOverlay = new ol.Overlay(({
            element: popup_element,
            autoPan: true,
            autoPanAnimation: {
                duration: 250 //当Popup超出地图边界时，地图移动的速度
            }
        }));
        _seft.map.addOverlay(popupOverlay);

        // 点击关闭的按钮
        $(closer).on('click', function(event) {
            event.preventDefault();
            popupOverlay.setPosition(undefined);
            _seft.map.removeOverlay(popupOverlay);
        });

        var fields = featureL.get("fields");
        title.innerHTML = '<div><strong>' + fields.name + '</strong></div></div>';
        content.innerHTML = '<div style="background-color:gray;padding:0;margin:0">' + fields.x.toFixed(0) + ',' + fields.y.toFixed(0) + '<div>';
        popupOverlay.setPosition(featureL.getGeometry().getCoordinates());

    };

    return WorkMap;

}());
