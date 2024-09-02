/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.view.forms.parametri.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-parametri',
    requires:[
        'mcd.model.forms.parametri.Model',
        'mcd.view.forms.parametri.cards.Parametri'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew',0);
        vm.set('record', Ext.create('mcd.model.forms.parametri.Model'))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),
            readOnly = true,
            comboUo = vm.getStore('comboUo')

        if (this.checkRuoli(['99'])){
            readOnly = false;
            vm.set('btn.save', true);
        }
        //gestione tasti default
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title','Parametri' || 'n.d.')
        vm.set('label',Locale.t('mcd.forms.parametri.title'))
        comboUo.loadData(record.data['comboUo'])

        this.cardParam = Ext.create('mcd.view.forms.parametri.cards.Parametri');
        this.form.add(this.cardParam);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        this.callParent(arguments)
    },
    //richiamato dal listeners nello store /store/forms/parametri/Combofolder x assegnare la iduo attuale
    onbeforeload:function(store) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        store.getProxy().extraParams.iduo=record.data.iduo
    }
});