
Ext.define("prd.global.cdl.Controller", {
  extend: "portal.v1.view.forms.mainCard.Controller",
  requires: [
    "Ext.window.Toast",
    'Ext.drag.Target',
    'Ext.layout.container.Fit',
    'Ext.direct.Manager',
    'Ext.direct.PollingProvider'
  ],
  init: function () {
    let me = this,
      vm = me.getViewModel();

    vm.set("iconCls", `y-${me.getView().config.iconBrand}-icon`)
    let task = {
      run: function () {
        me.countSecond--;
        vm.set("contDown", me.countSecond)
        let lastCheck = vm.get("lastCheck")
        if (me.countSecond < 0) {
          vm.set("contDown", "Ultima ricezione: " + lastCheck + ", in attesa di ricezione da " + Math.abs(me.countSecond) + "s")
        } else {
          vm.set("contDown", "Ultima ricezione: " + lastCheck + ", ricezione tra " + me.countSecond + "s")
        }
      },
      interval: 1000
    };
    Ext.TaskManager.start(task);
  },

  onActivePanel: function () {

  },

  managerView: function () {

  },

  onStatusChange: function (values) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");

    me.countSecond = 10;
    let data = values.data.find(e => e.cdl === record.data.id)
    if (!data) {
      vm.set("statoConnessione", `<span style="color:red">Nessun dato ricevuto </span>`)
      return;
    }

    vm.set("lastCheck", Ext.Date.format(new Date(), "d/m/Y H:i:s"));

    // check orders opened
    for (const order of data.orders) {
      const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === order.id);
      if (pos) {
        this.listForms[pos].card.fireEvent("updateData", order);
      }
    }
    const posD = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'dashboard');
    if (posD) {
      let grid = this.listForms[posD].card.down('#gridOrder');
      if (grid)
        grid.getStore().loadData(data.orders)
    }

    // check all status ok

    if (data.status.agent.status !== 1 || data.status.cdl.folder !== 1 || data.status.cdl.localOrder !== 1 || data.status.cdl.status !== 1 || data.status.erp.connection !== 1) {
      vm.set("statoConnessione", `<span style="color:red">Errore</span>`)
    } else {
      vm.set("statoConnessione", `<span style="color:green;">OK</span>`)
    }

    // update satus
    vm.set("agent", data.status.agent)
    vm.set("cdl", data.status.cdl)
    vm.set("erp", data.status.erp)

  },
  onRendererStatus: function (value) {
    try {
      let text = value || "-",
        color = "red";

      switch (value) {
        case 1: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s1'); color = "green"; break;
        case 0: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s0'); break;
        case -1: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-1'); break;
        case -2: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-2'); break;
        case -3: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-3'); break;
        case -4: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-4'); break;
        case -5: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-5'); break;
        case -6: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-6'); break;
        case -7: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-7'); break;
        case -8: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-8'); break;
        case -9: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-9'); break;
        case -10: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-10'); break;
        case -11: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-11'); break;
        case -12: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-12'); break;
        case -13: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-13'); break;
        case -14: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-14'); break;
        case -19: text = Locale.t('prd.forms.cdl.cards.dashboard.status.list.s-99'); break;

        default:
          break;
      }
      return '<span style="color:' + color + ';">' + text + '</span>';
    } catch (error) {
      return value
    }
  }
})
