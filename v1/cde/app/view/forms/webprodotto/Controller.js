/**
 * Created by luke on 03/02/21.
 */
Ext.define('cde.view.forms.webprodotto.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
        'portal.v1.view.grids.DefaultController'
    ],
    alias: 'controller.v1-form-webprodotto',

    requires: [
        'cde.view.forms.webprodotto.cards.GridAccessi',
        'cde.view.forms.webprodotto.component.Modello'
    ],
    /**
     * Called when the view is created
     */
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('cde.view.forms.webprodotto.component.Modello', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel()
        try {
            let record = vm.get('record'),
                gridAccessi = vm.getStore('store'),
                readOnly = true
            vm.set('btn.close', true)
            vm.set('readOnly', readOnly)
            //titolo tab
            vm.set('title', record.data['cliente'] || 'n.d.')
            vm.set('label', Locale.t('cde.forms.webprodotto.title'))

            vm.set('toolbar.hideCard', false)

            this.cardAccessi = Ext.create('cde.view.forms.webprodotto.cards.GridAccessi');
            this.form.add(this.cardAccessi);
            this.getView().setActiveItem(this.form);
            //carico store
            gridAccessi.load();
            this.getView().setActiveItem(this.form);

        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false);
            vm.set('btn.cronology', false);
            vm.set('btn.close', false);
            vm.set('btn.save', false);
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>');
            this.getView().setActiveItem(this.panelInfo);
            this.onAfterLoadFailure()
        }
    },
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.cdcli = record.data.cdcli
    }
});