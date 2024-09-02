Ext.define('skd.view.main.mixins.ControllerFiltriCdl', {


  onAfterRender_filtri_cdl: function () {
    let vm = this.getViewModel();
    let confMod = Ext.global.Vars.confMod;

    if (confMod.main.filtriCdl.listLab) {
      let storeGridLabCdl = vm.getStore("storeGridLabCdl");
      for (let i = 0; i < confMod.main.filtriCdl.listLab.length; i++) {
        storeGridLabCdl.add({ sc_op_lab: confMod.main.filtriCdl.listLab[i] });
      }
    }


    if (confMod.main.filtriCdl.listComponent) {
      let storeGridComponent = vm.getStore("storeGridComponent");
      for (let i = 0; i < confMod.main.filtriCdl.listComponent.length; i++) {
        storeGridComponent.add({
          part_no: confMod.main.filtriCdl.listComponent[i],
        });
      }
    }

    if (confMod.main.filtriCdl.listRep) {
      let storeGridCdlRep = vm.getStore("storeGridCdlReparto");
      for (let i = 0; i < confMod.main.filtriCdl.listRep.length; i++) {
        storeGridCdlRep.add({
          rep_cdl_department_no: confMod.main.filtriCdl.listRep[i][0],
          io: confMod.main.filtriCdl.listRep[i][1],
        });
      }
    }

    if (confMod.main.filtriCdl.listCdl) {
      let storeGridCdlCdl = vm.getStore("storeGridCdlCdl");
      for (let i = 0; i < confMod.main.filtriCdl.listCdl.length; i++) {
        storeGridCdlCdl.add({
          ope_work_center_no: confMod.main.filtriCdl.listCdl[i][0],
          io: confMod.main.filtriCdl.listCdl[i][1],
        });
      }
    }

    if (confMod.main.filtriCdl.listStato) {
      let storeGridStato = vm.getStore("storeGridStato");
      for (let i = 0; i < confMod.main.filtriCdl.listStato.length; i++) {
        storeGridStato.add({
          stato: confMod.main.filtriCdl.listStato[i][0],
          io: confMod.main.filtriCdl.listStato[i][1],
        });
      }
    }

    if (confMod.main.filtriCdl.listPreparatori) {
      let storeGridPreparatore = vm.getStore("storeGridPreparatore");
      for (
        let i = 0;
        i < confMod.main.filtriCdl.listPreparatori.length;
        i++
      ) {
        storeGridPreparatore.add({
          ope_operatore: confMod.main.filtriCdl.listPreparatori[i],
        });
      }
    }
  },
  onLoadDataGridCdl: function () {
    let me = this,
      i,
      vm = this.getViewModel(),
      filtriCdl = vm.get("filtriCdl"),
      storeGridLab = vm.getStore("storeGridLabCdl"),
      storeGridNote = vm.getStore("storeGridNote"),
      storeGridOdp = vm.getStore("storeGridOdpCdl"),
      storeGridRep = vm.getStore("storeGridCdlReparto"),
      storeGridCdl = vm.getStore("storeGridCdlCdl"),
      storeGridStato = vm.getStore("storeGridStato"),
      storeGridPreparatore = vm.getStore("storeGridPreparatore"),
      storeGridComponent = vm.getStore("storeGridComponent"),
      form = this.filtriCdl.getForm(),
      orderCdl = vm.get("valueOrderCdl"),
      listLab = [],
      listNota = [],
      listRep = [],
      listCdl = [],
      listStato = [],
      listComponent = [],
      listPreparatori = [],
      listOdp = [];

    //ODP
    let dataOdp = storeGridOdp.getData();
    for (i = 0; i < dataOdp.items.length; i++) {
      listOdp.push(dataOdp.items[i].data["sc_op_objstate"]);
    }
    filtriCdl.listOdp = listOdp;

    //LAB
    let dataLab = storeGridLab.getData();
    for (i = 0; i < dataLab.items.length; i++) {
      listLab.push(dataLab.items[i].data["sc_op_lab"]);
    }
    filtriCdl.listLab = listLab;
    filtriCdl.lab = form.findField("labfree").getValue();
    filtriCdl.notlab = form.findField("notlab").getValue();

    //NOTE
    let dataNote = storeGridNote.getData();
    for (i = 0; i < dataNote.items.length; i++) {
      listNota.push(dataNote.items[i].data["nota"]);
    }
    filtriCdl.listNota = listNota;
    filtriCdl.nota = form.findField("notafree").getValue();
    // filtriCdl.ritardo = form.findField("ritardo").getValue();
    filtriCdl.in_produzione = form.findField("in_produzione").getValue();

    // filtriCdl.stato = form.findField("stato").getValue();
    // if (filtriCdl.stato === null) {
    //   filtriCdl.stato = "ALL";
    // }

    //REPARTO
    let dataRep = storeGridRep.getData();
    for (i = 0; i < dataRep.items.length; i++) {
      listRep.push([
        dataRep.items[i].data["rep_cdl_department_no"],
        dataRep.items[i].data["io"],
      ]);
    }

    //CDL
    let dataCdl = storeGridCdl.getData();
    for (i = 0; i < dataCdl.items.length; i++) {
      listCdl.push([
        dataCdl.items[i].data["ope_work_center_no"],
        dataCdl.items[i].data["io"],
      ]);
    }

    //STATO
    let dataStato = storeGridStato.getData();
    for (i = 0; i < dataStato.items.length; i++) {
      listStato.push([
        dataStato.items[i].data["stato"],
        dataStato.items[i].data["io"],
      ]);
    }


    //PREPARATORE
    let dataPreparatore = storeGridPreparatore.getData();
    for (i = 0; i < dataPreparatore.items.length; i++) {
      listPreparatori.push(dataPreparatore.items[i].data["ope_operatore"]);
    }

    //COMPONENT
    let dataComponent = storeGridComponent.getData();
    for (i = 0; i < dataComponent.items.length; i++) {
      listComponent.push(dataComponent.items[i].data["part_no"]);
    }

    filtriCdl.idGrid = "gridCdl";
    filtriCdl.listPreparatori = listPreparatori;
    filtriCdl.listComponent = listComponent;
    filtriCdl.listCdl = listCdl;
    filtriCdl.listStato = listStato;
    filtriCdl.listRep = listRep;
    filtriCdl.listLab = listLab;
    filtriCdl.orderCdl = orderCdl;
    // filtriCdl.listStato = listStato;
    filtriCdl.lab = form.findField("labfree").getValue();
    filtriCdl.notlab = form.findField("notlab").getValue();
    // filtriCdl.in_produzione = form.findField("in_produzione").getValue();

    Ext.global.Vars.confMod.main.filtriCdl = filtriCdl;
    this.setConfMod();

    //ripulisco dati cruscotto
    this.onRemoveDataCruscotto();
    vm.set("selectCell", null);
    vm.set("infoCell", null);
    vm.set("row", null);

    this.getView().el.mask("Caricamento dati in corso...");
    Ext.Ajax.request({
      timeout: 220000,
      method: "POST",
      jsonData: filtriCdl,
      url: Backend.REST_API + "grids/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.getView().el.unmask();
          me.gridCdl.fireEvent("prepareStoreData", resp, null);
        } else {
          //TODO messaggio errore su loaddata gtid
          me.getView().el.unmask();
        }
      },
      failure: function (response) {
        //TODO messaggio errore su loaddata gtid
        me.getView().el.unmask();
      },
    });
  },

})