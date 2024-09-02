Ext.define('portal.v1.view.grids.cronology.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    alias: 'controller.cronology-v1',
    requires:[
    ],

    init: function() {
        this.toolbarFooter = Ext.create('Ext.Toolbar',{
            dock: 'bottom',
            bind:{
                hidden: '{toolbarFooter}'
            },
            items: [
                {
                    xtype:'textfield',
                    width:300,
                    hasSearch : false,
                    paramName : 'query',
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            hidden:true,
                            handler: 'onClearTriggetSearch'
                        },
                        search: {
                            cls: 'x-form-search-trigger',
                            handler: 'onSearchTriggetSearch'
                        }
                    },
                    listeners:{
                        specialkey:'onSpecialkeySearch'
                    }
                },
                {xtype:'tbfill'},
                {
                    xtype:'displayfield',
                    itemId:'totalCount'
                }
            ]
        })
        this.getView().addDocked(this.toolbarFooter)
    },

    onPopolateModel: function (id,form){
        let me = this,
            vm = me.getViewModel(),
            store = vm.getStore('store')

        store.getProxy().extraParams.id=id
        store.getProxy().extraParams.form=form
        store.load()
    },

    onTogle: function (btn) {
        this.getView().getPlugin('notePreview').toggleExpanded(btn.pressed);
    },
    reoladStore: function () {
        let me = this,
            vm = me.getViewModel(),
            store = vm.getStore('store')
        store.load()
    },
    onLoadStore:function(s){
        let totalCount = this.getView().down('#totalCount')
        if (totalCount){
            if (s.totalCount){
                totalCount.setValue(Locale.t('global.grid.total')+' ' + Ext.util.Format.number(s.totalCount, '0,000'))
            }else{
                totalCount.setValue(Locale.t('global.grid.total')+' 0')
            }
        }
    }
});