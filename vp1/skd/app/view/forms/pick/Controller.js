/**
 * Created by fabrizio on 29/12/17.
 * TODO
 * gestire chiusura e rimozione polling
 * inserire tasti sto servizio
 */
Ext.define('skd.view.forms.pick.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.pickcards',
  requires: [
    'Ext.Container',
    'Ext.button.Button',
    'Ext.layout.container.Card',
    'Ext.toolbar.Fill',
    'Ext.toolbar.Toolbar',
    'skd.view.forms.pick.dettaglio.Panel'
  ],
  mixins: ['portal.v1.global.Util'],
  /**
   * Called when the view is created
   */
  init: function () {
    let vm = this.getViewModel();

    if (Ext.global.Vars.confMod.main.filtripick.active) {
      vm.set('iconFiltriDett', 'fas fa-caret-square-up');
    }

    vm.set('record', this.getView().record.data);
    if (this.checkRuoli(['11'])) {
      vm.set('readOnly', false);
    }

    this.btnCardBack = Ext.create('Ext.button.Button', {
      xtype: 'button',
      tooltip: Locale.t('skd.forms.cards.btn_close'),
      style: { backgroundColor: 'LightBlue' },
      iconCls: 'fas fa-arrow-left',
      handler: 'onCloseCard'
    });

    this.btnReloadGrid = Ext.create('Ext.button.Button', {
      scope: this,
      iconCls: 'fas fa-sync',
      tooltip: Locale.t('skd.top.btn.reload.text'),
      handler: 'onLoadGrid'
    });
    this.btnToggleFiltri = {
      scope: this,
      bind: {
        iconCls: '{iconFiltriDett}'
      },
      text: Locale.t('skd.top.filtri.title'),
      handler: 'onToggleFiltri'
    };
    //TODO non serve piu
    this.btnToggleOrdinamento = {
      scope: this,
      bind: {
        iconCls: '{iconOrdinamento}'
      },
      text: 'Ordina come ODP',
      handler: 'onToggleOrdinamento'
    };
    this.btnUpdPreparata = Ext.create('Ext.button.Button', {
      xtype: 'button',
      tooltip: Locale.t('skd.forms.cards.upd_preparata'),
      style: { backgroundColor: 'green' },
      iconCls: 'fas fa-angle-double-up ',
      handler: 'onUpdPreparata'
    });

    this.toolBarCard = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      padding: 0,
      bind: {
        hidden: '{hiddenToolbar}'
      }
    });

    this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      padding: 0,
      items: [
        this.btnCardBack,
        this.btnReloadGrid,
        this.btnToggleFiltri,
        this.btnToggleOrdinamento,
        this.btnUpdPreparata,
        '->',
        {
          xtype: 'container',
          bind: {
            html: '{formTitle}'
          }
        }
      ]
    });

    this.getView().addDocked(this.toolBar, 1);

    this.dettaglio = Ext.create('skd.view.forms.pick.dettaglio.Panel', {
      posizione: 'dettaglio',
      record: this.getView().record.data
    });
    this.getView().on('openMateriali', 'onOpenMateriali', this);


    this.form = Ext.create('Ext.Container', {
      defaults: {
        listeners: {
          activate: 'onActivateCard'
        }
      },
      layout: {
        type: 'card'
      },
      items: [
        this.dettaglio
      ]
    });
  },

  onAfterRender: function () {
    this.getView().add(this.form);
  },

  onOpenMateriali: function (view, record) {
    this.getView().fireEvent('openWinMaterialiPick', view, record);
  },

  onStatusApp: function (statusApp) {
    let vm = this.getViewModel();
    vm.set('statusApp', statusApp);
    if (statusApp === 2) {
      this.btnReloadGrid.disable();
      this.formFiltri.disable();
      this.formTestata.disable();
    } else {
      this.formFiltri.enable();
      this.formTestata.enable();
      this.btnReloadGrid.enable();
    }
  },

  /* ---------------------------------------------------------------------------------------------------------
   * gestione azioni cards
   * - onClickCard: campo card
   * - onActivateCard: azioni su attivazione card
   * - onCloseCard: handler tasto chiusura pannello
   * ---------------------------------------------------------------------------------------------------------*/
  onClickCard: function (btn) {
    let cardselect = this[btn.posizione];
    this.getViewModel().set('posizioneCard', btn.posizione);
    this.form.setActiveItem(cardselect); //attivo card desiderata
  },
  onActivateCard: function (card) {
    let toolBarCard = this.toolBarCard;
    toolBarCard.items.each(function (item) {
      if (item.posizione === card.posizione) {
        item.setStyle({ backgroundColor: 'LightBlue' });
      } else {
        item.setStyle({ backgroundColor: '' });
      }

    }, this);
  },
  onUpdPreparata: function () {
    this.dettaglio.fireEvent('updPreparata');
  },
  onCloseCard: function () {
    this.getView().fireEvent('onCloseSetting', this);
  },
  //TODO non serve piu
  onToggleOrdinamento: function (btn) {
    let vm = this.getViewModel();
    if (btn.iconCls === 'fas fa-caret-square-down') {
      btn.setText('Ordina per componente');
      vm.set('iconOrdinamento', 'fas fa-caret-square-up');
      this.dettaglio.fireEvent('changeOrdinamento', 'componente');
    } else {
      btn.setText('Ordina come ODP');
      vm.set('iconOrdinamento', 'fas fa-caret-square-down');
      this.dettaglio.fireEvent('changeOrdinamento', 'ODP');
    }
  },
  onToggleFiltri: function (btn) {
    let vm = this.getViewModel();
    if (btn.iconCls === 'fas fa-caret-square-down') {
      vm.set('iconFiltriDett', 'fas fa-caret-square-up');
      this.dettaglio.fireEvent('showFiltri', true);
    } else {
      vm.set('iconFiltriDett', 'fas fa-caret-square-down');
      this.dettaglio.fireEvent('showFiltri', false);
    }

  },
  onLoadGrid: function () {
    this.dettaglio.fireEvent('loadGrid');
  }
});
