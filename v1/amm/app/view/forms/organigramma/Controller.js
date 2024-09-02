Ext.define('amm.view.forms.organigramma.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
    ],
    alias: 'controller.v1-organigramma',

    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.window.Window',
        'amm.model.forms.organigramma.GridFunzioni',
        'amm.model.forms.organigramma.Model',
        'amm.model.forms.scrivania.Gridapps',
        'amm.model.forms.scrivania.Gridwidget',
        'amm.store.forms.organigramma.ComboDesktop',
        'amm.view.forms.organigramma.cards.Componenti',
        'amm.view.forms.organigramma.cards.Dskuo',
        'amm.view.forms.organigramma.cards.GridFunzioni',
        'amm.view.forms.organigramma.cards.Gridapps',
        'amm.view.forms.organigramma.cards.Gridwidget',
        'amm.view.forms.organigramma.cards.Info'
    ],
    init: function () {
        let vm = this.getViewModel();
        this.btnAddDsk = {xtype: 'button', ui: 'green', text: Locale.t('amm.forms.organigramma.adddesktop.text'), tooltip: Locale.t('amm.forms.organigramma.adddesktop.tooltip'), iconCls: 'fas fa-check-square', step:20,handler: 'onAddDsk'}
        this.btnDelDsk = {xtype: 'button', ui: 'green', text: Locale.t('amm.forms.organigramma.deldesktop.text'), tooltip: Locale.t('amm.forms.organigramma.deldesktop.tooltip'), iconCls: 'fas fa-trash', step:20,handler: 'onDelDsk'}
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.organigramma.Model', {
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
            let testobtn = Locale.t('amm.forms.organigramma.componenti')
            //store componenti
            let gridcomponenti = vm.getStore('storeComponenti') //grid componenti UO
            let gridfunzioni = vm.getStore('storeFunzioni') //grid funzioni assegnate
            let comboUo = vm.getStore('comboUo') //combo uo superiore
            let comboFunzioni = vm.getStore('comboFunzioni') //combo funzioni
            if (record.data.isnew===1) {
                hidetasti = true
            } else {
                gridcomponenti.loadData(record.data['componenti'])
                testobtn=gridcomponenti.data.length+' '+testobtn
                gridfunzioni.loadData(record.data['gridfunzioni'])
                if (this.checkRuoli(['99','1'])) {
                    gridfunzioni.add(Ext.create('amm.model.forms.organigramma.GridFunzioni', {
                            action: 1, isnew: 1, id: me.randomString(32),iduniversale:record.data.id,locale:1,globale:0,funz:'',valore:0
                        })
                    )
                }
                comboFunzioni.loadData(record.data['combofunzioni'])
            }
            //gestione tasti default
            vm.set('btn.close', true)
            if (this.checkRuoli(['99','1'])){
                readOnly = false
                vm.set('btn.cronology', true)
                vm.set('btn.save', true)
                if (record.data.nomedesktop!=='') {
                    this.toolBar.add(this.btnDelDsk)
                } else {
                    this.toolBar.add(this.btnAddDsk)
                }
                if (record.data.isnew===0) {
                    vm.set('btn.delete', true)
                }
            }
            vm.set('readOnly', readOnly)
            //titolo tab
            vm.set('title', record.data['nome'] || 'n.d.')
            vm.set('label', Locale.t('amm.forms.organigramma.title'))
            vm.set('toolbar.hideCard', hidetasti)
            comboUo.loadData(record.data['uo']) //carico UO
            this.carddesktop=Ext.create('amm.view.forms.organigramma.cards.Dskuo')
            //widget/apps desktop
            if (record.data.nomedesktop!=='') {
                let storewidget = vm.getStore('storeWidget')
                let storeapps = vm.getStore('storeApps')
                this.gridwidget =  Ext.create('amm.view.forms.organigramma.cards.Gridwidget')
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
                this.gridapps =  Ext.create('amm.view.forms.organigramma.cards.Gridapps')
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
                this.carddesktop.add(this.cardwidget)
                this.carddesktop.add(this.cardapps)
            }
            //cards
            if (!this.listForms) {
                this.listForms = [
                    {posizione: 'info', backgroundColor: 'LightBlue',
                        card: Ext.create('amm.view.forms.organigramma.cards.Info'),
                        text: Locale.t('amm.forms.organigramma.info')
                    },
                    {posizione: 'funzioni', backgroundColor: '',
                        card: Ext.create('amm.view.forms.organigramma.cards.GridFunzioni'),
                        text: Locale.t('amm.forms.organigramma.funzioni')
                    },
                    {posizione: 'desktop', backgroundColor: '',
                        card: this.carddesktop,
                        text: Locale.t('amm.forms.organigramma.desktop')
                    },
                    {posizione: 'componenti', backgroundColor: '',
                        card: Ext.create('amm.view.forms.organigramma.cards.Componenti'),
                        text: testobtn
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                if (card.posizione==='desktop') {
                    if (record.data.nomedesktop!=='') {
                        this.toolBarCard.add({
                            text: card.text,
                            enableToggle: true,
                            style: {backgroundColor: card.backgroundColor},
                            posizione: card.posizione,
                            handler: 'onClickCard'
                        })
                    }
                } else {
                    this.toolBarCard.add({
                        text: card.text,
                        enableToggle: true,
                        style: {backgroundColor: card.backgroundColor},
                        posizione: card.posizione,
                        handler: 'onClickCard'
                    })
                }
                this.form.add(card.card);
            }
            this.getView().setActiveItem(this.form)
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
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false
        }
        if (record.data.isnew===1) {
            me.closeForm = true //imposto chiusura al salvataggio nuovo
        }
        //carico store funzioni
        let storefunzioni = vm.getStore('storeFunzioni')
        record.data['gridfunzioni'] = []
        let loadFnz = []
        storefunzioni.each(function (rec) {
            if (rec.data.funz!=='' && !Ext.Array.contains(loadFnz, rec.data.funz)) {
                //setto valori check
                if (rec.data.globale===true) {
                    rec.data.globale=1
                }
                if (rec.data.globale===false) {
                    rec.data.globale=0
                }
                if (rec.data.locale===true) {
                    rec.data.locale=1
                }
                if (rec.data.locale===false) {
                    rec.data.locale=0
                }
                record.data['gridfunzioni'].push(rec.data)
                loadFnz.push(rec.data.funz);
            }
        })
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
                        title: Locale.t('global.errore'), msg:Locale.t('amm.forms.organigramma.adddesktop.errore'),
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
                        me.refreshGrid=true
                        me.onClose()
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
                {xtype: 'combo', anchor: '90%', forceSelection: true,fieldLabel: Locale.t('amm.forms.organigramma.adddesktop.seleziona'),
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
            tbar: [btnX,btnConfirm], title:Locale.t('amm.forms.organigramma.adddesktop.text'), height:150,scrollable:true, width: 600, closable: true,
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
                        me.refreshGrid=true
                        me.onClose()
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
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >'+Locale.t('amm.forms.organigramma.deldesktop.msg')+'</span>'
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('amm.forms.organigramma.deldesktop.text'), height:150,scrollable:true, width: 600, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false, items: [wdwpanel]
        })
        wndw.show()
    }
})