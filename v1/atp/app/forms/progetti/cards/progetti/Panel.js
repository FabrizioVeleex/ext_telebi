/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.cards.progetti.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.form.field.Date',
    'Ext.layout.container.HBox',
    "Ext.grid.column.Date",
    "atp.app.forms.progetti.components.grisAssociazioneRuoli.Grid"
  ],
  scrollable: 'y',
  bodyPadding: 15,
  items: [
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t("atp.forms.projects.cards.projects.fields.title"),
          minWidth: 500,
          flex: 1,
          minLength: 1,
          readOnly: "{readOnly}",
          bind: {
            value: '{record.title}',
            readOnly: "{readOnly}"
          }
        },
      ]
    },
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'textareafield',
          fieldLabel: Locale.t("atp.forms.projects.cards.projects.fields.description"),
          minWidth: 700,
          bodyPadding: 10,
          anchor: "100%",
          minLength: 1,
          readOnly: "{readOnly}",
          bind: {
            value: '{record.description}',
            readOnly: "{readOnly}"
          }
        },
      ]
    },
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t("atp.forms.projects.cards.projects.fields.activitytype"),
          minWidth: 700,
          minLength: 1,
          readOnly: "{readOnly}",
          bind: {
            value: '{record.activityType}',
            readOnly: "{readOnly}"
          }
        }
      ]
    },
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'numberfield',
          fieldLabel: Locale.t("atp.forms.projects.cards.projects.fields.priority"),
          minWidth: 700,
          minValue: 0,
          maxValue: 10,
          readOnly: "{readOnly}",
          bind: {
            value: '{record.priority}',
            readOnly: "{readOnly}"
          }
        }
      ]
    },
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'datefield',
          format: 'd/m/Y', submitFormat: 'Y-m-d',
          fieldLabel: Locale.t("atp.forms.projects.cards.projects.fields.expiredate"),
          minWidth: 700,
          bind: {
            value: '{record.expireDate}',
            readOnly: "{readOnly}"
          },
          minValue: new Date()
        }
      ]
    },
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'v1-atp-forms-projects-components-gridConnectedUsers',
          flex: 1,
        }
      ]
    },
  ]
});