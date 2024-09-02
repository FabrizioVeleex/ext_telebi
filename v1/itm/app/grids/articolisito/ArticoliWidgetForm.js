Ext.define('itm.grids.articolisito.ArticoliWidgetForm', {
  extend: 'Ext.panel.Panel',
  xtype: 'itm-v1-grids-articoli-widgetform',
  flex: 1,
  itemId: 'widgetPanel',
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          itemId: 'saveBtn',
          ui: 'ocra',
          iconCls: 'fas fa-save',
          text: Locale.t('global.btn.save.text'),
          handler: 'onSaveRowWidget'
        },
        {
          ui: 'blue',
          iconCls: 'fas fa-copy',
          tooltip: 'Copia descrizione estesa',// Locale.t('global.btn.save.text'),
          handler: 'onCopyRowDescrizioneEstesa'
        },
        {
          ui: 'orange',
          iconCls: 'fas fa-paste',
          tooltip: 'Incolla descrizione estesa',// Locale.t('global.btn.save.text'),
          handler: 'onPasteRowDescrizioneEstesa'
        },
        {
          ui: 'blue',
          iconCls: 'fas fa-clipboard-list',
          itemId: 'btnCopyHtml',
          tooltip: 'Copia HTML per pubblicazione sito',// Locale.t('global.btn.save.text'),
          handler: 'onGetRowDescrizioneEstesa'
        },
        {
          xtype: 'container',
          itemId: 'copyHtmlOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Copia HTML avvenua con siccesso</span>'
        },
        {
          xtype: 'container',
          itemId: 'copyOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Attributi copiati</span>'
        },
        {
          xtype: 'container',
          itemId: 'pasteOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Attributi incollati</span>'
        },
        {
          xtype: 'container',
          itemId: 'copyDescrOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Descrizione copiata</span>'
        },
        {
          xtype: 'container',
          itemId: 'pasteDescrOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Descrizione incollata</span>'
        },
        {
          xtype: 'container',
          itemId: 'copyDescrEstOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Descrizione estesa copiata</span>'
        },
        {
          xtype: 'container',
          itemId: 'pasteDescrEstOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Descrizione estesa incollata</span>'
        },
        {
          xtype: 'container',
          itemId: 'saveOk',
          hidden: true,
          html: '<span style="color:green;text-decoration:italic;">Salvataggio avvenuto con successo</span>'
        },
        {
          xtype: 'container',
          itemId: 'errorOk',
          hidden: true,
          html: '<spanZ style="color:red;text-decoration:italic;">Errore durante il salvataggio, operazione annullata</spanZ'
        },
        {
          xtype: 'tbfill'
        },
        {
          ui: 'ocra',
          iconCls: 'fas fa-list',
          text: 'Lista attributi Padre',
          stato: 0,
          handler: 'ontoggleGrid'
        },
        {
          ui: 'blue',
          iconCls: 'fas fa-copy',
          text: 'Copia Attributi',// Locale.t('global.btn.save.text'),
          handler: 'onCopyRowAttributi'
        },
        {
          ui: 'orange',
          iconCls: 'fas fa-paste',
          text: 'Incolla Attributi',// Locale.t('global.btn.save.text'),
          handler: 'onPasteRowAttributi'
        }
      ]
    }
  ],
  items: [],
  listeners: {
    afterRender: 'onAfterRenderWidgetForm'
  }
})