/**
 * Created by luke on 12/02/21.
 */
Ext.define('snp.view.forms.destinatario.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-destinatario',

    requires: [
        'snp.model.forms.destinatario.Model',
        'snp.view.forms.destinatario.cards.Destinatario'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('snp.model.forms.destinatario.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
        if (this.checkRuoli(['99', '10'])) {
            readOnly = false;
            vm.set('btn.save', true);
            if (vm.get('isnew')===0) {
                vm.set('btn.delete', true);
            }
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',  'Notifica')
        vm.set('label', Locale.t('snp.forms.destinatario.title'))

        this.cardDestinatario = Ext.create('snp.view.forms.destinatario.cards.Destinatario');
        this.form.add(this.cardDestinatario);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
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