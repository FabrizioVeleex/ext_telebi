Ext.define('dip.view.grids.filiali.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.filiali',
    requires: [
        'Ext.grid.column.Action',
        'dip.model.grids.Filiali',
        'dip.view.forms.filiale.Panel'
    ],
    init: function () {
        let me = this,
            vm = this.getViewModel()

        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

        if (this.checkRuoli(['99','2'])){
            this.listBtnTop.push({
                tooltip: Locale.t('dip.grids.filiali.btn.new.tooltip'),
                text: Locale.t('dip.grids.filiali.btn.new.text'),
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
        // vm.set('toolbarFooter',true)

        this.callParent(arguments)
    },

    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('dip.model.grids.Filiali',{
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

        this.getView().fireEvent('createTab',Ext.create('dip.view.forms.filiale.Panel', {
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
            {text:Locale.t('dip.grids.filiali.column.codice'), dataIndex: 'codice', width:80, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.filiali.column.filiale'), dataIndex: 'filiale', width:200 , filter: {type: 'string'}},
            {text:Locale.t('dip.grids.filiali.column.indirizzo'), dataIndex: 'indirizzo',flex: 1, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.filiali.column.telefono'), dataIndex: 'telefono', width:140, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.filiali.column.breve'), dataIndex: 'breve', width:140, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.filiali.column.fax'), dataIndex: 'fax', width:140, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
});