/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.controlli.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.controlli',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'portal.util.Functions',
        'vms.model.grids.Controlli',
        'vms.view.forms.controllo.Panel'
    ],
    init: function () {
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
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.itemId==='previsti' && this.checkRuoli(['99','10','1'])){
            this.toolbar.add({
                tooltip: Locale.t('vms.grids.controlli.btn.new.tooltip'),
                text: Locale.t('vms.grids.controlli.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        if (this.checkRuoli(['99','10','4'])){
            this.toolbar.add({
                tooltip: Locale.t('vms.grids.funzioni.esporta.tooltip'),
                text: Locale.t('vms.grids.funzioni.esporta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
        if (nodo.itemId==='effettuati' && this.checkRuoli(['99'])){
            this.toolbar.add({
                text: 'Rigenerazione massiva PDF',
                ui: 'blue',
                iconCls: 'icon-pdf',
                handler: 'onPdfMassiva'
            });
        }
        //ciclo le colonne x nascondere/visualizzare stato
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'esito') {
                if (nodo.itemId==='previsti') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('vms.model.grids.Controlli',{
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
        this.getView().fireEvent('createTab',Ext.create('vms.view.forms.controllo.Panel', {
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
            {xtype: 'actioncolumn', width: 30, menuDisabled:true,dataIndex:'esito',
                items: [{
                    getClass: function(v, metadata, r) {
                        if(r.get('esito')===1) {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.positivo')+'"';
                            return "bd-action-null x-fas fa-circle bd-color-green";
                        } else {
                            metadata.tdAttr = 'data-qtip="'+Locale.t('vms.forms.prodotto.grids.controlli.negativo')+'"';
                            return "bd-action-null x-fas fa-circle bd-color-red";
                        }
                    }
                }]
            },
            {text: Locale.t('vms.grids.controlli.column.numero'), dataIndex: 'numero', width:80,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.controlli.column.numprod'), dataIndex: 'numprod', width:80,align:'center',filter: {type: 'numeric'}},
            {text: Locale.t('vms.grids.controlli.column.prodotto'), dataIndex: 'prodotto',width:350,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.controlli.column.matricola'), dataIndex: 'matricola', width:150,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.controlli.column.tipologia'), dataIndex: 'tipologia', flex:1,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.controlli.column.normativa'), dataIndex: 'normativa',cellWrap:true, width:250,hidden:true,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.controlli.column.ubicazione'), dataIndex: 'stabilimenti', width:150,filter: {type: 'string'}},
            {text: Locale.t('vms.grids.controlli.column.datac'), dataIndex: 'datac',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('vms.grids.controlli.column.datasucc'), dataIndex: 'datasca',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}}
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
                let ff=wdwpanel.getForm();
                let tipocampi= ff.findField('tipocampi').getValue(); //nome
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {tipocampi:tipocampi,vista:nodo.itemId,tipo:nodo.idpadre,filtro:filtro},
                    url: Backend.REST_API + 'grids/funzioni/esportacontrolli',
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
                        {boxLabel:Locale.t('vms.grids.funzioni.esporta.campivista'),inputValue:"V",checked:true},
                        {boxLabel:Locale.t('vms.grids.funzioni.esporta.campischeda'),inputValue:"T"}
                    ]
                },
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
    },
    //Rigenerazione massiva pdf (utility admin, select da backend)
    onPdfMassiva:function() {
        let me = this
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
                    method: "POST",
                    url: Backend.REST_API + "forms/controllo/rigenerapdfmassiva",
                    success: function () {
                        me.getView().el.unmask()
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype:'box',html:'Esegue la rigenerazione massiva PDF sulla base della select codice backend'}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: 'Rigenerazione massiva',
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})