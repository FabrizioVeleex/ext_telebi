/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stver.view.forms.target.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-target',
    requires: [
        'stver.model.forms.target.Model',
        'stver.view.forms.target.cards.Target'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('stver.model.forms.target.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true,readOnlyStab=true
        if (vm.get('isnew')===1 && this.checkRuoli(['99'])) {
            //se è nuovo posso editare stabilimento
            readOnlyStab=false
        }
        if (this.checkRuoli(['99', '10'])) {
            readOnly = false;
            vm.set('btn.save', true)
        }
        if (this.checkRuoli(['99'])) {
            vm.set('btn.delete', true)
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        vm.set('readOnlyStab', readOnlyStab);
        //titolo tab
        vm.set('title',record.data['stabilimento'] || 'n.d.')
        vm.set('label',Locale.t('stver.forms.target.title'))

        this.cardTarget = Ext.create('stver.view.forms.target.cards.Target');
        this.form.add(this.cardTarget);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardTarget.getForm()
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