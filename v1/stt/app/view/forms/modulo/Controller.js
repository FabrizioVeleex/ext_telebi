/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.modulo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-modulo',
    requires: [
        'Ext.form.FieldSet',
        'stt.view.forms.modulo.Model',
        'stt.view.forms.modulo.components.gridRisorse.Model',
        'stt.view.forms.modulo.cards.Gridautorizza',
        'stt.view.forms.modulo.cards.Modulo'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('stt.view.forms.modulo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let gridRisorse = vm.getStore('storeRisorse')

        vm.set('btn.save', true)
        vm.set('btn.delete', true)
        vm.set('btn.close', true)
        vm.set('readOnly', false)
        //titolo tab
        vm.set('title', record.data['codice'] + '-' + record.data['nome'] || 'n.d.')
        vm.set('label', Locale.t('stt.forms.modulo.title'))
        //autorizzazioni
        gridRisorse.loadData(record.data['gridrisorse'])
        gridRisorse.add(Ext.create('stt.view.forms.modulo.components.gridRisorse.Model', {
            idrisorsa: '', action: 1, isnew: 1
        }));
        this.cardModulo = Ext.create('stt.view.forms.modulo.cards.Modulo');
        //creo la grid autorizzazioni
        this.gridAutorizzazioni = Ext.create('stt.view.forms.modulo.cards.Gridautorizza')
        this.autorizzazioni = Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('stt.forms.modulo.autorizzazioni.title') + '</span>',
            items: [this.gridAutorizzazioni]
        })
        this.cardModulo.add(this.autorizzazioni)

        this.form.add(this.cardModulo);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        let me = this, vm = me.getViewModel(), record = vm.get('record'),
            gridRisorse = vm.getStore('storeRisorse')
        //recupero i campi Html x distruggerli e farli ricreare
        let htmlfield = this.cardModulo.down('#descthtml')
        if (htmlfield) {
            htmlfield.destroy()
        }
        record.data['gridrisorse'] = []
        gridRisorse.each(function (rec) {
            if (rec.data.idrisorsa !== '') {
                record.data['gridrisorse'].push(rec.data)
            }
        })
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardModulo.getForm()
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
    }
})