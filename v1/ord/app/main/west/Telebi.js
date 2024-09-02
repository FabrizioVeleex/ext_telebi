/**
 * Created by fabrizio on 14/02/22.
 */
Ext.define('ord.main.west.Telebi', {
  extend: 'Ext.form.Panel',
  bodyPadding: 15,
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.RadioGroup',
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel',
    'Ext.layout.container.Fit',
    'Ext.layout.container.VBox'
  ],
  layout: 'fit',
  itemId: 'ord',
  title: Locale.t('ord.grids.documenti.ord.title').toUpperCase(),
  iconCls: "ORD-16",
  items: [
    {xtype: 'container',
      layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'fieldset',hidden:true,
          title: Locale.t("ord.grids.documenti.ord.fieldset"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("ord.grids.documenti.ord.c"),
              name: 'filer-tipo-doc',
              inputValue: 'C',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("ord.grids.documenti.ord.p"),
              name: 'filer-tipo-doc',
              inputValue: 'P',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("ord.grids.documenti.ord.r"),
              name: 'filer-tipo-doc',
              inputValue: 'R',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }
          ]
        },
        {xtype: 'fieldset', title: Locale.t('ord.grids.documenti.stato.title'),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {xtype: 'radiogroup', simpleValue: true, columns: 1,
              items: [
                { boxLabel: Locale.t('ord.grids.documenti.stato.aperti'), inputValue: 'ongoing', checked: true },
                { boxLabel: Locale.t('ord.grids.documenti.stato.chiusi'), inputValue: 'closed', checked: false },
                { boxLabel: Locale.t('ord.grids.documenti.stato.bloccati'), inputValue: 'locked', checked: false },
                { boxLabel: Locale.t('ord.grids.documenti.stato.tutti'), inputValue: '', checked: false }
              ],
              listeners: {
                change: 'onChangeFilterStatus'
              }
            }
          ]
        },
        {xtype: 'fieldset',hidden:true, flex: 1, layout: "vbox",
          title: Locale.t("ord.grids.documenti.ord.agente"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {xtype: "grid", scrollable: true, hideHeaders: true, flex: 1,
              viewConfig: {
                emptyText: Locale.t('global.grid.empty'),
                enableTextSelection: true
              },
              selModel: {
                selType: "checkboxmodel", mode: "MULTI", checkOnly: true, showHeaderCheckbox: false,
                listeners: {
                  select: 'onSelectFilterGrid',
                  deselect: 'onSelectFilterGrid'
                }
              },
              columns: [
                {text: Locale.t("ord.grids.documenti.column.agentefatt"), dataIndex: "value", flex: 1
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  listeners: {
    expand: 'onActivePanelWest'
  }
});