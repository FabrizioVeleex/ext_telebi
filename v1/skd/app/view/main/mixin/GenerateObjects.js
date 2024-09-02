Ext.define('skd.view.main.mixins.GenerateObjects', {
  /* ---------------------------------------------------------------------------------------------------------
  *GESTIONE GENERAZIONE OGGETTI APP
  * ---------------------------------------------------------------------------------------------------------*/
  generateFiltri: function () {
    this.storeComboLab = Ext.create("skd.store.forms.filtri.ComboLab");
    let hideFiltri = true;
    this.filtri = Ext.create("skd.view.forms.top.Filtri", {
      region: "north",
      bind: {
        hidden: "{!filtri.active}",
      },
    });
    this.filtriCdl = Ext.create("skd.view.forms.top.FiltriCdl", {
      region: "north",
      bind: {
        hidden: "{!filtri.active_cdl}",
      },
    });
    this.filtriMancanti = Ext.create("skd.view.forms.top.FiltriMancanti", {
      region: "north",
    });
  },
  generateGridLab: function () {
    this.gridLab = Ext.create("skd.view.grids.lab.Lab", {
      id: "gridLab",
    });
    this.setOnComponent(this.gridLab);
  },
  generateGridReparto: function () {
    this.gridReparto = Ext.create("skd.view.grids.reparto.Reparto", {
      id: "gridReparto",
    });
    this.setOnComponent(this.gridReparto);
  },
  generateGridPartnum: function () {
    this.gridPartnum = Ext.create("skd.view.grids.partnum.Partnum", {
      id: "gridPartnum",
    });
    this.setOnComponent(this.gridPartnum);
  },
  generateGridOperatore: function () {
    this.gridOperatore = Ext.create("skd.view.grids.operatore.Operatore", {
      id: "gridOperatore",
    });
    this.setOnComponent(this.gridOperatore);
  },
  generateGridCdl: function () {
    this.gridCdl = Ext.create("skd.view.grids.cdl.Cdl", {
      id: "gridCdl",
    });
    this.setOnComponent(this.gridCdl);
  },
  generateGridMancanti: function () {
    this.gridMancanti = Ext.create("skd.view.grids.mancanti.Mancanti", {
      id: "gridMancanti",
    });
    this.setOnComponent(this.gridMancanti);
  },
  generateCruscotto: function () {
    this.westClose = Ext.create("skd.view.main.WestClose", {
      region: "west",
      bind: {
        hidden: "{westShow}",
      },
    });

    this.panelWest = Ext.create("skd.view.forms.cruscotto.Cruscotto");
    this.west = Ext.create("skd.view.main.West", {
      region: "west",
      width: Ext.global.Vars.confMod.main.west.width,
      bind: {
        hidden: "{!westShow}",
      },
      listeners: {
        resize: "onResizeWest",
        statusApp: "onSetStatusApp",
      },
    });

    this.panelWest.on("collapseCruscotto", "onCollapseCruscotto", this);
    this.panelWest.on("openWinMateriali", "onBeforeOpenWinMateriali", this);
    this.west.add(this.panelWest);
  },
  generateFooter: function () {
    let vm = this.getViewModel();
    this.footer = Ext.create("skd.view.forms.footer.Panel", {
      region: "south",
      height: 50,
    });
    this.footer.getViewModel().set("connection", vm.get("connection"));
    this.footer.on("openSetting", "onOpenSetting", this);
  },

})