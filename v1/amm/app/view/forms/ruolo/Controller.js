Ext.define('amm.view.forms.ruolo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
    ],
    alias: 'controller.v1-ruolo',

    requires: [
        'amm.model.forms.ruolo.Model',
        'amm.view.forms.ruolo.cards.Componenti',
        'amm.view.forms.ruolo.cards.Info'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.ruolo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel()
        try {
            let record = vm.get('record'), readOnly = true, hidetasti = false
            let testobtn = Locale.t('amm.forms.ruolo.componenti')
            //store componenti
            let gridcomponenti = vm.getStore('storeComponenti')
            if (record.data.isnew===1) {
                hidetasti = true
            } else {
                gridcomponenti.loadData(record.data['componenti'])
                testobtn=gridcomponenti.data.length+' '+testobtn
            }
            //gestione tasti default
            vm.set('btn.close', true)
            if (this.checkRuoli(['99','1'])){
                readOnly = false
                vm.set('btn.cronology', true)
                vm.set('btn.save', true)
                if (record.data.isnew===0) {
                    vm.set('btn.delete', true)
                }
            }
            vm.set('readOnly', readOnly)
            //titolo tab
            vm.set('title', record.data['nome'] || 'n.d.')
            vm.set('label', Locale.t('amm.forms.ruolo.title'))
            vm.set('toolbar.hideCard', hidetasti)
            //cards
            if (!this.listForms) {
                this.listForms = [
                    {posizione: 'info', backgroundColor: 'LightBlue',
                        card: Ext.create('amm.view.forms.ruolo.cards.Info'),
                        text: Locale.t('amm.forms.ruolo.info')
                    },
                    {posizione: 'dettaglio', backgroundColor: '',
                        card: Ext.create('amm.view.forms.ruolo.cards.Componenti'),
                        text: testobtn
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                this.toolBarCard.add({
                    text: card.text,
                    enableToggle: true,
                    style: {backgroundColor: card.backgroundColor},
                    posizione: card.posizione,
                    handler: 'onClickCard'
                })
                this.form.add(card.card);
            }
            this.getView().setActiveItem(this.form);
            this.onClickCard({posizione: vm.get('cardactive')})
        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false)
            vm.set('btn.cronology', false)
            vm.set('btn.close', false)
            vm.set('btn.save', false)
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>')
            this.getView().setActiveItem(this.panelInfo)
            this.onAfterLoadFailure()
        }
    },
    onSave: function () {
        if (!this.obb()) {
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let cardinfo = this.listForms.filter(obj => { return obj.posizione ==='info'})
        let modulo =cardinfo[0].card.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        return true
    }
})