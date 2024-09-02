/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.InProd', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.layout.container.HBox',

  ],
  scrollable: 'y',
  margin: 15,
  items: [
    // {
    //   xtype: 'fieldset', collapsible: false, collapsed: false,
    //   title: '<span style="color: black;font-weight:bold">' + Locale.t('prd.forms.articolo.cards.dettaglio.fs_dettaglio') + '</span>',
    //   style: { 'background-color': "transparent;" },
    //   items: [
    //     {
    //       xtype: 'container', flex: 1,
    //       layout: { type: "hbox" },
    //       defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
    //       items: [
    //         {
    //           xtype: 'textfield',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.cd_art'),
    //           width: 200,
    //           bind: {
    //             readOnly: '{readOnly}',
    //             value: '{record.cd_art}'
    //           }
    //         },
    //         {
    //           xtype: 'textfield',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.descr_art'),
    //           flex: 1,
    //           minWidth: 400,
    //           bind: {
    //             value: '{record.descr_art}'
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       xtype: 'container', flex: 1,
    //       layout: { type: "hbox" },
    //       defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
    //       items: [
    //         {
    //           xtype: 'v1-prd-form-articolo-combofornitore',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.cd_for'),
    //           width: 200,
    //           bind: {
    //             readOnly: '{readOnly}',
    //             value: '{record.id_for}'
    //           },
    //           listeners: {
    //             dirtychange: "onDirtyComboFor",
    //             select: 'onSelectComboFor',
    //           }
    //         },
    //         {
    //           xtype: 'displayfield',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.descr_for'),
    //           flex: 1,
    //           minWidth: 400,
    //           bind: {
    //             value: '{descr_for}'
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       xtype: 'container', flex: 1,
    //       layout: { type: "hbox" },
    //       defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
    //       items: [
    //         {
    //           xtype: 'v1-prd-form-articolo-comboum',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.cd_um'),
    //           width: 200,
    //           bind: {
    //             readOnly: '{readOnly}',
    //             value: '{record.id_um}'
    //           },
    //           listeners: {
    //           }
    //         },
    //         {
    //           xtype: 'numberfield',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.lead_time'),
    //           minWidth: 200,
    //           minValue: 0,
    //           maxValue: 999,
    //           bind: {
    //             value: '{record.lead_time}'
    //           }
    //         },
    //         {
    //           xtype: 'checkboxfield',
    //           minWidth: 300,
    //           boxLabel: Locale.t("prd.forms.articolo.fields.disattivato"),
    //           fieldLabel: Locale.t("prd.forms.articolo.fields.disattivato"),
    //           bind: {
    //             value: "{record.disattivato}",
    //           },
    //         },
    //       ]
    //     },
    //     {
    //       xtype: 'container', flex: 1,
    //       layout: { type: "hbox" },
    //       defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
    //       items: [
    //         {
    //           xtype: 'v1-prd-form-articolo-combocategoria',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.cd_cat'),
    //           width: 200,
    //           bind: {
    //             readOnly: '{readOnly}',
    //             value: '{record.id_cat}'
    //           },
    //           listeners: {
    //             select: 'onSelectComboCat',
    //             dirtychange: 'onDirtyComboCat',
    //           }
    //         },
    //         {
    //           xtype: 'displayfield',
    //           fieldLabel: Locale.t('prd.forms.articolo.fields.descr_cat'),
    //           flex: 1,
    //           minWidth: 400,
    //           bind: {
    //             value: '{descr_cat}'
    //           }
    //         }
    //       ]
    //     },

    //   ]
    // },
    // {
    //   xtype: 'fieldset', collapsible: false, collapsed: false,
    //   title: '<span style="color: black;font-weight:bold">' + Locale.t('prd.forms.articolo.cards.dettaglio.fs_listino') + '</span>',
    //   style: { 'background-color': "transparent;" },
    //   items: [

    //   ]
    // }

  ]
});