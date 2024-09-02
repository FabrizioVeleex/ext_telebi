/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.controller.controllerDettaglio", {
  requires: [
    "stt.view.forms.ritardi.cards.Dettaglio",
    "stt.view.forms.ritardi.components.gridOrdiniInevasi.Grid",
    "stt.view.forms.ritardi.components.gridDdt.Grid",
    "stt.view.forms.ritardi.components.gridGiacenze.Grid",
    "stt.view.forms.ritardi.components.gridOrdine.Grid",
    "stt.view.forms.ritardi.components.gridAndamento.Grid",
    "stt.view.forms.ritardi.components.panelInfoAndamento.Panel"
  ],
  managerViewDettaglio: function () {

    let me = this,
      vm = me.getViewModel();

    this.dettaglio = Ext.create("stt.view.forms.ritardi.cards.Dettaglio");

    this.generateGridAndamento();
    this.generateInfoDettaglio();

    this.dettaglio.add(this.gridAndamento, this.InfoAndamento);

    this.form.add(this.dettaglio);

  },

  generateGridAndamento: function () {
    this.gridAndamento = Ext.create("stt.view.forms.ritardi.components.gridAndamento.Grid", {
      region: "center",
      flex: 1,
    });

    this.filterGridAndamento = Ext.create("stt.view.forms.ritardi.components.toolbarFilterGridAndamento.Toolbar");
    this.filterGridAndamentoMonth = Ext.create("stt.view.forms.ritardi.components.toolbarFilterInMonth.Toolbar");
    this.toolbar = Ext.create("Ext.Toolbar", {
      items: [
        { handler: "reloadGrid", iconCls: " pictos pictos-refresh" },
        { handler: "exportExcel", iconCls: " x-fas fa-file-excel" }],
    });

    this.toolTotals = Ext.create("Ext.Toolbar", {
      items: [{
        xtype: "container",
        bind: {
          html: "{totals}",
        },
      }],
    });
    this.toolbarFooter = Ext.create("stt.view.forms.ritardi.components.toolbarFooter.Toolbar");

    this.gridAndamento.addDocked(this.toolbar);
    this.gridAndamento.addDocked(this.filterGridAndamentoMonth);
    this.gridAndamento.addDocked(this.filterGridAndamento);
    this.gridAndamento.addDocked(this.toolbarFooter);
    this.gridAndamento.on("itemclick", "onItemClickAndamento");
  },
  generateInfoDettaglio: function () {
    this.gridOrdiniInevasi = Ext.create("stt.view.forms.ritardi.components.gridOrdiniInevasi.Grid", {});
    this.gridGiacenze = Ext.create("stt.view.forms.ritardi.components.gridGiacenze.Grid", {});
    this.gridDdt = Ext.create("stt.view.forms.ritardi.components.gridDdt.Grid", {});
    this.gridOrdine = Ext.create("stt.view.forms.ritardi.components.gridOrdine.Grid", {});
    this.InfoAndamento = Ext.create("stt.view.forms.ritardi.components.panelInfoAndamento.Panel", {
      region: "east",
      flex: 1,
      split: true, // enable resizing
      items: [this.gridOrdiniInevasi, this.gridGiacenze, this.gridDdt, this.gridOrdine],
    });
  },
  onInmonthChange: function (item, newValue) {
    let me = this,
      vm = me.getViewModel();
    let inMonth = vm.get("inMonth");

    inMonth[item.nameColumn] = newValue;
    vm.set("inMonth", inMonth);

    this.gridAndamento.getStore().getProxy().extraParams.inMonthNext = inMonth.next;
    this.gridAndamento.getStore().getProxy().extraParams.inMonthIn = inMonth.in;
    this.gridAndamento.getStore().getProxy().extraParams.inMonthPrev = inMonth.prev;
    this.gridAndamento.getStore().reload();
  },
  onClearTriggetCombo: function (item, e) {
    if (item.hasSearch) {
      item.hasSearch = false;
      item.getTrigger("clear").hide();
      this.gridAndamento.getStore().getProxy().extraParams[item.nameColumn] = '';
      this.gridAndamento.getStore().reload();
      item.clearValue();
    }
  },
  onFilterCombo: function (item, record) {
    item.getTrigger("clear").show();
    item.hasSearch = true;
    this.gridAndamento.getStore().getProxy().extraParams[item.nameColumn] = record.data[item.valueField];
    this.gridAndamento.getStore().reload();

  },
  onTabChange: function (panel, newCard) {
    if (newCard.posizione === "gridandamento") {
      if (newCard.firstLoaded === 0) {
        newCard.firstLoaded = 1;
        newCard.down("grid").getStore().load();
      }
    }
  },

  setTotals: function (store, record) {
    let me = this,
      vm = me.getViewModel();
    let totOrdini = 0,
      totConsegnati = 0,
      totInevasi = 0;
    if (record.length > 0) {
      totOrdini = record[0].data.totals[0].tot_ord
      totConsegnati = record[0].data.totals[0].tot_cons
      totInevasi = record[0].data.totals[0].tot_ord - record[0].data.totals[0].tot_cons
    }
    vm.set('totOrdini', totOrdini)
    vm.set('totConsegnati', totConsegnati)
    vm.set('totInevasi', totInevasi)

  },
  exportExcel: function () {
    let me = this;
    let myMask = new Ext.LoadMask({ //maschera attesa
      msg: Locale.t('wort.dettaglio.caricamento'),
      target: me.gridAndamento
    });

    myMask.show();
    Ext.Ajax.request({
      method: 'GET', timeout: 900000,
      // params: { '_fn': 'esporta', dal: dal, al: al, naz: naz, tipo: tipo },
      url: Backend.REST_API + "forms/ritardi/excel",
      success: function (response) {
        let rest = Ext.decode(response.responseText);
        myMask.hide()
        me.onDownloadFile(rest['token'])
      },
      failure: function (a, o) {
        myMask.hide()
        let rest = Ext.decode(a.responseText);
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: rest['msg'],
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      }
    })
  },
  clearListGridInfo: function () {
    this.gridOrdiniInevasi.getStore().removeAll();
    this.gridGiacenze.getStore().removeAll();
    this.gridDdt.getStore().removeAll();
    this.gridOrdine.getStore().removeAll();
  },
  // -----------------------------------------------
  // Gestione azioni gliglia andamento
  onItemClickAndamento: function (obj, record, item, index) {
    const me = this;

    me.getView().el.mask("Loading");
    this.clearListGridInfo();
    Ext.Ajax.request({
      method: "POST",
      jsonData: { record: record.data },
      url: Backend.REST_API + "forms/ritardi/getinfoandamento",
      success: function (response) {
        me.popolateInfo(response, record.data);
        me.getView().el.unmask();
      },
      failure: function () {
        me.getView().el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          message: "Errore imprevisto contattare l'amministratore di sistema",
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR,
        });
      },
    });
  },
  popolateInfo: function (response, record) {
    let rest = Ext.decode(response.responseText),
      me = this,
      vm = me.getViewModel();

    const titleOrdIn = Locale.t("stt.forms.ritardi.dettaglio.gridandamento.title") + ': <b>' + record.cd_art + '</b>'
    this.gridOrdiniInevasi.setTitle(titleOrdIn)
    let storeOrdiniInevasi = vm.getStore("storeOrdiniInevasi");
    storeOrdiniInevasi.loadData(rest.data.recordOrdini);

    const titleGiac = Locale.t("stt.forms.ritardi.dettaglio.gridgiacenza.title") + ': <b>' + record.cd_art + '</b>'
    this.gridGiacenze.setTitle(titleGiac);
    let storeGiacenze = vm.getStore("storeGiacenze");
    storeGiacenze.loadData(rest.data.recordGiacenze);

    const titleDdt = Locale.t("stt.forms.ritardi.dettaglio.gridddt.title") + ': <b>' + record.cd_art + '</b>'
    this.gridDdt.setTitle(titleDdt);
    let storeDdt = vm.getStore("storeDdt");
    storeDdt.loadData(rest.data.recordDdt);

    const titleOrdine = Locale.t("stt.forms.ritardi.dettaglio.gridordine.title") + ': <b>' + record.num_doc + '</b>'
    this.gridOrdine.setTitle(titleOrdine);
    vm.getStore("storeOrdine").loadData(rest.data.recordOrdine);

    vm.set("totOrdine", rest.data.totOrdine);
    vm.set("totConsegnato", rest.data.totConsegnato);
    vm.set("totInevaso", rest.data.totInevaso);
  },

})