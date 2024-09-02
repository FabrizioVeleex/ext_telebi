/**
 * Created by fabrizio on 12/03/2023.
 */
Ext.define('itm.forms.distinta.cards.PanelArticolo', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.TextField',
    'Ext.form.field.ComboBox',
    'Ext.form.field.HtmlEditor',
    'Ext.form.field.Number',
    'Ext.form.field.TextArea',
    'Ext.layout.container.HBox'
  ],
  scrollable: 'y',
  items: [
    {
      xtype: 'container', bodyStyle: 'background-color:trasparent',
      items: [
        {
          xtype: "container",
          cls: 'y-pubblica_sito',
          html: 'Articolo pubblicato',
          align: 'center',
          hidden: true,
          bind: {
            hidden: '{!record.pubblica_sito}'
          }
        }
      ]
    },
    {
      xtype: 'container', bodyStyle: 'background-color:trasparent',
      layout: {
        type: 'hbox', align: 'stretch'
      },
      items: [

        {
          xtype: 'container', flex: 1,
          items: [
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_art'),
                  flex: 1, readOnly: true, minWidth: 150,
                  bind: { value: '{record.cd_art}' }
                },
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_padre'),
                  flex: 1, readOnly: true, minWidth: 150,
                  bind: { value: '{record.cd_padre}' }
                },
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_barcode'),
                  flex: 1, readOnly: true, minWidth: 150,
                  bind: { value: '{record.cd_barcode}' }
                }
              ]
            },
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.descr_marca'),
                  flex: 1, readOnly: true, minWidth: 150,
                  bind: { value: '{record.descr_marca}' }
                },
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_marca'),
                  flex: 1, readOnly: true, minWidth: 70,
                  bind: { value: '{record.cd_marca}' }
                },
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.descr_for'),
                  flex: 1, readOnly: true, minWidth: 150,
                  bind: { value: '{record.descr_for}' }
                },
              ]
            },
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'textfield',
                  enableKeyEvents: true,
                  fieldLabel: Locale.t('itm.forms.distinta.fields.descrizione'),
                  flex: 1, readOnly: true,
                  maxLength: 72,
                  bind: {
                    value: '{record.descrizione}',
                    readOnly: '{readOnly}'
                  },
                  listeners: {
                    keyup: 'onKeyupField',
                  }
                }
              ]
            },
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'combobox', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_clm'),
                  flex: 1, forceSelection: true, readOnly: true,
                  bind: {
                    store: '{storeClassi}',
                    value: '{record.cd_clm}',
                    // readOnly: '{readOnly}'
                  },
                  valueField: 'cd_clm', displayField: 'descr_clm', queryMode: 'local'
                },
                {
                  xtype: 'combobox', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_fam'),
                  flex: 1, forceSelection: true, readOnly: true,
                  bind: {
                    store: '{storeFamiglie}',
                    value: '{record.cd_fam}',
                    // readOnly: '{readOnly}'
                  },
                  valueField: 'cd_fam', displayField: 'descr_fam', queryMode: 'local'
                },
              ]
            },
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'combobox', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_gruppo'),
                  flex: 1, forceSelection: true, readOnly: true,
                  bind: {
                    store: '{storeGruppi}',
                    value: '{record.cd_gruppo}',
                    // readOnly: '{readOnly}'
                  },
                  valueField: 'cd_gruppo', displayField: 'descr_gruppo', queryMode: 'local'
                },
                {
                  xtype: 'combobox', fieldLabel: Locale.t('itm.forms.distinta.fields.cd_sottogruppo'),
                  flex: 1, forceSelection: true, readOnly: true,
                  bind: {
                    store: '{storeSottogruppi}',
                    value: '{record.cd_sottogruppo}',
                    // readOnly: '{readOnly}'
                  },
                  valueField: 'cd_sottogruppo', displayField: 'descr_sottogruppo', queryMode: 'local'
                }
              ]
            },
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'numberfield', fieldLabel: Locale.t('itm.forms.distinta.fields.lotto_miltiplo_riordino'),
                  flex: 1, readOnly: true, minWidth: 80,
                  bind: { value: '{record.lotto_miltiplo_riordino}' }
                },
                {
                  xtype: 'numberfield', fieldLabel: Locale.t('itm.forms.distinta.fields.liv_min'),
                  flex: 1, readOnly: true, minWidth: 80,
                  bind: { value: '{record.liv_min}' }
                },
              ]
            },
            {
              xtype: 'container', flex: 1,
              layout: {
                type: 'hbox'
              },
              defaults: {
                msgTarget: 'side', margin: 5
              },
              items: [
                {
                  xtype: 'numberfield', fieldLabel: Locale.t('itm.forms.distinta.fields.peso'),
                  flex: 1, readOnly: true, minWidth: 80,
                  bind: { value: '{record.peso}' }
                },
                {
                  xtype: 'textfield', fieldLabel: Locale.t('itm.forms.distinta.fields.um'),
                  flex: 1, readOnly: true, minWidth: 80,
                  bind: { value: '{record.um}' }
                },
              ]
            }
          ]
        },
        {
          xtype: 'image',
          itemId: 'imgUser',
          width: 300,
          margin: 10,
          height: 300,
          alt: 'Default image',
          src: ''
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'htmleditor', flex: 1, fieldLabel: Locale.t('itm.forms.distinta.fields.descrizione_estesa'),
          autoScroll: true, style: 'font-size:14px;', itemId: 'deschtml',
          bind: { readOnly: '{readOnly}', value: '{record.descrizione_estesa}' }
        }
      ]
    },
    {
      xtype: 'container', itemId: 'gridLegami',
    }
  ]
});