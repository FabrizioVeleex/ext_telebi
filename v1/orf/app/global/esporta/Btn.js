/**
 * Created by luke on 13/06/23.
 */
Ext.define('orf.global.esporta.Btn', {
    extend: "Ext.button.Button",

    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.window.Window'
    ],
    tooltip: Locale.t("orf.grids.documenti.btn.esporta.tooltip"),
    text: Locale.t("orf.grids.documenti.btn.esporta.text"),
    ui: "green",
    iconCls: "x-fas fa-file-excel",
    handler: function () {
        let me = this;
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET', timeout: 900000,
                    url: Backend.REST_API + 'grids/esporta',
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
                { xtype: 'box', html: Locale.t('orf.grids.documenti.btn.esporta.msg') }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('orf.grids.documenti.btn.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});