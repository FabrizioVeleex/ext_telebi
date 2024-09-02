/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.chiusi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.chiusi',
    requires:[
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.layout.container.HBox',
        'Ext.window.Window',
        'rec.view.forms.reso.Panel'
    ],
    init: function () {
        //gestione menu
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','7'])){
            this.listBtnTop.push({
                tooltip: Locale.t('rec.grids.chiusi.esporta.tooltip'),
                text: Locale.t('rec.grids.chiusi.esporta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
        this.callParent(arguments)
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
            {text: Locale.t('rec.grids.chiusi.column.progressivo'), dataIndex: 'progressivo', width: 120, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.chiusi.column.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date', dateFormat: 'Ymd'}},
            {text: Locale.t('rec.grids.chiusi.column.cdcli'), dataIndex: 'cdcli', width: 90, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.chiusi.column.ragsoc'), dataIndex: 'ragsoc', flex: 1, filter: {type: 'string'}},
            {text: Locale.t('rec.grids.chiusi.column.tipo'), dataIndex: 'tipo', width: 200, filter: {type: 'string'}},
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action2',
                items: [{handler: 'onChangeGestionale', iconCls: 'x-fas fa-pencil-alt', tooltip: Locale.t('rec.grids.incorso.column.changerif')}]
            },
            {text: Locale.t('rec.grids.incorso.column.numgest'), dataIndex: 'numgest', width:300, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    onEsporta:function() {
        let me = this, today = new Date(), anno=today.getFullYear();
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let annoda = ff.findField('annoda').getValue();
                let annoa = ff.findField('annoa').getValue();
                if (!annoda) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('rec.grids.chiusi.esporta.obbannoda'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (!annoa) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('rec.grids.chiusi.esporta.obbannoa'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (annoa<annoda) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('rec.grids.chiusi.esporta.diffanno'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy()
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'GET', timeout: 900000,
                    params: {annoda:annoda, annoa:annoa},
                    url: Backend.REST_API + 'grids/esporta',
                    success: function (response) {
                        let rest = Ext.decode(response.responseText);
                        me.getView().el.unmask()
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (a) {
                        me.getView().el.unmask()
                        let rest = Ext.decode(a.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5,labelAlign:'top'}, items: [
                        {xtype: 'numberfield', fieldLabel: Locale.t('rec.grids.chiusi.esporta.annoda'), width: 150,
                            allowDecimals: false, minValue: 0,value:anno,name:'annoda'
                        },
                        {xtype: 'numberfield', fieldLabel: Locale.t('rec.grids.chiusi.esporta.annoa'), width: 150,
                            allowDecimals: false, minValue: 0,value:anno,name:'annoa'
                        }
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('rec.grids.chiusi.esporta.text'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    },
    onChangeGestionale:function(view, rowIndex, colIndex, item, opt, record) {
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
                {xtype:'textfield',labelWidth:150,fieldLabel: Locale.t('rec.grids.incorso.column.numgest'), width:500,name:'newgest',value:record.data.numgest}
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