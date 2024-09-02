/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.mansione.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-mansione',
    requires: [
        'Ext.form.FieldSet',
        'fmc.model.forms.mansione.Model',
        'fmc.model.forms.mansione.ModelliCombo',
        'fmc.view.forms.mansione.cards.GridModelli',
        'fmc.view.forms.mansione.cards.Mansione'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('fmc.model.forms.mansione.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly=true
        let storeModelli  = vm.getStore('storeModelli')
        if (this.checkRuoli(['99','10'])) {
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
            readOnly=false
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        //titolo tab
        vm.set('title',record.data['descrizione'] || 'n.d.')
        vm.set('label',Locale.t('fmc.forms.mansione.title'))
        this.cardMansione = Ext.create('fmc.view.forms.mansione.cards.Mansione');
        //grid modelli
        this.gridModelli = Ext.create('fmc.view.forms.mansione.cards.GridModelli');
        storeModelli.loadData(record.data.gridmodelli)
        if (readOnly === false) {
            storeModelli.add(Ext.create('fmc.model.forms.mansione.ModelliCombo', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                descrizione:'',idmodello:''
            }))
        }
        this.cardModelli=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.mansione.gridmodelli.sezione')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridModelli]
        })
        this.cardMansione.add(this.cardModelli);
        this.form.add(this.cardMansione);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardMansione.getForm()
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