/**
 * Created by luca on 16/07/2018.
 */
Ext.define('bolfor.forms.tipologia.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-bolfor-tipologia',
    requires: [
        'bolfor.forms.tipologia.ModelData',
        'bolfor.forms.tipologia.cards.Tipologia'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('bolfor.forms.tipologia.ModelData', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
       if (Ext.global.Vars.infoUser.idAdmin && Ext.global.Vars.infoUser.idAdmin===Ext.global.Vars.infoUser.id) {
           vm.set('btn.save', true)
           vm.set('btn.delete', true)
           readOnly = false
       }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['descrizione'] || 'n.d.')
        vm.set('label',Locale.t('bolfor.forms.tipologia.title'))

        this.cardTipologia = Ext.create('bolfor.forms.tipologia.cards.Tipologia');
        this.form.add(this.cardTipologia);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardTipologia.getForm()
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