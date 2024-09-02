/**
 * Created by luke on 12/02/21.
 */
Ext.define('cde.view.forms.notifica.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-form-cde-notifica',

    requires: [
        'Ext.form.FieldSet',
        'cde.view.forms.notifica.cards.Griddestinatari',
        'cde.view.forms.notifica.cards.Notifica',
        'cde.view.forms.notifica.component.Gridrisorse',
        'cde.view.forms.notifica.component.Modello'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('cde.view.forms.notifica.component.Modello', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true, readOnlyNew = true
            let gridRisorse = vm.getStore('storeRisorse')

        if (this.checkRuoli(['99'])) {
            readOnly = false;
            if (record.data.isnew===1) {
                readOnlyNew = false //nuovo inserisco codice tag x servizio
            }
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
         //carico store locali
        gridRisorse.loadData(record.data['gridrisorse'])
        if (readOnly===false) {
            gridRisorse.add(Ext.create('cde.view.forms.notifica.component.Gridrisorse', {
                action: 1, isnew: 1,nomecognome:'',idrisorsa:''
            }));
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        vm.set('readOnlyNew', readOnlyNew)
        //titolo tab
        vm.set('title', record.data['nome'] || 'n.d.')
        vm.set('label', Locale.t('cde.forms.notifica.title'))

        this.cardNotifica = Ext.create('cde.view.forms.notifica.cards.Notifica');
        //grid destinatari
        this.gridDestinatari= Ext.create('cde.view.forms.notifica.cards.Griddestinatari')
        this.destinatari=Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('cde.forms.notifica.griddestinatari.title') + '</span>',
            items: [this.gridDestinatari]
        })
        this.cardNotifica.add(this.destinatari)
        this.form.add(this.cardNotifica);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        let me = this,
            vm = me.getViewModel(),  record = vm.get('record'),
        gridRisorse = vm.getStore('storeRisorse')
        //aggiorno grid risorse
        record.data['gridrisorse'] = []
        gridRisorse.each(function (rec) {
            record.data['gridrisorse'].push(rec.data)
        })
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardNotifica.getForm()
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
    }
});