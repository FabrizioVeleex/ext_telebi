/**
 * Created by fabrizio on 03/01/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.filtri.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.form.FieldSet',
    'Ext.form.field.Checkbox',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.form.field.Number',
    'Ext.form.field.Text',
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox',
    'Ext.panel.Panel',
    'skd.view.forms.top.grids.CdlCdl',
    'skd.view.forms.top.grids.Component',
    'skd.view.forms.top.grids.RepartoCdl',
    'Ext.ux.DateTimeField',
    'Ext.ux.DateTimePicker'
  ],
  collapsible: false,
  layout: {
    type: 'hbox'
  },
  bind: {
    hidden: '{!filtripick.active}'
  },
  scrollable: 'x',
  defaults: {
    userCls: 'goma-filtri-grid'
  },
  style: {
    'border-top': '1px solid black'
  },
  // frame: true,
  items: [
    {
      xtype: 'panel',
      userCls: 'goma-filtri',
      layout: {
        type: 'vbox'
      },
      margin: 0,
      items: [
        {
          xtype: 'fieldset',
          width: 270,
          margin: 0,
          layout: {
            type: 'vbox'
          },
          title: '-',//Locale.t('skd.forms.pick.filtri.date.title'),
          userCls: 'goma-filtri',
          defaults: {
            xtype: 'numberfield'
          },
          items: [
            {
              fieldLabel: Locale.t('skd.forms.pick.filtri.lead_time'),
              name: 'lead_time',
              labelWidth: 80,
              width: 240,
              padding: 0,
              bind: {
                value: '{filtripick.lead_time}'
              }
            },
            {
              xtype: 'combobox',
              fieldLabel: Locale.t('skd.forms.pick.filtri.lead_time_code'),
              queryMode: 'locale',
              labelWidth: 80,
              width: 240,
              minChars: 2,
              name: 'lead_time_code',
              bind: {
                store: '{storeComboTipoLd}',
                value: '{filtripick.lead_time_code}'
              },
              displayField: 'tipo',
              valueField: 'id',
              typeAhead: true,
              matchFieldWidth: false,
              forceSelection: true,
              emptyText: Locale.t('skd.forms.pick.filtri.seleziona')
            }
          ]
        },
        {
          xtype: 'fieldset',
          margin: 0,
          layout: {
            type: 'vbox'
          },
          title: Locale.t('skd.forms.pick.filtri.producibilita.title'),
          userCls: 'goma-filtri',
          width: 270,
          height: 65,
          defaults: {
            labelWidth: 30,
            xtype: 'datefield',
            startDay: 1,
            width: 260
          },
          items: [

            {
              xtype: 'combobox',
              queryMode: 'locale',
              width: 260,
              minChars: 2,
              bind: {
                value: '{filtripick.producibilita}',
                store: '{storeComboGiacenza}'
              },
              displayField: 'giacenza',
              valueField: 'id',
              typeAhead: true,
              matchFieldWidth: false,
              forceSelection: true,
              emptyText: Locale.t('skd.forms.pick.filtri.seleziona'),
              listeners: {
                select: 'onChangeComboProducibilita'
              }
            }
          ]
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.forms.pick.filtri.component.title'),
      layout: {
        type: 'hbox'
      },
      userCls: 'goma-filtri-grid',
      defaults: {
        width: 220
      },
      items: [
        {
          xtype: 'panel',
          userCls: 'goma-panel-field-transparent',
          layout: {
            type: 'vbox'
          },
          items: [
            {
              xtype: 'combobox',
              queryMode: 'remote',
              width: 220,
              minChars: 2,
              userCls: 'goma-panel-field-transparent',
              bind: {
                store: '{storeComboComp}'
              },
              displayField: 'part_no',
              valueField: 'part_no',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('skd.top.filtri.seleziona'),
              listConfig: {
                emptyText: Locale.t('skd.forms.pick.filtri.component.emptyText')
              },
              listeners: {
                select: 'onSelectFilterComp'
              }
            },
            {
              width: 220,
              xtype: 'textfield',
              fieldLabel: Locale.t('skd.forms.pick.filtri.component.like'),
              labelWidth: 60,
              userCls: 'goma-panel-field-transparent',
              bind: {
                value: '{filtripick.comp}'
              },
              emptyText: Locale.t('skd.forms.pick.filtri.component.digitare'),
              name: 'compfree'
            },
            {
              xtype: 'checkboxfield',
              width: 140,
              fieldLabel: Locale.t('skd.forms.pick.filtri.component.mancanti'),
              name: 'mancanti',
              bind: {
                value: '{filtripick.mancanti}'
              },
              inputValue: 'OK'
            }
          ]
        },
        {
          xtype: 'component',
          width: 10
        },
        {
          xtype: 'grid-filter-component',
          height: 145,
          bind: {
            store: '{storeGridDettComp}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.forms.pick.filtri.partodp.title'),
      layout: {
        type: 'hbox'
      },
      userCls: 'goma-filtri-grid',
      defaults: {
        width: 220
      },
      items: [
        {
          xtype: 'panel',
          userCls: 'goma-panel-field-transparent',
          layout: {
            type: 'vbox'
          },
          items: [
            {
              xtype: 'combobox',
              queryMode: 'remote',
              width: 220,
              minChars: 2,
              userCls: 'goma-panel-field-transparent',
              bind: {
                store: '{storeComboPartOdp}'
              },
              displayField: 'part_no',
              valueField: 'part_no',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('skd.top.filtri.seleziona'),
              listConfig: {
                emptyText: Locale.t('skd.forms.pick.filtri.component.emptyText')
              },
              listeners: {
                select: 'onSelectFilterPartOdp'
              }
            },
            {
              width: 220,
              xtype: 'textfield',
              fieldLabel: Locale.t('skd.forms.pick.filtri.component.like'),
              labelWidth: 60,
              userCls: 'goma-panel-field-transparent',
              bind: {
                value: '{filtripick.partOdp}'
              },
              emptyText: Locale.t('skd.forms.pick.filtri.component.digitare'),
              name: 'partodpfree'
            }
          ]
        },
        {
          xtype: 'component',
          width: 10
        },
        {
          xtype: 'grid-filter-component',
          height: 145,
          bind: {
            store: '{storeGridDettPartOdp}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.forms.pick.filtri.cdl.title'),
      layout: {
        type: 'vbox'
      },
      defaults: {
        width: 130
      },
      items: [
        {
          xtype: 'combobox',
          queryMode: 'remote',
          labelWidth: 50,
          flex: 1,
          minChars: 2,
          bind: {
            store: '{storeComboCdl}'
          },
          displayField: 'rep_cdl_wc_des',
          valueField: 'ope_work_center_no',
          typeAhead: true,
          value: '',
          forceSelection: true,
          matchFieldWidth: false,
          emptyText: Locale.t('skd.forms.pick.filtri.seleziona'),
          listConfig: {
            emptyText: Locale.t('skd.forms.pick.filtri.cdl.emptyText'),
            getInnerTpl: function (a, b) {
              return '<div class="item">' +
                '<b>{ope_work_center_no}</b> - {rep_cdl_wc_des}' +
                ' </div>';
            }
          },
          listeners: {
            select: 'onSelectFilterCdl'
          }
        },
        {
          xtype: 'grid-filter-cdl-cdl',
          height: 103,
          bind: {
            store: '{storeGridDettCdl}'
          }
        }

      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.reparto.title'),
      layout: {
        type: 'vbox'
      },
      defaults: {
        width: 130
      },
      items: [
        {
          xtype: 'combobox',
          queryMode: 'remote',
          labelWidth: 50,
          flex: 1,
          minChars: 2,
          bind: {
            store: '{storeComboReparto}'
          },
          displayField: 'rep_cdl_dept_des',
          valueField: 'rep_cdl_department_no',
          typeAhead: true,
          value: '',
          forceSelection: true,
          matchFieldWidth: false,
          emptyText: Locale.t('skd.top.filtri.seleziona'),
          listConfig: {
            emptyText: Locale.t('skd.top.filtri.grids.reparto.emptyText'),
            getInnerTpl: function (a, b) {
              return '<div class="item">' +
                '<b>{rep_cdl_department_no}</b> - {rep_cdl_dept_des}' +
                ' </div>';
            }
          },
          listeners: {
            select: 'onSelectFilterPickReparto'
          }
        },
        {
          xtype: 'grid-filter-reparto-cdl',
          height: 103,
          bind: {
            store: '{storeGridPickReparto}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      height: 173,
      itemId: 'dateChange',
      title: Locale.t('skd.forms.pick.dettaglio.title_filter_date'),
      padding: '0,5',
      margin: 0,
      layout: {
        type: 'vbox'
      },
      items: [
      ]
    },
    //TODO correggere padding
    {
      xtype: 'fieldset',
      height: 173,
      title: Locale.t('skd.forms.pick.dettaglio.fields.in_prod'),
      padding: '0,5',
      layout: {
        type: 'vbox'
      },
      items: [
        {
          xtype: 'checkboxfield',
          width: 130,
          boxLabel: Locale.t('skd.forms.pick.dettaglio.fields.in_prod'),
          name: 'in_produzione',
          itemId: 'in_produzione',
          bind: {
            disabled: '{disableDate.inizio_produzione}',
            value: '{record.in_produzione}'
          },
          listeners: {
            change: 'onCheckChange'
          },
          inputValue: '1'
        }
      ]
    },
  ]
});
