/**
 * Created by luke on 05/03/21.
 */
Ext.define('bolfor.forms.bolla.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util','bolfor.forms.bolla.components.ControllerFlusso'],
    alias: 'controller.v1-bolfor-bolla',

    requires: [
        'Ext.layout.container.Fit',
        'bolfor.forms.bolla.ModelData',
        'bolfor.forms.bolla.cards.Anteprima',
        'bolfor.forms.bolla.cards.Bolla',
        'bolfor.forms.bolla.cards.GridArticoli'
    ],

    init: function () {
        let vm = this.getViewModel();
        vm.set('maxqta', 0); //inizializzo valore x bind quantità
        //tasti flusso
        this.btnRegistra = {xtype: 'button', ui: 'blue', text: Locale.t('bolfor.forms.bolla.btn.registra.text'), tooltip: Locale.t('bolfor.forms.bolla.btn.registra.tooltip'), iconCls: 'fas fa-save',step:9, handler: 'onRegistra'}
        this.btnAnnulla = {xtype: 'button', ui: 'red', text: Locale.t('bolfor.forms.bolla.btn.annulla.text'), tooltip: Locale.t('bolfor.forms.bolla.btn.annulla.tooltip'), iconCls: 'fas fa-minus-circle',step:98, handler: 'onAnnulla'}
        this.btnCompleta = {xtype: 'button', ui: 'blue', text: Locale.t('bolfor.forms.bolla.btn.completa.text'), tooltip: Locale.t('bolfor.forms.bolla.btn.completa.tooltip'), iconCls: 'fas fa-check-square',step:99, handler: 'onCompleta'}
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('bolfor.forms.bolla.ModelData', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), isnew =  vm.get('isnew'), record = vm.get('record'),
            readOnly = true, cardattivo = 0,cardattivopos = 'bolla' //card default
        //imposto variabili x visualizzazione sezioni
        let hideAcquisto=true
        //store
        let storetipo = vm.getStore('storeTipo'), storearticoli = vm.getStore('storeArticoli')
        //ruolo gestione abilito tasti a seconda dello stato
        if (this.checkRuoli(['99','10','1'])) {
            switch (record.data.step){
                case 5: //acquisita
                    readOnly = false
                    vm.set("btn.save", true) //salvo sezione tipo riparazione (no costi)
                    this.toolBar.add( this.btnRegistra)
                    break
                case 10: //registrata da gestire
                    vm.set("btn.save", true) //salvo sezione tipo riparazione
                    this.toolBar.add(this.btnCompleta) //completata bolla
                    this.toolBar.add(this.btnAnnulla) //annulla bolla
                    break
                case 98: //annullata
                    break
                case 99: //chiusa
                    break
            }
        }
        switch (record.data.codice){
            case '01': //acquisto
                hideAcquisto=false
                break
            case '02': //conto lavorazione
                hideAcquisto=true
                break
            case '03': //conto visione
                hideAcquisto=true
                break
        }
        //carico store
        storetipo.loadData(record.data['storetipo']) //carico store tipo bolla
        vm.set('btn.close', true);
        //cronologia al supervisore applicazioned
        if (this.checkRuoli(['99','10','1'])) {
            vm.set("btn.cronology", true)
        }
        //gestione autorizzazioni/visibilità
        vm.set('readOnly', readOnly); //edit campi modulo
        vm.set('hideAcquisto', hideAcquisto); //tipo acquisto fornitore
        //titolo tab
        vm.set('title',record.data['num_doc'] || 'n.d.')
        vm.set('label',Locale.t('bolfor.forms.bolla.title'))
        vm.set('toolbar.hideCard', false) //visualizzazione tab dei cards
        //cards
        if (!this.listForms) {
            this.listForms = [
                {posizione: 'bolla', backgroundColor: 'cardAttivo',
                    card: Ext.create('bolfor.forms.bolla.cards.Bolla'),
                    text: Locale.t('bolfor.forms.bolla.tabbolla')
                },
                {posizione: 'anteprima', backgroundColor: '',
                    card: Ext.create('bolfor.forms.bolla.cards.Anteprima'),
                    text: Locale.t('bolfor.forms.bolla.tabanteprima')
                },
            ]
        }
        //caricamento pdf
        if (isnew===0){
            //carico pdf
            let percorso=record.data['percorso']+record.data['id']+'.pdf' //percorso fisso con id record
            let nomefile=record.data['nomefile']
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/bolla/getpdf/', method: 'POST', binary:true,
                params: {
                    'id': record.data['id'],
                    'percorso': percorso, //path file fisico completo
                    'nomefile': nomefile//nome da presentare
                },
                success: function (response) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    let binarypdf = window.URL.createObjectURL(blob)
                    let docpdf=Ext.create(
                        {xtype: 'component',layout:'fit',
                            autoEl: {
                                tag: 'iframe', width: '100%', height: '100%', style: 'border: none',
                                src:binarypdf
                            }}
                    )
                    let cardinfo = me.listForms.filter(obj => { return obj.posizione ==='anteprima'})
                    cardinfo[0].card.add(docpdf);
                },
                failure: function () {
                    let errore = Locale.t('bolfor.forms.bolla.errorepdf')
                    let errorpdf=Ext.create(
                        {xtype: 'box',html:errore}
                    )
                    let cardinfo = me.listForms.filter(obj => { return obj.posizione ==='anteprima'})
                    cardinfo[0].card.add(errorpdf);
                }
            })
        }
        //carico grid articoli
        if (record.data.step>5) {
            storearticoli.loadData(record.data['storearticoli']) //store da backend
            if (!this.gridarticoli) {
                this.gridarticoli =  Ext.create('bolfor.forms.bolla.cards.GridArticoli',{padding:'10 10 10 10'})
                let cardbolla = me.listForms.filter(obj => { return obj.posizione ==='bolla'})
                cardbolla[0].card.add(this.gridarticoli);
            }
        }
        //Aggiungo cards
        for (card of this.listForms) {
            this.toolBarCard.add({
                text: card.text,
                enableToggle: true,
                style: {backgroundColor: card.backgroundColor},
                posizione: card.posizione,
                handler: 'onClickCard'
            })
            this.form.add(card.card);
        }
        this.getViewModel().set('cardactive',cardattivopos)
        this.form.setActiveItem(this.listForms[cardattivo].card)
        this.onClickCard({posizione: cardattivopos}) //imposto sfondo primo tasto tab di default
    },
    obb: function () {
        let me = this, vm = me.getViewModel(),record = vm.get('record')
        let cardinfo = this.listForms.filter(obj => { return obj.posizione ==='bolla'})
        let modulo =cardinfo[0].card.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        //verifico campi variabili
       if ((record.data.codice==='01' || record.data.codice==='02') && (!record.data.id_ordine || record.data.id_ordine==='')) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        return true;
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        //obbligatorio solo la tipologia
        if (record.data.idtipologia==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('bolfor.forms.bolla.obbtipo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        if (record.data.step>5) {
            //salvo le quantità
            let store=vm.getStore('storeArticoli')
            record.data['storearticoli'] = []
            store.each(function (rec) {
                record.data['storearticoli'].push(rec.data)
            })
        }
        this.callParent(arguments)
    },
    //caricamento store ordini fornitore
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this, vm = me.getViewModel();
        let record = vm.get('record'); //recupero id fornitore, se valido lo passo ai parametri store
        if (record.data.id_sogg_fat && record.data.id_sogg_fat!=='') {
            store.getProxy().extraParams.idfornitore = record.data.id_sogg_fat
            store.getProxy().extraParams.step = record.data.step
        }
    }
});