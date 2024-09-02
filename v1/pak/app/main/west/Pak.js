
/**
 * Created by fabrizio on 14/02/22.
 */
Ext.define('pak.main.west.Pak', {
  extend: 'Ext.form.Panel',
  alias: 'widget.pak-west-pak',
  bodyPadding: 15,
  requires: [
    'Ext.form.FieldSet',
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel'
  ],
  layout: 'fit',
  itemId: 'pak',
  title: Locale.t("pak.apptitle"),
  iconCls: "PAK-16",
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
          title: Locale.t("pak.grids.documenti.pak.fieldset"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("pak.grids.documenti.pak.a"),
              name: 'filer-tipo-doc',
              inputValue: 'A',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("pak.grids.documenti.pak.c"),
              name: 'filer-tipo-doc',
              inputValue: 'C',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("pak.grids.documenti.pak.x"),
              name: 'filer-tipo-doc',
              inputValue: 'X',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }
          ]
        },
        // {
        //   xtype: 'fieldset',
        //   flex: 1,
        //   title: Locale.t("pak.grids.documenti.column.descr_trasp"),
        //   layout: "vbox",
        //   defaults: { width: "100%", minWidth: 100 },
        //   items: [
        //     {
        //       xtype: "grid",
        //       scrollable: true,
        //       hideHeaders: true,
        //       flex: 1,
        //       viewConfig: {
        //         emptyText: Locale.t('global.grid.empty'),
        //         enableTextSelection: true,
        //       },
        //       selModel: {
        //         selType: "checkboxmodel",
        //         mode: "MULTI",
        //         checkOnly: true,
        //         showHeaderCheckbox: false,
        //         listeners: {
        //           select: 'onSelectFilterGrid',
        //           deselect: 'onSelectFilterGrid',
        //         },
        //       },
        //       columns: [
        //         {
        //           text: Locale.t("pak.grids.documenti.column.trasportatore"),
        //           dataIndex: "value",
        //           flex: 1,
        //         },
        //       ]
        //     },
        //   ]
        // }
      ]
    }
  ],
  listeners: {
    expand: 'onActivePanelWest'
  }
});