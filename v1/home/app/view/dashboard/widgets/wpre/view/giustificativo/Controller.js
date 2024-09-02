/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.giustificativo.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wpregridgiust',
    mixins: ['portal.v1.global.Util'],
    requires:[
    ],

    init: function() {
        let me = this,
            vm = me.getViewModel(),
            storeGiust = vm.getStore('storeGiust')


        vm.set('nota',this.getView().rec.data)
        vm.set('readOnly',this.getView().edit)
        if (this.getView().rec.data['idgiustificativo']!==''){
            vm.set('btndelete',false)

        }
        storeGiust.getProxy().extraParams.iddip=this.getView().rec.data['iddip'];
        storeGiust.getProxy().extraParams.datapre=this.getView().datapre
        storeGiust.load()
    },

    //chiudo salvando
    onCloseSaveGiust: function() {
        let me = this,
            vm = me.getViewModel(),
            nota = vm.get('nota')
        if (nota['note']!=='') {
            if (!nota['notedal'] || !nota['noteal']) {
                Ext.Msg.show({
                    title: Locale.t('global.attenzione'),
                    msg: Locale.t('wpre.giustificativi.errdate'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
                return;
            }
            if (nota['notedal']>nota['noteal']) {
                Ext.Msg.show({
                    title: Locale.t('global.attenzione'),
                    msg: 'data inferiore',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
                return;
            }
        }
        //salvo la nota
        let method = 'POST'
        if (nota['idgiustificativo']!==''){
            method ='PUT'
        }

        Ext.Ajax.request({
            method:method,
            params:{
                iddip:nota['iddip'],
                idnota:nota['idgiustificativo'],
                notedal:nota['notedal'],
                noteal:nota['noteal'],
                note:nota['note']},
            url: Backend.REST_VERSION + 'widgets/wpre/setnota',
            success:function(record){
                let rec = Ext.decode(record.responseText);
                if (rec.action==='del'){
                    me.tipsHome.msg(Locale.t('wpre.giustificativi.nota'),Locale.t('global.btn.delete.ok'));
                }else{
                    me.tipsHome.msg(Locale.t('wpre.giustificativi.nota'),Locale.t('global.btn.edit.ok'));
                }
            }
        });


        me.getView().fireEvent('onCloseGiustificativo');
        me.getView().close();
    },

    //rimuovo la nota
    onRemoveGiust: function() {
        let me = this,
            vm = me.getViewModel(),
            nota = vm.get('nota')

        Ext.Ajax.request({
            method:'DELETE',
            params: {
                idnota: nota['idgiustificativo'],
            },
            url: Backend.REST_VERSION + 'widgets/wpre/delnota',
            success:function(record){
                let rec = Ext.decode(record.responseText);
                me.tipsHome.msg(Locale.t('wpre.giustificativi.nota'),Locale.t('global.btn.delete.ok'));
                me.getView().fireEvent('onCloseGiustificativo');
                me.getView().close();
            }
        });
    },
    onCloseGiust: function() {
        this.getView().close();
    }

});
