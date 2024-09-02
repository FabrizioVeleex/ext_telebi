/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.parametri.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wordparametri',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'home.view.dashboard.widgets.word.model.Parametri',
        'portal.util.Functions'
    ],
    init: function() {

    },
    onAfterRender:function() {
        let me = this;
        //creo il form e carico i dati dal backend
        if (!this.dataForm) {
            this.dataForm = Ext.create('home.view.dashboard.widgets.word.model.Parametri');
        }
        this.dataForm.load({
            success:function(record){
                me.getViewModel().set('record', record); //record backend
            }
        });
    },
    onSaveParam: function() {
        let vm = this.getViewModel(),record = vm.get('record');
        record.save({
            success: function () {
                bdFunctions.bdTips.msg('Salvataggio parametri', Locale.t('global.form.salvataggiook'));
            },
            failure: function () {
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: 'Errore salvataggio parametri',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })
    },
    onClosePannello: function() {
        this.getView().close()
    }
});
