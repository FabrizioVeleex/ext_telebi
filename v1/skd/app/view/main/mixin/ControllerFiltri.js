Ext.define('skd.view.main.mixins.ControllerFiltri', {
  onAfterRender_filtri: function () {
    let vm = this.getViewModel();
    let confMod = Ext.global.Vars.confMod;

    if (confMod.main.filtri === undefined) {
      confMod.main.filtri = {
        active: true,
        active_cdl: true,
      };
    }
    if (confMod.main.filtripick === undefined) {
      confMod.main.filtripick = {};
    }
    if (confMod.main.filtripick.lead_time_code === undefined) {
      confMod.main.filtripick.lead_time_code = 0;
    }
    if (confMod.main.filtripick.producibilita === undefined) {
      confMod.main.filtripick.producibilita = 0;
    }

    if (confMod.main.filtriCdl === undefined) {
      confMod.main.filtriCdl = {};
    }
    if (confMod.main.filtri.active) {
      vm.set("iconFiltri", "fas fa-caret-square-up");
    }
    if (confMod.main.filtri.active_cdl) {
      vm.set("iconFiltriCdl", "fas fa-caret-square-up");
    }

    if (!confMod.main.filtriCdl.widthNote) {
      confMod.main.filtriCdl.widthNote = 200;
    }
    if (!confMod.main.filtri.giacenza) {
      confMod.main.filtri.giacenza = 0;
    }
    if (!confMod.main.filtri.acquisti) {
      confMod.main.filtri.acquisti = true;
    }
    if (!confMod.main.filtri.produzione) {
      confMod.main.filtri.produzione = true;
    }

    if (confMod.main.tabActive === "") {
      confMod.main.tabActive = "gridLab";
    }

    if (confMod.main.connection === undefined) {
      confMod.main.connection = "JZGAnSvTuN0PRALJmdppdpGR1nSKMvW9";
      // confMod.main.connection = 'WU9W2a4eQPWxkpiPeVuNEopwVnNlCG0C';
    }

    if (confMod.main.filtri.listLab) {
      let storeGridLab = vm.getStore("storeGridLab");
      for (let i = 0; i < confMod.main.filtri.listLab.length; i++) {
        storeGridLab.add({ sc_op_lab: confMod.main.filtri.listLab[i] });
      }
    }
    if (confMod.main.filtri.listPart) {
      let storeGridPart = vm.getStore("storeGridPart");
      for (let i = 0; i < confMod.main.filtri.listPart.length; i++) {
        storeGridPart.add({ sc_op_part_no: confMod.main.filtri.listPart[i] });
      }
    }

    if (confMod.main.filtri.listOrder) {
      let storeGridOrder = vm.getStore("storeGridOrder");
      for (let i = 0; i < confMod.main.filtri.listOrder.length; i++) {
        let o = confMod.main.filtri.listOrder[i];
        let field = o[0] + " - " + o[1] + " - " + o[2];
        storeGridOrder.add({
          field: field,
          sc_op_order_no: o[0],
          sc_op_release_no: o[1],
          sc_op_sequence_no: o[2],
        });
      }
    }
    if (confMod.main.filtri.listReparto) {
      let storeGridReparto = vm.getStore("storeGridReparto");
      for (let i = 0; i < confMod.main.filtri.listReparto.length; i++) {
        storeGridReparto.add({
          rep_cdl_department_no: confMod.main.filtri.listReparto[i],
        });
      }
    }

    if (confMod.main.filtri.listCdl) {
      let storeGridCdl = vm.getStore("storeGridCdl");
      for (let i = 0; i < confMod.main.filtri.listCdl.length; i++) {
        storeGridCdl.add({
          ope_work_center_no: confMod.main.filtri.listCdl[i],
        });
      }
    }

    if (confMod.main.filtri.listOperatore) {
      let storeGridOperatore = vm.getStore("storeGridOperatore");
      for (let i = 0; i < confMod.main.filtri.listOperatore.length; i++) {
        storeGridOperatore.add({
          ope_operatore: confMod.main.filtri.listOperatore[i],
        });
      }
    }

    if (confMod.main.filtri.listOdp) {
      let storeGridOdp = vm.getStore("storeGridOdp");
      for (let i = 0; i < confMod.main.filtri.listOdp.length; i++) {
        storeGridOdp.add({ sc_op_objstate: confMod.main.filtri.listOdp[i] });
      }
    }

    if (confMod.main.filtri.listOperazione) {
      let storeGridOperazione = vm.getStore("storeGridOperazione");
      for (let i = 0; i < confMod.main.filtri.listOperazione.length; i++) {
        storeGridOperazione.add({
          ope_oper_status_code: confMod.main.filtri.listOperazione[i],
        });
      }
    }
  },
  onSelectFilterLab: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridLab = vm.getStore("storeGridLab");

    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridLab.data.length; i++) {
      if (storeGridLab.data.items[i].data.sc_op_lab === record.data.sc_op_lab)
        return;
    }
    storeGridLab.insert(0, record);
  },
  /* ---------------------------------------------------------------------------------------------------------
 * fireEvent : caricamento data store per le grids LAB,
 * ---------------------------------------------------------------------------------------------------------*/
  onLoadDataGrid: function (idgrid, other) {
    if (idgrid === "gridCdl") {
      this.onLoadDataGridCdl();
      return;
    }
    if (idgrid === "gridMancanti") {
      this.onLoadDataGridMancanti();
      return;
    }
    let me = this,
      i,
      vm = this.getViewModel(),
      filtri = vm.get("filtri"),
      storeGridLab = vm.getStore("storeGridLab"),
      storeGridPart = vm.getStore("storeGridPart"),
      storeGridOrder = vm.getStore("storeGridOrder"),
      storeGridReparto = vm.getStore("storeGridReparto"),
      storeGridCdl = vm.getStore("storeGridCdl"),
      storeGridOdp = vm.getStore("storeGridOdp"),
      storeGridOperatore = vm.getStore("storeGridOperatore"),
      storeGridOperazione = vm.getStore("storeGridOperazione"),
      form = this.filtri.getForm(),
      listLab = [],
      listOrder = [],
      listCdl = [],
      listOdp = [],
      listReparto = [],
      listOperatore = [],
      listOperazione = [],
      listPart = [];
    //TODO controllo dati filtri
    let work_day_dal = form.findField("work_day_dal");
    let work_day_al = form.findField("work_day_al");

    if (!work_day_dal.isValid() || !work_day_al.isValid()) {
      //TODO gestire alert
      return;
    }

    //FIXME controlla tipo data su cambiamento
    if (typeof filtri.work_day_dal === "object") {
      filtri.work_day_dal = Ext.Date.format(filtri.work_day_dal, "Y-m-d");
    }
    if (typeof filtri.work_day_al === "object") {
      filtri.work_day_al = Ext.Date.format(filtri.work_day_al, "Y-m-d");
    }

    //LAB
    let dataLab = storeGridLab.getData();
    for (i = 0; i < dataLab.items.length; i++) {
      listLab.push(dataLab.items[i].data["sc_op_lab"]);
    }
    filtri.listLab = listLab;

    //PART
    let dataPart = storeGridPart.getData();
    for (i = 0; i < dataPart.items.length; i++) {
      listPart.push(dataPart.items[i].data["sc_op_part_no"]);
    }
    filtri.listPart = listPart;

    //ORDER
    let dataOrder = storeGridOrder.getData();
    for (i = 0; i < dataOrder.items.length; i++) {
      let a = dataOrder.items[i].data;
      listOrder.push([
        a["sc_op_order_no"],
        a["sc_op_release_no"],
        a["sc_op_sequence_no"],
      ]);
    }
    filtri.listOrder = listOrder;

    //REPARTO
    let dataReparto = storeGridReparto.getData();
    for (i = 0; i < dataReparto.items.length; i++) {
      listReparto.push(dataReparto.items[i].data["rep_cdl_department_no"]);
    }
    filtri.listReparto = listReparto;

    //OPERATORE
    let dataCdl = storeGridCdl.getData();
    for (i = 0; i < dataCdl.items.length; i++) {
      listCdl.push(dataCdl.items[i].data["ope_work_center_no"]);
    }
    filtri.listCdl = listCdl;

    //OPERATORE
    let dataOperatore = storeGridOperatore.getData();
    for (i = 0; i < dataOperatore.items.length; i++) {
      listOperatore.push(dataOperatore.items[i].data["ope_operatore"]);
    }
    filtri.listOperatore = listOperatore;

    //ODP
    let dataOdp = storeGridOdp.getData();
    for (i = 0; i < dataOdp.items.length; i++) {
      listOdp.push(dataOdp.items[i].data["sc_op_objstate"]);
    }
    filtri.listOdp = listOdp;

    //OPERATORE
    let dataOperazione = storeGridOperazione.getData();
    for (i = 0; i < dataOperazione.items.length; i++) {
      listOperazione.push(dataOperazione.items[i].data["ope_oper_status_code"]);
    }
    filtri.listOperazione = listOperazione;

    // Ext.global.Vars.confMod.main.filtri.produzione =  filtri.produzione

    Ext.global.Vars.confMod.main.filtri = filtri;
    this.setConfMod();

    //ripulisco dati cruscotto
    this.onRemoveDataCruscotto();
    vm.set("selectCell", null);
    vm.set("infoCell", null);
    vm.set("row", null);

    filtri["idGrid"] = idgrid;

    if (other === true) {
      this.getView().el.mask(Locale.t("skd.main.mask"));
    }
    Ext.Ajax.request({
      timeout: 220000,
      method: "POST",
      jsonData: Ext.global.Vars.confMod.main.filtri,
      url: Backend.REST_API + "grids/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.onAfterLoadDataGrid(idgrid, resp);
          if (other === true) {
            me.onLoadOtherStore(idgrid);
          }
        } else {
          if (other === true) {
            me.getView().el.unmask();
            Ext.Msg.show({
              title: Locale.t("global.attenzione"),
              iconCls: "fas fa-info",
              msg: resp["msg"],
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.INFO,
            });
          }
        }
      },
      failure: function (response) {
        //TODO messaggio errore su loaddata gtid
        me.getView().el.unmask();
      },
    });
  },
})