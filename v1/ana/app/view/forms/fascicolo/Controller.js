/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.fascicolo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-fascicolo',

    requires: [
        'ana.model.forms.fascicolo.Gridschede',
        'ana.model.forms.fascicolo.Model',
        'ana.view.forms.fascicolo.cards.Fascicolo',
        'ana.view.forms.fascicolo.cards.Gridschede'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('ana.model.forms.fascicolo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true,
            gestore = false,
            gridSchede = vm.getStore('storeSchede');
        if (this.checkRuoli(['99','10'])){
            readOnly = false;
            gestore = true;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
        vm.set('gestore', gestore);
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['nome'] || 'n.d.')
        vm.set('label',Locale.t('ana.forms.fascicolo.title'))
        //carico schede
        gridSchede.loadData(record.data['gridschede'])
        if (gestore === true) {
            gridSchede.add(Ext.create('ana.model.forms.fascicolo.Gridschede', {
                nome: '', action: 1, isnew: 1
            }));
        }

        this.cardFascicolo = Ext.create('ana.view.forms.fascicolo.cards.Fascicolo');
        this.gridSchede = Ext.create('ana.view.forms.fascicolo.cards.Gridschede')
        this.cardFascicolo.add( this.gridSchede)
        this.form.add(this.cardFascicolo);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            gridSchede = vm.getStore('storeSchede');
        //aggiorno gridSchede
        record.data['gridschede'] = []
        gridSchede.each(function (rec) {
            if (rec.data.nome!=='') {
                record.data['gridschede'].push(rec.data)
            }
        })
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardFascicolo.getForm()
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
    },
    //passaggio id x caricamento schede
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.id = record.data.id
    }
});