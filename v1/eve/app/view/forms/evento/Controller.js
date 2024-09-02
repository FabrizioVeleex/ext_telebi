/**
 * Created by luca on 16/07/2018.
 */
Ext.define('eve.view.forms.evento.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-evento',
    requires: [
        'eve.model.forms.evento.Model',
        'eve.view.forms.evento.cards.Evento'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('eve.model.forms.evento.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
        if (this.checkRuoli(['99','1'])) {
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
            vm.set("btn.cronology", true)
            readOnly = false
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['nome'] || 'n.d.')
        vm.set('label',Locale.t('eve.forms.evento.title'))

        this.cardEvento = Ext.create('eve.view.forms.evento.cards.Evento');
        this.form.add(this.cardEvento);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardEvento.getForm()
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