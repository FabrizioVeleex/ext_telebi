/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("ord.forms.documento.cards.Dashboard", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "ord.forms.documento.component.formDocumento.PanelDocumento"
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side" },
      items: [{ xtype: "box", flex: 1, bind: { html: "{record.log}" } }],
    },
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side" },
      hidden: true,
      bind: {
        hidden: '{noIdSoggetto}'
      },
      items: [
        { xtype: 'v1-ord-form-documento-radiotiposoggetto' },
        { xtype: 'v1-ord-form-documento-combosoggetto' },
      ],
    },
    {
      xtype: "container",
      cls: "app-container",
      style: { "text-align": "center" },
      items: [
        {
          xtype: "box",
          flex: 1,
          bind: {
            html: "{htmlDoc}",
          },
        },
        {
          xtype: "box",
          flex: 1,
          bind: {
            html: "{htmlSogg}",
          },
        },
      ],
    },
    {
      xtype: "panel",
      layout: { type: "hbox" },
      defaults: { margin: 5, msgTarget: "side" },
      items: [
        {
          fieldLabel: Locale.t("ord.forms.documento.fields.seznote"),
          labelAlign: "top",
          xtype: "textarea",
          scrollable: true,
          overflow: "auto",
          flex: 1,
          padding: "0 0 10 0",
          bind: { value: "{record.note}", readOnly: "{readOnly}" },
        },
      ],
    },
    {
      xtype: 'fieldset',
      cls: "app-container",
      style: { "background-color": "red" },
      bind: {
        hidden: "{record.spool}"
      },
      items: [
        {
          xtype: "box",
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          html: Locale.t('ord.forms.documento.notprintedyet'),
        },
      ]
    },

    {
      xtype: 'fieldset',
      cls: "app-container",
      style: { "background-color": "#008000bf" },
      items: [
        {
          xtype: "box",
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          bind: {
            html: Locale.t('ord.forms.documento.details'),
          },
        },
        {
          xtype: 'fieldset',
          cls: "app-container",
          bind: {
            hidden: "{!record.imported}"
          },
          items: [
            {
              xtype: 'container', flex: 1,
              layout: { type: "hbox" },
              defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
              items: [
                {
                  xtype: 'fieldset', flex: 1,
                  // layout: { type: "vbox" },
                  title: Locale.t('ord.forms.documento.cards.dashboard.fatturazione'),
                  // defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
                  items: [
                    {
                      xtype: 'displayfield',
                      width: 150,
                      bind: { value: '{record.destinatario.ragsoc}' }
                    },
                    {
                      xtype: 'displayfield',
                      width: 150,
                      bind: { value: '{record.destinatario.indirizzo}' }
                    },
                    {
                      xtype: 'displayfield',
                      width: 150,
                      bind: { value: '{record.destinatario.cap} {record.destinatario.comune} {record.destinatario.provincia}' }
                    },
                  ]
                },
                {
                  xtype: 'fieldset', flex: 1,
                  title: Locale.t('ord.forms.documento.cards.dashboard.spedizione'),
                  // layout: { type: "hbox" },
                  // defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
                  items: [
                    {
                      xtype: 'displayfield',
                      width: 150,
                      bind: { value: '{record.spedizione.ragsoc}' }
                    },
                    {
                      xtype: 'displayfield',
                      width: 150,
                      bind: { value: '{record.spedizione.indirizzo}' }
                    },
                    {
                      xtype: 'displayfield',
                      width: 150,
                      bind: { value: '{record.spedizione.cap} {record.spedizione.comune} {record.spedizione.provincia}' }
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          xtype: 'v1-ord-forms-documento-paneldocumento',
          bind: {
            hidden: "{!record.imported}"
          },
        },
        {
          xtype: "box",
          bind: {
            hidden: "{record.imported}"
          },
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          html: Locale.t('ord.forms.documento.waitingdata'),
        },
      ]
    },
  ],

});
