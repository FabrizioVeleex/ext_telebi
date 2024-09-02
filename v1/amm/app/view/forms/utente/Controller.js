/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.utente.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-utente',

    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.window.Window',
        'amm.model.forms.scrivania.Gridapps',
        'amm.model.forms.scrivania.Gridwidget',
        'amm.model.forms.utente.Model',
        'amm.store.forms.organigramma.ComboDesktop',
        'amm.view.forms.utente.cards.Dskutente',
        'amm.view.forms.utente.cards.Gridapps',
        'amm.view.forms.utente.cards.Gridwidget',
        'amm.view.forms.utente.cards.Utente'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel()
        this.btnAddDsk = {xtype: 'button', ui: 'green', text: Locale.t('amm.forms.utente.adddesktop.text'), tooltip: Locale.t('amm.forms.utente.adddesktop.tooltip'), iconCls: 'fas fa-check-square', step:20,handler: 'onAddDsk'}
        this.btnDelDsk = {xtype: 'button', ui: 'green', text: Locale.t('amm.forms.utente.deldesktop.text'), tooltip: Locale.t('amm.forms.utente.deldesktop.tooltip'), iconCls: 'fas fa-trash', step:20,handler: 'onDelDsk'}
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.utente.Model', {
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
            if (record.data.nomedsk!=='') {
                vm.set('btn.save', true)
                this.toolBar.add(this.btnDelDsk)
            } else {
                this.toolBar.add(this.btnAddDsk)
            }
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['cognomenome'] || 'n.d.')
        vm.set('label',Locale.t('amm.forms.utente.title'))
        this.cardUtente = Ext.create('amm.view.forms.utente.cards.Utente') //form principale
        //carico desktop se presente
        if (record.data.nomedsk!=='') {
            this.desktoputente =  Ext.create('amm.view.forms.utente.cards.Dskutente')
            this.gridwidget =  Ext.create('amm.view.forms.utente.cards.Gridwidget')
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
            this.gridapps =  Ext.create('amm.view.forms.utente.cards.Gridapps')
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
            this.cardUtente.add(this.desktoputente)
            this.cardUtente.add(this.cardwidget)
            this.cardUtente.add(this.cardapps)
        }
        this.form.add(this.cardUtente)
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
            if (rec.data.idapp!=='' && rec.data.action!==2 && !Ext.Array.contains(loadWdg, rec.data.idapp)) {
                    record.data['gridwidget'].push(rec.data)
                    loadWdg.push(rec.data.idapp);
            }
        })
        //carico store quick apps
        let storeapps = vm.getStore('storeApps')
        record.data['gridapps'] = []
        let loadApps = []
        storeapps.each(function (rec) {
            if (rec.data.idapp!=='' && rec.data.action!==2 && !Ext.Array.contains(loadApps, rec.data.idapp)) {
                record.data['gridapps'].push(rec.data)
                loadApps.push(rec.data.idapp);
            }
        })
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardUtente.getForm()
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
    },
    //aggiungi/rimuovi desktop
    onAddDsk:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
            handler: function () {wndw.destroy()}
        })
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm()
                let iddesktop=ff.findField('iddesktop').getValue()
                if (!iddesktop) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'), msg:Locale.t('amm.forms.utente.adddesktop.errore'),
                        buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
                    })
                    return
                }
                wndw.destroy()
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'POST', jsonData: {data:record.data,action:'add',iddesktop:iddesktop},
                    url: Backend.REST_API + 'forms/organigramma/desktop', //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask()
                        me.isReoladdata = true
                        me.onAfterSave()
                    },
                    failure: function (response) {
                        me.getView().el.unmask()
                        let resp = Ext.decode(response.responseText)
                        Ext.Msg.show({
                            title: Locale.t('global.errore'), msg:resp['msg'],
                            buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'combo', anchor: '90%', forceSelection: true,fieldLabel: Locale.t('amm.forms.utente.adddesktop.seleziona'),
                    name:'iddesktop',displayField: 'nome', valueField: 'id', value: '', minChars: 3,
                    store: Ext.create('amm.store.forms.organigramma.ComboDesktop'),
                    listeners: {
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery
                        }
                    }
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('amm.forms.utente.adddesktop.text'), height:150,scrollable:true, width: 600, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false, items: [wdwpanel]
        })
        wndw.show()
    },
    onDelDsk:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
            handler: function () {wndw.destroy()}
        })
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy()
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'POST', jsonData: {data:record.data,action:'del'},
                    url: Backend.REST_API + 'forms/organigramma/desktop', //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask()
                        me.isReoladdata = true
                        me.onAfterSave()
                    },
                    failure: function (response) {
                        me.getView().el.unmask()
                        let resp = Ext.decode(response.responseText)
                        Ext.Msg.show({
                            title: Locale.t('global.errore'), msg:resp['msg'],
                            buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >'+Locale.t('amm.forms.utente.deldesktop.msg')+'</span>'
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('amm.forms.utente.deldesktop.text'), height:150,scrollable:true, width: 600, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false, items: [wdwpanel]
        })
        wndw.show()
    }
});