/**
 * Created by luke on 13/06/23.
 */
Ext.define('ord.global.esporta.Btn', {
    extend: "Ext.button.Button",

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.layout.container.HBox',
        'Ext.window.Window',
        'portal.v1.store.forms.combo.GetAzienda'
    ],
    tooltip: Locale.t("ord.grids.documenti.btn.esporta.tooltip"),
    text: Locale.t("ord.grids.documenti.btn.esporta.text"),
    ui: "green",
    iconCls: "x-fas fa-file-excel",
    handler: function () {
        let me=this
        let btnX = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let dal = ff.findField('dal').getValue();
                let al = ff.findField('al').getValue();
                let codazienda = ff.findField('azienda').getValue();
                let tipo = ff.findField('tipo').getValue();
                let tipodata = ff.findField('tipodata').getValue();
                if (dal && al) {
                    let dataDal = new Date(dal)
                    let dataAl = new Date(al)
                    if (dataAl.getTime()<dataDal.getTime()){
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: Locale.t('ord.grids.documenti.btn.esporta.errdate'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                        return;
                    }
                }
                if (!codazienda) {
                    codazienda=''
                }
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    url: Backend.REST_API + 'grids/esporta',
                    params: {dal: dal, al: al,codazienda:codazienda,tipo:tipo,tipodata:tipodata},
                    success: function (resp) {
                        let rest = Ext.decode(resp.responseText);
                        me.view.el.unmask()
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (resp) {
                        me.view.el.unmask()
                        let rest = Ext.decode(resp.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rest.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'fieldset', collapsible: false, collapsed: false,title:Locale.t('ord.grids.documenti.filtri.azienda')+' '+Locale.t('ord.grids.documenti.btn.esporta.msgazienda'),
                    style: {'background-color': "transparent;"},items:[
                        {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                                {xtype: 'combo',width:500,minChars:2,forceSelection: true,hideLabel: true,
                                    name:'azienda', displayField:'azienda',valueField:'codice',value:'',
                                    store: Ext.create('portal.v1.store.forms.combo.GetAzienda')
                                }
                            ]
                        }
                    ]
                },
                {xtype: 'fieldset', collapsible: false, collapsed: false,title:Locale.t('ord.grids.documenti.btn.esporta.tipo'),
                    style: {'background-color': "transparent;"},items:[
                        {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                                {xtype: 'radiogroup', name: 'tipo', hideLabel:true,
                                    columns: 2, flex: 1, simpleValue: true,
                                    items: [
                                        {boxLabel: Locale.t('ord.grids.documenti.btn.esporta.somma'), inputValue: 0, checked: true},
                                        {boxLabel: Locale.t('ord.grids.documenti.btn.esporta.righe'), inputValue: 1}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {xtype: 'fieldset', collapsible: false, collapsed: false,title:Locale.t('ord.grids.documenti.btn.esporta.periodo'),
                    style: {'background-color': "transparent;"},items:[
                        {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                                {xtype: 'radiogroup', name: 'tipodata', hideLabel:true,
                                    columns: 2, flex: 1, simpleValue: true,
                                    items: [
                                        {boxLabel: Locale.t('ord.grids.documenti.btn.esporta.dataord'), inputValue: 'O', checked: true},
                                        {boxLabel: Locale.t('ord.grids.documenti.btn.esporta.datacon'), inputValue: 'C'}
                                    ]
                                }
                            ]
                        },
                        {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                                {xtype: 'datefield', fieldLabel: Locale.t('ord.grids.documenti.btn.esporta.dal'),labelWidth: 60,
                                    allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'dal'},
                                {xtype: 'datefield', fieldLabel: Locale.t('ord.grids.documenti.btn.esporta.al'), labelWidth: 60,
                                    allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'al'}
                            ]
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                        {xtype:'box',html:Locale.t('ord.grids.documenti.btn.esporta.msg')}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:Locale.t('ord.grids.documenti.btn.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});