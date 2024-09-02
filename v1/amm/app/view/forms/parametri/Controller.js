/**
 * Created by luca on 16/07/2018.
 */
Ext.define('amm.view.forms.parametri.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-parametri',
    requires:[
        'amm.model.forms.parametri.Model',
        'amm.view.forms.parametri.cards.Parametri'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew',0);
        vm.set('record', Ext.create('amm.model.forms.parametri.Model'))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),
            readOnly = true,
            comboTipo = vm.getStore('comboTipo')

        if (this.checkRuoli(['99'])){
            readOnly = false
            vm.set('btn.save', true)
        }
        //gestione tasti default
        vm.set('readOnly', readOnly)
        //titolo tab
        vm.set('title','Parametri' || 'n.d.')
        vm.set('label',Locale.t('amm.forms.parametri.title'))
        comboTipo.loadData(record.data['combotipo'])

        this.cardParam = Ext.create('amm.view.forms.parametri.cards.Parametri')
        this.form.add(this.cardParam)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        this.callParent(arguments)
    },
    onShowPsw: function() {
        let record = this.getViewModel().get('record');
        let pswshow=record.data.pswestrazione;
        Ext.Msg.show({
            title: Locale.t('amm.forms.parametri.fields.pswestrazione'),
            iconCls: 'x-fas fa-key',
            msg: pswshow,
            buttons: Ext.Msg.OK
        });
    }
});