/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.comune.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-comune',

    requires: [
        'ana.model.forms.comune.Model',
        'ana.view.forms.comune.cards.Comune'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('ana.model.forms.comune.Model', {
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
            readOnly = true,
            comboRegione = vm.getStore('comboRegione'),
            comboProvincia = vm.getStore('comboProvincia');

        if (this.checkRuoli(['99', '10'])) {
            readOnly = false;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
        //carico store locali
        comboRegione.loadData(record.data['comboRegione'])
        comboProvincia.loadData(record.data['comboProvincia'])
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title', record.data['comune'] || 'n.d.')
        vm.set('label', Locale.t('ana.forms.comune.title'))

        this.cardComune = Ext.create('ana.view.forms.comune.cards.Comune');
        this.form.add(this.cardComune);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardComune.getForm()
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
});