Ext.define('dip.view.forms.parametro.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-parametro',
    mixins: ['portal.v1.global.Util'],
    requires:[
        'dip.model.forms.parametro.Model',
        'dip.view.forms.parametro.cards.Parametro'
    ],
    init: function () {
        let me = this,
            vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('dip.model.forms.parametro.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function(){
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true;


        if (this.checkRuoli(['99','2'])){
            readOnly = false;
            // vm.set('btn.delete', true);
        }

        //gestione tasti default
        // vm.set('btn.cronology', true);
        vm.set('btn.close', true);
        vm.set('btn.save', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',Locale.t('dip.grids.parametri.defaultvalue'))
        vm.set('label',Locale.t('dip.forms.parametro.title'))
        vm.set('form','ruolo') //riferimenrto per collegamento info backend

        this.cardFiliale = Ext.create('dip.view.forms.parametro.cards.Parametro');
        this.form.add(this.cardFiliale);
        this.getView().setActiveItem(this.form);
    },
    obb: function (btn) {
        let me = this,
            vm = me.getViewModel(),
            error = '',
            record = vm.get('record');

        if (record.data.pswstd.trim() === ''){
            error +=Locale.t('dip.forms.parametro.fields.pswstd')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }else if (record.data.pswstd.length>100){
            error +=Locale.t('dip.forms.parametro.fields.pswstd')+': '+Locale.t('global.lunghezzaMassima')+' 10<br>';
        }


        if (error!==''){
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: error,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    }
});