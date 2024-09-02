/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.scrivania.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-scrivania',

    requires: [
        'Ext.form.FieldSet',
        'amm.model.forms.scrivania.Gridapps',
        'amm.model.forms.scrivania.Gridwidget',
        'amm.model.forms.scrivania.Model',
        'amm.view.forms.scrivania.cards.Gridapps',
        'amm.view.forms.scrivania.cards.Gridwidget',
        'amm.view.forms.scrivania.cards.Scrivania'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.scrivania.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),
            readOnly = true
        let storewidget = vm.getStore('storeWidget')
        let storeapps = vm.getStore('storeApps')

        if (this.checkRuoli(['99','1'])){
            readOnly = false
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            if (record.data.isnew===0) {
                vm.set('btn.delete', true)
            }
        }

        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['nome'] || 'n.d.')
        vm.set('label',Locale.t('amm.forms.scrivania.title'))
        //creo grids
        this.gridwidget =  Ext.create('amm.view.forms.scrivania.cards.Gridwidget')
        this.cardwidget=Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('amm.forms.scrivania.gridwidget.title') + '</span>',
            items: [me.gridwidget]
        })
        //carico store
        storewidget.loadData(record.data['gridwidget'])
        if (this.checkRuoli(['99','1'])) {
            storewidget.add(Ext.create('amm.model.forms.scrivania.Gridwidget', {
                    action: 1, isnew: 1, id: me.randomString(32),idmodello:'',idapp:'',titolo:''
                })
            )
        }
        this.gridapps =  Ext.create('amm.view.forms.scrivania.cards.Gridapps')
        this.cardapps=Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('amm.forms.scrivania.gridapps.title') + '</span>',
            items: [me.gridapps]
        })
        //carico store
        storeapps.loadData(record.data['gridapps'])
        if (this.checkRuoli(['99','1'])) {
            storeapps.add(Ext.create('amm.model.forms.scrivania.Gridapps', {
                    action: 1, isnew: 1, id: me.randomString(32),idmodello:'',idapp:'',titolo:''
                })
            )
        }
        //creo form+griglie
        this.cardDesktop = Ext.create('amm.view.forms.scrivania.cards.Scrivania')
        this.cardDesktop.add(this.cardwidget)
        this.cardDesktop.add(this.cardapps)

        this.form.add(this.cardDesktop)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false
        }
        //carico store widgets
        let storewidget = vm.getStore('storeWidget')
        record.data['gridwidget'] = []
        let loadWdg = []
        storewidget.each(function (rec) {
            if (rec.data.idapp!=='' && !Ext.Array.contains(loadWdg, rec.data.idapp)) {
                    record.data['gridwidget'].push(rec.data)
                    loadWdg.push(rec.data.idapp);
            }
        })
        //carico store quick apps
        let storeapps = vm.getStore('storeApps')
        record.data['gridapps'] = []
        let loadApps = []
        storeapps.each(function (rec) {
            if (rec.data.idapp!=='' && !Ext.Array.contains(loadApps, rec.data.idapp)) {
                record.data['gridapps'].push(rec.data)
                loadApps.push(rec.data.idapp);
            }
        })
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardDesktop.getForm()
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
});