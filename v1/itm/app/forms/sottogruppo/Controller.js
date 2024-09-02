/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.sottogruppo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-sottogruppo',
    requires: [
        'itm.forms.sottogruppo.Model',
        'itm.forms.sottogruppo.cards.Sottogruppo'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('itm.forms.sottogruppo.Model', {
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
        let storeGruppi = vm.getStore('storeGruppi') //store x la combo gruppo
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
        vm.set('title', record.data['descr_sottogruppo'] || 'n.d.')
        vm.set('label', Locale.t('itm.forms.sottogruppo.title'))
        storeClassi.loadData(record.data['storeclassi'])
        storeFamiglie.loadData(record.data['storefamiglie'])
        storeGruppi.loadData(record.data['storegruppi'])
        this.cardSottoGruppo = Ext.create('itm.forms.sottogruppo.cards.Sottogruppo');
        this.form.add(this.cardSottoGruppo);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardSottoGruppo.getForm()
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