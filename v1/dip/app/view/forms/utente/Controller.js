Ext.define('dip.view.forms.utente.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
    ],
    alias: 'controller.v1-utente',

    requires: [
        'dip.model.forms.utente.GridRuoli',
        'dip.model.forms.utente.GridStab',
        'dip.model.forms.utente.GridUo',
        'dip.model.forms.utente.Model',
        'dip.view.forms.utente.cards.GridAccessi',
        'dip.view.forms.utente.cards.GridRuoli',
        'dip.view.forms.utente.cards.GridStab',
        'dip.view.forms.utente.cards.GridUo',
        'dip.view.forms.utente.cards.Identificazione',
        'dip.view.forms.utente.cards.Ubicazione',
        'dip.view.forms.utente.component.ChangePassword',
        'portal.v1.view.main.global.upload.Image'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('dip.model.forms.utente.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel()
        try {
            let record = vm.get('record'), comboFiliale = vm.getStore('comboFiliale'), comboListUo = vm.getStore('comboListUo'),
                comboRuolo = vm.getStore('comboRuolo'), comboRuoliFunz = vm.getStore('comboRuoliFunz'), comboQualifica = vm.getStore('comboQualifica'),
                comboZone = vm.getStore('comboZone'), comboUo = vm.getStore('comboUo'),comboStabilimenti = vm.getStore('comboStabilimenti'),
                gridUo = vm.getStore('gridUo'), gridAccessi = vm.getStore('gridAccessi'),
                gridRuoliFunz = vm.getStore('gridRuoliFunz'),storeStabilimenti = vm.getStore('storeStabilimenti'),
                readOnly = true,readOnlyGestore = true, readOnlyStato = true, //1 campi standard, 2 campi gestore, 3 combo stato dipendente
                gestore = false, addgridstab=false;

            //abilito in edit campi standard per gestori e modifica x dipendenti/esterni/sistema
            if (record.data.stato!=='C') {
                if (this.checkRuoli(['99','9','2'])){
                    readOnly = false
                    readOnlyStato = false
                }
                //abilito campi protetti al gestore
                if (this.checkRuoli(['99','9'])){
                    readOnlyGestore = false
                    gestore = true
                    readOnlyStato = false
                }
            } else { //ex dipendenti abilito solo la combo
                if (this.checkRuoli(['99','9','2'])){
                    readOnlyStato = false
                }
            }
            comboFiliale.loadData(record.data['comboFiliale'])
            comboRuoliFunz.loadData(record.data['comboRuoliFunz'])
            comboRuolo.loadData(record.data['comboRuolo'])
            comboQualifica.loadData(record.data['comboQualifica'])
            comboZone.loadData(record.data['comboZone'])
            comboUo.loadData(record.data['comboUo'])
            comboStabilimenti.loadData(record.data['comboStabilimenti'])

            gridAccessi.loadData(record.data['gridaccessi'])
            //alimento combo selezione uo
            let valueFieldAccessi = ''
            if (record.data['listuo'].length > 0) {
                if (record.data['listuo'].length === 1) {
                    vm.set('hideFieldAccessi', false)
                    let predef = record.data['listuo'][0]['predef'] === 'S' ? ' <span style="color:green">Predefinito= Sì</span>' : ' <span style="color:#925d01">Predefinito= NO</span>'
                    vm.set('valueDisplayAccessi', Locale.t('dip.forms.utente.gridaccessi.tipouser.uo') + ' <b>' + record.data['listuo'][0].uo + '</b>:' + predef)
                    valueFieldAccessi = record.data['listuo'][0].uo
                } else {
                    vm.set('hideFieldAccessi', true)
                    comboListUo.loadData(record.data['listuo'])
                    for (let uo of record.data['listuo']) {
                        if (uo.predef === 'S') {
                            valueFieldAccessi = uo.uo
                            vm.set('valueDisplayPredef',' <span style="color:green">Predefinito= Sì</span>')
                        }
                    }
                    if (valueFieldAccessi === '') {
                        valueFieldAccessi = record.data['listuo'][0].uo
                    }
                }
            }
            vm.set('valueFieldAccessi',valueFieldAccessi)
            gridAccessi.filter([{
                property: 'uo',
                value: valueFieldAccessi
            }]);

            gridUo.loadData(record.data['griduo'])
            if (gestore === true) {
                gridUo.add(Ext.create('dip.model.forms.utente.GridUo', {
                    iduo: '', uo: '', idfunz: '', predef: 0, action: 1, isnew: 1
                }));
            }

            gridRuoliFunz.loadData(record.data['gridruolifunz'])
            if (gestore === true) {
                gridRuoliFunz.add(Ext.create('dip.model.forms.utente.GridRuoli', {
                    idfunzione: '', ruolofunz: '', action: 1, isnew: 1
                }));
            }
            storeStabilimenti.loadData(record.data['gridstabilimenti'])
            if (gestore === true) {
                storeStabilimenti.add(Ext.create('dip.model.forms.utente.GridStab', {
                    iduser: '', idstabilimento: '', stabilimento: '', action: 1, isnew: 1
                }));
            }
            //gestione tasti default
            vm.set('btn.close', true);
            if (!readOnly || !readOnlyStato){
                vm.set('btn.cronology', true);
                vm.set('btn.save', true);
            }
            vm.set('readOnly', readOnly);
            vm.set('gestore', gestore);
            vm.set('readOnlyGestore', readOnlyGestore);
            vm.set('readOnlyStato', readOnlyStato);
            //titolo tab
            vm.set('title', record.data['cognome'] + ' ' + record.data['nome'] || 'n.d.')
            vm.set('label', Locale.t('dip.forms.utente.title'))
            vm.set('toolbar.hideCard', false)

            if (!this.listForms) {
                addgridstab=true //devo aggiungere grid stabilimenti
                this.listForms = [
                    {
                        posizione: 'identificazione',
                        backgroundColor: 'LightBlue',
                        card: Ext.create('dip.view.forms.utente.cards.Identificazione'),
                        text: Locale.t('dip.forms.utente.identificazione')
                    },
                    {
                        posizione: 'ubicazione',
                        backgroundColor: '',
                        card: Ext.create('dip.view.forms.utente.cards.Ubicazione'),
                        text: Locale.t('dip.forms.utente.ubicazione')
                    },
                    {
                        posizione: 'griduo',
                        backgroundColor: '',
                        card: Ext.create('dip.view.forms.utente.cards.GridUo'),
                        text: Locale.t('dip.forms.utente.organigramma')
                    },
                    {
                        posizione: 'gridruoli',
                        backgroundColor: '',
                        card: Ext.create('dip.view.forms.utente.cards.GridRuoli'),
                        text: Locale.t('dip.forms.utente.ruolifunz')
                    },
                    {
                        posizione: 'accessi',
                        backgroundColor: '',
                        card: Ext.create('dip.view.forms.utente.cards.GridAccessi'),
                        text: Locale.t('dip.forms.utente.accessi')
                    }
                ]
            }
            //definisco oggetto immagine +upload
            if (!this.img) {
                this.img = Ext.create('portal.v1.view.main.global.upload.Image')
                    .on('returnRequest', 'onReturnRequest').on('onResetImg', 'onResetImg')
                this.listForms[0].card.down('#imgUser').add(this.img)
            }

            this.img.fireEvent('updateInfo', {
                url: record.data['img'],
                src: '',
                thumb: true,
                descrizione: '',
                readOnly: readOnly,
                updimage: true,
                rif: 'img',
                type: ['jpg', 'jpeg', 'png', 'gif']
            })
            //Aggiungo cards
            for (card of this.listForms) {
                let hidecard=false //tasto visibile
                if (card.posizione==='accessi' && gestore===false) {
                    hidecard=true //nascondo tab accessi se non gestore
                }
                this.toolBarCard.add({
                    text: card.text,
                    enableToggle:true,
                    style: {backgroundColor: card.backgroundColor},
                    posizione: card.posizione,hidden:hidecard,
                    handler: 'onClickCard'
                })
                if (addgridstab && card.posizione==='ubicazione') {
                    //creo grid stabilimenti
                    if (this.gridstabilimenti) {
                        this.gridstabilimenti.destroy()
                    }
                    this.gridstabilimenti=Ext.create('dip.view.forms.utente.cards.GridStab')
                    card.card.add(this.gridstabilimenti)
                }
                this.form.add(card.card);
            }
            this.getView().setActiveItem(this.form);
            this.onClickCard({posizione: vm.get('cardactive')})
            //problemi ricaricamento aggiornamento icone
            if (vm.get('cardactive') === 'griduo') {
                this.listForms[2].card.getView().refresh()
            }
            if (vm.get('cardactive') === 'gridruoli') {
                this.listForms[3].card.getView().refresh()
            }
        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false);
            vm.set('btn.cronology', false);
            vm.set('btn.close', false);
            vm.set('btn.save', false);
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>');
            this.getView().setActiveItem(this.panelInfo);
            this.onAfterLoadFailure()
        }

    },
    onSave: function () {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            gridUo = vm.getStore('gridUo'),
            gridRuoliFunz = vm.getStore('gridRuoliFunz'),
            storeStabilimenti = vm.getStore('storeStabilimenti'),
            msg = Locale.t('dip.forms.utente.nuovo') + '<br>User: ' + record.data.shortname+'<br>Password:' + record.data['standard']

        //aggionro gridUo
        record.data['griduo'] = []
        gridUo.each(function (rec) {
            record.data['griduo'].push(rec.data)
        })
        //aggiorno gridRuoliFunz
        record.data['gridruolifunz'] = []
        gridRuoliFunz.each(function (rec) {
            record.data['gridruolifunz'].push(rec.data)
        })
        //aggiorno stabulimenti
        record.data['gridstabilimenti'] = []
        storeStabilimenti.each(function (rec) {
            if (rec.data.idstabilimento!=='') {
                record.data['gridstabilimenti'].push(rec.data)
            }
        })
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
        if (record.data.isnew===1) {
            Ext.Msg.show({
                title: Locale.t('global.operazioneok'),
                msg:msg,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.OK
            });
            record.data.isnew=0 //reimposto utente non nuovo
        }
    },
    obb: function () {
        let identificazione = this.listForms[0].card.getForm()
        if (!identificazione.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.form') + ' ' + this.listForms[0].posizione,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        let ubicazione = this.listForms[1].card.getForm()
        if (!ubicazione.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.form') + ' ' + this.listForms[1].posizione,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    },

    //gestione cambio password
    onResetPassword: function () {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record')
        //form over con info cambio password
        this.t = Ext.create('dip.view.forms.utente.component.ChangePassword', {
            scopeThis: me,
            email: record.data['email2'],
            userId: record.data['id'],
            listeners: {}
        }).show()
    },
    onCloseChangePsw: function () {
        this.t.destroy()
    },
    //gestione cambio immagine
    onChangeBtnUpload: function (field, value) {
        if (!value) {
            return; //ho annullato
        }
        let files = field.fileInputEl.dom.files;
        let file = files[0];
        let opt = {
            thumb: false,
            descrizione: ''
        }
        this.uploadFile(file, opt)
    },
    onResetImg: function (res, remove) {
        this.listForms[0].card.down('#img_remove').setValue(remove)
        this.listForms[0].card.down('#img_new').setValue('')
    },
    onReturnRequest: function (res) {
        this.listForms[0].card.down('#img_remove').setValue(false)
        if (res['success'] === true) {
            this.listForms[0].card.down('#img_new').setValue(Ext.encode(res['valori']))
        } else {
            this.listForms[0].card.down('#img_new').setValue('')
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: res['msg'],
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    }
});