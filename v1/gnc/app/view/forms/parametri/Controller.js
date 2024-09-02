/**
 * Created by luca on 16/07/2018.
 */
Ext.define('gnc.view.forms.parametri.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-parametri',
    requires:[
        'gnc.model.forms.parametri.Model',
        'gnc.view.forms.parametri.cards.Parametri'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew',0);
        vm.set('record', Ext.create('gnc.model.forms.parametri.Model'))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(),
            readOnly = true

        if (this.checkRuoli(['99'])){
            readOnly = false;
            vm.set('btn.save', true);
        }
        //gestione tasti default
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title','Parametri' || 'n.d.')
        vm.set('label',Locale.t('gnc.forms.parametri.title'))

        this.cardParam = Ext.create('gnc.view.forms.parametri.cards.Parametri');
        this.form.add(this.cardParam);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        this.callParent(arguments)
    }
});