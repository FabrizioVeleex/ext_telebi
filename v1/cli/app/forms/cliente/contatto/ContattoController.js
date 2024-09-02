/**
 * Created by luke on 22/02/24.
 */
Ext.define('cli.forms.cliente.contatto.ContattoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-cli-form-contatto',
    //nascondo la grid e visualizzo il form
    onOpenContatto:function(view, rowIndex, colIndex, item, opt, record) {
        let me = this, vm = me.getViewModel(), readOnlyContatto=true
        if (this.checkRuoli(['99','2'])) {
            readOnlyContatto=false
        }
        this.gridContatti.hide() //nascondo grid
        this.schedaContatto.show() //mostro form contatto
        vm.set('reccont', record.data) //passo dati grid
        vm.set('readOnlyContatto',readOnlyContatto) //lettura/modifica
    },
    onNewContatto:function() {
        let me = this, vm = me.getViewModel()
        this.gridContatti.hide() //nascondo grid
        this.schedaContatto.show() //mostro form contatto
        vm.set('reccont', '') //pulisco dati grid
        vm.set('readOnlyContatto',false) //lettura/modifica
    },
    //salvo dati contatto
    onSaveContatto:function() {
        let me = this, vm = me.getViewModel()
        let rec = vm.get('reccont')
        if (!this.schedaContatto.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.form'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        Ext.Ajax.request({
            method: 'PUT',
            jsonData: {data:rec},
            url: Backend.REST_API + 'forms/contatto/save', //azione salvataggio
            success: function () {
                //la chiusura form è già eseguita dal save
            },
            failure: function (response) {
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg:resp['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    },
    onRemoveContatto:function (view, record) {
        let me = this, vm = me.getViewModel()
        if (!this.checkRuoli(['99','2'])) {
            return false
        }
    //  console.log('rimuovo')
    },
    //chiudo form e visualizzo la grid
    onCloseContatto:function() {
        let me = this, vm = me.getViewModel()
        this.gridContatti.show() //Visualizzo grid
        this.schedaContatto.hide() //nascondo form
        let store=vm.getStore('storeContatti')
        store.reload() //carico grid contatti
    }
});