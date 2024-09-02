/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.verifiche.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.verifiche',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'fmc.view.forms.verifica.Panel'
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
        //esportazione
        if (this.checkRuoli(['99','10','4'])){
            this.toolbar.add({
                tooltip: Locale.t('fmc.grids.verifiche.btn.esporta.tooltip'),
                text: Locale.t('fmc.grids.verifiche.btn.esporta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('fmc.view.forms.verifica.Panel', {
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
            {text: Locale.t('fmc.grids.verifiche.column.numero'), dataIndex: 'numero', width:80,filter: {type: 'string'},
                renderer : function(v,m,r){let g='';
                    if(r.get('esito')===-1){g ='color:red;font-weight:bold;'}
                    return '<span style='+g+';>'+v+'</span>';}
            },
            {text: Locale.t('fmc.grids.verifiche.column.corso'), dataIndex: 'corso', width:250,filter: {type: 'string'},
                renderer : function(v,m,r){let g='';
                    if(r.get('esito')===-1){g ='color:red;font-weight:bold;'}
                    return '<span style='+g+';>'+v+'</span>';}
            },
            {text: Locale.t('fmc.grids.verifiche.column.titolo'), dataIndex: 'titolo', flex:1,filter: {type: 'string'},
                renderer : function(v,m,r){let g='';
                    if(r.get('esito')===-1){g ='color:red;font-weight:bold;'}
                    return '<span style='+g+';>'+v+'</span>';}
            },
            {text: Locale.t('fmc.grids.verifiche.column.datachk'), dataIndex: 'datachk',width:100,xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'},
                renderer : function(v,m,r){let dt= Ext.Date.format(v, 'd/m/Y');let g='';
                    if(r.get('esito')===-1){g ='color:red;font-weight:bold;'}
                    return '<span style='+g+';>'+dt+'</span>';
                }
            },
            {text: Locale.t('fmc.grids.verifiche.column.stato'), dataIndex: 'stato', width:250,filter: {type: 'string'},
                renderer : function(v,m,r){let g='';
                    if(r.get('esito')===-1){g ='color:red;font-weight:bold;'}
                    return '<span style='+g+';>'+v+'</span>';}
            }
        ]
        this.callParent(arguments)
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
                    url: Backend.REST_API + 'grids/funzioni/esportaverifiche',
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