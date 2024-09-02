Ext.define('dip.view.grids.qualifiche.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.qualifiche',

    requires: [
        'Ext.grid.column.Action',
        'dip.model.grids.Qualifiche',
        'dip.view.forms.qualifica.Panel'
    ],

    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','2'])){
            this.listBtnTop.push({
                tooltip: Locale.t('dip.grids.qualifiche.btn.new.tooltip'),
                text: Locale.t('dip.grids.qualifiche.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.listBtnTop.push( { xtype: 'tbfill' })
        this.listBtnTop.push({
            tooltip: Locale.t('global.btn.xlsx.tooltip'),
            ui: 'green',
            iconCls: 'x-fas fa-file-excel ',
            handler: 'onGenExcel'
        });
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('dip.model.grids.Qualifiche',{
            id :this.randomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },

    createForm: function (view, record, isnew, tipo) {
        let itemId = 'f' + record.data['id'];

        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }

        this.getView().fireEvent('createTab',Ext.create('dip.view.forms.qualifica.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text:Locale.t('dip.grids.qualifiche.column.qualifica'), dataIndex: 'qualifica', flex: 1, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
});