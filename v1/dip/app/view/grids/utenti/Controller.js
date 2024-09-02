Ext.define('dip.view.grids.utenti.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.dipendenti',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Boolean',
        'dip.model.grids.Utenti',
        'dip.view.forms.utente.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99', '7'])) {
            this.listBtnTop.push({
                tooltip: Locale.t('dip.grids.utenti.btn.new.tooltip'),
                text: Locale.t('dip.grids.utenti.btn.new.text'),
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
    onNew: function () {
        let view = this.getView().view; //view della grid
        //creo record e lancio creazione form
        let NewRecord = Ext.create('dip.model.grids.Utenti', {
            id: this.randomString(32),
            isnew: 1,
            status: 1
        });
        this.createForm(view, NewRecord, 1, 'D');
    },
    createForm: function (view, record, isnew, tipo) {
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm', itemId)) {
            return
        }
        this.getView().fireEvent('createTab', Ext.create('dip.view.forms.utente.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }), view)
    },
    onafterrendergrid: function (grid) {
        let valori =[]
        for (let i = 0; i < Ext.global.Vars.infoApp.ruoli.length; i++) {
            valori.push(Ext.global.Vars.infoApp.ruoli[i]['valore'])
        }
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [
                    {getClass: function(view, meta, record){
                            if (valori.indexOf('77')===-1) {
                                return 'x-fas fa-eye'
                            } else {
                                if (record.data.idfiliale=== Ext.global.Vars.infoUser.filiale.id) {
                                    return 'x-fas fa-eye'
                                } else {
                                    return ''
                                }
                            }
                        },
                        handler: 'onOpen'
                    }]
            },
            {text:Locale.t('dip.grids.utenti.column.disabled.text'),
                xtype:'booleancolumn',
                dataIndex: 'disabled',
                renderer: function(value, meta) {
                    if (value===true) {
                        meta.tdCls = 'column-color-red'; return Locale.t('dip.grids.utenti.column.disabled.true');
                    }else{
                        meta.tdCls = 'column-color-green'; return Locale.t('dip.grids.utenti.column.disabled.false');
                    }
                },
                width:120, filter: {type: 'boolean'}},
            {text:Locale.t('dip.grids.utenti.column.cognome'), dataIndex: 'cognome',width:150, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.nome'), dataIndex: 'nome',width:150, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.interno'), dataIndex: 'interno', width:100, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.email'), dataIndex: 'email', width:240, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.ubicazione'), dataIndex: 'filiale', width:150, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.uo'), dataIndex: 'nomeuo', flex:1, filter: {type: 'string'}},
            {text:Locale.t('dip.grids.utenti.column.username'), dataIndex: 'shortname', width:200,hidden:true, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    onOpen: function (view, rowIndex, colIndex, item, opt, record) {
        let valori =[]
        for (let i = 0; i < Ext.global.Vars.infoApp.ruoli.length; i++) {
            valori.push(Ext.global.Vars.infoApp.ruoli[i]['valore'])
        }
        if (valori.indexOf('77')===-1) {
            this.createForm(view, record, 0);
        } else {
            if (record.data.idfiliale=== Ext.global.Vars.infoUser.filiale.id) {
                this.createForm(view, record, 0);
            }
        }
    },
    onitemdblclick: function (view, record) {
        let valori =[]
        for (let i = 0; i < Ext.global.Vars.infoApp.ruoli.length; i++) {
            valori.push(Ext.global.Vars.infoApp.ruoli[i]['valore'])
        }
        if (valori.indexOf('77')===-1) {
            this.createForm(view, record, 0);
        } else {
            if (record.data.idfiliale=== Ext.global.Vars.infoUser.filiale.id) {
                this.createForm(view, record, 0);
            }
        }
    }
});