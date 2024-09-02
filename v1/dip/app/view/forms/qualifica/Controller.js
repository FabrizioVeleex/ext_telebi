Ext.define('dip.view.forms.qualifica.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-qualifica',
    mixins: ['portal.v1.global.Util'],
    requires:[
        'dip.model.forms.qualifica.Model',
        'dip.view.forms.qualifica.cards.Qualifica'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('dip.model.forms.qualifica.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function(){
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true;


        if (this.checkRuoli(['99','2'])){
            readOnly = false;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['qualifica'] || 'n.d.')
        vm.set('label',Locale.t('dip.forms.qualifica.title'))

        this.cardQualifica = Ext.create('dip.view.forms.qualifica.cards.Qualifica');
        this.form.add(this.cardQualifica);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardQualifica.getForm()
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