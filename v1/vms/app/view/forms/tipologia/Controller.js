/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.view.forms.tipologia.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-tipologia',
    requires: [
        'vms.model.forms.tipologia.Model',
        'vms.view.forms.tipologia.cards.Tipologia'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('vms.model.forms.tipologia.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true
        if (this.checkRuoli(['99', '10'])) {
            readOnly = false;
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['descrizione'] || 'n.d.')
        vm.set('label',Locale.t('vms.forms.tipologia.title'))

        this.cardTipologia = Ext.create('vms.view.forms.tipologia.cards.Tipologia');
        this.form.add(this.cardTipologia);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardTipologia.getForm()
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
})