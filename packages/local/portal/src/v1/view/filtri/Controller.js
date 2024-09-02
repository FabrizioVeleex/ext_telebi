/**
 * Created by fabrizio on 31/12/23.
 */
Ext.define("portal.v1.view.filtri.DefaultController", {
  requires: [

  ],

  // Funzione 
  filtri_onTogglePannel: function (btn) {
    try {
      let vm = this.getViewModel();
      let suff = btn.pressed ? 'up' : 'down'
      vm.set("filtri.btn.icon", "fas fa-caret-square-" + suff);
      vm.set("filtri.params.pressed", !btn.pressed);
      this.setConfMod();
    } catch (error) {
      console.log(error)
    }
  },


  filtri_onRemoveFilter: function (view, rowIndex, collIndex, item, e, record) {
    try {
      let fieldset = view.up("fieldset");
      let storeGrid = "filtri_" + fieldset.myName + "_storeGrid";
      let store = this[storeGrid]

      if (store) { store.remove(record); }

      Ext.global.Vars.confMod.grids[this.modelFiltri].filtri[fieldset.myName].list = store.data.items.map(e => e.data)

      this.setConfMod();
    } catch (error) {
      console.log(error)
    }
  },
  filtri_onSelectFilter: function (combo, record) {
    try {
      let fieldset = combo.up("fieldset"),
        grid = fieldset.down("grid"),
        store = grid.getStore();

      if (store) {
        store.add(record)
      }
      Ext.global.Vars.confMod.grids[this.modelFiltri].filtri[fieldset.myName].list = store.data.items.map(e => e.data)
      combo.setValue("");
      this.setConfMod();
    } catch (error) {
      console.log(error);
    }
  },
  filtri_beforeRender: function (pnl) {
    let me = this,
      vm = me.getViewModel();

    let storeCombo = "filtri_" + pnl.myName + "_storeCombo";
    let storeGrid = "filtri_" + pnl.myName + "_storeGrid";
    let grid = "filtri_" + pnl.myName + "_Grid";

    this[storeGrid] = Ext.create("portal.v1.view.filtri.text.StoreGrid")
    this[grid] = Ext.create("portal.v1.view.filtri.text.Grid", {
      store: this[storeGrid]
    })

    this[storeCombo] = Ext.create('Ext.data.Store', {
      requires: [
        'Ext.data.proxy.Rest'
      ],
      fields: [
        { name: 'codice', type: 'string' },
        { name: 'descrizione', type: 'string' },
      ],
      data: [],
      proxy: {
        type: 'ajax',
        simpleSortMode: true,
        url: Backend.REST_API + 'grids/' + pnl.myTag + '/getstore' + pnl.myName + '/',
        reader: { type: 'json', rootProperty: 'data' }
      }
    });


    // popolo dati nello store
    this[storeGrid].loadData(Ext.global.Vars.confMod.grids[this.modelFiltri].filtri[pnl.myName].list)
    pnl.add([
      {
        xtype: 'panel',
        userCls: 'y-filtri-panel-field-transparent',
        layout: {
          type: 'vbox'
        },
        items: [
          {
            xtype: 'combobox',
            queryMode: 'remote',
            width: 180,
            minChars: 2,
            userCls: 'y-filtri-panel-field-transparent',
            store: this[storeCombo],
            displayField: 'descrizione',
            tpl: Ext.create('Ext.XTemplate',
              '<ul class="x-list-plain"><tpl for=".">',
              '<li role="option" class="x-boundlist-item">{codice} - <b>{descrizione}</b></li>', //TODO
              '</tpl></ul>'
            ),
            valueField: 'codice',
            typeAhead: true,
            value: '',
            forceSelection: true,
            matchFieldWidth: false,
            emptyText: Locale.t('spl.filtri.seleziona'), //TODO
            listConfig: {
              emptyText: Locale.t('spl.filtri.emptyText') //TODO
            },
            listeners: {
              select: 'filtri_onSelectFilter'
            }
          },
          {
            width: 180,
            xtype: 'textfield',
            fieldLabel: Locale.t('spl.filtri.like'),
            labelWidth: 60,
            userCls: 'y-filtri-panel-field-transparent',
            bind: {
              value: '{filtri.params.' + pnl.myName + '.like}'
            },
          },
          {
            width: 180,
            xtype: 'textfield',
            fieldLabel: Locale.t('spl.filtri.notlike'), //TODO
            labelWidth: 60,
            userCls: 'y-filtri-panel-field-transparent',
            bind: {
              value: '{filtri.params.' + pnl.myName + '.notlike}'
            },
          }
        ]
      },
      {
        xtype: 'component',
        width: 10
      },
      this[grid],
    ])
  }
})