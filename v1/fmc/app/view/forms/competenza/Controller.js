/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.competenza.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-competenza',
    requires: [
        'fmc.model.forms.competenza.Model',
        'fmc.view.forms.competenza.cards.Competenza'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('fmc.model.forms.competenza.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record')
        vm.set('btn.close', true)
        if (this.checkRuoli(['99', '2', '10'])) {
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
        }
        vm.set('readOnly', false)
        //titolo tab
        vm.set('title',record.data['descrizione'] || 'n.d.')
        vm.set('label',Locale.t('fmc.forms.competenza.title'))

        this.cardCompetenza = Ext.create('fmc.view.forms.competenza.cards.Competenza');
        this.form.add(this.cardCompetenza);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardCompetenza.getForm()
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