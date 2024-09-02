/**
 * Created by luke on 12/02/21.
 */
Ext.define('fmc.view.forms.destinatario.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-destinatario',

    requires: [
        'Ext.form.FieldSet',
        'fmc.model.forms.destinatario.Gridrisorse',
        'fmc.model.forms.destinatario.Model',
        'fmc.view.forms.destinatario.cards.Destinatario',
        'fmc.view.forms.destinatario.cards.Griddestinatari'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('fmc.model.forms.destinatario.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
            let gridRisorse = vm.getStore('storeRisorse')
        let storeSedi = vm.getStore('storeSedi')

        if (this.checkRuoli(['99', '10'])) {
            readOnly = false;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
        storeSedi.loadData(record.data['storeSedi'])
        //carico store locali
        gridRisorse.loadData(record.data['gridrisorse'])
        if (readOnly===false) {
            gridRisorse.add(Ext.create('fmc.model.forms.destinatario.Gridrisorse', {
                action: 1, isnew: 1,nomecognome:'',idrisorsa:''
            }));
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title', record.data['nome'] || 'n.d.')
        vm.set('label', Locale.t('fmc.forms.destinatario.title'))

        this.cardDestinatario = Ext.create('fmc.view.forms.destinatario.cards.Destinatario');
        //grid destinatari
        this.gridDestinatari= Ext.create('fmc.view.forms.destinatario.cards.Griddestinatari')
        this.destinatari=Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('fmc.forms.destinatario.griddestinatari.title') + '</span>',
            items: [this.gridDestinatari]
        })
        this.cardDestinatario.add( this.destinatari)
        this.form.add(this.cardDestinatario);
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
        let modulo = this.cardDestinatario.getForm()
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