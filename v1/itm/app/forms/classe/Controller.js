/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.classe.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-classe',
    requires: [
        'itm.forms.classe.Model',
        'itm.forms.classe.cards.Classe'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('itm.forms.classe.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
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
        vm.set('title', record.data['descr_clm'] || 'n.d.')
        vm.set('label', Locale.t('itm.forms.classe.title'))

        this.cardClasse = Ext.create('itm.forms.classe.cards.Classe');
        this.form.add(this.cardClasse);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardClasse.getForm()
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