/**
 * Created by luke on 12/02/21.
 */
Ext.define('gpr.view.forms.descrizione.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-descrizione',

    requires: [
        'gpr.model.forms.descrizione.Model',
        'gpr.view.forms.descrizione.cards.Descrizione'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel()
        vm.set('isnew', this.getView().valori.isnew)
        vm.set('id', this.getView().valori.id)
        vm.set('record', Ext.create('gpr.model.forms.descrizione.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
        let comboLingua = vm.getStore('comboLingua')
        if (this.checkRuoli(['99','20'])){
            readOnly = false
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        comboLingua.loadData(record.data['comboLingua'])
        //titolo tab
        vm.set('title',record.data['ragsoc'] || 'n.d.')
        vm.set('label',Locale.t('gpr.forms.azienda.title'))

        this.cardDescrizione = Ext.create('gpr.view.forms.descrizione.cards.Descrizione')
        this.form.add(this.cardDescrizione)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        if (!this.obb()) {
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardDescrizione.getForm()
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