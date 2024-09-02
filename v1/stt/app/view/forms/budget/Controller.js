/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.Controller", {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  mixins: [
    'portal.v1.global.Util',
    "stt.view.forms.budget.controller.ControllerFiltri",
    "stt.view.forms.budget.controller.ControllerGridClMer",
    "stt.view.forms.budget.controller.ControllerGridNazionalita",
    "stt.view.forms.budget.controller.ControllerGridNazioni",
    "stt.view.forms.budget.controller.ControllerGridRegioni",
    "stt.view.forms.budget.controller.ControllerGridClienti",
    "stt.view.forms.budget.controller.ControllerGridArticoli",
    "stt.view.forms.budget.controller.ControllerGridArticoliDettaglio",
    "stt.view.forms.budget.controller.ControllerDashboard",
  ],
  alias: 'controller.v1-stt-form-budget',

  requires: [
    'Ext.toolbar.Fill',
    'stt.view.forms.budget.Model',
    'stt.view.forms.budget.cards.Analisi',
    'stt.view.forms.budget.cards.analisi.Center',
    'stt.view.forms.budget.cards.analisi.ClMer',
    'stt.view.forms.budget.cards.analisi.Nazionalita',
    'stt.view.forms.budget.cards.analisi.Nazioni',
    'stt.view.forms.budget.cards.analisi.North',
    'stt.view.forms.budget.cards.analisi.South',
    'stt.view.forms.budget.cards.analisi.Tipologia',
    'stt.view.forms.budget.cards.analisi.Cliente',
    'stt.view.forms.budget.cards.analisi.Articoli',
    "stt.view.forms.budget.cards.analisi.Dashboard",
    "stt.view.forms.budget.components.gridClMer.Grid",
    "stt.view.forms.budget.components.gridNazionalita.Grid",
    "stt.view.forms.budget.components.gridNazioni.Grid",
    "stt.view.forms.budget.components.gridRegioni.Grid",
    "stt.view.forms.budget.components.gridClienti.Grid",
    "stt.view.forms.budget.components.gridArticoli.Grid",
    "stt.view.forms.budget.components.gridArticoliDettaglio.Grid",
  ],
  init: function () {
    this.setConfModRun = 0;
    this.startInit = true; // gestione selettiva azioni filtri su apertura INIZIO
    let vm = this.getViewModel();

    this.onInitControllerFromFiltri();

    vm.set('isnew', 0);
    vm.set('id', this.getView().itemId);
    vm.set('record', Ext.create('stt.view.forms.budget.Model', {
      id: this.getView().itemId,
      isnew: 0
    }))
    this.callParent(arguments)
  },
  managerView: function () {
    this.callParent(arguments)
    let me = this, vm = me.getViewModel()
    try {
      let record = vm.get('record'),
        readOnly = true;

      this.north = Ext.create("stt.view.forms.budget.cards.analisi.North");

      this.gridArticoliDettaglio = Ext.create("stt.view.forms.budget.components.gridArticoliDettaglio.Grid");
      this.south = Ext.create("stt.view.forms.budget.cards.analisi.South", {
        items: [
          this.gridArticoliDettaglio
        ]
      });
      this.dashboard = Ext.create("stt.view.forms.budget.cards.analisi.Dashboard", { posizione: 'dashboard' });

      // -------------------------------------------------------------------
      // CLASSE MERCEOLOGICA
      this.gridClMer = Ext.create("stt.view.forms.budget.components.gridClMer.Grid");
      this.clMer = Ext.create("stt.view.forms.budget.cards.analisi.ClMer", {
        posizione: 'cl_mer',
        items: [
          this.gridClMer
        ]
      });

      // -------------------------------------------------------------------
      // NAZIONALITA
      this.gridNazionalita = Ext.create("stt.view.forms.budget.components.gridNazionalita.Grid");
      this.nazionalita = Ext.create("stt.view.forms.budget.cards.analisi.Nazionalita", {
        posizione: 'nazionalita',
        items: [
          this.gridNazionalita
        ]
      });

      // -------------------------------------------------------------------
      // NAZIONI
      this.gridNazioni = Ext.create("stt.view.forms.budget.components.gridNazioni.Grid");
      this.nazioni = Ext.create("stt.view.forms.budget.cards.analisi.Nazioni", {
        posizione: 'nazioni',
        items: [
          this.gridNazioni
        ]
      });

      // -------------------------------------------------------------------
      // REGIONI
      this.gridRegioni = Ext.create("stt.view.forms.budget.components.gridRegioni.Grid");
      this.regioni = Ext.create("stt.view.forms.budget.cards.analisi.Regioni", {
        posizione: 'regioni',
        items: [
          this.gridRegioni
        ]
      });

      // -------------------------------------------------------------------
      // CLIENTI
      this.gridClienti = Ext.create("stt.view.forms.budget.components.gridClienti.Grid");
      this.clienti = Ext.create("stt.view.forms.budget.cards.analisi.Cliente", {
        posizione: 'clienti',
        items: [
          this.gridClienti
        ]
      });

      // -------------------------------------------------------------------
      // ARTICOLI
      this.gridArticoli = Ext.create("stt.view.forms.budget.components.gridArticoli.Grid");
      this.articoli = Ext.create("stt.view.forms.budget.cards.analisi.Articoli", {
        posizione: 'articoli',
        items: [
          this.gridArticoli
        ]
      });

      this.tipologia = Ext.create("stt.view.forms.budget.cards.analisi.Tipologia");
      this.center = Ext.create('stt.view.forms.budget.cards.analisi.Center', {
        items: [
          this.dashboard,
          this.clMer,
          this.nazionalita,
          this.nazioni,
          this.regioni,
          this.tipologia,
          this.clienti,
          this.articoli,
        ]
      })

      this.analisi = Ext.create("stt.view.forms.budget.cards.Analisi", {
        items: [
          this.north,
          this.center,
          this.south
        ]
      });

      //gestione tasti default
      vm.set('btn.close', false)
      if (this.checkRuoli(['99', '1'])) {
        readOnly = false
      }
      vm.set('readOnly', readOnly)
      //titolo tab
      vm.set('title', `${Locale.t('stt.forms.budget.budget')} <b>${record.data['anno']}</b>`)
      vm.set('label', Locale.t('stt.forms.budget.title'))
      vm.set('toolbar.hideCard', false)
      //cards
      if (!this.listForms) {
        this.listForms = [
          {
            posizione: 'analisi',
            backgroundColor: 'LightBlue',
            iconCls: 'fas fa-chart-bar',
            card: this.analisi,
            text: Locale.t('stt.forms.budget.analisi.title')
          },
          {
            posizione: 'lista',
            backgroundColor: '',
            iconCls: 'fas fa-list',
            card: Ext.create('Ext.panel.Panel', { html: 'Lista budgets' }),
            text: Locale.t('stt.forms.budget.lista.title')
          },
        ]
      }
      //Aggiungo cards
      for (card of this.listForms) {
        this.toolBarCard.add({
          text: card.text,
          enableToggle: true,
          iconCls: card.iconCls,
          style: { backgroundColor: card.backgroundColor },
          posizione: card.posizione,
          handler: 'onClickCard'
        })

        this.form.add(card.card);
      }

      this.getView().setActiveItem(this.form);
      this.onClickCard({ posizione: vm.get('cardactive') })
      this.startInit = false; //gestione selettiva azioni filtri su apertura FINE
    } catch (e) {
      //nascondo tutti i tasti
      vm.set('btn.delete', false)
      vm.set('btn.cronology', false)
      vm.set('btn.close', false)
      vm.set('btn.save', false)
      vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>')
      this.getView().setActiveItem(this.panelInfo)
      this.onAfterLoadFailure()
    }
  },

  // Evento si cambio pannello nel center
  onTabCenterChange: function (tabPanel, newCard, oldCard) {
    let me = this,
      vm = me.getViewModel();
    this.logDev('onTabCenterChange');

    if (newCard.posizione === 'articoli') {
      this.logDev('Visualizzo');
      vm.set('hidecard.south', false)
    } else {
      this.logDev('Nascondo');
      vm.set('hidecard.south', true)
    }
  },
  onAfterRenderAnalisi: function () {
    this.logDev('avvio il caricamento analisi....');
  },

  setConfMod: function () {
    this.setConfModRun++;
    let count = this.setConfModRun,
      task = new Ext.util.DelayedTask(function (count) {
        if (count === this.setConfModRun) {
          Ext.Ajax.request({
            method: 'POST',
            params: {
              'data': Ext.encode(Ext.global.Vars.confMod)
            },
            url: Backend.REST_API + 'setconfmod'
          });
        }
      }, this, [count]);
    task.delay(3000);
  },

  onGenExcel: function (btn) {
    let me = this,
      vm = me.getViewModel();

    let nome = me.center.getActiveTab();

    Ext.Ajax.request({
      method: 'POST',
      jsonData: { filtri: vm.get('filtri') },
      binary: true,
      url: Backend.REST_API + `forms/budget/analisi/${nome.itemId}/getExcel/`,
      success: function (response) {
        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        let headers = response.getAllResponseHeaders()
        let fileName = response.getResponseHeader('Content-Disposition').split("filename=")[1]
        if (fileName === '') { //se non ho filename di ritorno (eccezione) do un nome generico
          fileName = 'Download_file.xlsx'
        }
        let blob = new Blob([response.responseBytes], { type: headers['content-type'] })
        let binaryFile = window.URL.createObjectURL(blob)
        a.href = binaryFile
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(binaryFile)
      },
      failure: function (response) {
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: response.statusText,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        })
      }
    });
  }
});
