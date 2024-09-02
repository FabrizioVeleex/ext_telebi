/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.view.grids.schede.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.schede',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'eve.model.grids.Schede',
        'eve.view.forms.scheda.Panel',
        'portal.util.Functions',
        'portal.v1.store.forms.combo.GetCustomers'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x params alla prima apertura
    beforeload:function(s) {
        let view = this.getView()
        if (view.infoNode) {
            s.proxy.extraParams.idpadre = view.infoNode.idpadre
            s.proxy.extraParams.idzona = view.infoNode.idzona
        }
    },
    //funzione x gestire campi colonne
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        //verifico se visualizzare il tasto nuovo
        if (nodo.aperto===1 && this.checkRuoli(['99','1'])) {
            this.toolbar.add({
                tooltip: Locale.t('eve.grids.eventi.btn.new.tooltip'),
                text: Locale.t('eve.grids.eventi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        //ciclo le colonne x nascondere/visualizzare stato
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'evento') {
                if (nodo['idpadre'] === 'NaN') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
            if (colonne[i].dataIndex === 'zona') {
                if (nodo['idzona'] === 'NaN') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let nodo = this.getView().infoNode;
        let idevento=''
        if (nodo) {
            idevento=nodo.idpadre
        }
        let NewRecord = Ext.create('eve.model.grids.Schede',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1,idevento);
    },
    createForm: function(view,record,isnew,idevento){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('eve.view.forms.scheda.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew,
                idpadre:idevento
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('eve.grids.schede.column.numero'),dataIndex: 'numero',width:80},
            {text: Locale.t('eve.grids.schede.column.evento'), dataIndex: 'evento', reference:'eventoclm',width:200,filter: {type: 'string'}},
            {text: Locale.t('eve.grids.schede.column.ragsoc'), dataIndex: 'ragsoc', flex: 1, minWidth: 200,filter: {type: 'string'}},
            {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,
                dataIndex:'soggetto', width: 30,
                items: [{
                    getClass: function( view, meta, record){
                        //verifico se c'è il soggetto
                        if (record.data.soggetto!=='') {
                            return 'x-fas fa-user';
                        } else {
                            return 'x-fas fa-plus';
                        }
                    },
                    handler: 'onManageSoggetto'
                }],
                //tooltip
                renderer : function(value, metadata) {
                    metadata.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },
            {text: Locale.t('eve.grids.schede.column.gruppo'), dataIndex: 'gruppo', width: 250,filter: {type: 'string'}},
            {text: Locale.t('eve.grids.schede.column.zona'), dataIndex: 'zona',reference:'zonaclm', width: 100,filter: {type: 'string'}},
            {text: Locale.t('eve.grids.schede.column.nazione'), dataIndex: 'nazione', width: 200,filter: {type: 'string'}},
            {text: Locale.t('eve.grids.schede.column.autore'), dataIndex: 'autore', width: 150,filter: {type: 'string'}},
            {text: Locale.t('eve.grids.schede.column.dcreazione'), dataIndex: 'dcreazione', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}}
        ]
        this.callParent(arguments)
    },
    onManageSoggetto: function(view, rowIndex, colIndex, item, opt, record) {
        if (!this.checkRuoli(['99','1'])) {
            return false
        }
        //verifico se deve rimuoverlo o associarlo
        if (record.data.idsoggetto!=='') {
            this.onRimuoviSoggetto(view, rowIndex, colIndex,record);
        } else {
            this.onAssociaSoggetto(view, rowIndex, colIndex,record);
        }
    },
    onAssociaSoggetto:function(view, rowIndex, colIndex,record) {
        let me = this; //controller
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let idsoggetto = ff.findField('idsoggetto').getValue(); //id soggetto
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    url: Backend.REST_API + 'actions/associa',
                    jsonData: {id:record.data.id,idsoggetto: idsoggetto},
                    success: function () {
                        me.getView().el.unmask();
                        me.getView().getStore().reload(); //ricarico la vista
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, bodyPadding: 10,items: [
                {xtype:'box',html:'<span style="color: blue;font-weight:bold">'+Locale.t('eve.grids.schede.associa.msg')+'</span>'},
                {xtype:'displayfield',value:''},
                {xtype: 'combo', store: Ext.create('portal.v1.store.forms.combo.GetCustomers'),name:'idsoggetto',
                    hideLabel:true, displayField: 'ragsoc', valueField:'id', hideTrigger: true,
                    width:500, minChars: 3, queryMode:'remote',
                    selectOnFocus: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{ragsoc}</li>',
                        '</tpl></ul>'
                    )
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('eve.grids.schede.associa.title'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    //Rimozione soggetto
    onRimuoviSoggetto: function(view, rowIndex, colIndex,record) {
        let me = this; //controller
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    url: Backend.REST_API + 'actions/rimuovi',
                    jsonData: {id:record.data.id,soggetto:record.data.soggetto},
                    success: function () {
                        me.getView().el.unmask();
                        me.getView().getStore().reload(); //ricarico la vista
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, bodyPadding: 10,items: [
                {xtype:'box',html:'<span style="color: blue;font-weight:bold">'+Locale.t('eve.grids.schede.rimuovi.msg')+record.data.soggetto+'</span>'}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('eve.grids.schede.rimuovi.title'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})