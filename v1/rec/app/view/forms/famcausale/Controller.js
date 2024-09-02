/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.famcausale.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-famcausale',
    requires: [
        'rec.model.forms.famcausale.Model',
        'rec.view.forms.famcausale.cards.Famcausale'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('rec.model.forms.famcausale.Model', {
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
            comboCausale = vm.getStore('comboCausale'),
            comboFamiglia = vm.getStore('comboFamiglia')

        if (this.checkRuoli(['99','10'])){
            readOnly = false;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            if (record.data.isnew===0) {
                vm.set('btn.delete', true);
            }
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['pfcaus']+'-'+record.data['pffami'] || 'n.d.')
        vm.set('label',Locale.t('rec.forms.famcausale.title'))
        //carico store combo
        comboCausale.loadData(record.data['comboCausale'])
        comboFamiglia.loadData(record.data['comboFamiglia'])

        this.cardFamcausale = Ext.create('rec.view.forms.famcausale.cards.Famcausale');
        this.form.add(this.cardFamcausale);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardFamcausale.getForm()
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