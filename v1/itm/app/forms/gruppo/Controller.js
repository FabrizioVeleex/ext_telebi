/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.gruppo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-gruppo',
    requires: [
        'itm.forms.gruppo.Model',
        'itm.forms.gruppo.cards.Gruppo'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('itm.forms.gruppo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
        let storeClassi = vm.getStore('storeClassi') //store x la combo classe
        let storeFamiglie = vm.getStore('storeFamiglie') //store x la combo famiglia
        /* al momento solo in lettura
        if (this.checkRuoli(['99','10'])) {
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
            readOnly = false
        }
        */
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title', record.data['descr_gruppo'] || 'n.d.')
        vm.set('label', Locale.t('itm.forms.gruppo.title'))
        storeClassi.loadData(record.data['storeclassi'])
        storeFamiglie.loadData(record.data['storefamiglie'])
        this.cardGruppo = Ext.create('itm.forms.gruppo.cards.Gruppo');
        this.form.add(this.cardGruppo);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardGruppo.getForm()
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