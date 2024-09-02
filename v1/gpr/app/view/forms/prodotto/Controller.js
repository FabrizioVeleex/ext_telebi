Ext.define('gpr.view.forms.prodotto.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util',],
    alias: 'controller.v1-prodotto',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea',
        'gpr.model.forms.prodotto.Model',
        'gpr.view.forms.prodotto.cards.Istruzioni',
        'gpr.view.forms.prodotto.cards.Prodotto',
        'gpr.view.forms.prodotto.cards.Step1',
        'gpr.view.forms.prodotto.cards.Step2',
        'gpr.view.forms.prodotto.cards.Step3',
        'gpr.view.forms.prodotto.cards.Step4',
        'gpr.view.forms.prodotto.cards.Step5',
        'gpr.view.forms.prodotto.cards.Step6'
    ],
    init: function () {
        let vm = this.getViewModel()
        vm.set('isnew', this.getView().valori.isnew)
        vm.set('id', this.getView().valori.id)
        vm.set('record', Ext.create('gpr.model.forms.prodotto.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    //caricamento personalizzato per passare codazienda
    loadData: function () {
        let me = this,
            vm = this.getViewModel(),
            record = vm.get('record');

        let consoleInfo = '<h3>' + Locale.t('global.form.caricamento') + '</h3>';
        vm.set('panelinfo.consoleInfo', consoleInfo);
        record.getProxy().setExtraParams({...record.getProxy().extraParams,isnew: vm.get('isnew'),codazienda: me.getView().valori.codazienda});

        record.load({
            success: function () {
                vm.set('panelinfo.consoleInfo', Locale.t('global.form.caricamento'));
                me.getView().setActiveItem(me.form);
                me.managerView();
            },
            failure(record, esito) {

                let consoleInfo;
                try {
                    let rest = esito.error.response.responseJson;
                    consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
                } catch (e) {
                    consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error.server') + '</span></h3>';
                }
                vm.set('panelinfo.consoleInfo', consoleInfo);
                me.onAfterLoadFailure();
            }
        });
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel()
        try {
            let record = vm.get('record'), readOnly = true, hideelettrico=false, hidemanuale=true
            //gestione tasti default
            vm.set('btn.close', true)
            vm.set('btn.cronology', true)
            if (this.checkRuoli(['99', '19'])) {
                vm.set('btn.save', true)
                if (this.toolBar) {
                    this.toolBar.add( {tooltip: Locale.t('gpr.forms.prodotto.btn.updateart.tooltip'),
                        text: Locale.t('gpr.forms.prodotto.btn.updateart.text'),
                        ui:'blue',
                        iconCls: 'pictos pictos-refresh',
                        handler: 'onUpdateArticolo'
                    })
                }
            }
            if (record.data.famiglia==='03A') {
                hideelettrico=true;hidemanuale=false
            }
            vm.set('readOnly', readOnly)
            vm.set('hideelettrico', hideelettrico)
            vm.set('hidemanuale', hidemanuale)
            //titolo tab
            vm.set('title', record.data['schcdr'] || 'n.d.')
            vm.set('label', Locale.t('gpr.forms.prodotto.title'))
            vm.set('toolbar.hideCard', false)
            //Cards
            if (!this.listForms) {
                this.listForms = [
                    {posizione: 'prodotto', backgroundColor: 'LightBlue',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Prodotto'), text: Locale.t('gpr.forms.prodotto.sezioni.prodotto')
                    },
                    {posizione: 'istruzioni', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Istruzioni'), text: Locale.t('gpr.forms.prodotto.sezioni.istruzioni')
                    },
                    {posizione: 'step1', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Step1'), text: Locale.t('gpr.forms.prodotto.sezioni.step1')
                    },
                    {posizione: 'step2', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Step2'), text: Locale.t('gpr.forms.prodotto.sezioni.step2')
                    },
                    {posizione: 'step3', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Step3'), text: Locale.t('gpr.forms.prodotto.sezioni.step3')
                    },
                    {posizione: 'step4', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Step4'), text: Locale.t('gpr.forms.prodotto.sezioni.step4')
                    },
                    {posizione: 'step5', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Step5'), text: Locale.t('gpr.forms.prodotto.sezioni.step5')
                    },
                    {posizione: 'step6', backgroundColor: '',
                        card: Ext.create('gpr.view.forms.prodotto.cards.Step6'), text: Locale.t('gpr.forms.prodotto.sezioni.step6')
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                this.toolBarCard.add({
                    text: card.text, enableToggle: true, style: {backgroundColor: card.backgroundColor},
                    posizione: card.posizione, handler: 'onClickCard'
                })
                this.form.add(card.card);
            }
            //aggiungo istruzioni e steps
            if (record.data.istruzioni.length > 0) {
                me.ciclaIstruzioni(record.data.istruzioni)
                for (let st = 1; st < 7; st++) {
                    me.ciclaSteps(record.data.istruzioni,st)
                }
            }
            this.getView().setActiveItem(this.form);
            //aggiungo pdf al tab
            this.onClickCard({
                posizione: vm.get('cardactive')
            })
        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false);
            vm.set('btn.cronology', false);
            vm.set('btn.close', false);
            vm.set('btn.save', false);
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>');
            this.getView().setActiveItem(this.panelInfo);
            this.onAfterLoadFailure()
        }
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let ii
        //salvo istruzioni
        record.data['istruzioni'] = []; //valore campo textarea
        let storeistruzioni = this.listForms[1].card;
        if (storeistruzioni.items.items.length>0) {
            for (ii = 0; ii < storeistruzioni.items.items.length; ii++) {
                let idrec= storeistruzioni.items.items[ii].items.items[0].itemId;
                let fld=storeistruzioni.items.items[ii].items.items[0];
                let newrec = {idistruzione:idrec.substring(3), istruzione:fld.value};
                record.data['istruzioni'].push(newrec)
            }
        }
        //salvo steps
        for (let st = 1; st < 7; st++) {
            me.salvaStep(record,st)
        }
        this.callParent(arguments)
    },
    salvaStep:function(record,cardnum) {
        let kk
        record.data['step'+cardnum] = []; //valore campo textarea
        let step = this.listForms[cardnum+1].card;
        if (step.items.items.length>0) {
            for (kk = 0; kk < step.items.items.length; kk++) {
                let idrec= step.items.items[kk].items.items[0].itemId;
                let fld=step.items.items[kk].items.items[0];
                let newrec = {idstep:idrec.substring(5), descstep:fld.value};
                record.data['step'+cardnum].push(newrec)
            }
        }
    },
    //caricamento istruzioni
    ciclaIstruzioni:function(istruzioni) {
        let tabs = [], title = '', i = 0;
        do {
            let rec = istruzioni[i];
            let editIst = true;
            if (this.checkRuoli(['99', '19'])) {
                editIst = false;
            }
            title = '<span style="font-weight: bold;font-size:medium;">' + rec['lingua'] + '</span>';
            tabs.push(this.addIstruzione(rec, title, editIst));
            i++;
        } while (i < istruzioni.length);
        this.listForms[1].card.add(tabs);
    },
    addIstruzione: function(rec,title,modifica){
        return {
            xtype: 'fieldset',collapsible:true,collapsed:false,
            style:{'padding':'0px 5px 0px 5px', 'margin':0},
            title: title,
            items: [
                {xtype:'textarea', hideLabel:true, itemId: 'ist'+rec['id'], style: 'font-size:14px;',
                    scrollable:true, anchor: '95%', autoScroll: true, overflow: 'auto',
                    height: 150, readOnly:modifica, value:rec['istruzioni']
                }
            ]
        }
    },
    ciclaSteps:function(step,cardnum) {
        let tabs = [], title = '', i = 0;
        do {
            let rec = step[i];
            let editStep = true;
            if (this.checkRuoli(['99', '19'])) {
                editStep = false;
            }
            title = '<span style="font-weight: bold;font-size:medium;">' + rec['lingua'] + '</span>';
            tabs.push(this.addStep(rec, title, editStep,cardnum));
            i++;
        } while (i < step.length);
         this.listForms[cardnum+1].card.add(tabs);
    },
    addStep: function(rec,title,modifica,cardnum){
        let valore=''
        switch (cardnum) {
            case 1:
                valore = rec['step1']
                break;
            case 2:
                valore = rec['step2']
                break;
            case 3:
                valore = rec['step3']
                break;
            case 4:
                valore = rec['step4']
                break;
            case 5:
                valore = rec['step5']
                break;
            case 6:
                valore = rec['step6']
                break;
        }
        return {
            xtype: 'fieldset',collapsible:true,collapsed:false,
            style:{'padding':'0px 5px 0px 5px', 'margin':0},
            title: title,
            items: [
                {xtype:'textarea', hideLabel:true, itemId: 'step'+cardnum+rec['id'], style: 'font-size:14px;',
                    scrollable:true, anchor: '95%', autoScroll: true, overflow: 'auto',
                    height: 150, readOnly:modifica, value:valore
                }
            ]
        }
    },
    onUpdateArticolo: function () {
        //recupero l'azienda della combo vista
        let me=this,vm = this.getViewModel(), record = this.getViewModel().get('record')
        let codazienda=this.getView().valori.codazienda
        //chiedo conferma x eseguire l'operazione
        Ext.Msg.show({
            title: Locale.t('gpr.grids.prodotti.btn.updateart.text'), iconCls: 'pictos pictos-refresh', msg: Locale.t('gpr.grids.prodotti.btn.updateart.confirm'),
            buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                if (b === 'yes') {
                    me.getView().el.mask(Locale.t('global.actions.incorso'))
                    Ext.Ajax.request({
                        method: 'PUT',
                        params:{'id':record.data.id,'codazienda':codazienda},
                        url: Backend.REST_API + 'grids/prodotti/updateprodotti',
                        success: function () {
                            me.getView().el.unmask()
                            me.isReoladdata = true
                            me.onAfterSave()
                        },
                        failure: function (response) {
                            me.getView().el.unmask();
                            let resp = Ext.decode(response.responseText);
                            Ext.Msg.show({
                                title: Locale.t('global.errore'),
                                msg: resp['msg'],
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });

                }
            }
        });
    }
})