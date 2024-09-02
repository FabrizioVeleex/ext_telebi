/**
 * Created by fabrizio on 14/02/22.
 */
Ext.define('orf.main.west.Orf', {
  extend: 'Ext.form.Panel',
  alias: 'widget.orf-west-orf',
  bodyPadding: 15,
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel',
    'Ext.layout.container.Fit'
  ],
  layout: 'fit',
  itemId: 'orf',
  title: Locale.t('orf.grids.documenti.orf.title').toUpperCase(),
  iconCls: "ORF-16",
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
          title: Locale.t("orf.grids.documenti.orf.fieldset"),
          defaults: { labelAlign: "top", width: "100%", minWidth: 100 },
          items: [
            {
              xtype: 'checkbox',
              boxLabel: Locale.t("orf.grids.documenti.orf.notsent"),
              name: 'filer-tipo-doc',
              inputValue: 'C',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("orf.grids.documenti.orf.sent"),
              name: 'filer-tipo-doc',
              inputValue: 'P',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            }, {
              xtype: 'checkbox',
              boxLabel: Locale.t("orf.grids.documenti.orf.draft"),
              name: 'filer-tipo-doc',
              inputValue: 'R',
              listeners: {
                change: 'onChangeFilterTipo'
              }
            },
          ]
        },
      ]
    }

  ],
  listeners: {
    expand: 'onActivePanelWest'
  }
});