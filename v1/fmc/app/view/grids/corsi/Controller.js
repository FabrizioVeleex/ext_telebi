/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.corsi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.corsi',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'fmc.model.grids.Corsi',
        'fmc.model.grids.Verifiche',
        'fmc.view.forms.corso.Panel',
        'fmc.view.forms.verifica.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x gestire tasti
    checkColumn: function() {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.itemId==='previsti' && this.checkRuoli(['99','10','2'])){
            this.toolbar.add({
                tooltip: Locale.t('fmc.grids.schede.btn.new.tooltip'),
                text: Locale.t('fmc.grids.corsi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        if (nodo.itemId==='effettuati') {
            if (this.checkRuoli(['99','10','2'])){
                this.toolbar.add({
                    tooltip: Locale.t('fmc.grids.corsi.btn.upd.tooltip'),
                    text: Locale.t('fmc.grids.corsi.btn.upd.text'),
                    ui: 'green',
                    iconCls: 'x-fas fa-plus',
                    handler: 'onUpd'
                });
            }
            if (this.checkRuoli(['99','10','3'])){
                this.toolbar.add({
                    tooltip: Locale.t('fmc.grids.corsi.btn.chk.tooltip'),
                    text: Locale.t('fmc.grids.corsi.btn.chk.text'),
                    ui: 'blue',
                    iconCls: 'x-fas fa-check-circle',
                    handler: 'onCheck'
                });
            }
        }
        //esportazione
        if (this.checkRuoli(['99','10','4'])){
            this.toolbar.add({
                tooltip: Locale.t('fmc.grids.corsi.btn.esporta.tooltip'),
                text: Locale.t('fmc.grids.corsi.btn.esporta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('fmc.model.grids.Corsi',{
            id :bdFunctions.bpRandomString(32),
            isnew:1
        });
        this.createForm(view,NewRecord,1,'');
    },
    //aggiornamento
    onUpd: function() {
        let view = this.getView().view; //view della grid
        let recordsSel = []; //array record selezionati
        let records =this.getView().getSelectionModel().getSelection();
        for (let i = 0, len = records.length; i < len; i++) {
            recordsSel.push(records[i].data.id); //inserisco record
        }
        //verifico siano stati selezionati records
        if (recordsSel.length===0 || recordsSel.length>1) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('fmc.grids.corsi.btn.upd.errore'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        let NewRecord = Ext.create('fmc.model.grids.Corsi', {
            id: bdFunctions.bpRandomString(32),
            isnew: 1
        });
        this.createForm(view,NewRecord,1,recordsSel[0]);
    },
    createForm: function(view,record,isnew,idcorso){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('fmc.view.forms.corso.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew,
                idcorso:idcorso
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('fmc.grids.corsi.column.numero'), dataIndex: 'numero', width:80,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.corsi.column.titolo'), dataIndex: 'tipologia',  flex:1,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.corsi.column.sede'), dataIndex: 'sede', width:250,filter: {type: 'string'}},
            {text: Locale.t('fmc.grids.corsi.column.datac'), dataIndex: 'datac',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('fmc.grids.corsi.column.datasca'), dataIndex: 'datasca',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}}
        ]
        this.callParent(arguments)
    },
    //verifiche
    onCheck:function() {
        let view = this.getView().view; //view della grid
        let recordsSel = []; //array record selezionati
        let records =this.getView().getSelectionModel().getSelection();
        for (let i = 0, len = records.length; i < len; i++) {
            recordsSel.push(records[i].data.id); //inserisco record
        }
        //verifico siano stati selezionati records
        if (recordsSel.length===0 || recordsSel.length>1) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('fmc.grids.corsi.btn.upd.errore'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        let NewRecord = Ext.create('fmc.model.grids.Verifiche', {
            id: bdFunctions.bpRandomString(32),
            isnew: 1
        });
        this.createCheck(view,NewRecord,1,recordsSel[0]);
    },
    createCheck: function(view,record,isnew,idcorso){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('fmc.view.forms.verifica.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew,
                idcorso:idcorso
            }
        }),view)
    },
    //esportazione
    onEsporta:function() {
        let me=this;
        let nodo=this.getView().infoNode;
        if (!nodo) {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('fmc.grids.funzioni.esporta.errorenodo'),
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
                msg: Locale.t('fmc.grids.funzioni.esporta.nofiltri'),
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
                let partecipanti= ff.findField('partecipanti').getValue(); //nome
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {partecipanti:partecipanti,vista:nodo.itemId,filtro:filtro},
                    url: Backend.REST_API + 'grids/funzioni/esportacorsi',
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
                {xtype: 'radiogroup',labelWidth:150,fieldLabel:Locale.t('fmc.grids.funzioni.esporta.partecipanti'),name:'partecipanti',
                    columns: 2,flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('fmc.grids.funzioni.esporta.no'),inputValue:0,checked:true},
                        {boxLabel:Locale.t('fmc.grids.funzioni.esporta.si'),inputValue:1}
                    ]
                },
                {xtype:'box',html:Locale.t('fmc.grids.funzioni.esporta.msg')}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:Locale.t('fmc.grids.funzioni.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})