/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.zona.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-zona',

    requires: [
        'ana.model.forms.zona.Model',
        'ana.view.forms.zona.cards.Zona'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('ana.model.forms.zona.Model', {
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
            readOnly = true;

        if (this.checkRuoli(['99', '10'])) {
            readOnly = false;
            vm.set('btn.save', true);
            vm.set('btn.cronology', true);
            vm.set('btn.delete', true);
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title', record.data['codice'] || 'n.d.')
        vm.set('label', Locale.t('ana.forms.zona.title'))

        this.cardZona = Ext.create('ana.view.forms.zona.cards.Zona');
        this.form.add(this.cardZona);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardZona.getForm()
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