/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.categoria.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-categoria',

    requires: [
        'ana.model.forms.categoria.Model',
        'ana.view.forms.categoria.cards.Categoria'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel()
        vm.set('isnew', this.getView().valori.isnew)
        vm.set('id', this.getView().valori.id)
        vm.set('record', Ext.create('ana.model.forms.categoria.Model', {
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
            readOnly = true, readOnlyCat=true

        if (this.checkRuoli(['99','10'])){
            readOnly = false
            if (record.data.as400===0) {
                readOnlyCat = false
            }
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
        }

        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        vm.set('readOnlyCat', readOnlyCat)
        //titolo tab
        vm.set('title',record.data['categoria'] || 'n.d.')
        vm.set('label',Locale.t('ana.forms.categoria.title'))

        this.cardCategoria = Ext.create('ana.view.forms.categoria.cards.Categoria')
        this.form.add(this.cardCategoria)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        if (!this.obb()) {
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardCategoria.getForm()
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