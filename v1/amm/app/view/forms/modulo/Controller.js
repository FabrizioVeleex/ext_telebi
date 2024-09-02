/**
 * Created by luke on 23/08/21.
 */
Ext.define('amm.view.forms.modulo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
    ],
    alias: 'controller.v1-modulo',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'Ext.window.Window',
        'amm.model.forms.modulo.GridAutorizzazioni',
        'amm.model.forms.modulo.GridRuoli',
        'amm.model.forms.modulo.GridVersioni',
        'amm.model.forms.modulo.Model',
        'amm.view.forms.modulo.cards.GridAutorizzazioni',
        'amm.view.forms.modulo.cards.GridRuoli',
        'amm.view.forms.modulo.cards.GridVersioni',
        'amm.view.forms.modulo.cards.Info'
    ],

    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('amm.model.forms.modulo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel()
        try {
            let record = vm.get('record'), readOnly = true, readOnlyTag = true, hidetasti = false
            let gridautorizzazioni = vm.getStore('storeAutorizzazioni') //grid autorizzazioni
            let comboruoli = vm.getStore('comboRuoli') //store combo ruoli autorizzazioni
            let gridruoli = vm.getStore('storeRuoli') //grid ruoli assegnate
            let gridversioni = vm.getStore('storeVersioni') //grid versioni
            if (record.data.isnew === 1) {
                //inserimento tag e nascondo tasti cards
                readOnlyTag = false
                hidetasti = true
            } else {
                gridautorizzazioni.loadData(record.data['gridautorizzazioni'])
                if (this.checkRuoli(['99', '1'])) {
                    gridautorizzazioni.add(Ext.create('amm.model.forms.modulo.GridAutorizzazioni', {
                        action: 1, isnew: 1, id: me.randomString(32), risorsa: '', idrisorsa: '', ruoloass: '', idruoloass: '', tiporisorsa: ''
                    })
                    )
                }
                comboruoli.loadData(record.data['comboruoli'])
                gridruoli.loadData(record.data['gridruoli'])
                if (this.checkRuoli(['99', '1'])) {
                    gridruoli.add(Ext.create('amm.model.forms.modulo.GridRuoli', {
                        action: 1, isnew: 1, id: me.randomString(32), idmodulo: '', descrizione: '', valore: ''
                    })
                    )
                }
                gridversioni.loadData(record.data['gridversioni'])
                if (this.checkRuoli(['99', '1'])) {
                    gridversioni.add(Ext.create('amm.model.forms.modulo.GridVersioni', {
                        action: 1, isnew: 1, id: me.randomString(32)
                    })
                    )
                }
            }
            //gestione tasti default
            vm.set('btn.close', true)
            if (this.checkRuoli(['99', '1'])) {
                readOnly = false
                vm.set('btn.cronology', true)
                vm.set('btn.save', true)
                if (record.data.isnew === 0) {
                    vm.set('btn.delete', true)
                }
            }
            vm.set('readOnly', readOnly)
            vm.set('readOnlyTag', readOnlyTag)
            vm.set('toolbar.hideCard', hidetasti)
            //titolo tab
            vm.set('title', record.data['titolo'] || 'n.d.')
            vm.set('label', Locale.t('amm.forms.modulo.title'))
            //cards
            if (!this.listForms) {
                this.listForms = [
                    {
                        posizione: 'info', backgroundColor: 'LightBlue',
                        card: Ext.create('amm.view.forms.modulo.cards.Info'),
                        text: Locale.t('amm.forms.modulo.info')
                    },
                    {
                        posizione: 'autorizzazioni', backgroundColor: '',
                        card: Ext.create('amm.view.forms.modulo.cards.GridAutorizzazioni'),
                        text: Locale.t('amm.forms.modulo.autorizzazioni')
                    },
                    {
                        posizione: 'ruoli', backgroundColor: '',
                        card: Ext.create('amm.view.forms.modulo.cards.GridRuoli'),
                        text: Locale.t('amm.forms.modulo.ruoli')
                    },
                    {
                        posizione: 'versioni', backgroundColor: '',
                        card: Ext.create('amm.view.forms.modulo.cards.GridVersioni'),
                        text: Locale.t('amm.forms.modulo.version')
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                this.toolBarCard.add({
                    text: card.text,
                    enableToggle: true,
                    style: { backgroundColor: card.backgroundColor },
                    posizione: card.posizione,
                    handler: 'onClickCard'
                })
                this.form.add(card.card);
            }
            this.getView().setActiveItem(this.form)
            this.onClickCard({ posizione: vm.get('cardactive') })
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
        if (record.data.isnew === 1) {
            me.closeForm = true //imposto chiusura al salvataggio nuovo
        }
        //carico store ruoli applicativo
        let storeruoli = vm.getStore('storeRuoli')
        record.data['gridruoli'] = []
        let loadRuo = [], errRuoli = ''
        storeruoli.each(function (rec) {
            if (rec.data.ruolo !== '') {
                if (rec.data.valore !== '' && !Ext.Array.contains(loadRuo, rec.data.ruolo)) {
                    record.data['gridruoli'].push(rec.data)
                    loadRuo.push(rec.data.ruolo)
                } else {
                    errRuoli = Locale.t('amm.forms.modulo.errori.erraccesso')
                }
            }
        })
        if (errRuoli !== '') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: errRuoli,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        //carico store autorizzazioni
        let storeautorizzazioni = vm.getStore('storeAutorizzazioni')
        record.data['gridautorizzazioni'] = []
        let loadAut = [], errAutoriz = ''
        storeautorizzazioni.each(function (rec) {
            if (rec.data.idrisorsa !== '') {
                if (rec.data.idruoloass !== '' && !Ext.Array.contains(loadAut, rec.data.idrisorsa)) {
                    record.data['gridautorizzazioni'].push(rec.data)
                    loadAut.push(rec.data.idrisorsa)
                } else {
                    errAutoriz = Locale.t('amm.forms.modulo.errori.errautorizzazioni')
                }
            }
        })
        if (errAutoriz !== '') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: errAutoriz,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        if (errRuoli !== '') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: errRuoli,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        //carico store versioni
        let storeversioni = vm.getStore('storeVersioni')
        record.data['gridversioni'] = []
        storeversioni.each(function (rec) {
            if (rec.data.ver !== '') {
                if (rec.data.attivo === true) {
                    rec.data.attivo = 1
                }
                if (rec.data.attivo === false) {
                    rec.data.attivo = 0
                }
                rec.data.tag = record.data.tagapp //tag applicazione
                record.data['gridversioni'].push(rec.data)
            }
        })
        this.callParent(arguments)
    },
    obb: function () {
        let cardinfo = this.listForms.filter(obj => { return obj.posizione === 'info' })
        let modulo = cardinfo[0].card.getForm()
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
    //gestione versione
    onEditVersione: function (view, rowIndex, colIndex, item, event, record) {
        let formVersion = Ext.create('Ext.form.Panel', {
            record: record,
            bodyPadding: 15,
            defaults: {
                labelWidth: 100
            },
            dockedItems: {
                xtype: 'toolbar', dock: 'top', items: [
                    {
                        socpe: this,
                        xtype: 'button', text: Locale.t('amm.forms.modulo.gridversion.btn.annulla'),
                        iconCls: 'x-fas fa-times-circle',
                        ui: 'ocra',
                        handler: function (btn) { this.up('window').fireEvent('closeWinVer', btn) }
                    }, {
                        xtype: 'button', text: Locale.t('amm.forms.modulo.gridversion.btn.conferma'),
                        iconCls: 'x-fas fa-times-circle',
                        ui: 'green',
                        handler: function (btn) { this.up('window').fireEvent('editWinVer', btn) }
                    }
                ]
            },
            items: [
                { xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.gridversion.versione'), width: 180, value: record.get('ver') },
                { xtype: 'datefield', fieldLabel: Locale.t('amm.forms.modulo.gridversion.data'), width: 250, format: 'd/m/Y', value: record.get('dataver') },
                { xtype: 'displayfield', labelWidth: 250, fieldLabel: Locale.t('amm.forms.modulo.gridversion.note') },
                { xtype: 'htmleditor', width: 720, value: record.get('note') }
            ]
        });
        let winVersion = Ext.create('Ext.Window', {
            title: Locale.t('amm.forms.modulo.gridversion.titolo'),
            layout: 'fit',
            items: [
                formVersion
            ]
        });
        winVersion.on('close', this.onCloseWindowVersion, this)
        winVersion.on('editWinVer', this.onEditWinVer, this)
        winVersion.on('closeWinVer', this.onCloseWinVer, this)
        winVersion.show()

    },
    onCloseWinVer: function (btn) {
        btn.up('window').close()
    },
    onEditWinVer: function (btn) {
        let winVersion = btn.up('window')
        let panel = btn.up('panel')
        let ver = panel.items.items[0].getValue()
        let data = panel.items.items[1].getValue()
        data = Ext.Date.format(data, 'Y-m-d')
        if (ver.trim() === '' || !data) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('amm.forms.modulo.gridversion.obb'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return
        }
        winVersion.close()
    },
    onCloseWindowVersion: function (win) {
        let me = this
        let form = win.down('panel')
        let ver = form.items.items[0].getValue()
        let data = form.items.items[1].getValue()
        data = Ext.Date.format(data, 'Y-m-d')
        let htmlItem = form.items.items[3].getValue();
        form.record.set('ver', ver);
        form.record.set('dataver', data);
        form.record.set('note', htmlItem);
        form.record.set('action', 1)
        if (form.record.get('isnew') === 1 && ver.trim() !== '') {
            form.record.set('lastrecord', 0);
            let storeVersion = this.getViewModel().getStore('storeVersioni');
            storeVersion.add(Ext.create('amm.model.forms.modulo.GridVersioni', {
                action: 1, isnew: 1, id: me.randomString(32)
            }));
        }
    }
})