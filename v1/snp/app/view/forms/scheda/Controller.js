/**
 * Created by luca on 16/07/2018.
 */
Ext.define('snp.view.forms.scheda.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-scheda',
    requires: [
        'Ext.form.FieldSet',
        'snp.model.forms.scheda.GridConcorrenti',
        'snp.model.forms.scheda.Model',
        'snp.view.forms.scheda.cards.GridConcorrenti',
        'snp.view.forms.scheda.cards.Info',
        'snp.view.forms.scheda.cards.Opzioni',
        'snp.view.forms.scheda.cards.Scheda'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti flusso
        this.btnInoltra = {xtype: 'button', ui: 'blue', text: Locale.t('snp.forms.scheda.btn.inoltra.text'), tooltip: Locale.t('snp.forms.scheda.btn.inoltra.tooltip'), iconCls: 'fas fa-hand-point-right',step:11, handler: 'onAzione'}
        this.btnSospendi = {xtype: 'button', ui: 'orange', text: Locale.t('snp.forms.scheda.btn.sospendi.text'), tooltip: Locale.t('snp.forms.scheda.btn.sospendi.tooltip'), iconCls: 'fas fa-ban',step:5,handler: 'onAzione'}
        this.btnAzioni = {xtype: 'button', ui: 'blue', text: Locale.t('snp.forms.scheda.btn.opzioni.text'), tooltip: Locale.t('snp.forms.scheda.btn.opzioni.tooltip'), iconCls: 'fas fa-hand-point-right',step:31, handler: 'onAzione'}
        this.btnChiudi = {xtype: 'button', ui: 'green', text: Locale.t('snp.forms.scheda.btn.chiudi.text'), tooltip: Locale.t('snp.forms.scheda.btn.chiudi.tooltip'), iconCls: 'fas fa-check-circle',step:100, handler: 'onAzione'}
        this.btnRiapri = {xtype: 'button', ui: 'blue', text: Locale.t('snp.forms.scheda.btn.riapri.text'), tooltip: Locale.t('snp.forms.scheda.btn.riapri.tooltip'), iconCls: 'fas fa-undo', step:9,handler: 'onAzione'}
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('snp.model.forms.scheda.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true,readOnlyData = true,readOnlyOpzioni=true,hideScheda=true
        let readOnlyDispPortiera = true,readOnlyDispOe = true,readOnlyDispFor = true, hideDisp=true
        let storeTipologie = vm.getStore('storeTipologie'),storeConcorrenti= vm.getStore('storeConcorrenti')
        switch (record.data.step){
            case 10: //bozza
                if (this.checkRuoli(['99', '1', '10'])) {
                    readOnly = false;
                    readOnlyData=false
                    vm.set('btn.save', true)
                    this.toolBar.add(this.btnInoltra)
                    if (vm.get('isnew')===0) {
                        vm.set('btn.delete', true)
                        this.toolBar.add(this.btnSospendi)
                    }
                }
                break
            case 5: //sospesa
                if (this.checkRuoli(['99','1','10'])){
                    this.toolBar.add(this.btnRiapri)
                }
                break
            case 20: //selezione azioni necessarie
                if (this.checkRuoli(['99','2','10'])){
                    readOnlyOpzioni = false;
                    this.toolBar.add(this.btnAzioni)
                }
                if (this.checkRuoli(['99', '1', '10'])) {
                    readOnly = false;
                    vm.set('btn.save', true)
                    this.toolBar.add(this.btnSospendi)
                }
                break
            case 30: //in attesa materiale
                hideDisp=false
                //gestore ha tasto chiudi
                if (this.checkRuoli(['99','10'])){
                    this.toolBar.add(this.btnChiudi)
                }
                //gestore può modificare dati scheda e sospenderla
                if (this.checkRuoli(['99', '1', '10'])) {
                    readOnly = false;
                    vm.set('btn.save', true)
                    this.toolBar.add(this.btnSospendi)
                }
                //abilitazioni x check arrivo portiera/oe/ace
                if (record.data.acqportiera===1 && record.data.portieradisp!==1 && this.checkRuoli(['99', '10','3'])) {
                    readOnlyDispPortiera=false
                }
                if (record.data.acqoe===1 && record.data.oedisp!==1 && this.checkRuoli(['99', '10','4'])) {
                    readOnlyDispOe=false
                }
                if (record.data.acqfor===1 && record.data.fordisp!==1 && this.checkRuoli(['99', '10','5'])) {
                    readOnlyDispFor=false
                }
                break
            default: //annullata
                hideDisp=false
        }
        if (record.data.isnew===0 && this.checkRuoli(['99','1','2','10'])){
            vm.set('btn.cronology', true);
        }
        if (record.data.isnew===0 && record.data.idscheda!==''){
            hideScheda=false
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly); //modifica campi scheda
        vm.set('readOnlyData', readOnlyData); //modifica data studio
        vm.set('readOnlyOpzioni', readOnlyOpzioni); //modifica sezione opzioni
        vm.set('readOnlyDispPortiera', readOnlyDispPortiera); //check arrivo portiera
        vm.set('readOnlyDispOe', readOnlyDispOe); //check arrivo Oe
        vm.set('readOnlyDispFor', readOnlyDispFor); //check arrivo acquisto fornitore
        vm.set('hideScheda', hideScheda);
        vm.set('hideDisp', hideDisp); //visualizza check disponibilità
        //titolo tab
        vm.set('title',record.data['numero'] || 'n.d.')
        vm.set('label',Locale.t('snp.forms.scheda.title'))
        //carico store da dati backend
        storeTipologie.loadData(record.data['storeTipologie'])
        //creo cards
        this.cardScheda = Ext.create('snp.view.forms.scheda.cards.Scheda'); //principale
        this.cardInfo = Ext.create('snp.view.forms.scheda.cards.Info'); //info scheda
        this.gridconcorrenti = Ext.create('snp.view.forms.scheda.cards.GridConcorrenti'); //grid concorrenti
        storeConcorrenti.loadData(record.data.storeConcorrenti)
        if (readOnly === false) {
            storeConcorrenti.add(Ext.create('snp.model.forms.scheda.GridConcorrenti', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                concorrente:'',codice:'',prezzo:0
            }))
        }
        this.cardInfo.add(this.gridconcorrenti)
        //card sezione
        this.sezioneInfo=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('snp.forms.scheda.scheda')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardInfo]
        })
        this.cardScheda.add(this.sezioneInfo)
        //sezione opzioni
        if (record.data.step>10) {
            this.cardOpzioni = Ext.create('snp.view.forms.scheda.cards.Opzioni'); //info scheda
            this.sezioneOpzioni=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('snp.forms.scheda.opzioni')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardOpzioni]
            })
        }
        this.cardScheda.add(this.sezioneOpzioni)
        //card sezione opzioni
        this.form.add(this.cardScheda);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardInfo.getForm()
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
    obbOpzioni: function () {
        let record = this.getViewModel().get('record');
        let error = '';
        if (record.data.acqportiera === 0 || record.data.acqoe === 0 || record.data.acqoe === 0) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('snp.forms.scheda.obbopzioni'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        if (record.data.acqportiera !== 1 && record.data.acqoe !== 1 && record.data.acqoe !== 1) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('snp.forms.scheda.obbopzione'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true
    },
    //flusso
    onAzione:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        //imposto l'azione in base al tasto, default primo inoltro
        let msg = Locale.t('snp.forms.scheda.btn.inoltra.msg')
        let azione = btn.step
        switch (btn.step){
            case 5: //sospendi
                record.data.stepsospesa=record.data.step //passo step temporaneo nel caso sia sospensione l'azione
                msg = Locale.t('snp.forms.scheda.btn.sospendi.msg')
                break
            case 31: //opzioni
                msg = Locale.t('snp.forms.scheda.btn.opzioni.msg')
                break
            case 100: //chiusura
                msg = Locale.t('snp.forms.scheda.btn.chiudi.msg')
                break
            case 9: //riapri
                msg = Locale.t('snp.forms.scheda.btn.riapri.msg')
                break
        }
        if (btn.step===11) {//inoltro a opzioni
            if (!this.obb()) {
                return false;
            }
        }
        if (btn.step===31) {//inoltro a ricevimento opzione
            if (!this.obbOpzioni()) {
                return false;
            }
        }
        Ext.Msg.show({
            title: Locale.t("global.attenzione"), msg:msg,
            buttons: Ext.Msg.YESNO, icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === "yes") {
                    record.data.step= azione //imposto step a 11 x passaggio al successivo
                    me.closeForm = true //chiusura modulo
                    me.onSave();
                }
            }
        });
    },
    //arrivo materiale con chiusura quando completo
    onArrivoMateriale:function(campo) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (campo.value===1 || !campo.checked) { //campo già impostato e cmq non editabile
            return false
        }
        let msg = '', camposel='#'+campo.itemId
        switch (campo.itemId){
            case 'fld_portiera':
                msg = Locale.t('snp.forms.scheda.arrivi.portiera')
                record.data.portieradisp=1 //imposto flag numerico da booleano
                break
            case 'fld_oe':
                msg = Locale.t('snp.forms.scheda.arrivi.oe')
                record.data.oedisp=1 //imposto flag numerico da booleano
                break
            case 'fld_for': //chiusura
                msg = Locale.t('snp.forms.scheda.arrivi.for')
                record.data.fordisp=1 //imposto flag numerico da booleano
                break
        }
        Ext.Msg.show({
            title: Locale.t("global.attenzione"), msg:msg,
            buttons: Ext.Msg.YESNO, icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === "yes") {
                    me.cardOpzioni.down(camposel).setValue(1)
                    record.data.step= 99 //imposto step a 99 x gestire eventuale chiusura automatica
                    me.closeForm = true //chiusura modulo
                    me.onSave();
                } else {
                    //rimetto il campo a NON checked
                    me.cardOpzioni.down(camposel).setValue(false)
                }
            }
        });
    },
    onOpenScheda:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (typeof parentPortale !="undefined"  && parentPortale !=null){
            if (record.data.idscheda) {
                parentPortale.onHandlerMenu({
                    iconCls:'CLD-16',
                    //iconCls32:'ATT-32', iconCls64:'ATT-64',
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
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'Errore, scheda collaudo non presente',buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
            }
        }else{
            let err='Errore lettura portale, impossibile eseguire l\'operazione...';
            Ext.Msg.show({title:Locale.t('global.attenzione'),msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
        }
    }
})