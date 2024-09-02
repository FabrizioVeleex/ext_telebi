/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.voce.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-voce',

    requires: [
        'amm.model.forms.voce.Model',
        'amm.view.forms.voce.cards.Voce'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.voce.Model', {
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
            readOnly = true,hideModulo = false, hideLink = true,
            comboModuli = vm.getStore('storeModuli')

        if (this.checkRuoli(['99','1'])){
            readOnly = false
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            if (record.data.isnew===0) {
                vm.set('btn.delete', true)
            }
        }
        if (record.data.tipovoce==='LINK') {
            hideLink=false; hideModulo=true
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        vm.set('hideModulo', hideModulo)
        vm.set('hideLink', hideLink)
        //titolo tab
        vm.set('title',record.data['voce'] || 'n.d.')
        vm.set('label',Locale.t('amm.forms.voce.title'))
        //carico combo moduli
        comboModuli.loadData(record.data['moduli'])

        this.cardVoce = Ext.create('amm.view.forms.voce.cards.Voce')
        this.form.add(this.cardVoce)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false
        }
        if (record.data.tipovoce==='LINK' && record.data.percorso==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('amm.forms.voce.obburl'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            })
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardVoce.getForm()
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