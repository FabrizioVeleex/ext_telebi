/**
 * Created by luca on 16/07/2018.
 */
Ext.define('gnc.view.forms.scheda.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util','gnc.view.forms.component.Contoller','gnc.view.forms.component.ControllerDefine','gnc.view.forms.component.ControllerContainment',
        'gnc.view.forms.component.ControllerCause','gnc.view.forms.component.ControllerCorrective',
        'gnc.view.forms.component.ControllerValidation','gnc.view.forms.component.ControllerIstituzionalize'],
    alias: 'controller.v1-scheda',
    requires: [
        'Ext.form.FieldSet',
        'gnc.model.forms.scheda.Model',
        'gnc.view.forms.scheda.cards.Cause',
        'gnc.view.forms.scheda.cards.Containment',
        'gnc.view.forms.scheda.cards.Corrective',
        'gnc.view.forms.scheda.cards.Define',
        'gnc.view.forms.scheda.cards.Istituzionalize',
        'gnc.view.forms.scheda.cards.Scheda',
        'gnc.view.forms.scheda.cards.Validation'
    ],
    init: function () {
        let vm = this.getViewModel();
        //creo tasti della scheda
        this.btnInoltraDefine = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.define.btn.inoltratext"),
            tooltip: Locale.t("gnc.forms.scheda.define.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroDefine"
        };
        this.btnInoltraContainment = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.containment.btn.inoltratext"),
            tooltip: Locale.t("gnc.forms.scheda.containment.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroContainment"
        };
        this.btnInoltraCause = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.cause.btn.inoltratext"),
            tooltip: Locale.t("gnc.forms.scheda.cause.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroCause"
        };
        this.btnInoltraCorrective = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.corrective.btn.inoltratext"),
            tooltip: Locale.t("gnc.forms.scheda.corrective.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroCorrective"
        };
        this.btnInoltraValidation = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.validation.btn.inoltratext"),
            tooltip: Locale.t("gnc.forms.scheda.corrective.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroValidation"
        };
        this.btnChiudi = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.istituzionalize.btn.chiuditext"),
            tooltip: Locale.t("gnc.forms.scheda.istituzionalize.btn.chiuditooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbChiusura"
        };
        this.btnAnnulla = {xtype: "button", ui: "orange", text: Locale.t("gnc.forms.scheda.btn.annulla.text"),
            tooltip: Locale.t("gnc.forms.scheda.btn.annulla.tooltip"), iconCls: "fas fa-arrow-circle-right", handler: "onAnnulla"
        };
        this.btnSalvaGestore = {xtype: "button", ui: "green", text: Locale.t("gnc.forms.scheda.btn.salvagestore.text"),
            tooltip: Locale.t("gnc.forms.scheda.btn.salvagestore.tooltip"),iconCls: "fas fa-check-square", handler: "onSalvaGestore"
        };
        this.btnStampaPdf = {xtype: "button", ui: "blue", text: Locale.t("gnc.forms.scheda.btn.stampapdf.text"),
            tooltip: Locale.t("gnc.forms.scheda.btn.stampapdf.tooltip"),iconCls: "icon-pdf", handler: "onStampaPdf"
        };
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('gnc.model.forms.scheda.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        //valori lettura campi
        let readOnlyDefine=true,readOnlyContainment=true, readOnlyCause=true, readOnlyCorrective=true, readOnlyValidation=true, readOnlyIstituzionalize=true
        //edita responsabile containment
        let readOnlyLotto=true,readOnlyBlocco=true,readOnlyStock=true,readOnlyAltroContainment=true
        //edita responsabile corrective
        let readOnlyMateriale=true,readOnlyMan=true,readOnlyMachine=true,readOnlyStrumenti=true,readOnlyMetodo=true,readOnlyProgetto=true,readOnlyAltro=true
        //valori visibilità tipo e sezioni
        let hideFornitore,hideLotto=false, hideBlocco=false,hideStock=false,hideAltrocontainment=false
        let hideMateriale=false, hideMan=false,hideMachine=false,hideStrumenti=false,hideMetodo=false,hideProgetto=false,hideAltrocause=false
        let hideUpdDfmea=false,hideUpdPfmea=false,hideUpdCplan=false,hideUpdIst=false,hideUpdProc=false,hideUpdAltro=false
        let hideUpdDfmeaDoc=true,hideUpdDfmeaNew=true,hideUpdPfmeaDoc=true,hideUpdPfmeaNew=true,hideUpdCplanDoc=true,hideUpdCplanNew=true
        let hideUpdIstDoc=true,hideUpdIstNew=true,hideUpdProcDoc=true,hideUpdProcNew=true,hideUpdAltroDoc=true,hideUpdAltroNew=true
        let hideDelDfmeaDoc=true,hideDelPfmeaDoc=true,hideDelCplanDoc=true,hideDelIstDoc=true,hideDelProcDoc=true,hideDelAltroDoc=true
        let statodesc='Chiusa',gestore=0
        //imposto variabile gestore
        if (this.checkRuoli(['99', '98'])) {
            gestore=1
        }
        if (vm.get('isnew')===1) {
            readOnlyDefine=false //nuovo
            statodesc='Nuova'
            vm.set('btn.save', true)
        } else {
            vm.set("btn.cronology", true)
            switch (record.data.step) {
                case 10: //define
                    statodesc='Define'
                    if (this.checkRuoli(['99', '98','10'])) {
                        readOnlyDefine=false //nuovo
                        vm.set('btn.save', true)
                        this.toolBar.add(this.btnInoltraDefine)
                        vm.set('btn.delete', true)
                    }
                    break
                case 20: // Containment
                    statodesc='Containment'
                    if (this.checkRuoli(['99', '98','20'])) {
                        readOnlyContainment=false;readOnlyLotto=false;readOnlyBlocco=false;readOnlyStock=false;readOnlyAltroContainment=false
                        if (gestore===1) {
                            this.toolBar.add(this.btnSalvaGestore)
                        } else {
                            vm.set('btn.save', true)
                        }
                        this.toolBar.add(this.btnInoltraContainment)
                        this.toolBar.add(this.btnAnnulla)
                    } else {
                        if (record.data.lotto_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyLotto=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.blocco_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyBlocco=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.stock_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyStock=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.altrocontainment_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyAltroContainment=false
                            vm.set('btn.save', true)
                        }
                    }
                    break
                case 30://Route cause analisys
                    statodesc='Route cause analisys'
                    if (this.checkRuoli(['99', '98','30'])) {
                        readOnlyCause=false
                        if (gestore===1) {
                            this.toolBar.add(this.btnSalvaGestore)
                        } else {
                            vm.set('btn.save', true)
                        }
                        this.toolBar.add(this.btnInoltraCause)
                        this.toolBar.add(this.btnAnnulla)
                    }
                    break
                case 40://Corrective actions
                    statodesc='Corrective actions'
                    if (this.checkRuoli(['99', '98','40'])) {
                        readOnlyCorrective=false
                        readOnlyMateriale=false;readOnlyMan=false;readOnlyMachine=false;readOnlyStrumenti=false;readOnlyMetodo=false;readOnlyProgetto=false;readOnlyAltro=false
                        if (gestore===1) {
                            this.toolBar.add(this.btnSalvaGestore)
                        } else {
                            vm.set('btn.save', true)
                        }
                        this.toolBar.add(this.btnInoltraCorrective)
                        this.toolBar.add(this.btnAnnulla)
                    } else {
                        if (record.data.materiale_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyMateriale=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.man_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyMan=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.machine_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyMachine=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.strumenti_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyStrumenti=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.metodo_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyMetodo=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.progetto_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyProgetto=false
                            vm.set('btn.save', true)
                        }
                        if (record.data.altro_resp===Ext.global.Vars.infoUser.id) {
                            readOnlyAltro=false
                            vm.set('btn.save', true)
                        }
                    }
                    break
                case 50://Validations
                    statodesc='Validations'
                    if (this.checkRuoli(['99', '98','50'])) {
                        readOnlyValidation=false
                        if (gestore===1) {
                            this.toolBar.add(this.btnSalvaGestore)
                        } else {
                            vm.set('btn.save', true)
                        }
                        this.toolBar.add(this.btnInoltraValidation)
                        this.toolBar.add(this.btnAnnulla)
                    }
                    break
                case 60: //Istituzionalize
                    statodesc='Istituzionalize'
                    if (this.checkRuoli(['99', '98','60'])) {
                        readOnlyIstituzionalize=false
                        if (gestore===1) {
                            this.toolBar.add(this.btnSalvaGestore)
                        } else {
                            vm.set('btn.save', true)
                        }
                        this.toolBar.add(this.btnChiudi)
                        this.toolBar.add(this.btnAnnulla)
                    }
                    //verifico visualizzazione allegati
                    break
            }
            this.toolBar.add(this.btnStampaPdf)
        }
        if (record.data.tipo===0) {
            hideFornitore=true
        } else {
            hideFornitore=false
        }
        //visibilità campi
        if (record.data.step>20) {
            if (record.data.lotto===0) {hideLotto=true}
            if (record.data.blocco===0) {hideBlocco=true}
            if (record.data.stock===0) {hideStock=true}
            if (record.data.altrocontainment===0) {hideAltrocontainment=true}
        }
        if (record.data.step>30) {
            if (record.data.materiale===0) {hideMateriale=true}
            if (record.data.man===0) {hideMan=true}
            if (record.data.machine===0) {hideMachine=true}
            if (record.data.strumenti===0) {hideStrumenti=true}
            if (record.data.metodo===0) {hideMetodo=true}
            if (record.data.progetto===0) {hideProgetto=true}
            if (record.data.altrocause===0) {hideAltrocause=true}
        }
        //se è gestore e lo step è in corso abilito tutte le sezioni in modifica
        if (vm.get('isnew')!==1 && record.data.step<=90 && this.checkRuoli(['99','98'])) {
            readOnlyDefine=false; readOnlyContainment=false; readOnlyCause=false; readOnlyCorrective=false; readOnlyValidation=false; readOnlyIstituzionalize=false
            readOnlyLotto=false;readOnlyBlocco=false;readOnlyStock=false;readOnlyAltroContainment=false
            readOnlyMateriale=false;readOnlyMan=false;readOnlyMachine=false;readOnlyStrumenti=false;readOnlyMetodo=false;readOnlyProgetto=false;readOnlyAltro=false
        }
        vm.set('btn.close', true)
        vm.set('statodesc', statodesc) //stato scheda in visualizzazione
        //titolo tab
        vm.set('title',record.data['numero'] || 'n.d.')
        vm.set('label',Locale.t('gnc.forms.scheda.title'))
        //creo form principale
        this.cardScheda = Ext.create('gnc.view.forms.scheda.cards.Scheda');
        this.cardDefine = Ext.create('gnc.view.forms.scheda.cards.Define');
        //creo fieldset sezione
        this.Define=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.define.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardDefine]
        })
        this.cardScheda.add(this.Define)
        this.onCreateAttachDefine(record,readOnlyDefine) //allegati define
        if (record.data.step>10) {
            //seione Contaiment
            this.cardContaiment = Ext.create('gnc.view.forms.scheda.cards.Containment');
            //allegati lotto, blocco, stock, altro
            this.onCreateAttachLotto(record,readOnlyLotto)
            this.onCreateAttachBlocco(record,readOnlyBlocco)
            this.onCreateAttachStock(record,readOnlyStock)
            this.onCreateAttachAltro(record,readOnlyAltroContainment)
            this.Contaiment=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.containment.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardContaiment]
            })
            this.cardScheda.add(this.Contaiment)
        }
        if (record.data.step>20) {
            //seione Cause
            this.cardCause = Ext.create('gnc.view.forms.scheda.cards.Cause');
            this.onCreateAttachMateriale(record,readOnlyCause)
            this.onCreateAttachMan(record,readOnlyCause)
            this.onCreateAttachMachine(record,readOnlyCause)
            this.onCreateAttachStrumenti(record,readOnlyCause)
            this.onCreateAttachMetodo(record,readOnlyCause)
            this.onCreateAttachProgetto(record,readOnlyCause)
            this.onCreateAttachAltrocause(record,readOnlyCause)
            this.Cause=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.cause.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardCause]
            })
            this.cardScheda.add(this.Cause)
        }
        if (record.data.step>30) {
            //seione Corrective actions
            this.cardCorrective = Ext.create('gnc.view.forms.scheda.cards.Corrective');
            if (record.data.materiale_ca===1) {
                this.onCreateAttachMateriale_ca(record,readOnlyMateriale)
            }
            if (record.data.man_ca===1) {
                this.onCreateAttachMan_ca(record,readOnlyMan)
                this.onCreateGridFormazione(record,readOnlyMan) //grid corsi formazione
            }
            if (record.data.machine_ca===1) {
                this.onCreateAttachMachine_ca(record,readOnlyMachine)
                this.onCreateGridMacchinari(record,readOnlyMachine) //grid monitoraggi macchinari
            }
            if (record.data.strumenti_ca===1) {
                this.onCreateAttachStrumenti_ca(record,readOnlyStrumenti)
            }
            if (record.data.metodo_ca===1) {
                this.onCreateAttachMetodo_ca(record,readOnlyMetodo)
            }
            if (record.data.progetto_val===1) {
                this.onCreateAttachProgetto_ca(record,readOnlyProgetto)
            }
            if (record.data.altrocause_ca===1) {
                this.onCreateAttachAltrocause_ca(record,readOnlyAltro)
            }
            this.Corrective=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.corrective.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardCorrective]
            })
            this.cardScheda.add(this.Corrective)
        }
        if (record.data.step>40) {
            //seione Validation
            this.cardValidation = Ext.create('gnc.view.forms.scheda.cards.Validation');
            if (record.data.materiale_val===1) {
                this.onCreateAttachMateriale_val(record,readOnlyValidation)
            }
            if (record.data.man_val===1) {
                this.onCreateAttachMan_val(record,readOnlyValidation)
            }
            if (record.data.machine_val===1) {
                this.onCreateAttachMachine_val(record,readOnlyValidation)
            }
            if (record.data.strumenti_val===1) {
                this.onCreateAttachStrumenti_val(record,readOnlyValidation)
            }
            if (record.data.metodo_val===1) {
                this.onCreateAttachMetodo_val(record,readOnlyValidation)
            }
            if (record.data.progetto_val===1) {
                this.onCreateAttachProgetto_val(record,readOnlyValidation)
            }
            if (record.data.altrocause_val===1) {
                this.onCreateAttachAltrocause_val(record,readOnlyValidation)
            }
            this.onCreateGridCollaudo(record,readOnlyValidation) //schede collaudo
            this.Validation=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.validation.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardValidation]
            })
            this.cardScheda.add(this.Validation)
        }
        if (record.data.step>50) {
            //sezione istituzionalize
            this.cardIstituzionalize = Ext.create('gnc.view.forms.scheda.cards.Istituzionalize');
            this.onCreateGridCorrelati(record,readOnlyIstituzionalize) //grid correlati
            this.onCreateAttachIstituzionalize(record,readOnlyIstituzionalize) //allegati
            if (readOnlyIstituzionalize===false) {
                this.onCreateAttachDfmea() //allegato dfmea
                this.onCreateAttachPfmea() //allegato pfmea
                this.onCreateAttachCplan() //allegato cplan
                this.onCreateAttachIst() //allegato istruzioni
                this.onCreateAttachProc() //allegato procedure
                this.onCreateAttachAltroist() //allegato altro
            }
            if (record.data.dfmeadoc!=='') {hideUpdDfmeaDoc=false}
            if (record.data.pfmeadoc!=='') {hideUpdPfmeaDoc=false}
            if (record.data.cplandoc!=='') {hideUpdCplanDoc=false}
            if (record.data.istdoc!=='') {hideUpdIstDoc=false}
            if (record.data.procdoc!=='') {hideUpdProcDoc=false}
            if (record.data.altrodoc!=='') {hideUpdAltroDoc=false}
            if (record.data.step===60) {
                if (record.data.dfmeadoc!=='') {hideDelDfmeaDoc=false}
                if (record.data.pfmeadoc!=='') {hideDelPfmeaDoc=false}
                if (record.data.cplandoc!=='') {hideDelCplanDoc=false}
                if (record.data.istdoc!=='') {hideDelIstDoc=false}
                if (record.data.procdoc!=='') {hideDelProcDoc=false}
                if (record.data.altrodoc!=='') {hideDelAltroDoc=false}
            }
            this.Istituzionalize=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.istituzionalize.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardIstituzionalize]
            })
            this.cardScheda.add(this.Istituzionalize)
        }
        //aggiungo le immagini (dopo ogni card di allegati, altrimenti va in errore)
        this.onAddImagesKo(record,readOnlyDefine) //immagine Ko
        this.onAddImagesOk(record,readOnlyDefine) //immagine Ok
        this.onAddImagesAltro(record,readOnlyDefine) //immagine altro
        //imposto variabili viewmodel edit campi
        vm.set('readOnlyDefine',readOnlyDefine) //campi in lettura sezione define
        vm.set('readOnlyContainment',readOnlyContainment) //campi in lettura sezione containment
        vm.set('readOnlyCause',readOnlyCause) //campi in lettura sezione cause
        vm.set('readOnlyCorrective',readOnlyCorrective) //campi in lettura sezione corrective
        vm.set('readOnlyValidation',readOnlyValidation) //campi in lettura sezione validations
        vm.set('readOnlyIstituzionalize',readOnlyIstituzionalize) //campi in lettura sezione istituzionalize
        //edit responsabili containment
        vm.set('readOnlyLotto',readOnlyLotto)
        vm.set('readOnlyBlocco',readOnlyBlocco)
        vm.set('readOnlyStock',readOnlyStock)
        vm.set('readOnlyAltroContainment',readOnlyAltroContainment)
        //edit responsabili corrective
        vm.set('readOnlyMateriale',readOnlyMateriale)
        vm.set('readOnlyMan',readOnlyMan)
        vm.set('readOnlyMachine',readOnlyMachine)
        vm.set('readOnlyStrumenti',readOnlyStrumenti)
        vm.set('readOnlyMetodo',readOnlyMetodo)
        vm.set('readOnlyProgetto',readOnlyProgetto)
        vm.set('readOnlyAltro',readOnlyAltro)
        //imposto variabili viewmodel visualizza campi sezioni define, cause, corrective, validation
        vm.set('hideFornitore',hideFornitore)
        vm.set('hideLotto',hideLotto)
        vm.set('hideBlocco',hideBlocco)
        vm.set('hideStock',hideStock)
        vm.set('hideAltrocontainment',hideAltrocontainment)
        vm.set('hideMateriale',hideMateriale)
        vm.set('hideMan',hideMan)
        vm.set('hideMachine',hideMachine)
        vm.set('hideStrumenti',hideStrumenti)
        vm.set('hideMetodo',hideMetodo)
        vm.set('hideProgetto',hideProgetto)
        vm.set('hideAltrocause',hideAltrocause)
        //righe instituzionalize
        vm.set('hideUpdDfmea',hideUpdDfmea)
        vm.set('hideUpdDfmeaNew',hideUpdDfmeaNew)
        vm.set('hideUpdDfmeaDoc',hideUpdDfmeaDoc)
        vm.set('hideDelDfmeaDoc',hideDelDfmeaDoc)
        vm.set('hideUpdPfmea',hideUpdPfmea)
        vm.set('hideUpdPfmeaNew',hideUpdPfmeaNew)
        vm.set('hideUpdPfmeaDoc',hideUpdPfmeaDoc)
        vm.set('hideDelPfmeaDoc',hideDelPfmeaDoc)
        vm.set('hideUpdCplan',hideUpdCplan)
        vm.set('hideUpdCplanNew',hideUpdCplanNew)
        vm.set('hideUpdCplanDoc',hideUpdCplanDoc)
        vm.set('hideDelCplanDoc',hideDelCplanDoc)
        vm.set('hideUpdIst',hideUpdIst)
        vm.set('hideUpdIstNew',hideUpdIstNew)
        vm.set('hideUpdIstDoc',hideUpdIstDoc)
        vm.set('hideDelIstDoc',hideDelIstDoc)
        vm.set('hideUpdProc',hideUpdProc)
        vm.set('hideUpdProcNew',hideUpdProcNew)
        vm.set('hideUpdProcDoc',hideUpdProcDoc)
        vm.set('hideDelProcDoc',hideDelProcDoc)
        vm.set('hideUpdAltro',hideUpdAltro)
        vm.set('hideUpdAltroNew',hideUpdAltroNew)
        vm.set('hideUpdAltroDoc',hideUpdAltroDoc)
        vm.set('hideDelAltroDoc',hideDelAltroDoc)
        //panel principale
        this.form.add(this.cardScheda);
        this.getView().setActiveItem(this.form);
    },
    //Salvataggio
    onSave: function () {
        //obbligo lo stabilimento
        let record = this.getViewModel().get('record');
        if (record.data.idstabilimento==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('gnc.forms.scheda.define.obbstabilimento'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        this.onSetCampiData()
        this.callParent(arguments)
    },
    onSalvaGestore:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        this.onSetCampiData()
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            jsonData: {data: record.data},
            url: Backend.REST_API + "forms/scheda/salvagestore",
            success: function () {
                me.loadData()
                me.getView().el.unmask()
                bdFunctions.bdTips.msg('Salvataggio completo scheda', Locale.t('global.form.salvataggiook'));
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
    },
    //comprimi-espandi sezioni
    onComprimiSezioni:function() {
        if (this.Define) {
            this.Define.collapse()
        }
        if (this.Contaiment) {
            this.Contaiment.collapse()
        }
        if (this.Cause) {
            this.Cause.collapse()
        }
        if (this.Corrective) {
            this.Corrective.collapse()
        }
        if (this.Validation) {
            this.Validation.collapse()
        }
        if (this.Istituzionalize) {
            this.Istituzionalize.collapse()
        }
    },
    onEspandiSezioni:function() {
        if (this.Define) {
            this.Define.expand()
        }
        if (this.Contaiment) {
            this.Contaiment.expand()
        }
        if (this.Cause) {
            this.Cause.expand()
        }
        if (this.Corrective) {
            this.Corrective.expand()
        }
        if (this.Validation) {
            this.Validation.expand()
        }
        if (this.Istituzionalize) {
            this.Istituzionalize.expand()
        }
    }
})