/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stcom.view.forms.budget.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-budget',
    requires: [
        'stcom.model.forms.budget.Model',
        'stcom.view.forms.budget.cards.budget'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti flusso
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('stcom.model.forms.budget.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true
        //vm.set('btn.cronology', true);
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly); //modifica campi scheda
        //titolo tab
        vm.set('title',record.data['cdcli'] || 'n.d.')
        vm.set('label',Locale.t('stcom.forms.budget.title'))
        //creo cards
        this.cardBudget = Ext.create('stcom.view.forms.budget.cards.budget'); //principale
        //card sezione opzioni
        this.form.add(this.cardBudget);
        this.getView().setActiveItem(this.form);
    }
})