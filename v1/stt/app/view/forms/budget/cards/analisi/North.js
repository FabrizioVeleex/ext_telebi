/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.budget.cards.analisi.North', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.form.Checkbox',
    'Ext.form.FieldSet',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox',
    'Ext.container.Container',
    'Ext.form.FieldContainer',
    'Ext.form.field.Radio',
    'stt.view.forms.budget.components.gridClMerFilter.Store'
  ],
  region: "north",
  collapsible: false,
  collapsed: false,

  frame: true,
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      bind: {
        hidden: '{hidecard.filtri}'
      },
      items: [
        '->',
        {
          text: Locale.t('global.btn.annulla'),
          ui: 'orange',
          iconCls: 'fas fa-filter redIcon',
          handler: 'onAnnullaFiltro'
        },
        {
          text: Locale.t('stt.forms.budget.analisi.filtri.filtra.text'),
          tooltip: Locale.t('stt.forms.budget.analisi.filtri.filtra.tooltip'),
          iconCls: 'fas fa-filter',
          ui: 'green',
          handler: 'onAvviaFiltro'
        },
        {
          xtype: 'tbseparator'
        },
        {
          iconCls: 'fas fa-chevron-up',
          ui: 'blue',
          text: Locale.t('stt.forms.budget.analisi.filtri.nascondi.text'),
          tooltip: Locale.t('stt.forms.budget.analisi.filtri.nascondi.tooltip'),
          handler: 'toggleFiltri',
        },
        {
          iconCls: 'fas fa-file-excel redIcon',
          ui: 'orange',
          tooltip: Locale.t('stt.forms.budget.analisi.filtri.excel.tooltip'),
          handler: 'onGenExcel',
        },
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'bottom',
      hidden: true,
      bind: {
        hidden: '{!hidecard.filtri}'
      },
      items: [
        {
          xtype: 'displayfield',
          value: '',
          bind: {
            value: '{textFiltri}'
          }

        },
        '->',
        {
          iconCls: 'fas fa-filter',
          ui: 'blue',
          text: Locale.t('stt.forms.budget.analisi.filtri.visualizza.text'),
          tooltip: Locale.t('stt.forms.budget.analisi.filtri.visualizza.tooltip'),
          handler: 'toggleFiltri',
        },
        {
          iconCls: 'fas fa-file-excel redIcon',
          ui: 'orange',
          tooltip: Locale.t('stt.forms.budget.analisi.filtri.excel.tooltip'),
          handler: 'onGenExcel',
        },
      ]
    }
  ],
  items: [
    {
      xtype: 'panel',
      userCls: 'stt-filtri',
      padding: '0 10',
      layout: {
        type: 'hbox'
      },
      style: 'border:none',
      scrollable: 'x',
      defaults: {
        userCls: 'stt-filtri-grid',
        height: 110,
      },
      bind: {
        hidden: '{hidecard.filtri}'
      },

      items: [
        // RANGE ANNI
        {
          xtype: 'fieldset',
          title: Locale.t('stt.forms.budget.analisi.filtri.form.anno.label'),
          layout: {
            type: 'vbox'
          },
          userCls: 'stt-filtri-grid',
          // height: 180,
          defaults: {
            width: 200,
            // labelAlign: 'top',
          },
          items: [

            {
              xtype: 'numberfield',
              // width: 140,
              fieldLabel: Locale.t('stt.forms.budget.analisi.filtri.form.anno.inizio'),
              minValue: 2011, // TODO
              maxValue: 2023, // TODO
              bind: {
                value: '{filtri.anno.inizio}'
              }
            },
            {
              xtype: 'numberfield',
              // width: 140,
              minValue: 2012, // TODO
              maxValue: 2023, // TODO
              fieldLabel: Locale.t('stt.forms.budget.analisi.filtri.form.anno.fine'),
              bind: {
                value: '{filtri.anno.fine}'
              }
            }
          ]
        },

        // CLASSE MERCEOLOGICA
        {
          xtype: 'fieldset',
          title: Locale.t('stt.forms.budget.analisi.filtri.form.clmer.label'),
          layout: {
            type: 'hbox'
          },
          userCls: 'stt-filtri-grid',
          items: [
            {
              xtype: 'combobox',
              queryMode: 'remote',
              width: 120,
              minChars: 2,
              bind: {
                store: '{storeFiltriComboClMer}'
              },
              displayField: 'cd_clm',
              valueField: 'cd_clm',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clmer.emptyCombo'),
              listConfig: {
                emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clmer.emptyList'),
                getInnerTpl: function (a, b) {
                  return '<div class="item">' +
                    '<b>{cd_clm}</b> - {descr_clm}' +
                    ' </div>';
                }
              },
              listeners: {
                select: 'onSelectFilterClMer'
              }
            },
            {
              xtype: 'stt-v1-form-analisi-grid-filter-clmer',
              width: 80,
              height: 80,
              bind: {
                store: '{storeFilterGridClMer}'
              }
            }
          ]
        },
        // NAZIONALITA'
        {
          xtype: 'fieldset',
          width: 250,
          title: Locale.t('stt.forms.budget.analisi.filtri.form.nazionalita.label'),
          layout: {
            type: 'vbox'
          },
          bind: {
            disabled: '{hidecard.nazionalita}'
          },
          userCls: 'stt-filtri-grid',
          defaults: {
            labelAlign: 'top',
          },
          items: [
            {
              xtype: 'radiogroup',
              vertical: false,
              columns: 2,
              simpleValue: true,
              width: 230,
              bind: '{filtri.nazionalita}',
              items: [
                {
                  boxLabel: Locale.t('stt.forms.budget.analisi.filtri.form.nazionalita.it'),
                  name: 'nazionalita',
                  width: 110,
                  inputValue: 'it',

                }, {
                  boxLabel: Locale.t('stt.forms.budget.analisi.filtri.form.nazionalita.ee'),
                  name: 'nazionalita',
                  width: 110,
                  inputValue: 'ee',
                }
              ],
              listeners: {
                change: "onChangeNazionalita"
              }
            },
            // NAZIONI
            {
              xtype: 'combobox',
              queryMode: 'remote',
              labelAlign: 'left',
              labelWidth: 80,
              fieldLabel: Locale.t('stt.forms.budget.analisi.cards.nazioni.title'),
              valueField: 'cd_naz',
              displayField: 'descr_naz',
              width: 230,
              minChars: 2,
              autoLoadOnValue: true,
              bind: {
                store: '{storeFiltriComboNazioni}',
                hidden: '{hidecard.nazioni}',
                value: '{filtri.cd_naz}'
              },
              typeAhead: true,
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.nazioni.emptyCombo'),
              listConfig: {
                emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.nazioni.emptyList'),
                getInnerTpl: function (a, b) {
                  return '<div class="item">' +
                    '<b>{cd_naz}</b> - {descr_naz}' +
                    ' </div>';
                }
              },
              listeners: {
                change: 'onChangeFilterNazione',
                select: 'onSelectFilterNazione',
              }
            },
            // REGIONI
            {
              xtype: 'combobox',
              queryMode: 'remote',
              fieldLabel: Locale.t('stt.forms.budget.analisi.cards.regioni.title'),
              labelAlign: 'left',
              labelWidth: 90,
              width: 200,
              minChars: 2,
              bind: {
                store: '{storeFiltriComboRegioni}',
                hidden: '{hidecard.regioni}',
                value: '{filtri.regione}'
              },
              displayField: 'regione',
              valueField: 'regione',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.regioni.emptyCombo'),
              listConfig: {
                emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.regioni.emptyList'),
              },
              listeners: {
                change: 'onChangeFilterRegioni',
                select: 'onSelectFilterRegioni'
              }
            },
          ]
        },
        {
          xtype: 'fieldset',
          title: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.label'),
          layout: {
            type: 'vbox'
          },
          bind: {
            disabled: '{hidecard.clienti}',
          },
          userCls: 'stt-filtri-grid',
          defaults: {
            width: 290,
            labelWidth: 80,
          },
          items: [
            // CLIENTE
            {
              xtype: 'combobox',
              queryMode: 'remote',
              pickerAlign: 'tr-br',
              fieldLabel: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.cliente'),
              minChars: 2,
              autoLoadOnValue: true,
              bind: {
                store: '{storeFiltriComboClienti}',
                hidden: '{hidecard.cliente}',
                value: '{filtri.cd_sogg_fat}'
              },
              displayField: 'rag_soc',
              valueField: 'cd_sogg_fat',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.emptyCombo'),
              listConfig: {
                emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.emptyListCliente'),
                getInnerTpl: function (a, b) {
                  return '<div class="item" style="width:323px;">' +
                    '<b>{cd_sogg_fat}</b> - {rag_soc}' +
                    ' </div>';
                }
              },
              listeners: {
                change: 'onChangeFilterCliente',
                select: 'onSelectFilterCliente',
                beforequery: function (qe) {
                  delete qe.combo.lastQuery;
                }
              }
            },
            // FAMIGLIA
            {
              xtype: 'combobox',
              queryMode: 'remote',
              pickerAlign: 'tr-br',
              fieldLabel: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.famiglia'),
              minChars: 2,
              autoLoadOnValue: true,
              bind: {
                store: '{storeFiltriComboFamiglie}',
                disabled: '{hidecard.famiglia}',
                value: '{filtri.cd_fam}'
              },
              displayField: 'descr_fam',
              valueField: 'cd_fam',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.emptyCombo'),
              listConfig: {
                emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clienti.emptyListFamiglia'),
                getInnerTpl: function (a, b) {
                  return '<div class="item">' +
                    '<b>{cd_fam}</b> - {descr_fam}' +
                    ' </div>';
                }
              },
              listeners: {
                change: 'onChangeFilterFamiglie',
                select: 'onSelectFilterFamiglie',
                beforequery: function (qe) {
                  delete qe.combo.lastQuery;
                }
              }
            },
          ]
        },

      ]
    }
  ],

  listeners: {
    afterrender: 'onAfterRenderNoth'
  }
});