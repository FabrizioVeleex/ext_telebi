/**
 * Created by luca on 16/07/2018.
 */
Ext.define('ama.view.forms.scheda.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util','ama.view.forms.component.ControllerDimensione','ama.view.forms.component.ControllerPeso',
        'ama.view.forms.component.ControllerGrafica','ama.view.forms.component.ControllerColore','ama.view.forms.component.ControllerAltro'],
    alias: 'controller.v1-scheda',
    requires: [
        'Ext.form.FieldSet',
        'ama.model.forms.scheda.GridParametri',
        'ama.model.forms.scheda.Model',
        'ama.view.forms.scheda.attivita.Panel',
        'ama.view.forms.scheda.cards.Altro',
        'ama.view.forms.scheda.cards.Colore',
        'ama.view.forms.scheda.cards.Dimensioni',
        'ama.view.forms.scheda.cards.Grafica',
        'ama.view.forms.scheda.cards.GridAttivita',
        'ama.view.forms.scheda.cards.Parametri',
        'ama.view.forms.scheda.cards.Peso',
        'ama.view.forms.scheda.cards.Scheda'
    ],
    init: function () {
        let vm = this.getViewModel();
        //creo tasti della scheda
        this.btnChiudi = {xtype: "button", ui: "blue", text: Locale.t("ama.forms.scheda.btn.chiudi"),
            tooltip: Locale.t("ama.forms.scheda.btn.chiuditip"), iconCls: "fas fa-arrow-circle-right", handler: "onChiudi"
        };
        this.btnAnnulla = {xtype: "button", ui: "orange", text: Locale.t("ama.forms.scheda.btn.annulla"),
            tooltip: Locale.t("ama.forms.scheda.btn.annullatip"), iconCls: "fas fa-arrow-circle-right", handler: "onAnnulla"
        };
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('ama.model.forms.scheda.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let storeparametri = vm.getStore('storeParametri')
        let storeattivita = vm.getStore('storeAttivita')
        //valori lettura e visibilità
        let readOnly=true, hidenr=false, hidesz1=true,hidesz2=true,hidesz3=true,hidesz4=true
        if (record.data.sez1===1) {
            hidesz1=false
        }
        if (record.data.sez2===1) {
            hidesz2=false
        }
        if (record.data.sez3===1) {
            hidesz3=false
        }
        if (record.data.sez4===1) {
            hidesz4=false
        }
        //imposto variabile gestore
        if (vm.get('isnew')===1) {
            hidenr = true
            readOnly = false
            vm.set('btn.save', true)
        } else {
            vm.set("btn.cronology", true)
            if (record.data.step===10) {
                if (this.checkRuoli(['99', '1'])) {
                    readOnly = false
                    vm.set('btn.save', true)
                    this.toolBar.add(this.btnChiudi)
                    this.toolBar.add(this.btnAnnulla)
                }
            }
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly) //visibilità numero scheda
        vm.set('hidenr', hidenr) //visibilità numero scheda
        vm.set('hidesz1', hidesz1) //visibilità sezione 1
        vm.set('hidesz2', hidesz2) //visibilità sezione 2
        vm.set('hidesz3', hidesz3) //visibilità sezione 3
        vm.set('hidesz4', hidesz4) //visibilità sezione 4
        //titolo tab
        vm.set('title',record.data['numero'] || 'n.d.')
        vm.set('label',Locale.t('ama.forms.scheda.title'))
        //carico store altri parametri e attivita
        storeparametri.loadData(record.data['gridparametri'])
        if (readOnly === false) {
            storeparametri.add(Ext.create('ama.model.forms.scheda.GridParametri', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                parametro: '', um: '', tol: ''
            }))
        }
        storeattivita.load() //carico attivita
        //creo form principale
        this.cardScheda = Ext.create('ama.view.forms.scheda.cards.Scheda');
        this.cardParametri =Ext.create('ama.view.forms.scheda.cards.Parametri');
        //dimensioni
        this.cardDimensioni =Ext.create('ama.view.forms.scheda.cards.Dimensioni');
        this.onCreateAttachDimensione(record,readOnly) //allegati dimensioni
        this.cardParametri.add(this.cardDimensioni)
        //peso
        this.cardPeso =Ext.create('ama.view.forms.scheda.cards.Peso');
        this.onCreateAttachPeso(record,readOnly) //allegati peso
        this.cardParametri.add(this.cardPeso)
        //grafica
        this.cardGrafica =Ext.create('ama.view.forms.scheda.cards.Grafica');
        this.onCreateAttachGrafica(record,readOnly) //allegati grafica
        this.cardParametri.add(this.cardGrafica)
        //colore
        this.cardColore =Ext.create('ama.view.forms.scheda.cards.Colore');
        this.onCreateAttachColore(record,readOnly) //allegati colore
        this.cardParametri.add(this.cardColore)
        //altro
        this.cardAltro =Ext.create('ama.view.forms.scheda.cards.Altro');
        this.onCreateAttachAltro(record,readOnly) //allegati colore
        this.cardParametri.add(this.cardAltro)
        //creo fieldset sezione
        this.Parametri=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('ama.forms.scheda.cardparametri')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardParametri]
        })
        this.cardScheda.add(this.Parametri)
        //aggiungo grid attivita
        this.gridAttivita = Ext.create('ama.view.forms.scheda.cards.GridAttivita');
        this.cardScheda.add(this.gridAttivita)
        //panel principale
        this.form.add(this.cardScheda);
        this.getView().setActiveItem(this.form);
    },
    //Salvataggio
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        if (!this.obb()) {
            return false
        }
        //carico grid altri parametri
        let errparametri=''
        let storeparametri = vm.getStore('storeParametri')
        record.data["gridparametri"] = [];
        storeparametri.each(function (rec) {
            if (rec.data.parametro!=='' && rec.data.action!==2) {
                if (rec.data.parametro.length>100) {
                    errparametri+=Locale.t('ama.forms.scheda.gridparametri.parametro')+' '+rec.data.parametro+': '+': '+Locale.t('global.form.lunghezzamassima')+' 100<br>'
                }
                if (rec.data.um.length>50) {
                    errparametri+=Locale.t('ama.forms.scheda.gridparametri.um')+' '+rec.data.um+': '+Locale.t('global.form.lunghezzamassima')+' 50<br>'
                }
                if (rec.data.tol.length>50) {
                    errparametri+=Locale.t('ama.forms.scheda.gridparametri.tol')+' '+rec.data.tol+': '+Locale.t('global.form.lunghezzamassima')+' 50<br>'
                }
                record.data["gridparametri"].push(rec.data);
            }
        });
        if (errparametri!=='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('ama.forms.scheda.gridparametri.title')+'<br>'+errparametri,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardScheda.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    },
    onBeforeLoadAttivita:function(store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.id = record.data.id
    },
    onChiudi:function() {
        let me=this,vm = me.getViewModel(), record = vm.get('record');
        if (!this.obb()) {
            return false
        }
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }});
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                let ff = wdwpanel.form;
                record.data.noteaz= ff.findField('noteaz').getValue();
                wndw.destroy();
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data:record.data},
                    url: Backend.REST_API + "forms/scheda/chiudi", //azione flusso
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid=true
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
        let wdwpanel = Ext.create('Ext.form.Panel', {defaults: {margin: 5},
            border: false, items: [
                {xtype:'box',html:Locale.t('ama.forms.scheda.btn.confermamsg')},
                {xtype: 'htmleditor', hideLabel: true, scrollable: true, style: 'font-size:14px;', name:'noteaz',readOnly:false,value:''}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('ama.forms.scheda.btn.chiudi'),
            width: 550,scrollable:true,closable: true, bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onAnnulla:function() {
        let me=this,vm = me.getViewModel(), record = vm.get('record');
        if (!this.obb()) {
            return false
        }
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }});
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                let ff = wdwpanel.form;
                record.data.noteaz= ff.findField('noteaz').getValue();
                wndw.destroy();
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data:record.data},
                    url: Backend.REST_API + "forms/scheda/annulla", //azione flusso
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid=true
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
        let wdwpanel = Ext.create('Ext.form.Panel', {defaults: {margin: 5},
            border: false, items: [
                {xtype:'box',html:Locale.t('ama.forms.scheda.btn.confermamsg')},
                {xtype: 'htmleditor', hideLabel: true, scrollable: true, style: 'font-size:14px;', name:'noteaz',readOnly:false,value:''}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('ama.forms.scheda.btn.annulla'),
            width: 550,scrollable:true,closable: true, bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    /*azioni attivita
    onCarica: carica form attivita
    onAzioneGrid: azioni multiple su items (causale, note, azione da eseguire)
    */
    onCarica: function (view, rowIndex, colIndex, item, opt, record) {
        let me = this, vm = me.getViewModel(), rec = vm.get("record")
        if (this.attivita) {
            this.attivita.destroy();
        }
        let readNote=true
        //verifico stato e utente
        if (record.data.step===10 && record.data.idrisorsa===Ext.global.Vars.infoUser.id) {
            readNote=false
        }
        this.attivita = Ext.create("ama.view.forms.scheda.attivita.Panel", {
            valori: {idrec:rec.data.id,iditem: record.data.id,readOnlyAttivita:true,hideNote:false,readOnlyNote:readNote,idstabilimento:rec.data.idstabilimento},
        });
        this.attivita.on("close", this.onCloseAttivita, this);
        //attivo card
        this.cardScheda.hide();
        this.toolBar.hide()
        this.form.add(this.attivita);
        this.form.setActiveItem(this.attivita);
    },
    onCloseAttivita: function () {
        let me = this, vm = me.getViewModel(), storeattivita = vm.getStore('storeAttivita')
        storeattivita.load()
        this.cardScheda.show();
        this.toolBar.show()
        this.form.remove(this.attivita,true)
    },
    onNuovaAttivita:function() {
        let me = this, vm = me.getViewModel(), rec = vm.get("record")
        if (this.attivita) {
            this.attivita.destroy();
        }
        this.attivita = Ext.create("ama.view.forms.scheda.attivita.Panel", {
            valori: {idrec:rec.data.id,iditem: 'null',readOnlyAttivita:false,hideNote:true,readOnlyNote:true,idstabilimento:rec.data.idstabilimento},
        });
        this.attivita.on("close", this.onCloseAttivita, this);
        //attivo card
        this.cardScheda.hide();
        this.toolBar.hide()
        this.form.add(this.attivita);
        this.form.setActiveItem(this.attivita);
    },
    onRimuoviAttivita:function(view, rowIndex, colIndex, item, opt, record) {
        let me = this, vm = me.getViewModel(), storeattivita = vm.getStore('storeAttivita')
        if (record.data.step===90) {
            return false
        }
        Ext.Msg.show({
            title: Locale.t('global.avviso'), iconCls: 'x-fas fa-check-circle', msg: Locale.t('ama.forms.scheda.attivita.elimina'),
            buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                if (b === 'yes') {
                    Ext.Ajax.request({
                        method: "POST",
                        jsonData: {data:record.data},
                        url: Backend.REST_API + "forms/scheda/eliminaattivita", //azione flusso
                        success: function () {
                            storeattivita.load()
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
            }
        })
    }
})