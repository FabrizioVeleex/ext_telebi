/**
 * Created by luke on 12/02/21.
 */
Ext.define('webord.view.forms.notifica.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-notifica',

    requires: [
        'Ext.form.FieldSet',
        'webord.model.forms.notifica.Gridrisorse',
        'webord.model.forms.notifica.Model',
        'webord.view.forms.notifica.cards.Gridrisorse',
        'webord.view.forms.notifica.cards.Notifica'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('webord.model.forms.notifica.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true, readOnlyRisorsa = true
            let storeRisorse = vm.getStore('storeRisorse')

        if (this.checkRuoli(['99'])) {
            readOnly = false;
            if (this.checkRuoli(['99'])) {
                vm.set('btn.delete', true);
            }
        }
        if (this.checkRuoli(['99'])) {
            readOnlyRisorsa = false
            vm.set('btn.save', true);
            vm.set('btn.cronology', true);
        }
        //carico store locali
        storeRisorse.loadData(record.data['gridrisorse'])
        if (readOnly===false) {
            storeRisorse.add(Ext.create('webord.model.forms.notifica.Gridrisorse', {
                action: 1, isnew: 1,nomecognome:'',idrisorsa:''
            }));
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        vm.set('readOnlyRisorsa', readOnlyRisorsa);
        //titolo tab
        vm.set('title', record.data['nome'] || 'n.d.')
        vm.set('label', Locale.t('webord.forms.notifica.title'))

        this.cardNotifica = Ext.create('webord.view.forms.notifica.cards.Notifica');
        //grid risorse
        this.gridRisorse= Ext.create('webord.view.forms.notifica.cards.Gridrisorse')
        this.risorse=Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('webord.forms.notifica.griddestinatari.title') + '</span>',
            items: [this.gridRisorse]
        })
        this.cardNotifica.add( this.risorse)
        this.form.add(this.cardNotifica);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        let me = this,
            vm = me.getViewModel(),  record = vm.get('record'),
        storeRisorse = vm.getStore('storeRisorse')
        //aggiorno grid risorse
        record.data['gridrisorse'] = []
        storeRisorse.each(function (rec) {
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