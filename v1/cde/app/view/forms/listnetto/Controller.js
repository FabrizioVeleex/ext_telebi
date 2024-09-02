Ext.define('cde.view.forms.listnetto.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-cde-form-listnetto',
    mixins: ['portal.v1.global.Util'],
    requires:[
        'cde.view.forms.listnetto.cards.Listnetto',
        'cde.view.forms.listnetto.component.Modello'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('cde.view.forms.listnetto.component.Modello', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function(){
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
        //gestisco tasti in base allo stato
        if (record.data.isnew===0 && this.checkRuoli(['99','1'])){
            vm.set('btn.cronology', true);
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['cd_art']+' - '+record.data['descr_art'] || 'n.d.')
        vm.set('label',Locale.t('cde.forms.listnetto.title'))
        //card principale
        this.cardListnetto = Ext.create('cde.view.forms.listnetto.cards.Listnetto')
        //modulo
        this.form.add(this.cardListnetto);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardListnetto.getForm()
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