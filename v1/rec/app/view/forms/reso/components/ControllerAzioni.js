/**
 * Created by luke on 25/03/22.
 */
Ext.define('rec.view.forms.reso.components.ControllerAzioni', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-bolfor-flusso',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Hidden',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.window.Window',
        'rec.store.forms.reso.ComboAzione',
        'rec.store.forms.reso.ComboCausali',
        'rec.view.forms.reso.info.Panel'
    ],
    //ingresso materiale con aggancio XA
    onIngresso: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: {data: record.data, step: btn.step},
                    url: Backend.REST_API + "forms/reso/flusso", //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        if (btn.step===25) { //ingresso materiale ricarico
                            me.loadData(); //carico form
                        } else {
                            me.onClose();
                        }
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' + btn.msg + "</span>",}
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    //avanzamento reso
    onStep: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let storeprodotti = vm.getStore("gridRicevuti");
        record.data["gridricevuti"] = [];
        let storeallegati = vm.getStore("storeAllegati");
        record.data["gridricevuti"] = [];
        storeprodotti.each(function (rec) {
            if (rec.data.codice!=='') {
                record.data['gridricevuti'].push(rec.data)
            }
        });
        //recupero allegati
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: {data: record.data, step: btn.step},
                    url: Backend.REST_API + "forms/reso/flusso", //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        if (btn.step===25) { //ingresso materiale ricarico
                            me.loadData(); //carico form
                        } else {
                            me.onClose();
                        }
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' + btn.msg + "</span>",}
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    onInoltraTecnico: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let storeprodotti = vm.getStore("gridRicevuti");
        let griderr='', j = 1
        record.data["gridricevuti"] = [];
        let storeallegati = vm.getStore("storeAllegati");
        record.data["gridricevuti"] = [];
        storeprodotti.each(function (rec) {
            if (rec.data.codice!=='') {
                record.data['gridricevuti'].push(rec.data)
                if (rec.data.pscaus==='' && rec.data.valido===-1 &&  rec.data.dataprod==='' || (rec.data.idfornitore==='' && rec.data.obbfornitore===1 )) {
                    griderr=griderr+'<br>'+j+' - cod.prodotto: '+rec.data.codice
                }
            }
            j+=1
        });
        if (griderr!=='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.forms.reso.gridricevuti.obbdati')+griderr,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        //recupero allegati
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: {data: record.data, step: btn.step},
                    url: Backend.REST_API + "forms/reso/flusso", //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        if (btn.step===25) { //ingresso materiale ricarico
                            me.loadData(); //carico form
                        } else {
                            me.onClose();
                        }
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' + btn.msg + "</span>",}
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    //respingere reso
    onRespingi: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                let ff = wdwpanel.getForm();
                let note = ff.findField("note").getValue();
                if (note === "") {
                    Ext.Msg.show({
                        title: Locale.t("global.attenzione"),
                        msg: Locale.t("rec.forms.reso.btn.respingi.noteobb"),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: { data: record.data, step: btn.step, noteaz: note },
                    url: Backend.REST_API + "forms/reso/flusso", //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        me.onClose();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' +btn.msg + "</span>",},
                {xtype: "textarea", hideLabel: true, scrollable: true, overflow: "auto", padding: "0 0 10 0",
                    anchor: "90%", height: 200,value: "", name: "note"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:btn.text, height: 350, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    //chiusura (commerciale o supervisore)
    onAnnulla: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record"), griderr = "";
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: { data: record.data, step: btn.step },
                    url: Backend.REST_API + "forms/reso/flusso", //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        me.onClose();
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
        let wdwpanel = Ext.create("Ext.form.Panel", {
            border: false, items: [
                {xtype: "container", style: { padding: "5px" },
                    html: '<span style="font-weight:bold;color:blue">' +btn.msg + "</span>"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    //chiusura (commerciale o supervisore)
    onChiudi: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record"), griderr = "";
        let storeprodotti = vm.getStore("gridRicevuti");
        record.data["gridricevuti"] = [];
        storeprodotti.each(function (rec) {
                if (rec.data.codice!=='') {
                    record.data['gridricevuti'].push(rec.data)
                    if (rec.data.codice !== "" && rec.data.idazione === "") {
                        griderr += "Articolo " + rec.data.dspcodice + "<br>";
                    }
                }
        });
        if (griderr !== "") {
            Ext.Msg.show({
                title: Locale.t("global.attenzione"),
                msg: Locale.t("rec.forms.reso.gridricevuti.obbazione") + griderr,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        //recupero allegati
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });

        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: { data: record.data, step: btn.step },
                    url: Backend.REST_API + "forms/reso/flusso", //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        me.onClose();
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
        let wdwpanel = Ext.create("Ext.form.Panel", {
            border: false, items: [
                {xtype: "container", style: { padding: "5px" },
                    html: '<span style="font-weight:bold;color:blue">' +btn.msg + "</span>"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    //azioni multiple grid articoli
    onAzioneGrid: function (btn) {
        let me = this;
        let selezione = this.gridRicevuti.getSelectionModel().getSelection();
        //verifico siano stati selezionati records
        if (selezione.length === 0) {
            Ext.Msg.show({
                title: Locale.t("global.attenzione"),
                msg: Locale.t("global.btn.selrecord"),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
            });
            return;
        }
        let i, panelwdw, notewdw;
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {notewdw.destroy();}});
        let btnConfirm;
        switch (btn.azione) {
            case "N": //note
                btnConfirm = Ext.create("Ext.Button", {text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
                    handler: function () {
                        let ff = panelwdw.getForm();
                        let notegrid = ff.findField("notegrid").getValue();
                        for (i = 0; i < selezione.length; i++) {
                            if (selezione[i].data.codice!=='') {
                                selezione[i].data.note = notegrid;
                                me.gridRicevuti.getView().refreshNode(selezione[i]);
                            }
                        }
                        notewdw.destroy();
                    }
                });
                panelwdw = Ext.create("Ext.form.Panel", {border: false,
                    items: [
                        {xtype: "textarea", hideLabel: true, width: 550, height: 200, scrollable: true, name: "notegrid", value: ""}
                    ]
                });
                notewdw = Ext.create("Ext.Window", {
                    tbar: [btnX, btnConfirm], title: Locale.t("rec.forms.reso.btn.azioni.note"), height: 300, scrollable: true, width: 600, closable: false,
                    bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
                    draggable: false, items: [panelwdw]
                });
                notewdw.show();
                break;
            case "C": //causale
                btnConfirm = Ext.create("Ext.Button", {text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
                    handler: function () {
                        let ff = panelwdw.getForm();
                        let pscaus = ff.findField("causale").getValue();
                        let psdesc = ff.findField("descrizione").getValue();
                        if (pscaus !== "") {
                            for (i = 0; i < selezione.length; i++) {
                                if (selezione[i].data.codice!=='') {
                                    selezione[i].data.pscaus = pscaus;
                                    selezione[i].data.psdesc = psdesc;
                                    me.gridRicevuti.getView().refreshNode(selezione[i]);
                                }
                            }
                        }
                        notewdw.destroy();
                    }
                });
                panelwdw = Ext.create("Ext.form.Panel", {border: false,
                    items: [
                        {xtype: "combo", editable: false, anchor: "90%", name: "causale", displayField: "psdesc", valueField: "pscaus",
                            value: "", store: Ext.create("rec.store.forms.reso.ComboCausali"),
                            listeners: {
                                select: function (cmb, rec) {
                                    let frm = panelwdw.getForm();
                                    frm.findField("descrizione").setValue(rec.data.psdesc);
                                },
                                beforequery: function (qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        { xtype: "hidden", name: "descrizione", value: "" }
                    ]
                });
                notewdw = Ext.create("Ext.Window", {
                    tbar: [btnX, btnConfirm], title: Locale.t("rec.forms.reso.btn.azioni.causale"), height: 200, scrollable: true, width: 600, closable: false,
                    bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
                    draggable: false, items: [panelwdw]
                });
                notewdw.show();
                break;
            case "P": //nr.dossier
                btnConfirm = Ext.create("Ext.Button", {text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
                    handler: function () {
                        let ff = panelwdw.getForm();
                        let dossiergrid = ff.findField("dossiergrid").getValue();
                        for (i = 0; i < selezione.length; i++) {
                            if (selezione[i].data.codice!=='') {
                                selezione[i].data.pcdos = dossiergrid;
                                me.gridRicevuti.getView().refreshNode(selezione[i]);
                            }
                        }
                        notewdw.destroy();
                    }
                });
                panelwdw = Ext.create("Ext.form.Panel", {border: false,
                    items: [
                        {xtype: "textfield", hideLabel: true, anchor:'100%',name: "dossiergrid", value: ""}
                    ]
                });
                notewdw = Ext.create("Ext.Window", {
                    tbar: [btnX, btnConfirm], title: Locale.t("rec.forms.reso.btn.azioni.pcdos"), height: 170, scrollable: true, width: 350, closable: false,
                    bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
                    draggable: false, items: [panelwdw]
                });
                notewdw.show();
                break;
            case "A": //azioni
                btnConfirm = Ext.create("Ext.Button", {text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
                    handler: function () {
                        let ff = panelwdw.getForm();
                        let idazione = ff.findField("idazione").getValue();
                        let azione = ff.findField("azione").getValue();
                        if (idazione !== "") {
                            for (i = 0; i < selezione.length; i++) {
                                if (selezione[i].data.codice!=='') {
                                    selezione[i].data.idazione = idazione;
                                    selezione[i].data.azione = azione;
                                    me.gridRicevuti.getView().refreshNode(selezione[i]);
                                }
                            }
                        }
                        notewdw.destroy();
                    }
                });
                panelwdw = Ext.create("Ext.form.Panel", {border: false,
                    items: [
                        {xtype: "combo", editable: false, anchor: "90%", name: "idazione", displayField: "azione", valueField: "valore", value: "",
                            store: Ext.create("rec.store.forms.reso.ComboAzione"),
                            listeners: {
                                select: function (cmb, rec) {
                                    let frm = panelwdw.getForm();
                                    frm.findField("azione").setValue(rec.data.azione);
                                },
                                beforequery: function (qe) {
                                    delete qe.combo.lastQuery;
                                }
                            }
                        },
                        { xtype: "hidden", name: "azione", value: "" }
                    ]
                });
                notewdw = Ext.create("Ext.Window", {
                    tbar: [btnX, btnConfirm], title: Locale.t("rec.forms.reso.btn.azioni.azione"), height: 200, scrollable: true, width: 600, closable: false,
                    bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
                    draggable: false, items: [panelwdw]
                });
                notewdw.show();
                break;
        }
    },
    //caricamento info gestionale as400
    onLoadInfo: function (view, rowIndex, colIndex, item, opt, record) {
        if (this.info) {
            this.info.destroy();
        } //distruggo pannello se presente e lo ricreo
        //pannello info item ricevuto
        this.info = Ext.create("rec.view.forms.reso.info.Panel", {
            valori: { iditem: record.data.id },
        });
        this.info.on("close", this.onCloseInfo, this);
        //attivo card
        this.toolBarGrid.hide(); //nascondo tasti grid
        this.cardGrids.add(this.info);
        this.cardGrids.setActiveItem(this.info);
    },
    onCloseInfo: function () {
        this.toolBarGrid.show(); //ripresento i tasti
        this.cardGrids.setActiveItem(this.gridRicevuti); //imposto attiva la grid
    },
    onEsporta:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record"), griderr = "";
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: { data: record.data},
                    url: Backend.REST_API + "forms/reso/esporta", //azione flusso generica passando lo step
                    success: function (response) {
                        let rest = Ext.decode(response.responseText);
                        me.view.el.unmask()
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
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
        let wdwpanel = Ext.create("Ext.form.Panel", {
            border: false, items: [
                {xtype: "container", style: { padding: "5px" },
                    html: '<span style="font-weight:bold;color:blue">' +btn.msg + "</span>"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    }
});