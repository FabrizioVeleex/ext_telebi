Ext.define('dip.view.forms.utentestampante.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-stampante',
    mixins: ['portal.v1.global.Util'],
    requires:[
        'dip.model.forms.utentestampante.Model',
        'dip.view.forms.utentestampante.card.Stampante'
    ],
    init: function () {
        let me = this,
            vm = this.getViewModel()
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('dip.model.forms.utentestampante.Model', {
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
            comboStampante = vm.getStore('comboStampante'),
            readOnly = true;

        //popolo store stampanti da lista stampanti in record
        comboStampante.loadData(record.data['stampanti'])

        if (this.checkRuoli(['99','2'])){
            readOnly = false;
            vm.set('btn.delete', true);
        }
        //gestione tasti default
        vm.set('btn.cronology', true);
        vm.set('btn.close', true);
        vm.set('btn.save', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['utenteassociato'] || record.data['indirizzoip'] || 'n.d.')
        vm.set('label',Locale.t('dip.forms.utentestampante.title'))
        vm.set('form','utentestampante') //riferimenrto per collegamento info backend

        if (!this.cardSpampante){
            this.cardSpampante = Ext.create('dip.view.forms.utentestampante.card.Stampante');
        }
        this.form.add(this.cardSpampante);
        this.getView().setActiveItem(this.form);
    },

    //Check obbligatorietà campi
    obb:function(){
        let record = this.getViewModel().get('record').data;
        let error = '';
        let valori = this.view.valori;
        //cognome e nome obbligatori
        if (valori['isnew']===1 && record['iduser'].trim() === '' && record['indirizzoip'].trim() === ''){
            error +=Locale.t('utentestampante.fields.utente')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record['idprinter'].trim() === ''){
            error +=Locale.t('utentestampante.fields.stampante')+': '+Locale.t('global.form.inserirevalore')+'<br>';
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