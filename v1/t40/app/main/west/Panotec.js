/**
 * Created by fabrizio on 14/02/22.
 */
Ext.define('t40.main.west.Panotec', {
  extend: 'Ext.form.Panel',
  alias: 'widget.t40-west-panotec',
  bodyPadding: 15,
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel',
    'Ext.layout.container.Fit'
  ],
  layout: 'fit',
  itemId: 'panotec',
  title: Locale.t("t40.grids.documenti.panotec.title").toUpperCase(),
  iconCls: "FAT-16",
  items: [
    {
      xtype: 'container',
      layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'fieldset',
          title: Locale.t("t40.grids.documenti.panotec.fieldset.stato"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("t40.grids.documenti.panotec.aperto"),
              name: 'filter-status-aperto',
              inputValue: 'statusAperto',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("t40.grids.documenti.panotec.chiuso"),
              name: 'filter-status-chiuso',
              inputValue: 'statusChiuso',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            },
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("t40.grids.documenti.panotec.attesainvio"),
              name: 'filter-status-attesainvio',
              inputValue: 'statusAttesaInvio',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }
          ]
        },
        // {
        //   xtype: 'fieldset',
        //   flex: 1,
        //   layout: "vbox",
        //   title: "_Agente",
        //   defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
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
        //           text: Locale.t("t40.grids.documenti.column.agentefatt"),
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