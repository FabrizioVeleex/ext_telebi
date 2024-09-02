/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.incorso.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.incorso',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'gnc.model.grids.Schede',
        'gnc.view.forms.scheda.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','98','10'])){
            this.listBtnTop.push({
                tooltip: Locale.t('gnc.grids.incorso.btn.new.tooltip'),
                text: Locale.t('gnc.grids.incorso.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        this.listBtnTop.push({
            tooltip: Locale.t('gnc.grids.funzioni.esporta.tooltip'),
            text: Locale.t('gnc.grids.funzioni.esporta.text'),
            ui: 'blue',
            iconCls: 'x-fas fa-file-excel',
            handler: 'onEsporta'
        });
        this.callParent(arguments)
    },
    //funzione x params alla prima apertura
    beforeload:function(s) {
        let view = this.getView()
        if (view.infoNode) {
            s.proxy.extraParams.idpadre = view.infoNode.idpadre
        }
    },
    //funzione x gestire campi colonne
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        //ciclo le colonne x nascondere/visualizzare stato
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'descit') {
                if (nodo['idpadre'] === 'NaN') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
            if (colonne[i].dataIndex === 'risultato') {
                if (nodo['idpadre'] === 60) {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('gnc.model.grids.Schede',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('gnc.view.forms.scheda.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('gnc.grids.incorso.column.tipo'), dataIndex: 'tipo', width: 90, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.numero'), dataIndex: 'numero', width: 90, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text: Locale.t('gnc.grids.incorso.column.cdart'), dataIndex: 'cdart', width: 150, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.articolo'), dataIndex: 'articolo', flex:1, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.descrizione'), dataIndex: 'descrizione', width:200, filter: {type: 'string'},
                renderer: function(value, meta) {
                    meta.tdAttr = 'data-qtip="' + value  + '"';
                    return value
                }
            },
            {text: Locale.t('gnc.grids.incorso.column.stabilimento'), dataIndex: 'stabilimento', width: 200, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.descit'), dataIndex: 'descit', width: 200, filter: {type: 'string'}},
            {text: Locale.t('gnc.grids.incorso.column.risultato'), dataIndex: 'risultato', width: 200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //esportazione excel
    onEsporta:function() {
        let me=this;
        let nodo=this.getView().infoNode;
        if (!nodo) {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('gnc.grids.funzioni.esporta.errorenodo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        //recupero filtri della vista
        let filtro;
        let filtri;
        let store=this.getView().getStore();
        if (store.getFilters()) {
            filtri=store.filters.items;
        }
        if (filtri.length>0) {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('gnc.grids.funzioni.esporta.nofiltri'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        let proxy = store.getProxy();
        if (proxy.extraParams.pattern && proxy.extraParams.pattern!=='') {
            filtro=proxy.extraParams.pattern; //filtro footer
        }
        let btnX = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let tipocampi= ff.findField('tipocampi').getValue(); //nome
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {tipocampi:tipocampi,vista:nodo.itemId,step:nodo.idpadre,filtro:filtro},
                    url: Backend.REST_API + 'grids/funzioni/esporta',
                    success: function (resp) {
                        let rest = Ext.decode(resp.responseText);
                        me.view.el.unmask()
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (resp) {
                        me.view.el.unmask()
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp.statusText,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'radiogroup',hideLabel:true,name:'tipocampi',
                    columns: 2,flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('gnc.grids.funzioni.esporta.campivista'),inputValue:"V",checked:true},
                        {boxLabel:Locale.t('gnc.grids.funzioni.esporta.campischeda'),inputValue:"T"}
                    ]
                },
                {xtype:'box',html:Locale.t('gnc.grids.funzioni.esporta.msg')}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:Locale.t('gnc.grids.funzioni.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})