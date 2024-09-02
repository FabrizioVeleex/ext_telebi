/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stt.view.forms.obbiettivo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-stt-obbiettivo',
    requires: [
        'stt.view.forms.obbiettivo.Model',
        'stt.view.forms.obbiettivo.cards.Obbiettivo'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('stt.view.forms.obbiettivo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), store = vm.getStore('store');
        readOnly = true;

        if (this.checkRuoli(['99'])) {
            readOnly = false
            vm.set('btn.save', true)
        }
        //gestione tasti default
        vm.set('readOnly', readOnly)
        //titolo tab
        vm.set('title', record.data.rag_soc || 'n.d.')
        vm.set('label', Locale.t('stt.forms.obbiettivo.title'))

        this.north = Ext.create('stt.view.forms.obbiettivo.cards.North')
        this.south = Ext.create('stt.view.forms.obbiettivo.cards.South')
        this.center = Ext.create('stt.view.forms.obbiettivo.cards.Center')
        this.cardObbiettivo = Ext.create('stt.view.forms.obbiettivo.cards.Obbiettivo', {
            items: [
                this.north,
                this.center,
                this.south
            ]
        })
        this.form.add(this.cardObbiettivo)
        this.getView().setActiveItem(this.form)
        store.getProxy().extraParams.cd_sogg_fat = record.data.cd_sogg_fat;
        store.load();
    },
    onSave: function () {
        this.callParent(arguments)
    },
    onLoadStore: function (s) {

    },
    onitemclick: function (obj, record, item, index) {
        let me = this,
            vm = me.getViewModel(),
            store = vm.getStore('storeDet');

        store.getProxy().extraParams.cd_art = record.data.cd_art
        store.getProxy().extraParams.cd_sogg_fat = record.data.cd_sogg_fat
        store.load();
    }
});