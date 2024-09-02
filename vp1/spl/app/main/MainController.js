
Ext.define('spl.main.MainController', {
  extend: 'portal.app.ViewController',
  alias: 'controller.main',
  requires: [
    'spl.model.Center',
    'Ext.form.field.Display',
    'Ext.form.Panel',
    'Ext.form.FieldSet'
  ],
  init: function () {
    this.isUploded = false;
    this.isReoladdata = false;
    this.positionScroll = 0;
    this.header = {
      xtype: 'image',
      alt: 'Ac Rolcar S.r.l', //TODO rendere generico...
      src: 'resources/images/loghi_acrolcar.png',
      width: 550,
      style: 'margin:30px 0'
    };
    this.toolbarTemp = Ext.create('Ext.Toolbar', {
      reference: 'toolbarForm'
    })
  },
  loadData: function () {
    let element = document.getElementById("divstart");
    if (element) {
      element.parentNode.removeChild(element);
    }
    let me = this;

    this.token = document.location.href.split('?')[1];


    if (token === undefined) {
      this.token = "ND";
    }
    //creo il form e carico i dati dal backend
    if (!this.dataForm) {
      this.dataForm = Ext.create('spl.model.Center');

    }
    this.dataForm.getProxy().extraParams.idt = this.token;
    this.dataForm.load({
      success: function (record) {
        me.getViewModel().set('record', record); //record backend
        me.generateForm();
      },
      failure: function () {
        me.generatePage404();
      }
    });
  },
  generatePage404: function () {
    this.infoClose = {
      xtype: 'box',
      autoEl: {
        tag: 'div',
        html: Locale.t('spl.eccezione.corpo')
      }
    };
    this.form = Ext.create('Ext.form.Panel', {
      bodyPadding: 15,
      scrollable: true,
      items: [
        this.header,
        {
          xtype: 'fieldset', ui: 'acr', cls: 'acr_iconbox_content_title', title: Locale.t('spl.eccezione.title'),
          items: [this.infoClose]
        }
      ]
    });
    this.getView().add(this.form);
    this.getView().setActiveItem(this.form);
  },
  generateForm: function () {
    let record = this.getViewModel().get('record');
    this.downloadText = null;
    if (record.data['status'] === -10) {
      this.generatePage404();
      return;
    }
    this.download = Ext.create('Ext.panel.Panel', {
      dockedItems: [
        {
          xtype: 'toolbar', dock: 'bottom', items: [
            {
              xtype: 'button', text: Locale.t('spl.scaricadoc'),
              iconCls: 'icon-pdf',
              fnUrl: "dwnPdf",
              nameFile: "documento.pdf",
              ui: 'acblue', handler: 'onDownload'
            },
            {
              xtype: 'button', text: Locale.t('spl.scaricaxls'),
              iconCls: 'icon-xlsx',
              fnUrl: "dwnXlsx",
              nameFile: "documento.xlsx",
              ui: 'acblue', handler: 'onDownload'
            },
            // {
            //   xtype: 'button', text: Locale.t('spl.scaricacsv'),
            //   iconCls: 'icon-txt',
            //   fnUrl: "dwnCsv",
            //   nameFile: "documento.csv",
            //   ui: 'acblue', handler: 'onDownload'
            // }
          ]
        }
      ],
      items: [
        {
          xtype: 'box',
          autoEl: { tag: 'div', cls: 'acr_txt_info', html: Locale.t('spl.download.info') }
        }
      ]
    });

    let items = [
      this.header,
      {
        xtype: 'box', margin: '35 0 35 0',
        autoEl: {
          tag: 'div',
          cls: 'acr_h2',
          html: record.data['inviato']
        }
      },
      {
        xtype: 'fieldset', ui: 'acr',
        cls: 'acr_iconbox_content_title',
        title: Locale.t('spl.info.title'),
        defaults: { labelWidth: 120 },
        items: [
          {
            xtype: 'displayfield', labelCls: 'acr_label',
            fieldCls: 'acr_displayfield',
            fieldLabel: Locale.t('spl.generico.fields.ragsoc'),
            bind: { value: '{record.ragsoc}' }
          },
          {
            xtype: 'displayfield', labelCls: 'acr_label',
            fieldCls: 'acr_displayfield',
            fieldLabel: Locale.t('spl.generico.fields.numero'),
            bind: { value: '{record.numero}' }
          },
          {
            xtype: 'displayfield', labelCls: 'acr_label',
            fieldCls: 'acr_displayfield',
            fieldLabel: Locale.t('spl.generico.fields.anno'),
            bind: { value: '{record.datadoc}' }
          }
        ]
      },
      {
        xtype: 'box', margin: '35 0 35 0',
        autoEl: {
          tag: 'div',
          cls: 'acr_h2',
          html: ''
        }
      },
      {
        xtype: 'fieldset', ui: 'acr', cls: 'acr_iconbox_content_title',
        title: Locale.t('spl.download.title'),
        items: [this.download]
      }
    ];
    this.form = Ext.create('Ext.form.Panel', {
      bodyPadding: 15,
      scrollable: true,
      items: items
    });
    this.getView().add(this.form);
    this.getView().setActiveItem(this.form);
    document.title = 'ACR - ' + record.data['titolo'];
    if (this.positionScroll > 0) {
      this.form.body.scrollTo('top', this.positionScroll)
    }

  },

  //download file
  onDownload: function (btn) {
    let me = this;
    Ext.Ajax.request({
      url: Backend.REST_API + btn.fnUrl + "/",
      timeout: 300000,
      method: "POST",
      binary: true,
      jsonData: {
        key: me.token,
      },
      success: function (response) {
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        let headers = response.getAllResponseHeaders()
        let fileName = response.getResponseHeader('Content-Disposition').split("filename=")[1]
        if (fileName === '') { //se non ho filename di ritorno (eccezione) do un nome generico
          fileName = btn.nameFile
        }
        let blob = new Blob([response.responseBytes], { type: headers['content-type'] })
        let binaryFile = window.URL.createObjectURL(blob)
        a.href = binaryFile
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(binaryFile)
      },
      failure: function () {
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: Locale.t("global.error.generic"),
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      }
    });
  }
});
