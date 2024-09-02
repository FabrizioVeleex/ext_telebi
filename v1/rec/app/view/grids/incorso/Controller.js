/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.incorso.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.incorso',
    requires:[
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'rec.view.forms.reso.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
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
        //ciclo le colonne x nascondere/visualizzare cliente
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'descit') {
                if (nodo['idpadre'] === 'NaN') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
            if (colonne[i].dataIndex === 'azione') {
                if (nodo['idpadre'] === 50) {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
            if (colonne[i].dataIndex === 'action2') {
                if (nodo['idpadre'] === 50) {
                    if (this.checkRuoli(['99','4','3'])){
                        colonne[i].show();
                    } else {
                        colonne[i].hide();
                    }
                } else {
                    colonne[i].hide();
                }
            }
            if (colonne[i].dataIndex === 'numgest') {
                if (nodo['idpadre'] === 50) {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    createForm: function(view,record,isnew){
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('rec.view.forms.reso.Panel', {
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
            {text: Locale.t('rec.grids.incorso.column.progressivo'), dataIndex: 'progressivo', width: 120, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.incorso.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text: Locale.t('rec.grids.incorso.column.cdcli'), dataIndex: 'cdcli', width: 90, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.incorso.column.ragsoc'), dataIndex: 'ragsoc', flex: 1, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.incorso.column.tipo'), dataIndex: 'tipo', width: 200, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.incorso.column.descit'), dataIndex: 'descit', width:200, filter: {type: 'string'}},
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action2',
                items: [{handler: 'onChangeRif', iconCls: 'x-fas fa-pencil-alt', tooltip: Locale.t('rec.grids.incorso.column.changerif')}]
            },
            {text: Locale.t('rec.grids.incorso.column.numgest'), dataIndex: 'numgest', width:150, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    onChangeRif:function(view, rowIndex, colIndex, item, opt, record) {
        let me = this
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let newgest=ff.findField('newgest').getValue();
                if (!newgest || newgest.trim()==='') {
                    Ext.Msg.show({title: Locale.t('global.attenzione'), msg: Locale.t('rec.forms.reso.btn.ingressomateriale.obbgest'), buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                    return false;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'));
                Ext.Ajax.request({
                    method: 'PUT',
                    jsonData:{id:record.data.id,newgest:newgest},
                    url: Backend.REST_API + 'grids/incorso/changegest',
                    success: function (response) {
                        let resp = Ext.decode(response.responseText);
                        if (typeof resp.msg!=='undefined') {
                            Ext.Msg.show({
                                title: Locale.t('global.errore'),
                                msg: resp['msg'],
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                        me.getView().el.unmask();
                        me.getView().getSelectionModel().deselectAll(); //pulisco selezioni
                        me.getView().getStore().load();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype:'textfield',labelWidth:150,fieldLabel: Locale.t('rec.grids.incorso.column.numgest'), width:500,name:'newgest',value:record.data.numgest},
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' + Locale.t('rec.grids.incorso.msggest')+ "</span>",}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('rec.grids.annullatiacg.btn.ripristina.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        })
        wndw.show();
    }
})