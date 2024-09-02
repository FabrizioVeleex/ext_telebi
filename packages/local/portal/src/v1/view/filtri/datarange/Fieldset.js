/**
 * Created by fabrizio on 31/12/23.
 */
Ext.define('portal.v1.view.filtri.datarange.Fieldset', {
  extend: 'Ext.form.FieldSet',
  requires: [],
  layout: {
    type: 'hbox'
  },
  title: Locale.t('spl.grids.documenti.column.data_doc'),
  userCls: "y-filtri-panel-default y-filtri-panel-date",
  defaults: {
    width: 180,
  },
  items: [
    {
      xtype: 'panel',
      userCls: 'y-filtri-panel-field-transparent',
      layout: {
        type: 'vbox'
      },
      items: [
        {
          width: 180,
          labelAlign: "top",
          xtype: 'datefield',
          fieldLabel: Locale.t('spl.filtri.start'),
          // formatDate: "c",
          labelCls: "y-filtri-panel-field-label-date",
          userCls: 'y-filtri-panel-field-transparent',
          bind: {
            value: '{filtri.params.data_doc.start}'
          },

        },
        {
          width: 180,
          xtype: 'datefield',
          labelAlign: "top",
          fieldLabel: Locale.t('spl.filtri.end'),
          labelCls: "y-filtri-panel-field-label-date",
          userCls: 'y-filtri-panel-field-transparent',
          bind: {
            value: '{filtri.params.data_doc.end}'
          },
        }
      ]
    }
  ],
  listeners: {

  }
});