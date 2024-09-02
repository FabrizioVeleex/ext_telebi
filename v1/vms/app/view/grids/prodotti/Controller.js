/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.prodotti.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.prodotti',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.window.Window',
        'portal.util.Functions',
        'vms.model.grids.Prodotti',
        'vms.view.forms.prodotto.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','10','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('vms.grids.prodotti.btn.new.tooltip'),
                text: Locale.t('vms.grids.prodotti.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        if (this.checkRuoli(['99','10','4'])){
            this.listBtnTop.push({
                tooltip: Locale.t('vms.grids.funzioni.esporta.tooltip'),
                text: Locale.t('vms.grids.funzioni.esporta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
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
            if (colonne[i].dataIndex === 'tipo') {
                if (nodo['idpadre'] && nodo['idpadre'] === 'NaN') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('vms.model.grids.Prodotti',{
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
        this.getView().fireEvent('createTab',Ext.create('vms.view.forms.prodotto.Panel', {
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
            {text: Locale.t('vms.grids.prodotti.column.tipo'), dataIndex: 'tipo', width:150,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.prodotti.column.numero'), dataIndex: 'numero', width:120,filter: {type: 'numeric'}},
            {text: Locale.t('vms.grids.prodotti.column.descrizione'), dataIndex: 'descrizione', flex:1,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.prodotti.column.matricola'), dataIndex: 'matricola', width:150,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.prodotti.column.sede'), dataIndex: 'stabilimenti', width:150,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.prodotti.column.reparto'), dataIndex: 'reparto', width:250,filter: {type: 'string'}}
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
                msg: Locale.t('vms.grids.funzioni.esporta.errorenodo'),
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
                msg: Locale.t('vms.grids.funzioni.esporta.nofiltri'),
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
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {tipo:nodo.idpadre,filtro:filtro},
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
                {xtype:'box',html:Locale.t('vms.grids.funzioni.esporta.msg')}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:Locale.t('vms.grids.funzioni.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})