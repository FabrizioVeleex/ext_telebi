/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.categoriaatv.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-categoriaatv',

    requires: [
        'ana.model.forms.categoriaatv.Model',
        'ana.view.forms.categoriaatv.cards.Categoriaatv',
        'ana.view.forms.categoriaatv.cards.Gridsottocategorie'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('ana.model.forms.categoriaatv.Model', {
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
            gridSottocategorie = vm.getStore('storeSottocategorie');

        if (this.checkRuoli(['99','10'])){
            readOnly = false;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['nome'] || 'n.d.')
        vm.set('label',Locale.t('ana.forms.categoriaatv.title'))
        gridSottocategorie.load() //carico sottocategorie
        this.cardCategoriaatv = Ext.create('ana.view.forms.categoriaatv.cards.Categoriaatv')
        this.gridSottocategorie = Ext.create('ana.view.forms.categoriaatv.cards.Gridsottocategorie')
        this.cardCategoriaatv.add( this.gridSottocategorie)
        this.form.add(this.cardCategoriaatv)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardCategoriaatv.getForm()
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
    //passaggio id x caricamento sottocategorie
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.id = record.data.id
    }
});