/**
 * Created by luca on 16/07/2018.
 */
Ext.define('bolfor.forms.parametri.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-bolfor-parametri',
    requires:[
        'bolfor.forms.parametri.ModelData',
        'bolfor.forms.parametri.cards.Parametri'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew',0);
        vm.set('record', Ext.create('bolfor.forms.parametri.ModelData'))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(),
            readOnly = true
        //modifica x idAdmin del portale
        if (Ext.global.Vars.infoUser.idAdmin && Ext.global.Vars.infoUser.idAdmin===Ext.global.Vars.infoUser.id) {
            readOnly = false;
            vm.set('btn.save', true);
        }
        //gestione tasti default
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title','Parametri' || 'n.d.')
        vm.set('label',Locale.t('bolfor.forms.parametri.title'))

        this.cardParam = Ext.create('bolfor.forms.parametri.cards.Parametri');
        this.form.add(this.cardParam);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardParam.getForm()
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