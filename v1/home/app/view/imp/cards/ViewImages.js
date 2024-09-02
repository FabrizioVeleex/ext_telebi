Ext.define('home.view.imp.cards.ViewImages', {
    mixins:['portal.v1.global.Util'],
    extend: 'Ext.view.View',
    xtype: 'viewimp',
    requires:[
        'Ext.util.Format',
        'home.model.imp.Images',
        'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor',
        'home.store.imp.Images'
    ],
    prepareData: function() {
        let data = this.callParent(arguments);
        let cssisnew = 'image-new';

        Ext.apply(data, {
            shortName: Ext.util.Format.ellipsis(data.titolo, 15),
            sizeString: Ext.util.Format.fileSize(data.size),
            dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a"),
            cssisnew:cssisnew
        });

        return data;
    },
    listeners:{
        itemclick:'onImagesItemclick',
        itemcontextmenu:'onImagesItemcontextmenu'
    },
    loadImages: function (){
        let me = this;
        me.store.removeAll()
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/imp/getlistwallpaper/',
            method: 'GET',
            success: function (response,o) {
                let list = Ext.decode(response.responseText)
                for (let r of list.data){
                    Ext.Ajax.request({
                        url: r.src,
                        method: 'GET',
                        binary:true,
                        success: function (response,o) {
                            let headers = response.getAllResponseHeaders()
                            let blob = new Blob([response.responseBytes], {type: headers['content-type']}),
                                url = window.URL.createObjectURL(blob)
                            me.store.add(Ext.create('home.model.imp.Images',{isnew:0,action:0,id:r.id,titolo:r.titolo,src:url}));
                        },
                        failure: function () {

                        }
                    })
                }
            },
            failure: function () {

            }
        })
        me.store.add (Ext.create('home.model.imp.Images',{isnew:1,action:1,id:me.randomString(32)}));
        me.store.add (Ext.create('home.model.imp.Images',{isnew:0,action:0,id:'NULL',titolo:'Nessuna',src:'/images/white.png'}));
    },

    initComponent: function(){
        let me = this;
        this.store =  Ext.create('home.store.imp.Images');
        let imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '   <div style="margin-bottom: 10px;" class="thumb-wrap {cssisnew}">',
            '       <div class="thumb"><img src="{src}"  alt="&nbsp;"/></div>',
            '       <span class="x-editable">{shortName:htmlEncode}</span>',
            '   </div>',
            '</tpl>'
        );
        Ext.apply(this,{
            tpl: imageTpl,
            cls: 'images-view',
            itemSelector: 'div.thumb-wrap',
            trackOver: true,
            overItemCls: 'x-item-over',
            emptyText: 'No images to display',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'title'})
            ]
        });

        this.loadImages()

        this.callParent(arguments);
    }
});