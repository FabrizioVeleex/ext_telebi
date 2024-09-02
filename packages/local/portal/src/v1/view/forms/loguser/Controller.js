/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-loguser',

    requires: [
        'Ext.toolbar.Toolbar',
        'portal.util.Locale',
        'portal.v1.model.forms.loguser.Model',
        'portal.v1.view.forms.loguser.cards.Statistic',
        'portal.v1.view.forms.loguser.cards.Topten'
    ],

    init: function() {
        let vm = this.getViewModel()

        this.listForms =[
            {
                posizione: 'topten',
                card: Ext.create('portal.v1.view.forms.loguser.cards.Topten'),
                text: Locale.t('global.loguser.topten.title')
            },
            {
                posizione: 'statistic',
                card: Ext.create('portal.v1.view.forms.loguser.cards.Statistic'),
                text: Locale.t('global.loguser.statistic.title')
            },
        ]

        this.toolBarCard = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            items:[
                {
                    text: 'TopTen',
                    posizione: 'topten',
                    enableToggle:true,
                    handler: 'onClickCard'
                },
                {
                    text: 'Statistic',
                    enableToggle:true,
                    posizione: 'statistic',
                    handler: 'onClickCard'
                }
            ]
        });

        //verifico presenza fromdate to date
        if (!Ext.global.Vars.confMod.forms.infouser){
            Ext.global.Vars.confMod.forms.infouser ={
                fromdate:new Date(),
                todate:new Date()
            }
        }


        vm.set('record',Ext.create('portal.v1.model.forms.loguser.Model',{
            iduser: '',
            fromdate: Ext.global.Vars.confMod.forms.infouser.fromdate,
            todate: Ext.global.Vars.confMod.forms.infouser.todate,
        }))
        vm.set('fromdate',Ext.global.Vars.confMod.forms.infouser)
        vm.set('todate',Ext.global.Vars.confMod.forms.todate)

        this.getView().addDocked(this.toolBarCard)
        this.getView().add(this.listForms[0].card)
        this.getView().add(this.listForms[1].card)

        //carico lista topten

    },

    onClickCard: function (btn){
        this.toolBarCard.items.each(function (item) {
            if (item.posizione === btn.posizione) {
                item.toggle(true)
            } else {
                item.toggle(false)
            }

        }, this);

        //attivo card selezionato
        const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === btn.posizione);
        if (pos){
            this.getView().setActiveItem(this.listForms[pos].card)
        }

    },
    onClose: function () {
        this.getView().fireEvent('closeLogUser')
    },
    onAfterRender: function (){
        let vm = this.getViewModel()
        this.onClickCard({posizione: vm.get('cardactive')})
    },
    onLoafTopten:function (){
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            storeTopTen= vm.getStore('gridtopten'),
            storeDetType= vm.getStore('griddettype'),
            storeDetRequest= vm.getStore('griddetrequest')

        storeTopTen.getProxy().extraParams.iduser = record.data.iduser
        storeTopTen.getProxy().extraParams.todate = record.data.todate
        storeTopTen.getProxy().extraParams.fromdate = record.data.fromdate

        storeTopTen.load()
        storeDetType.removeAll()
        storeDetRequest.removeAll()
        //resetto store dettagion form/grid

    },
    onSeriesTooltipRender: function(tooltip, record, item) {
        tooltip.setHtml(record.get('user') + ': ' + record.get('percentage'));
    },
    onitemclick:function (view, record){
        let me = this,
            vm = me.getViewModel(),
            rec = vm.get('record'),
            storeDetType= vm.getStore('griddettype'),
            storeDetRequest= vm.getStore('griddetrequest')

        storeDetType.getProxy().extraParams.user = record.data.user
        storeDetType.getProxy().extraParams.iduser = record.data._id
        storeDetType.getProxy().extraParams.todate = rec.data.todate
        storeDetType.getProxy().extraParams.fromdate = rec.data.fromdate
        storeDetType.load()

        storeDetRequest.getProxy().extraParams.user = record.data.user
        storeDetRequest.getProxy().extraParams.iduser = record.data._id
        storeDetRequest.getProxy().extraParams.todate = rec.data.todate
        storeDetRequest.getProxy().extraParams.fromdate = rec.data.fromdate
        storeDetRequest.load()
    }
});
