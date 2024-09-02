/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.sottocategoriaatv.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-sottocategoriaatv',

    requires: [
        'Ext.form.FieldSet',
        'ana.model.forms.sottocategoriaatv.Gridrisorse',
        'ana.model.forms.sottocategoriaatv.Model',
        'ana.view.forms.sottocategoriaatv.cards.Gridriservatezze',
        'ana.view.forms.sottocategoriaatv.cards.Sottocategoriaatv'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('ana.model.forms.sottocategoriaatv.Model', {
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
            comboCategoria = vm.getStore('comboCategoria'),
            gridRisorse = vm.getStore('storeRisorse')

        if (this.checkRuoli(['99', '10'])) {
            readOnly = false
            gestore = true
            vm.set('btn.save', true)
            vm.set('btn.cronology', true)
            vm.set('btn.delete', true)
        }
        vm.set('gestore', gestore)
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        //titolo tab
        vm.set('title', record.data['nome'] || 'n.d.')
        vm.set('label', Locale.t('ana.forms.sottocategoriaatv.title'))
        comboCategoria.loadData(record.data['comboCategoria']) //carico store categorie
        gridRisorse.loadData(record.data['gridrisorse'])
        if (gestore===true) {
            gridRisorse.add(Ext.create('ana.model.forms.sottocategoriaatv.Gridrisorse', {
                idrisorsa: '', lettura:0, scrittura:0, elimina:0, action: 1, isnew: 1
            }));
        }
        //carico oggetti nel panel
        this.cardSotcat = Ext.create('ana.view.forms.sottocategoriaatv.cards.Sottocategoriaatv')
        this.gridRiservatezze = Ext.create('ana.view.forms.sottocategoriaatv.cards.Gridriservatezze')
        this.riservatezze=Ext.create('Ext.form.FieldSet', {
            collapsible: false, collapsed: false, border: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('ana.forms.sottocategoriaatv.gridautorizzazioni.title') + '</span>',
            items: [this.gridRiservatezze]
        })
        this.cardSotcat.add( this.riservatezze)

        this.form.add(this.cardSotcat)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        let me = this,
            vm = me.getViewModel(),
            error = '',
            record = vm.get('record'),
            gridRisorse = vm.getStore('storeRisorse')

        //aggiorno grid risorse
        record.data['gridrisorse'] = []
        gridRisorse.each(function (rec) {
            record.data['gridrisorse'].push(rec.data)
        })
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardSotcat.getForm()
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
});