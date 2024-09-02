/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.top.FiltriCdl', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.form.Checkbox',
    'Ext.form.FieldSet',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.form.field.Text',
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox',
    'Ext.panel.Panel',
    'skd.view.forms.top.grids.CdlCdl',
    'skd.view.forms.top.grids.Component',
    'skd.view.forms.top.grids.Lab',
    'skd.view.forms.top.grids.Note',
    'skd.view.forms.top.grids.Odp',
    'skd.view.forms.top.grids.Part',
    'skd.view.forms.top.grids.Preparatore',
    'skd.view.forms.top.grids.RepartoCdl',
    'skd.view.forms.top.grids.Stato'
  ],
  hidden: true,
  collapsible: false,
  layout: {
    type: 'hbox'
  },
  scrollable: 'x',
  style: 'border:none',
  defaults: {
    userCls: 'goma-filtri-grid'
  },
  frame: true,
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
          margin: 0,
          layout: {
            type: 'vbox'
          },
          title: Locale.t('skd.top.filtri.producibilita.title'),
          userCls: 'goma-filtri',
          width: 250,
          height: 154,
          items: [
            {
              xtype: 'panel',
              layout: {
                type: 'hbox'
              },
              userCls: 'goma-panel-checkbox',
              height: 40,
              defaults: {
                listeners: {
                  change: 'onChangeProducibilitaCdl'
                }
              },
              items: [
                {
                  xtype: 'checkboxfield',
                  width: 85,
                  boxLabel: Locale.t('skd.top.filtri.producibilita.check.acquisti'),
                  name: 'acquisti',
                  bind: '{filtriCdl.acquisti}',
                  inputValue: '1'
                },
                {
                  xtype: 'checkboxfield',
                  width: 90,
                  boxLabel: Locale.t('skd.top.filtri.producibilita.check.produzione'),
                  name: 'producibilita',
                  bind: '{filtriCdl.produzione}',
                  inputValue: '2'
                }
              ]
            },
            {
              xtype: 'combobox',
              queryMode: 'locale',
              width: 240,
              minChars: 2,
              bind: {
                value: '{filtriCdl.giacenza}',
                store: '{storeComboGiacenza}'
              },
              displayField: 'giacenza',
              valueField: 'id',
              typeAhead: true,
              forceSelection: true,
              emptyText: Locale.t('skd.top.filtri.seleziona'),
              listeners: {
                select: 'onChangeComboProducibilitaCdl'
              }
            },
            // {
            //   xtype: 'checkboxfield',
            //   width: 200,
            //   boxLabel: Locale.t('skd.top.filtri.grids.ritardo.check'),
            //   name: 'ritardo',
            //   bind: '{filtriCdl.ritardo}',
            //   inputValue: '1'
            // }
            {
              xtype: 'checkboxfield',
              width: 200,
              boxLabel: Locale.t('skd.top.filtri.grids.in_produzione.check'),
              name: 'in_produzione',
              bind: '{filtriCdl.in_produzione}',
              inputValue: '1'
            }
          ]
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.lab.title'),
      layout: {
        type: 'hbox'
      },
      userCls: 'goma-filtri-grid',
      defaults: {
        width: 180
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
              width: 180,
              minChars: 2,
              userCls: 'goma-panel-field-transparent',
              bind: {
                store: '{storeComboLab}'
              },
              displayField: 'field',
              valueField: 'sc_op_lab',
              typeAhead: true,
              value: '',
              forceSelection: true,
              matchFieldWidth: false,
              emptyText: Locale.t('skd.top.filtri.seleziona'),
              listConfig: {
                emptyText: Locale.t('skd.top.filtri.grids.lab.emptyText')
              },
              listeners: {
                select: 'onSelectFilterLabCdl'
              }
            },
            {
              width: 180,
              xtype: 'textfield',
              fieldLabel: Locale.t('skd.top.filtri.grids.lab.like'),
              labelWidth: 60,
              userCls: 'goma-panel-field-transparent',
              bind: {
                value: '{filtriCdl.lab}'
              },
              emptyText: Locale.t('skd.top.filtri.grids.lab.digitare'),
              name: 'labfree'
            },
            {
              width: 180,
              xtype: 'textfield',
              fieldLabel: Locale.t('skd.top.filtri.grids.lab.notlike'),
              labelWidth: 60,
              userCls: 'goma-panel-field-transparent',
              bind: {
                value: '{filtriCdl.notlab}'
              },
              emptyText: Locale.t('skd.top.filtri.grids.lab.digitare'),
              name: 'notlab'
            }
          ]
        },
        {
          xtype: 'component',
          width: 10
        },
        {
          xtype: 'grid-filter-lab',
          height: 120,
          bind: {
            store: '{storeGridLabCdl}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.note.title'),
      height: 154,
      layout: {
        type: 'hbox'
      },
      userCls: 'goma-filtri-grid',
      defaults: {
        width: 150
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
              labelWidth: 50,
              width: 150,
              minChars: 2,
              bind: {
                store: '{storeComboNote}'
              },
              displayField: 'nota',
              valueField: 'nota',
              typeAhead: true,
              matchFieldWidth: false,
              value: '',
              forceSelection: true,
              emptyText: Locale.t('skd.top.filtri.seleziona'),
              listConfig: {
                emptyText: Locale.t('skd.top.filtri.grids.note.emptyText')
              },
              listeners: {
                select: 'onSelectFilterNote'
              }
            },
            {
              width: 150,
              xtype: 'textfield',
              userCls: 'goma-panel-field-transparent',
              bind: {
                value: '{filtriCdl.nota}'
              },
              emptyText: Locale.t('skd.top.filtri.grids.note.digitare'),
              name: 'notafree'
            }
          ]
        },
        {
          xtype: 'component',
          width: 10
        },
        {
          xtype: 'grid-filter-note',
          height: 120,
          bind: {
            store: '{storeGridNote}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.odp.title'),
      layout: {
        type: 'vbox'
      },
      height: 154,
      defaults: {
        width: 122
      },
      items: [
        {
          xtype: 'combobox',
          queryMode: 'remote',
          labelWidth: 50,
          matchFieldWidth: false,
          flex: 1,
          minChars: 2,
          bind: {
            store: '{storeComboOdp}'
          },
          displayField: 'sc_op_objstate',
          valueField: 'sc_op_objstate',
          typeAhead: true,
          value: '',
          forceSelection: true,
          emptyText: Locale.t('skd.top.filtri.seleziona'),
          listConfig: {
            emptyText: Locale.t('skd.top.filtri.grids.odp.emptyText')
          },
          listeners: {
            select: 'onSelectFilterCdlOdp'
          }
        },
        {
          xtype: 'grid-filter-odp',
          height: 80,
          bind: {
            store: '{storeGridOdpCdl}'
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
      height: 154,
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
            select: 'onSelectFilterCdlReparto'
          }
        },
        {
          xtype: 'grid-filter-reparto-cdl',
          height: 80,
          bind: {
            store: '{storeGridCdlReparto}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.cdl.title'),
      layout: {
        type: 'vbox'
      },
      height: 154,
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
          emptyText: Locale.t('skd.top.filtri.seleziona'),
          listConfig: {
            emptyText: Locale.t('skd.top.filtri.grids.cdl.emptyText'),
            getInnerTpl: function (a, b) {
              return '<div class="item">' +
                '<b>{ope_work_center_no}</b> - {rep_cdl_wc_des}' +
                ' </div>';
            }
          },
          listeners: {
            select: 'onSelectFilterCdlCdl'
          }
        },
        {
          xtype: 'grid-filter-cdl-cdl',
          height: 80,
          bind: {
            store: '{storeGridCdlCdl}'
          }
        }
      ]
    },
    //TODO dafare con beppe
    // {
    //     xtype: 'fieldset',
    //     title:Locale.t('skd.top.filtri.grids.component.title'),
    //     layout:{
    //         type:'vbox'
    //     },
    //     userCls:'goma-filtri-grid',
    //     defaults: {
    //         width: 150
    //     },
    //     items:[
    //         {
    //             xtype:'combobox',
    //             queryMode: 'remote',
    //             labelWidth:50,
    //             width:150,
    //             minChars:2,
    //             bind:{
    //                 store:'{storeComboComponent}'
    //             },
    //             displayField: 'part_no',
    //             valueField:'part_no',
    //             typeAhead: true,
    //             value : '',
    //             forceSelection:true,
    //             matchFieldWidth:false,
    //             emptyText:Locale.t('skd.top.filtri.seleziona'),
    //             listConfig: {
    //                 emptyText: Locale.t('skd.top.filtri.grids.component.emptyText')
    //             },
    //             listeners : {
    //                 select:'onSelectFilterComponent'
    //             }
    //         },
    //         {
    //             xtype:'grid-filter-component',
    //             height:84,
    //             bind:{
    //                 store:'{storeGridComponent}'
    //             }
    //         }
    //     ]
    // },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.preparatore.title'),
      layout: {
        type: 'vbox'
      },
      defaults: {
        width: 112
      },
      items: [
        {
          xtype: 'combobox',
          queryMode: 'remote',
          labelWidth: 50,
          flex: 1,
          minChars: 2,
          bind: {
            store: '{storeComboOperatore}'
          },
          displayField: 'ope_operatore',
          valueField: 'ope_operatore',
          typeAhead: true,
          value: '',
          matchFieldWidth: false,
          forceSelection: true,
          emptyText: Locale.t('skd.top.filtri.seleziona'),
          listConfig: {
            emptyText: Locale.t('skd.top.filtri.grids.preparatore.emptyText'),
            getInnerTpl: function (a, b) {
              return '<div class="item">' +
                '<b>{ope_operatore}</b>' +
                ' </div>';
            }
          },
          listeners: {
            select: 'onSelectFilterPreparatore'
          }
        },
        {
          xtype: 'grid-filter-preparatore',
          height: 84,
          bind: {
            store: '{storeGridPreparatore}'
          }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('skd.top.filtri.grids.stato.title'),
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
            store: '{storeComboStato}'
          },
          displayField: 'stato',
          valueField: 'stato',
          typeAhead: true,
          matchFieldWidth: false,
          forceSelection: true,
          emptyText: Locale.t('skd.top.filtri.seleziona'),
          listConfig: {
            emptyText: Locale.t('skd.top.filtri.grids.stato.emptyText'),
            getInnerTpl: function (a, b) {
              return '<div class="item">' +
                '<b>{stato} - {descrizione}</b>' +
                ' </div>';
            }
          },
          listeners: {
            select: 'onSelectFilterStato'
          }
        },
        {
          xtype: 'grid-filter-stato',
          height: 84,
          bind: {
            store: '{storeGridStato}'
          }
        }
      ]
    },
    // {
    //   xtype: 'panel',
    //   userCls: 'goma-filtri',
    //   layout: {
    //     type: 'vbox'
    //   },
    //   margin: 0,
    //   items: [
    //     {
    //       height: 68,
    //       xtype: 'fieldset',
    //       margin: 0,
    //       layout: {
    //         type: 'hbox'
    //       },
    //       title: Locale.t('skd.top.filtri.grids.stato.title'),
    //       userCls: 'goma-filtri',
    //       defaults: {
    //         width: 130
    //       },
    //       items: [
    //         {
    //           xtype: 'combobox',
    //           queryMode: 'locale',
    //           width: 260,
    //           minChars: 2,
    //           bind: {
    //             value: '{filtriCdl.stato}',
    //             store: '{storeComboStato}'
    //           },
    //           name: 'stato',
    //           displayField: 'stato',
    //           valueField: 'id',
    //           typeAhead: true,
    //           matchFieldWidth: false,
    //           forceSelection: true,
    //           emptyText: Locale.t('skd.top.filtri.seleziona')
    //         }
    //       ]
    //     },
    //     {
    //       xtype: 'fieldset',
    //       margin: 0,
    //       layout: {
    //         type: 'vbox'
    //       },
    //       title: Locale.t('skd.top.filtri.grids.inproduzione.title'),
    //       userCls: 'goma-filtri',
    //       width: 270,
    //       height: 86,
    //       defaults: {
    //         labelWidth: 30,
    //         xtype: 'datefield',
    //         startDay: 1,
    //         width: 260
    //       },
    //       items: [
    //         {
    //           xtype: 'panel',
    //           layout: {
    //             type: 'hbox'
    //           },
    //           userCls: 'goma-panel-checkbox',
    //           height: 40,
    //           defaults: {
    //             listeners: {
    //               change: 'onChangeProducibilita'
    //             }
    //           },
    //           items: [
    //             {
    //               xtype: 'checkboxfield',
    //               width: 130,
    //               boxLabel: Locale.t('skd.top.filtri.grids.inproduzione.check'),
    //               name: 'in_produzione',
    //               bind: '{filtriCdl.in_produzione}',
    //               inputValue: true
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
});
