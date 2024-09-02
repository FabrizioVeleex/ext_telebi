/**
 * Created by fabrizio on 03/01/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.form.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.field.Date',
    'Ext.form.field.Number',
    'Ext.form.field.Text',
    'Ext.form.field.TextArea',
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox'
  ],
  width: 350,
  disabled: true,
  bodyPadding: 5,
  scrollable: 'y',
  bind: {
    title: '{panelTitle}',
    disabled: '{disableForm}'
  },
  style: {
    'border-top': '1px solid black',
    'border-left': '1px solid black'
  },
  items: [
    {
      xtype: 'container',
      layout: { type: 'vbox', align: 'stretch' },
      padding: 0,
      defaults: {
        labelAlign: 'left',
        xtype: 'textfield',
        labelWidth: 130,
        editable: false,
        userCls: 'goma-date-filter',
        padding: 0
      },
      items: [
        {
          // fieldLabel: Locale.t('skd.forms.pick.columns.description_comp'),
          labelAlign: 'top',
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.description_comp}'
          },
          flex: 1
        }, {
          // fieldLabel: Locale.t('skd.forms.pick.columns.origine'),
          labelAlign: 'top',
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.origine}'
          },
          flex: 1
        },
        {
          xtype: 'container',
          layout: { type: 'hbox', align: 'stretch' },
          padding: 0,
          defaults: {
            labelAlign: 'left',
            xtype: 'textfield',
            labelWidth: 60,
            editable: false,
            userCls: 'goma-date-filter',
            style: {
              'padding-left': '0'
            }
          },
          items: [
            {
              xtype: 'textfield',
              flex: 1,
              fieldCls: 'text-right',
              fieldLabel: Locale.t('skd.forms.pick.columns.onhand'),
              bind: {
                readOnly: '{readOnly}',
                value: '{recordForm.onhand}'
              }
            },
            {
              xtype: 'textfield',
              flex: 1,
              fieldCls: 'text-right',
              labelWidth: 50,
              fieldLabel: Locale.t('skd.forms.pick.columns.disponibile'),
              bind: {
                readOnly: '{readOnly}',
                value: '{recordForm.disponibile}'
              }
            }
          ]
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('skd.forms.pick.columns.rif_ult_ric'),
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.rif_ult_ric}'
          }
        },

        {
          xtype: 'datefield',
          name: 'data_check_giac',
          editable: true,
          startDay: 1,
          fieldLabel: Locale.t('skd.forms.pick.columns.ultima_check_giac'),
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.max_data_check_giac}'
          },
          listeners: {
            change: 'onChangeDettaglioDate'
          }
        },
        {
          xtype: 'numberfield',
          decimalPrecision: 2,
          anchor: '100%',
          editable: true,
          width: 200,
          minValue: 0,
          name: 'qta_preparata',
          msgTarget: 'side',
          disabled: true,
          bind: {
            fieldLabel: 'Qta prep {fielLabelqta_preparata}',
            userCls: '{alertMaxValue}',
            disabled: '{disableUpdate}',
            maxValue: '{maxValue}',
            readOnly: '{readOnly}',
            value: '{recordForm.qta_preparata}'
          },
          listeners: {
            change: 'onChangeDettaglio'
          },
          triggers: {
            foo: {
              cls: 'x-fas fa-arrow-circle-up cell_prep_positiva',
              handler: 'onClickActionQtyUp'
            },
            foo1: {
              cls: 'x-fas fa-arrow-circle-down cell_prep_negativa',
              handler: 'onClickActionQtyDown'
            }
          }
        },
        {
          fieldLabel: Locale.t('skd.forms.pick.columns.loc_min'),
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.loc_min}'
          }
        },
        {
          msgTarget: 'under',
          labelAlign: 'top',
          margin: 2,
          // readOnly:true,
          editable: true,
          xtype: 'textareafield',
          grow: true,
          growMin: 31,
          growAppend: 'W',
          preventScrollbars: true,
          name: 'nota',
          fieldLabel: Locale.t('skd.forms.pick.columns.nota'),
          anchor: '100%',
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.nota}'
          },
          listeners: {
            change: 'onChangeDettaglio'
          }
        },
        {
          msgTarget: 'under',
          labelAlign: 'top',
          margin: 2,
          readOnly: true,
          xtype: 'textareafield',
          grow: true,
          growMin: 31,
          growAppend: 'W',
          preventScrollbars: true,
          fieldLabel: Locale.t('skd.forms.pick.columns.nota_ifs'),
          anchor: '100%',
          bind: {
            readOnly: '{readOnly}',
            value: '{recordForm.notaifs}'
          }
        }
      ]
    }
  ]
});
