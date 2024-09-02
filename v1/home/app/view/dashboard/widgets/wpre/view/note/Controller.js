/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.note.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-vpewgridnote',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'home.view.dashboard.widgets.wpre.view.note.Grid',
        'home.view.dashboard.widgets.wpre.view.note.Nota',
    ],
    init: function() {
        let vm = this.getViewModel()
        this.gridNote = Ext.create('home.view.dashboard.widgets.wpre.view.note.Grid',{
            width: 510,
            height: 400,
            bind:{
                store:'{storeNote}'
            }
        })
        this.getView().add(this.gridNote)
    },
    //chiusura finestra
    onCloseNote: function() {
        this.getView().close();

    },
    //apertura finestra giustificativo
    onOpenPanelNota: function(grid, rowIndex) {
        let vm = this.getViewModel()
        let rec = grid.getStore().getAt(rowIndex);

        vm.set('nota',rec.data)
        if (this.panelnota){
            this.panelnota.close()
        }
        this.panelnota = Ext.create('home.view.dashboard.widgets.wpre.view.note.Nota',{
             title:rec.data['nominativo']
        });
        this.getView().add(this.panelnota)

    },

    //cancellazione nota
    onDeleteNota: function(grid, rowIndex) {
        let me = this,
            rec = grid.getStore().getAt(rowIndex);

        Ext.Ajax.request({
            method:'DELETE',
            params: {
                idnota: rec.data['idgiustificativo']
            },
            url: Backend.REST_VERSION + 'widgets/wpre/delnota',
            success:function(record){
                let rec = Ext.decode(record.responseText);
                me.tipsHome.msg(Locale.t('wpre.giustificativi.nota'),Locale.t('global.btn.delete.ok'));
                if (me.panelnota){
                    me.panelnota.close()
                }
                let store = me.gridNote.getStore();
                store.load();
            }
        })
    },
    oncellclick:function (view, td,cellitem,record,tr,rowIndex) {
        let me = this,
            vm = me.getViewModel(),
            rec = vm.get('record')
        if (cellitem===0){
            me.onDeleteNota(view,rowIndex)
        }else{
            me.onOpenPanelNota(view,rowIndex)
        }
    },
    onCloseDelGiust: function (){
        let me=this,
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
                me.panelnota.close()
                let store = me.gridNote.getStore();
                store.load();
            }
        });
    },
    onCloseSaveGiust: function() {
        let me=this,
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
        Ext.Ajax.request({
            method:'PUT',
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
                if (me.panelnota){
                    me.panelnota.close()
                }
                let store = me.gridNote.getStore();
                store.load();
            }
        });
    }
});
