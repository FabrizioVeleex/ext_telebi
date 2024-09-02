/**
 * Created by luke on 15/03/22.
 * Utilizzato per azioni/oggetti comuni
 */
Ext.define('vda.view.forms.component.Contoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contoller',

    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.window.Window',
        'portal.util.Functions',
        'vda.view.forms.mail.Panel'
    ],
    onOpenProgetto:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (typeof parentPortale !="undefined"  && parentPortale !=null){
            if (record.data.idprogetto) {
                parentPortale.onHandlerMenu({
                    iconCls:'ATT-16', iconCls32:'ATT-32', iconCls64:'ATT-64',
                    tag:'ATT', appui:'default', target:'frame',
                    text:'',
                    datiApertura:{tabella:'TBATTREC01',id:record.data.idprogetto,idrecord:record.data.idprogetto},
                    tipo:'app6',
                    url:'/bpportal/modules/ATT/libs/Main.php?_fn=open',
                    id:record.data.idprogetto,
                    idrecord:record.data.idprogetto,
                    tabella:'TBATTREC01'
                });
            } else {
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'Errore, ID record progetto non presente',buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
            }
        }else{
            let err='Errore lettura portale, impossibile eseguire l\'operazione...';
            Ext.Msg.show({title:Locale.t('global.attenzione'),msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
        }
    },
    onOpenScheda:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (typeof parentPortale !="undefined"  && parentPortale !=null){
            if (record.data.idscheda) {
                parentPortale.onHandlerMenu({
                    iconCls:'CLD-16', iconCls32:'CLD-32', iconCls64:'CLD-64',
                    tag:'CLD', appui:'default', target:'frame',
                    text:'',
                    datiApertura:{tabella:'TBCLDSCH01',id:record.data.idscheda,idrecord:record.data.idscheda},
                    tipo:'app6',
                    url:'/bpportal/modules/CLD/libs/Main.php?_fn=open',
                    id:record.data.idscheda,
                    idrecord:record.data.idscheda,
                    tabella:'TBCLDSCH01'
                });
            } else {
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'Errore, ID record scheda collaudo non presente',buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
            }
        }else{
            let err='Errore lettura portale, impossibile eseguire l\'operazione...';
            Ext.Msg.show({title:Locale.t('global.attenzione'),msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
        }
    },
    //inoltro nelle varie fasi
    onInoltra:function(btn) {
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
                    jsonData: {data: record.data,azione:0,note:note}, //come azione imposto 0=tutti gli steps
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
            tbar: [btnX, btnConfirm], title:btn.text, height: 350,
            scrollable: true, width: 600, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    },
    onSospendiAnnulla:function(btn) {
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
                    jsonData: {data: record.data,azione:btn.azione,note:note},
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
    },
    onRespingi:function(btn) {
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
                    jsonData: {data: record.data,azione:-1,note:note},
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
    },
    onRipristina:function(btn) {
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
                    jsonData: {data: record.data,azione:-97,note:note},
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
    },
    onCreaMail:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let center = this.getView().up();
        let idmail= bdFunctions.bpRandomString(32)
        let formmail = Ext.create('vda.view.forms.mail.Panel', {
            itemId: 'f' + idmail,
            valori: {
                id:idmail,
                isnew: 1,
                idprogetto:record.data.id,
                step:record.data.step
            },
        });
        center.add(formmail);
        center.setActiveItem(formmail);
        //ricaricamento grid mail
        formmail.on('closeFormInvio', this.onLoadMail, this);
    },
    onLoadMail:function() {
        let me = this
        let gridmail = me.gridmail
        if (gridmail) {
            gridmail.getStore().reload()
        }
    },
    onCreaShare:function() {
        alert('Funzione da sviluppare')
    },
    onOpenMail:function(view, rowIndex, colIndex, item, opt, rec) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let center = this.getView().up();
        let itemId= 'f' +rec.data.id
        let formmail  = center.child('#'+itemId);
        if (!formmail) {
            formmail = Ext.create('vda.view.forms.mail.Panel', {
                itemId:'f' +rec.data.id,
                valori: {
                    id:rec.data.id,
                    isnew: 0,
                    idprogetto:record.data.id,
                    step:record.data.step
                }
            });
            center.add(formmail);
        }
        center.setActiveItem(formmail);
    }
});