/**
 * Created by fabrizio on 14/02/22.
 */
Ext.define('fat.main.west.Fat', {
  extend: 'Ext.form.Panel',
  alias: 'widget.fat-west-fat',
  bodyPadding: 15,
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel',
    'Ext.layout.container.Fit'
  ],
  layout: 'fit',
  itemId: 'fat',
  title: "FATTURE",
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
          title: Locale.t("fat.grids.documenti.fat.fieldset"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("fat.grids.documenti.fat.f"),
              name: 'filer-tipo-doc',
              inputValue: 'F',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("fat.grids.documenti.fat.n"),
              name: 'filer-tipo-doc',
              inputValue: 'N',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("fat.grids.documenti.fat.s"),
              name: 'filer-tipo-doc',
              inputValue: 'S',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            },
          ]
        },
        {
          xtype: 'fieldset',
          title: Locale.t("fat.grids.documenti.fat.nazione"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("fat.grids.documenti.fat.italia"),
              name: 'filer-tipo-doc',
              inputValue: 'IT',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("fat.grids.documenti.fat.estero"),
              name: 'filer-tipo-doc',
              inputValue: 'OTHER',
              listeners: {
                change: 'onChangeFilterTipo'
              }
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