Ext.define('dip.view.grids.esterni.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.esterni',
    requires: [
        'Ext.grid.column.Action',
        'dip.model.grids.Esterni',
        'dip.view.forms.utente.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]

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

    onNew: function () {
        let view = this.getView().view; //view della grid
        //creo record e lancio creazione form
        let NewRecord = Ext.create('dip.model.grids.Esterni', {
            id: this.randomString(32),
            isnew: 1,
            status: 1
        });
        this.createForm(view, NewRecord, 1, 'D');
    },

    createForm: function (view, record, isnew, tipo) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }

        this.getView().fireEvent('createTab',Ext.create('dip.view.forms.utente.Panel', {
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
                items: [{
                    handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')
                }]
            },
            {text:Locale.t('dip.grids.utenti.column.cognome'), dataIndex: 'cognome',width:150, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.nome'), dataIndex: 'nome',width:150, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.interno'), dataIndex: 'interno', width:100, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.email'), dataIndex: 'email', width:240, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.ubicazione'), dataIndex: 'filiale', width:150, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.uo'), dataIndex: 'nomeuo', flex:1, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.username'), dataIndex: 'shortname', width:200,hidden:true, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.telefono'), dataIndex: 'tel', width:100,hidden:true, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.cellulare'), dataIndex: 'cel', width:100,hidden:true, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    }
});