/**
 * Created by luke on 25/03/22.
 */
Ext.define('bolfor.forms.bolla.components.ControllerFlusso', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-bolfor-flusso',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.window.Window'
    ],
    onRegistra:function(btn) {
        if (!this.obb()) {
            return false;
        }
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let btnX = new Ext.Button({
            text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}
        });
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                record.data.step= btn.step //imposto step a 9 x passaggio al successivo (10)
                me.closeForm = true //chiusura modulo
                me.refreshGrid = true
                wndw.destroy();
                me.onSave();
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: 'container', style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue">'+Locale.t('bolfor.forms.bolla.btn.registra.msg')+'</span>'
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:btn.text, height: 200,
            scrollable: true, width: 500, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    },
    onCompleta:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let btnX = new Ext.Button({
            text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}
        });
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                record.data.step= btn.step //imposto step a 9 x passaggio al successivo (10)
                me.closeForm = true //chiusura modulo
                me.refreshGrid = true
                wndw.destroy();
                me.onSave();
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: 'container', style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue">'+Locale.t('bolfor.forms.bolla.btn.completa.msg')+'</span>'
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:btn.text, height: 200,
            scrollable: true, width: 500, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    },
    onAnnulla:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let btnX = new Ext.Button({
            text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}
        });
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                record.data.step= btn.step //imposto step a 9 x passaggio al successivo (10)
                me.closeForm = true //chiusura modulo
                me.refreshGrid = true
                wndw.destroy();
                me.onSave();
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: 'container', style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue">'+Locale.t('bolfor.forms.bolla.btn.annulla.msg')+'</span>'
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:btn.text, height: 200,
            scrollable: true, width: 500, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    }
});