
/**
 * Created by fabrizio on 14/02/22.
 */
Ext.define('bol.main.west.Bol', {
  extend: 'Ext.form.Panel',
  alias: 'widget.bol-west-bol',
  bodyPadding: 15,
  requires: [
    'Ext.form.FieldSet',
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel'
  ],
  layout: 'fit',
  itemId: 'bol',
  title: Locale.t("bol.apptitle"),
  iconCls: "BOL-16",
  items: [
    {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'fieldset',
          title: Locale.t("bol.grids.documenti.bol.fieldset"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("bol.grids.documenti.bol.v"),
              name: 'filer-tipo-doc',
              inputValue: 'V',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("bol.grids.documenti.bol.t"),
              name: 'filer-tipo-doc',
              inputValue: 'T',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("bol.grids.documenti.bol.o"),
              name: 'filer-tipo-doc',
              inputValue: 'O',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            },
          ]
        },
        {
          xtype: 'fieldset',
          flex: 1,
          title: Locale.t("bol.grids.documenti.column.descr_trasp"),
          layout: "vbox",
          defaults: { width: "100%", minWidth: 100 },
          items: [
            {
              xtype: "grid",
              scrollable: true,
              hideHeaders: true,
              flex: 1,
              viewConfig: {
                emptyText: Locale.t('global.grid.empty'),
                enableTextSelection: true,
              },
              selModel: {
                selType: "checkboxmodel",
                mode: "MULTI",
                checkOnly: true,
                showHeaderCheckbox: false,
                listeners: {
                  select: 'onSelectFilterGrid',
                  deselect: 'onSelectFilterGrid',
                },
              },
              columns: [
                {
                  text: Locale.t("bol.grids.documenti.column.trasportatore"),
                  dataIndex: "value",
                  flex: 1,
                },
              ]
            },
          ]
        }
      ]
    }
  ],
  listeners: {
    expand: 'onActivePanelWest'
  }
});