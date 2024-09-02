/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.causale.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-causale',
    requires: [
        'rec.model.forms.causale.Model',
        'rec.view.forms.causale.cards.Causale'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('rec.model.forms.causale.Model', {
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
            readOnly = true, readOnlyCausale=true

        if (this.checkRuoli(['99','10'])){
            readOnly = false;
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            if (record.data.isnew===0) {
                vm.set('btn.delete', true)
            } else {
                readOnlyCausale = false
            }
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        vm.set('readOnlyCausale', readOnlyCausale)
        //titolo tab
        vm.set('title',record.data['pscaus'] || 'n.d.')
        vm.set('label',Locale.t('rec.forms.causale.title'))

        this.cardCausale = Ext.create('rec.view.forms.causale.cards.Causale')
        this.form.add(this.cardCausale)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardCausale.getForm()
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