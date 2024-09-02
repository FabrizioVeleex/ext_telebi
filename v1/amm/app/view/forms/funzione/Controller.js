/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.funzione.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-funzione',

    requires: [
        'amm.model.forms.funzione.Model',
        'amm.view.forms.funzione.cards.Funzione'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.funzione.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true

        if (this.checkRuoli(['99','1'])){
            readOnly = false
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            if (record.data.isnew===0) {
                vm.set('btn.delete', true)
            }
        }

        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['funzione'] || 'n.d.')
        vm.set('label',Locale.t('amm.forms.funzione.title'))

        this.cardFunzione = Ext.create('amm.view.forms.funzione.cards.Funzione')
        this.form.add(this.cardFunzione)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        if (!this.obb()) {
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardFunzione.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        return true
    }
});