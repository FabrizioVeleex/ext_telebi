/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define('sdcpub.view.main.Controller', {
  extend: 'portal.v1.public.main.Controller',
  alias: 'controller.main',
  requires: [
    'Ext.form.FieldSet',
    'Ext.form.Panel',
    'Ext.form.field.Display',
    'Ext.form.field.Text',
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox',
    'Ext.panel.Panel',
    'Ext.toolbar.Toolbar',
    'portal.util.Functions',
    'portal.v1.public.main.global.upload.Attach',
    'portal.v1.public.main.global.upload.CardAttach',
    'portal.v1.public.main.global.upload.GridAttachModel',
    'sdcpub.model.Center',
    'sdcpub.model.Documenti',
    'sdcpub.view.main.Documenti',
    'sdcpub.view.main.DocumentiUpload'
  ],
  init: function () {
    this.isReoladdata = false;
    this.positionScroll = 0;
    this.header = {
      xtype: 'image', alt: 'Ac Rolcar S.r.l', src: '/logos/logo.png', width: 550, style: 'margin:30px 0'
    };
    this.toolbarTemp = Ext.create('Ext.Toolbar', { reference: 'toolbarForm' })
  },
  onAfterRender: function () {
    this.loadData()
  },
  loadData: function () {
    let element = document.getElementById("divstart");
    if (element) {
      element.parentNode.removeChild(element);
    }
    let me = this, token = document.location.href.split('?')[1]
    if (token !== undefined) {
      let qs = Ext.Object.fromQueryString(token);
      if (qs['token']) {
        this.token = qs['token'];
      }
    } else {
      me.generatePage404()
    }
    //creo il form e carico i dati dal backend
    if (!this.dataForm) {
      this.dataForm = Ext.create('sdcpub.model.Center')
    }
    let proxy = this.dataForm.getProxy()
    proxy.setUrl(Backend.API_URL + "/api/v1/sdc/main/openpage/" + this.token)
    this.dataForm.load({
      success: function (record) {
        me.getViewModel().set('record', record); //record backend
        me.generateForm();
      },
      failure: function () {
        me.generatePage404()
      }
    });
  },
  generatePage404: function () {
    this.infoClose = { xtype: 'box', autoEl: { tag: 'div', html: Locale.t('sdcpub.forms.documento.eccezione.corpo') } };
    this.form = Ext.create('Ext.form.Panel', {
      bodyPadding: 15, scrollable: true,
      items: [
        this.header,
        {
          xtype: 'fieldset', ui: 'acr', cls: 'acr_iconbox_content_title', title: Locale.t('sdcpub.forms.documento.eccezione.title'),
          items: [this.infoClose]
        }
      ]
    });
    this.getView().add(this.form);
    this.getView().setActiveItem(this.form);
  },
  generateForm: function () {
    let me = this
    let record = this.getViewModel().get('record');
    this.downloadText = null;
    if (record.data['status'] === -10) {
      this.generatePage404();
      return;
    }
    //caricamento files
    if (record.data.tipo === 'upd') {
      this.cardAllegati = Ext.create("portal.v1.public.main.global.upload.CardAttach");
      //inserisco tasto allegati
      if (!this.uploadfile) {
        this.uploadfile = Ext.create("portal.v1.public.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachUpload");
      }
      this.cardAllegati.down("#updfile").add(this.uploadfile);
      this.uploadfile.fireEvent("updateInfo", {
        url: "", src: "", thumb: false, descrizione: "", readOnly: false, rif: "", type: [], percorso: 'sdc/main/uploadfile', token: me.token
      })
      this.gridAllegati = Ext.create('sdcpub.view.main.DocumentiUpload', {
        bind: {
          store: '{gridDocumenti}'
        }
      });
      this.cardAllegati.down("#updgrid").add(this.gridAllegati);
    } else {
      this.cardAllegati = Ext.create('sdcpub.view.main.Documenti', {
        bind: {
          store: '{gridDocumenti}'
        }
      });
    }
    this.code = Ext.create('Ext.panel.Panel', {
      width: 400,
      layout: { type: 'vbox', align: 'center', pack: 'center' },
      dockedItems: [{
        xtype: 'toolbar', dock: 'bottom', ui: 'footer',
        layout: { type: 'hbox', pack: 'center' },
        style: { 'background': 'transparent' },
        items: [
          {
            iconCls: 'x-fas fa-sign-in-alt', text: Locale.t('sdcpub.forms.documento.btn.sendcode'),
            handler: 'onBtnSendCode'
          }]
      }],
      items: [
        {
          xtype: 'box',
          autoEl: { tag: 'div', cls: 'sdcpub_txt_info', html: Locale.t('sdcpub.forms.documento.code') }
        },
        {
          xtype: 'textfield', width: 100, cls: 'bd-field-login', maxLength: 6, enforceMaxLength: true,
          bind: {
            value: '{code}'
          }
        }
      ]
    });
    let items = [
      this.header,
      {
        xtype: 'fieldset', cls: 'sdcpub_iconbox_content_title', title: Locale.t('sdcpub.forms.documento.info.title'),
        defaults: { labelWidth: 120 },
        items: [
          {
            xtype: 'displayfield', labelCls: 'sdcpub_label', fieldCls: 'sdcpub_displayfield',
            fieldLabel: Locale.t('sdcpub.forms.documento.fields.subject'),
            bind: { value: '{record.subject}' }
          },
          {
            xtype: 'displayfield', labelCls: 'sdcpub_label', fieldCls: 'sdcpub_displayfield',
            fieldLabel: Locale.t('sdcpub.forms.documento.fields.datadoc'),
            bind: { value: '{record.datadoc}' }
          },
          {
            xtype: 'displayfield', labelCls: 'sdcpub_label', fieldCls: 'sdcpub_displayfield',
            fieldLabel: Locale.t('sdcpub.forms.documento.fields.datestop'),
            bind: { value: '{record.datestop}' }
          },
          { xtype: 'displayfield', hidden: true, bind: { value: '{record.token}' } }
        ]
      },
      {
        xtype: 'fieldset',
        layout: { type: 'hbox', align: 'center', pack: 'center' }, cls: 'sdcpub_iconbox_content_title',
        title: Locale.t('sdcpub.forms.documento.download.title'),
        bind: {
          hidden: '{!hiddenGrid}'
        },
        items: [this.code]
      },
      {
        xtype: 'fieldset', cls: 'sdcpub_iconbox_content_title', title: Locale.t('sdcpub.forms.documento.download.title'),
        hidden: true,
        bind: {
          hidden: '{hiddenGrid}'
        },
        items: [this.cardAllegati]
      }
    ];
    this.form = Ext.create('Ext.form.Panel', {
      bodyPadding: 15, scrollable: true, items: items
    });
    this.getView().add(this.form);
    this.getView().setActiveItem(this.form);
    document.title = 'ACR - ' + record.data['subject'];
    if (this.positionScroll > 0) {
      this.form.body.scrollTo('top', this.positionScroll)
    }
  },
  onBtnSendCode: function () {
    let me = this, vm = me.getViewModel(), code = vm.get('code'), record = vm.get('record');
    if (code !== '') {
      Ext.Ajax.request({
        method: 'PUT', autoAbort: false,
        params: { code: code, idrecord: record.data.id, tipo: record.data.tipo },
        url: Backend.API_URL + "/api/v1/sdc/main/getcode/",
        success: function () {
          vm.set('hiddenGrid', false);
          me.loadAttach();
        },
        failure: function () {
          Ext.Msg.alert(Locale.t('sdcpub.forms.documento.download.titlealert'), Locale.t('sdcpub.forms.documento.errorcode'));
        }
      });
    } else {
      Ext.Msg.alert(Locale.t('sdcpub.forms.documento.titlealert'), Locale.t('sdcpub.forms.documento.errorcode'));
    }
  },
  loadAttach: function () {
    let me = this, vm = me.getViewModel(), code = vm.get('code'), record = vm.get('record')
    let griddocumenti = this.getViewModel().getStore('gridDocumenti');
    let url = "/api/v1/sdc/main/getdocumenti/"
    if (record.data.tipo === 'upd') {
      url = "/api/v1/sdc/main/getdocumentiupload/"
    }
    Ext.Ajax.request({
      method: 'GET', autoAbort: false,
      params: { code: code, idrecord: record.data.id, tipo: record.data.tipo },
      url: Backend.API_URL + url,
      success: function (result) {
        let rest = Ext.decode(result.responseText);
        rest.data.forEach(function (rec) {
          griddocumenti.add(Ext.create('sdcpub.model.Documenti', rec));
        }, this);
      },
      failure: function () {
        vm.set('hiddenGrid', true);
        Ext.Msg.alert(Locale.t('sdcpub.forms.documento.upload.titlealert'), '');
      }
    });
  },
  sizeFormat: function (value) {
    return bdFunctions.sizeformat(value);
  },
  //creazione record mongo x scarico allegato
  onGetAttach: function (grid, rowIndex) {
    let me = this
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    let rec = grid.getStore().getAt(rowIndex);
    Ext.Ajax.request({
      method: 'POST', url: Backend.API_URL + "/api/v1/sdc/main/getdocumento/", jsonData: { data: rec.data, token: me.token },
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        me.getView().el.unmask()
        me.onDownloadFile(resp['token'])
      },
      failure: function (response) {
        me.getView().el.unmask()
        let resp = Ext.decode(response.responseText);
        let errore = Locale.t('global.attach.errordownload') + ': ' + resp['msg']
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: errore,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      }
    })
  },
  //download allegato
  onDownloadFile: function (token) {
    let me = this
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      url: Backend.API_URL + '/api/v1/sdc/main/downloadfile/', method: 'PUT', binary: true, timeout: 900000,
      params: { 'token': token },
      success: function (response) {
        me.getView().el.unmask()
        let headers = response.getAllResponseHeaders()
        let filename = token //default
        //recupero filename dalla risposta
        let disposition = response.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        let blob = new Blob([response.responseBytes], { type: headers['content-type'] })
        //creo area temporale per il download
        let a = document.createElement('a')
        document.body.appendChild(a)
        let url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = filename
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 0)
      },
      failure: function (response) {
        me.getView().el.unmask()
        let msg = response.getResponseHeader('messaggio');
        if (msg) {
          Ext.Msg.show({
            title: Locale.t('global.errore'), msg: 'Error: ' + msg, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
          });
        }
      }
    })
  },
  //upload documento
  onReturnRequestAttachUpload: function (res) {
    let me = this, vm = me.getViewModel(),
      store = vm.getStore("gridDocumenti");
    res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
    res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
    store.add(
      Ext.create("portal.v1.public.main.global.upload.GridAttachModel", res.valori)
    );
    Ext.Msg.show({
      title: Locale.t('global.avviso'), msg: Locale.t('sdcpub.forms.documento.upload.caricamento'), buttons: Ext.Msg.OK, icon: Ext.MessageBox.INFO
    });
  },
  onDeleteAttach: function (grid, rowIndex, colIndex, item, event, record) {
    let me = this
    //rimuovo record backend
    Ext.Ajax.request({
      method: 'PUT', autoAbort: false,
      jsonData: { iddoc: record.data.id, token: me.token },
      url: Backend.API_URL + '/api/v1/sdc/main/deleteattach/',
      success: function () {
        grid.getStore().remove(record);
        Ext.Msg.show({
          title: Locale.t('global.avviso'), msg: Locale.t('sdcpub.forms.documento.upload.rimozione'), buttons: Ext.Msg.OK, icon: Ext.MessageBox.INFO
        });
      },
      failure: function (response) {
        let msg = response.getResponseHeader('msg');
        if (msg) {
          Ext.Msg.show({
            title: Locale.t('global.errore'), msg: 'Error: ' + msg, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
          });
        } else {
          //errore generico
          Ext.Msg.show({
            title: Locale.t('global.errore'), msg: 'Internal server error, the document was not deleted', buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
          });
        }
      }
    })
  }
});
