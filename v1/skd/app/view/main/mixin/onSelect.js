Ext.define('skd.view.main.mixins.onSelect', {
  onSelectFilterLabCdl: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridLab = vm.getStore("storeGridLabCdl");

    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridLab.data.length; i++) {
      if (storeGridLab.data.items[i].data.sc_op_lab === record.data.sc_op_lab)
        return;
    }
    storeGridLab.insert(0, record);
  },
  onSelectFilterNote: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridNote = vm.getStore("storeGridNote");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridNote.data.length; i++) {
      if (storeGridNote.data.items[i].data.nota === record.data.nota) return;
    }
    storeGridNote.insert(0, record);
  },
  onSelectFilterPart: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridPart = vm.getStore("storeGridPart");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridPart.data.length; i++) {
      if (
        storeGridPart.data.items[i].data.sc_op_part_no ===
        record.data.sc_op_part_no
      )
        return;
    }
    storeGridPart.insert(0, record);
  },
  onSelectFilterOrder: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridOrder = vm.getStore("storeGridOrder");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridOrder.data.length; i++) {
      if (storeGridOrder.data.items[i].data.field === record.data.field) return;
    }
    storeGridOrder.insert(0, record);
  },
  onSelectFilterReparto: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridReparto = vm.getStore("storeGridReparto");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridReparto.data.length; i++) {
      if (
        storeGridReparto.data.items[i].data.rep_cdl_department_no ===
        record.data.rep_cdl_department_no
      )
        return;
    }
    storeGridReparto.insert(0, record);
  },
  onSelectFilterOperatore: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridOperatore = vm.getStore("storeGridOperatore");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridOperatore.data.length; i++) {
      if (
        storeGridOperatore.data.items[i].data.ope_operatore ===
        record.data.ope_operatore
      )
        return;
    }
    storeGridOperatore.insert(0, record);
  },

  onSelectFilterPreparatore: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridPreparatore = vm.getStore("storeGridPreparatore");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridPreparatore.data.length; i++) {
      if (
        storeGridPreparatore.data.items[i].data.ope_operatore ===
        record.data.ope_operatore
      )
        return;
    }
    storeGridPreparatore.insert(0, record);
  },
  onSelectFilterStato: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridStato = vm.getStore('storeGridStato');
    combo.clearValue();
    if (!record.data) return;
    for (let i = 0; i < storeGridStato.data.length; i++) {
      if (storeGridStato.data.items[i].data.stato === record.data.stato) return;
    }
    storeGridStato.insert(0, record);
  },
  onSelectFilterComponent: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridComponent = vm.getStore("storeGridComponent");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridComponent.data.length; i++) {
      if (storeGridComponent.data.items[i].data.part_no === record.data.part_no)
        return;
    }
    storeGridComponent.insert(0, record);
  },

  onSelectFilterCdl: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridCdl = vm.getStore("storeGridCdl");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridCdl.data.length; i++) {
      if (
        storeGridCdl.data.items[i].data.ope_work_center_no ===
        record.data.ope_work_center_no
      )
        return;
    }
    storeGridCdl.insert(0, record);
  },
  onSelectFilterCdlReparto: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridReparto = vm.getStore("storeGridCdlReparto");
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridReparto.data.length; i++) {
      if (
        storeGridReparto.data.items[i].data.rep_cdl_department_no ===
        record.data.rep_cdl_department_no
      )
        return;
    }
    storeGridReparto.insert(0, record);
  },
  onSelectFilterCdlCdl: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridCdl = vm.getStore("storeGridCdlCdl");
    combo.clearValue();
    if (!record.data) return;
    for (let i = 0; i < storeGridCdl.data.length; i++) {
      if (
        storeGridCdl.data.items[i].data.ope_work_center_no ===
        record.data.ope_work_center_no
      )
        return;
    }
    storeGridCdl.insert(0, record);
  },
  onSelectFilterOdp: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridOdp = vm.getStore("storeGridOdp");
    combo.clearValue();
    if (!record.data) return;
    for (let i = 0; i < storeGridOdp.data.length; i++) {
      if (
        storeGridOdp.data.items[i].data.sc_op_objstate ===
        record.data.sc_op_objstate
      )
        return;
    }
    storeGridOdp.insert(0, record);
  },
  onSelectFilterCdlOdp: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridOdpCdl = vm.getStore("storeGridOdpCdl");
    combo.clearValue();
    if (!record.data) return;
    for (let i = 0; i < storeGridOdpCdl.data.length; i++) {
      if (
        storeGridOdpCdl.data.items[i].data.sc_op_objstate ===
        record.data.sc_op_objstate
      )
        return;
    }
    storeGridOdpCdl.insert(0, record);
  },

  onSelectFilterOperazione: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridOperazione = vm.getStore("storeGridOperazione");
    combo.clearValue();
    if (!record.data) return;
    for (let i = 0; i < storeGridOperazione.data.length; i++) {
      if (
        storeGridOperazione.data.items[i].data.ope_oper_status_code ===
        record.data.ope_oper_status_code
      )
        return;
    }
    storeGridOperazione.insert(0, record);
  },
  onRemoveFilter: function (view, rowIndex) {
    view.getStore().removeAt(rowIndex);
  },

  onChangeRepartoFilter: function (view, rowIndex) {
    let grid = view.up("grid"),
      selection = view.getStore().getAt(rowIndex);

    if (selection.data["io"] === "in") {
      selection.data["io"] = "out";
    } else {
      selection.data["io"] = "in";
    }
    grid.getView().refreshNode(selection);
  },

  onChangeCdlFilter: function (view, rowIndex) {
    let grid = view.up("grid"),
      selection = view.getStore().getAt(rowIndex);

    if (selection.data["io"] === "in") {
      selection.data["io"] = "out";
    } else {
      selection.data["io"] = "in";
    }
    grid.getView().refreshNode(selection);
  },

  onChangeStatoFilter: function (view, rowIndex) {
    let grid = view.up("grid"),
      selection = view.getStore().getAt(rowIndex);

    if (selection.data["io"] === "in") {
      selection.data["io"] = "out";
    } else {
      selection.data["io"] = "in";
    }
    grid.getView().refreshNode(selection);
  },
})