/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.organigrammi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.organigrammi',
    requires:[
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.window.Window',
        'amm.model.grids.Organigrammi',
        'amm.view.forms.organigramma.Panel',
        'portal.util.Functions'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','1'])){
            this.listBtnTop.push({
                tooltip: Locale.t('amm.grids.organigrammi.btn.new.tooltip'),
                text: Locale.t('amm.grids.organigrammi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            })
            this.listBtnTop.push({
                tooltip: Locale.t('amm.grids.organigrammi.btn.esporta.tooltip'),
                text: Locale.t('amm.grids.organigrammi.btn.esporta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
        this.callParent(arguments)
    },
    onNew: function() {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('amm.model.grids.Organigrammi',{
            id :bdFunctions.bpRandomString(32),
            isnew:1,
            status:1
        });
        this.createForm(view,NewRecord,1);
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('amm.view.forms.organigramma.Panel', {
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
            {text:Locale.t('amm.grids.organigrammi.column.nome'), dataIndex: 'nome', width:300, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.organigrammi.column.desktop'), dataIndex: 'desktop',width:250, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.organigrammi.column.descrizione'), dataIndex: 'descrizione',flex:1, filter: {type: 'string'}},
            {text:Locale.t('amm.grids.organigrammi.column.email'), dataIndex: 'email', width:200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //esportazione excel
    onEsporta:function() {
        let me=this;
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
                    method: 'PUT',timeout : 900000,
                    url: Backend.REST_API + 'grids/esportauo',
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
                {xtype:'box',html:Locale.t('amm.grids.organigrammi.btn.esporta.msg')}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:Locale.t('amm.grids.organigrammi.btn.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})