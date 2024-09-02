/**
 * Created by fabrizio on 13/10/2021.
 */
Ext.define('sdc.view.forms.lista.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-lista',
    requires: [
        'sdc.model.forms.lista.GridElenco',
        'sdc.model.forms.lista.Model',
        'sdc.view.forms.lista.cards.Lista',
        'sdc.view.forms.lista.cards.GridElenco'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('sdc.model.forms.lista.Model', {
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
            readOnly = true;


        if (this.checkRuoli(['99','2'])){
            readOnly = false;
            vm.set('btn.cronology', true);
            vm.set('btn.save', true);
            vm.set('btn.delete', true);
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['nome'] || 'n.d.')
        vm.set('label',Locale.t('sdc.forms.lista.title'))

        this.gridElenco = Ext.create('sdc.view.forms.lista.cards.GridElenco',{
            bind: {
                store: '{storeElenco}'
            }
        });

        let store = this.getViewModel().getStore('storeElenco');
        store.loadData(record.data['elenco'])
        if(!readOnly) {
            store.add(Ext.create('sdc.model.forms.lista.GridElenco', {
                action: 1, isnew: 1, isread:false,
                nominativo: '', email:''
            }));
        }

        this.cardLista = Ext.create('sdc.view.forms.lista.cards.Lista');
        this.cardLista.add(this.gridElenco)
        this.form.add(this.cardLista);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false;
        }
        //carico store elenco
        let storeElenco = vm.getStore('storeElenco')
        record.data['elenco'] = []
        storeElenco.each(function (rec) {
            // if (rec.data.nominativo!=='' && rec.data.email!=='' && rec.data.email!=='' ) {
                record.data['elenco'].push(rec.data)

            // }
        })
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardLista.getForm()
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
    },

    //gestione risorse
    onblurNominativo:function(campo) {
        campo.ownerCt.completeEdit();
        let recordStore = this.gridElenco.getSelectionModel().getSelection()[0];
        let store = this.gridElenco.getStore();
        let lastrecord = store.last();

        if (recordStore && (lastrecord.data['nominativo'] !== recordStore.data['nominativo']) && campo.value === null) {
            this.gridElenco.getStore().remove(recordStore);
            this.gridElenco.getView().refresh();
        }
        //verifico se devo aggiungete una nuova riga
        if (lastrecord && lastrecord.data['nominativo'] !== '') {
            store.add(Ext.create('sdc.model.forms.lista.GridElenco', {
                modifica:1,action: 1, isnew: 1,isread:false,
                nominativo:'',email:''
            }));
        }
    },
    onRemoveNominativo:function(view, rowIndex, colIndex, item, event, record) {
        if (record.get('action') === 2) { // de era rimosso lo ripristino
            record.set('action', 0);
        } else {
            if (record.get('isnew') === 0) { // è già presente
                record.set('action', 2);
            }
            if (record.get('isnew') === 1 && record.get('nominativo') !== '') { //è nuovo ed ha un valore inserito
                view.getStore().remove(record);
            }
        }
    }
});