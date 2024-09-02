/**
 * Created by luke on 25/03/22.
 */
Ext.define('vda.view.forms.component.ControllerPpap', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ppap',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.window.Window'
    ],
    obbApprovaPapp: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        //controllo nome/data progetto obbligatori all'inizio
        if (!this.obb()) {
            return
        }
        if (record.data.attrezzature === ''){
            error += Locale.t('vda.forms.progetto.ppap.fields.attrezzature')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        //allegati
        let storeallegati = vm.getStore("storeAttachPpap");
        record.data.allegati = [];
        storeallegati.each(function (rec) {
            rec.data.step = record.data.step
            record.data.allegati.push(rec.data);
        })
        this.onApprovaPpap(btn);
    },
    onApprovaPpap:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let btnX = new Ext.Button({
            text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban",
            handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                let ff = wdwpanel.getForm();
                let note = ff.findField("note").getValue();
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data: record.data,azione:30,note:note},
                    url: Backend.REST_API + "forms/progetto/flusso", //azione flusso
                    success: function () {
                        me.getView().el.unmask()
                        me.refreshGrid = true
                        me.onClose()
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: "textarea", fieldLabel:  Locale.t("vda.forms.progetto.btn.note"), scrollable: true, overflow: "auto", padding: "0 0 10 0",
                    anchor: "90%",labelWidth: 80, height: 200, value: "", name: "note"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:  btn.text, height: 350,
            scrollable: true, width: 600, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    }
});