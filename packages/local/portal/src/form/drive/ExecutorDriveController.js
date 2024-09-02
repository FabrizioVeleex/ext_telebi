/**
 * Created by fabrizio on 17/07/17.
 *
 * DAFARE
 * - inserire animazione attesa/download file
 * - gestire, su eccezione, icone scaricamento Drive Java con 2 icone mac e windows
 *
 */
Ext.define('portal.form.drive.ExecutorDriveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.executordrive',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.util.DelayedTask',
        'portal.util.Locale'
    ],
    /**
     * Called when the view is created
     */
    init: function () {
        this.attesaDrive = 0;
    },
    statics: {
        DRIVE_FILE_LOCK_USER: -4,
        DRIVE_FILE_LOCK_ME_IP: -3,
        DRIVE_FILE_LOCK_ME: -2,
        DRIVE_ERROR: -1,
        DRIVE_ATTESA: 0,
        DRIVE_DOWNLOAD_ATTESA: 1,
        DRIVE_DOWNLOAD: 2,
        DRIVE_END: 3
    },

    onAfterRender: function () {
        var me = this;
        this.infoRecord = this.getView().infoRecord;
        this.nomeFile = '';
        this.run();

    },
    run: function () {
        var me = this;
        this.avanzamento = 0;
        this.driveAttesa();
        Ext.Ajax.request({
            method: 'GET',
            params: {
                _fn: 'fileEdit',
                id: me.infoRecord['id'],
                action: me.infoRecord['action'],
                trash: '',//FIXME verifica se serve
                versione: me.infoRecord['version'],
                unlockFile: me.infoRecord['unlockFileId']
            },
            url: Backend.API_ADDRESS + 'Main.php',
            success: function (response) {
                try {
                    var resp = Ext.decode(response.responseText);
                    if (resp['success'] === true) {

                        if (resp['avanzamento']) {
                            this.avanzamento = resp['avanzamento'];
                        }
                        if (resp['nomefile']) {
                            me.nomeFile = resp['nomefile'];
                        }
                        me.infoResponse = { id: resp['id'], record: resp, status: resp['status'] };
                        me.startPollingOpenFile();
                    } else {
                        me.driveError('onAfterRender');
                    }
                } catch (err) {
                    me.driveError(err);
                }
            },
            failure: function (response) {
                me.driveError('failure');
            }
        });
    },

    /* ------------------------------------------------
     * gestione sezione scaricamento drive locale
     * ------------------------------------------------*/
    insertSectionDownloadDrive: function () {
        var fieldset = Ext.create('Ext.form.FieldSet', {
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            title: 'Download Drive',

            items: [
                {
                    height: 120,
                    width: 120,
                    padding: 10,
                    xtype: 'image',
                    src: '/images/drive_mac.png',
                    alt: '&nbsp;'
                },
                {
                    height: 120,
                    width: 120,
                    padding: 10,
                    xtype: 'image',
                    src: '/images/drive_win.png',
                    alt: '&nbsp;'
                }
            ]
        });

        return fieldset;
    },

    onGoBack: function () {
        this.getView().fireEvent('goBack');
    },
    startPollingOpenFile: function () {
        var me = this,
            status = this.infoResponse['status'];
        if (this.infoResponse['status'] === -2) {
            me.driveLockYouIp();
            return;
        }
        if (this.infoResponse['status'] === -3) {
            me.driveLockYou();
            return;
        }
        if (this.infoResponse['status'] === -4) {
            me.driveLockAnother();
            return;
        }

        //verifco quale messaggi proporre
        Ext.Ajax.request({
            method: 'GET', params: { _fn: 'fileEditPolling', id: this.infoResponse['id'] },
            url: Backend.API_ADDRESS + 'Main.php',
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp['success'] === true) {
                    if (resp['nomefile']) {
                        me.nomeFile = resp['nomefile'];
                    }
                    me.infoResponse['status'] = resp['status'];
                    me.infoResponse['record'] = resp;
                    switch (resp['status']) {
                        case 0: //0 attesa avvio apertura DriveJava
                            if (me.attesaDrive === 1) {
                                //sono passati + di 10 secondi ed il servizio non risponde presento messaggio di servizio assente..
                                me.noService();
                                return;
                            }
                            me.driveAttesa();
                            me.startPollingOpenFile();
                            me.attesaDrive = 1;
                            break;
                        case 1: //1 preparazione download in corso
                            me.driveAttesaDownload();
                            me.startPollingOpenFile();
                            break;
                        case 2: //download file in corso
                            me.avanzamento = resp['avanzamento'];
                            me.driveDownload();
                            me.startPollingOpenFile();
                            break;
                        case 3: //apertura file
                            me.avanzamento = resp['avanzamento'];
                            me.driveDownloadEnd();
                            break;
                        case -1:
                            me.driveError();
                            break;
                        case -2:
                            me.driveLockYouIp();
                            break;
                        case -3:
                            me.driveLockYou();
                            break;
                        case -4:
                            me.driveLockAnother();
                            break;
                    }
                }
            },
            failure: function (response) {
                me.onSbloccaFile();
                me.driveError();
            }
        });
    },
    noService: function () {
        this.driveDown();
        if (this.infoRecord['id']) {
            this.onSbloccaFile(false);
        }
    },

    OpenFileReadMode: function () {
        this.infoRecord['action'] = '02';
        this.run();
    },
    OpenLockFileEditMode: function (resp) {
        this.onApriFile(this.infoOpenFile[0], this.infoOpenFile[1], '01', this.infoOpenFile[3], this.infoOpenFile[4], resp['id']);
    },
    onSbloccaFile: function (showpanel) {
        var me = this;
        Ext.Ajax.request({
            method: 'POST', params: { '_fn': 'sbloccaFile', 'id': this.infoResponse['id'] },
            url: Backend.API_ADDRESS + 'Main.php',
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp['success'] === true) {
                    if (showpanel)
                        me.driveSbloccato();
                } else {
                    if (showpanel)
                        this.driveError();
                }
            },
            failure: function (response) {
                if (showpanel)
                    this.driveError();
            }
        });
    },
    /* ------------------------------------------------
     * BUILD PANEL
     * ------------------------------------------------*/
    driveAttesa: function () {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2>' + Locale.t('bddrive.service.status00') + '</h2>' }
        ]);
        this.getView().add(this.panelInfo);
    },
    driveAttesaDownload: function () {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2>Download ' + me.avanzamento + '% </h2>' }
            // {xtype: 'container', html:'<h2>'+Locale.t('bddrive.service.status02')+'</h2>'}
        ]);
        this.getView().add(this.panelInfo);
    },
    driveDownload: function () {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2>Download ' + me.avanzamento + '% </h2>' }
        ]);
        this.getView().add(this.panelInfo);
    },
    driveDownloadEnd: function () {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2>Download ' + me.avanzamento + '% </h2>' },
            { xtype: 'container', html: '<h2 style="color:green;">' + Locale.t('bddrive.service.status03') + '</h2>' }
        ]);
        this.getView().add(this.panelInfo);
        var task = new Ext.util.DelayedTask(function (controller) {
            controller.onGoBack();
        }, this, [this]);
        task.delay(4000);
        var id = me.infoResponse['record']['id'];
        if (this.infoRecord['action'] === '02') {
            Ext.Ajax.request({
                method: 'GET',
                params: {
                    _fn: 'fileRemoveRecord',
                    id: id
                },
                url: Backend.API_ADDRESS + 'Main.php'
            });
        }
    },
    driveDown: function () {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2 style="color:red;">' + Locale.t('bddrive.service.status-1') + '</h2>' },
            this.insertSectionDownloadDrive()
        ]);
        this.panelInfo.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'middle'
            },
            style: {
                'background-color': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: 'Precedente ',
                handler: 'onGoBack'
            }]
        });
        this.getView().add(this.panelInfo);
    },
    driveSbloccato: function () {
        this.getView().removeAll();
        this.createPanel();
        this.panelInfo.add([
            { xtype: 'container', html: '<h2 style="color:green;">' + Locale.t('bddrive.sbloccato') + '</h2>' }
        ]);
        this.panelInfo.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'middle'
            },
            style: {
                'background-color': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: 'Precedente ',
                handler: 'onGoBack'
            }]
        });
        this.getView().add(this.panelInfo);
    },
    driveLockAnother: function () {
        this.getView().removeAll();
        this.createPanel();
        var infoBlocco = this.infoResponse['record']['blocco'];
        var msg = Locale.t('bddrive.service.status-4');
        msg = msg.replace('[USER]', infoBlocco['user']);
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2 style="color:red;">' + msg + '</h2>' }
        ]);
        this.panelInfo.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'middle'
            },
            style: {
                'background-color': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: 'Precedente ',
                handler: 'onGoBack'
            },
            {
                xtype: 'button',
                text: Locale.t('bddrive.btn.readmode.text'),
                handler: 'OpenFileReadMode'
            }]
        });
        this.getView().add(this.panelInfo);
    },
    driveLockYou: function () {
        this.getView().removeAll();
        this.createPanel();
        var infoBlocco = this.infoResponse['record']['blocco'];
        var me = this;
        var msg = Locale.t('bddrive.service.status-3');
        msg = msg.replace('[IPADDRESS]', infoBlocco['ip']);
        this.panelInfo.add([
            { xtype: 'container', html: '<h2 style="color:red;">' + msg + '</h2>' },
            { xtype: 'container', html: '<h3 style="color:red;">' + Locale.t('bddrive.sblocca') + '</h3>' }
        ]);
        this.panelInfo.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'middle'
            },
            style: {
                'background-color': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: 'Precedente ',
                handler: 'onGoBack'
            },
            {
                xtype: 'button',
                text: Locale.t('bddrive.btn.sblocca.text'),
                handler: 'onSbloccaFile'
            }]
        });
        this.getView().add(this.panelInfo);
    },
    driveLockYouIp: function () {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2 style="color:red;">' + Locale.t('bddrive.service.status-2') + '</h2>' },
            { xtype: 'container', html: '<h3 style="color:red;">' + Locale.t('bddrive.sblocca') + '</h3>' }
        ]);
        this.panelInfo.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'middle'
            },
            style: {
                'background-color': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: 'Precedente ',
                handler: 'onGoBack'
            },
            {
                xtype: 'button',
                text: Locale.t('bddrive.btn.sblocca.text'),
                handler: 'onSbloccaFile'
            }]
        });
        this.getView().add(this.panelInfo);
    },
    driveError: function (err) {
        this.getView().removeAll();
        this.createPanel();
        var me = this;
        this.panelInfo.add([
            { xtype: 'container', html: '<h2 style="color:red;">' + Locale.t('bddrive.service.status-99') + '</h2>' }
        ]);
        this.panelInfo.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'middle'
            },
            style: {
                'background-color': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: 'Precedente ',
                handler: 'onGoBack'
            }]
        });
        this.getView().add(this.panelInfo);
    },
    createPanel: function () {
        var me = this;
        this.panelInfo = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            items: [
                {
                    height: 120,
                    width: 120,
                    xtype: 'image',
                    src: '/bimages/azienda/logo_132.png',
                    alt: '&nbsp;'
                },
                {
                    xtype: 'component',
                    cls: 'userProfileName',
                    html: Locale.t('global.nome')
                },
                { xtype: 'container', html: '<h2>' + me.nomeFile + '</h2>' }
            ]
        });
    }
});