/**
 * Created by fabrizio on 24/08/17.
 */
Ext.define('portal.view.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid',
    requires:[
        'portal.util.Locale',
        'Ext.util.DelayedTask',
        'Ext.util.Format'
    ],
    /**
     * Called when the view is created
     */
    init: function() {
        this.setConfModRun=0;
    },

    reloadGrid: function(){
        this.getView().getStore().load();
    },

    //copia anche su ViewController
    setConfMod : function() {
        this.setConfModRun++;
        var count = this.setConfModRun;
        var task =new Ext.util.DelayedTask(function(count){
            if (count === this.setConfModRun){
                Ext.Ajax.request({params:{'_fn':'setConfMod','data':Ext.encode(Backend.confMod)},url:Backend.API_ADDRESS+'Main.php'});
            }
        },this,[count]);
        task.delay(1000);
    },

    onCloseForm: function (form) {
        if (this.getView().getStore().totalCount>200) {
            var task = new Ext.util.DelayedTask(function () {
                // this.getView().getStore().loadPage(this.getView().getStore().currentPage);
                this.getView().getStore().reload(); //ricarico la vista
            }, this);
            task.delay(200);
        } else {
            this.getView().getStore().load(); //ricarico la vista
        }
    },
    onSearchTriggetSearch: function (item) {
        var grid = item.up('grid');
        var store = grid.getStore();
        var proxy = store.getProxy();
        var value = item.getValue();
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearch(item);
            }
            return;
        }
        item.getTrigger('clear').show();
        proxy.extraParams.pattern = value;
        store.load();
        item.hasSearch = true;
    },
    onSpecialkeySearch:function(item,e){
        if(e.getKey() === e.ENTER) {
            this.onSearchTriggetSearch(item);
        }
    },
    onClearTriggetSearch: function (item) {
        var grid = item.up('grid');
        var store = grid.getStore();
        var proxy = store.getProxy();
        if (item.hasSearch) {
            item.setValue('');
            proxy.extraParams.pattern = '';
            store.load();
            item.hasSearch = false;
            item.getTrigger('clear').hide();
        }
    },
    //fixme trova e sostituisci
    onLoadStore:function(s){
        var totalCount = this.lookupReference('totalCount');
        if (totalCount){
            totalCount.setValue(Locale.t('global.totalegrid')+' ' + Ext.util.Format.number(s.totalCount, '0,000'))
        }else{
            totalCount.setValue(Locale.t('global.totalegrid')+' 0')
        }
    },
    //new version
    onGridLoadStore:function(s){
        var totalCount = this.toolBarBottom.down('displayfield');
        if (totalCount){
            totalCount.setValue(Locale.t('global.totalegrid')+' ' + Ext.util.Format.number(s.totalCount, '0,000'))
        }else{
            totalCount.setValue(Locale.t('global.totalegrid')+' 0')
        }
    }
});