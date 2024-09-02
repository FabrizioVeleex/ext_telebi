/**
 * Created by luke on 03/02/21.
 */
Ext.define('websrv.view.forms.assoricambio.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
        'portal.v1.view.grids.DefaultController'
    ],
    alias: 'controller.v1-assoricambio',

    requires: [
        'Ext.util.Format',
        'websrv.model.forms.assoricambio.Assoricambio',
        'websrv.view.forms.assoricambio.cards.Gridarticoli',
        'websrv.view.forms.assoricambio.cards.Gridazioni'
    ],
    /**
     * Called when the view is created
     */
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('websrv.model.forms.assoricambio.Assoricambio', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel()
        try {
            let record = vm.get('record'),
                gridArticoli = vm.getStore('storeArticoli'),
                gridAzioni = vm.getStore('storeAzioni'),
                readOnly = true
            vm.set('btn.close', true)
            vm.set('readOnly', readOnly)
            //titolo tab
            vm.set('title', record.data['cliente'] + ' ('+Locale.t('websrv.forms.assoricambio.fields.aggiornamento')+': '+Ext.Date.format(record.data['aggiornamento'], "d/m/Y h:i:s")+')'|| 'n.d.')
            vm.set('label', Locale.t('websrv.forms.assoricambio.title'))
            vm.set('form', 'assoricambio') //riferimenrto per collegamento info backend
            vm.set('toolbar.hideCard', false)
            if (!this.listForms) {
                this.listForms = [
                    {
                        posizione: 'info',
                        backgroundColor: 'LightBlue',
                        card: Ext.create('websrv.view.forms.assoricambio.cards.Gridarticoli'),
                        text: Locale.t('websrv.forms.assoricambio.info')
                    },
                    {
                        posizione: 'ubicazione',
                        backgroundColor: '',
                        card: Ext.create('websrv.view.forms.assoricambio.cards.Gridazioni'),
                        text: Locale.t('websrv.forms.assoricambio.azioni')
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                this.toolBarCard.add({
                    text: card.text,
                    enableToggle:true,
                    style: {backgroundColor: card.backgroundColor},
                    posizione: card.posizione,
                    handler: 'onClickCard'
                })
                this.form.add(card.card);
            }
            //carico store
            gridArticoli.load();
            gridAzioni.load();
            this.getView().setActiveItem(this.form);
            this.onClickCard({posizione: vm.get('cardactive')})

        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false);
            vm.set('btn.cronology', false);
            vm.set('btn.close', false);
            vm.set('btn.save', false);
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>');
            this.getView().setActiveItem(this.panelInfo);
            this.onAfterLoadFailure()
        }
    },
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.cdcli = record.data.cdcli
    },
    //TODO valutare x metterlo nel default
    onLoadStoreAz:function(store, records, success){
        if (success){
            let totalCount = this.lookupReference('totalCountAz');
            if (totalCount){
                if (store.totalCount){
                    totalCount.setValue(Locale.t('global.grid.total')+' ' + Ext.util.Format.number(store.totalCount, '0,000'))
                }else{
                    totalCount.setValue(Locale.t('global.grid.total')+' 0')
                }
            }
        }
    }
});