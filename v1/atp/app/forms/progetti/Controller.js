/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  alias: 'controller.v1-atp-form-progetti',
  mixins: [
    'portal.v1.global.Util',
    'atp.forms.progetti.cards.progetti.Controller',
    'atp.global.mail.MailController'
  ],
  requires: [
    "Ext.window.Toast",
    'atp.forms.progetti.Model',
    "atp.forms.progetti.controller.ManagerBtn",
    "atp.forms.progetti.controller.ManagerCards",
  ],

  init: function () {
    let vm = this.getViewModel();
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('atp.forms.progetti.Model', {
      id: this.getView().valori.id,
      isnew: this.getView().valori.isnew
    }))
    this.callParent(arguments)
  },

  managerView: function () {
    this.callParent(arguments)
    let me = this,
      vm = me.getViewModel(),
      isnew = vm.get('isnew'),
      record = vm.get('record'),
      readOnly = true,
      managerBtn = Ext.create("atp.forms.progetti.controller.ManagerBtn"),
      managerCards = Ext.create("atp.forms.progetti.controller.ManagerCards"),
      storemail = vm.getStore("storeMail"),
      storeRuoli = vm.getStore("storeConnectedUsers"),
      storeTodo = vm.getStore("storeTodo"),
      storeSottoAttivita = vm.getStore("storeSubActivity"),
      todos = record.data.toDo,
      ruoli = record.data.connectedUsers,
      sottoAttivita = record.data.subActivities

    vm.set('readOnly', readOnly);

    vm.set('title', Locale.t('atp.forms.projects.label') || 'n.d.')
    vm.set('label', Locale.t('atp.forms.projects.title'))

    managerBtn.insertBtn(me, record, this.toolBar);

    // Gestione Cards
    managerCards.cards(me, record);

    vm.set("toolbar.hideCard", false);

    if (record.data.isnew === 0) {
      for (const ruolo of ruoli) {
        // ruolo.id = me.randomString(32);
        ruolo.isnew = 0;
        ruolo.action = 0;
      }
      for (const todo of todos) {
        todo.isnew = 0
        todo.action = 0
      }
      for (const sottoAtt of sottoAttivita) {
        sottoAtt.isnew = 0
        sottoAtt.action = 0
      }
    }
    if (this.checkRuoli(['99', "10"])) {
      ruoli.push({
        action: 1,
        isnew: 1,
        id: me.randomString(32),
        idUser: null,
        idRole: null,
        role: null,
        nameSurname: null,
        creationDate: new Date()
      })
      todos.push({
        action: 1,
        isnew: 1,
        id: me.randomString(32),
        checkedTodo: false,
        title: " ",
        priority: null,
        status: null,
        expireDate: new Date()
      })
      sottoAttivita.push({
        action: 1,
        isnew: 1,
        id: me.randomString(32),
        idFather: record.id,
        title: "",
        description: "",
        activityType: "",
        priority: null,
        expireDate: new Date(),
        toDo: [],
        connectedUsers: [],
        comments: [],
        status: null,
        progress: null,
        attachments: [],
        gridPos: 0,
        completed: null,
        owner: {
          idUser: "",
          nameSurname: ""
        }
      })
    }
    storeRuoli.setData(ruoli)
    storeTodo.setData(todos)
    storeSottoAttivita.setData(sottoAttivita)

    storemail.setData(record.data.send)
  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('atp.grids.progetti.Model', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, NewRecord, 1);
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('atp.forms.progetti.Panel', {
      itemId: 'f' + record.data['id'],
      record: record,
      storeForm: view.getStore(),
      valori: {
        id: record.data['id'],
        isnew: isnew
      }
    }), view)
  },

  onSave: function () {
    // if (!this.obb()) {
    //   return false;
    // }
    let me = this, vm = me.getViewModel(), storeTodo = vm.getStore("storeTodo"), storeSottoAttivita = vm.getStore("storeSubActivity")
    let todos = storeTodo.data.items.map((el) => el.data)
    let att = storeSottoAttivita.data.items.map((el) => el.data)
    vm.set("record.toDo", todos)
    vm.set("record.subActivities", att)
    this.callParent(arguments)
  },

  beforeEditGridAssociazioneRuoli: function (editor, context) {
    this.gridRecord = context.record.data
  },
  inserimentoRecordAssociazioneRuoli: function (editor, context) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('storeConnectedUsers')

    if (context.value !== context.originalValue) {
      context.record.set("action", 1)
    }

    if (context.record.get('idUser') !== null && context.record.get('idRole') !== null && context.record.get('idUser') !== "" && context.record.get('idRole') !== "") {
      if (context.rowIdx === (store.data.length - 1)) {
        store.add({
          action: 1,
          isnew: 1,
          id: me.randomString(32),
          idUser: null,
          idRole: null,
          nominativo: "",
          role: "",
        })
      }
    }
  },

  beforeEditGridTodo: function (editor, context) {
    this.gridRecord = context.record.data
  },
  inserimentoRecordTodo: function (editor, context) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('storeTodo')

    if (context.value !== context.originalValue) {
      context.record.set("action", 1)
    }

    if (context.record.get('titleTodo') !== null && context.record.get('titleTodo') !== "" && context.record.get('priorityTodo') !== null && context.record.get('statusTodo') !== null) {
      if (context.rowIdx === (store.data.length - 1)) {
        store.add({
          action: 1,
          isnew: 1,
          id: me.randomString(32),
          checkedTodo: false,
          titleTodo: "",
          priorityTodo: null,
          statusTodo: null,
          expireDateTodo: new Date()
        })
      }
    }
  },
  beforeEditGridSubActivity: function (editor, context) {
    this.gridRecord = context.record.data
  },
  inserimentoRecordSubActivity: function (editor, context) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('storeSubActivity')

    if (context.value !== context.originalValue) {
      context.record.set("action", 1)
    }

    if (context.record.get('title') !== null && context.record.get('title') !== "" && context.record.get('priority') !== null && context.record.get('status') !== null) {
      if (context.rowIdx === (store.data.length - 1)) {
        store.add({
          action: 1,
          isnew: 1,
          id: me.randomString(32),
          idFather: context.record.get('id'),
          title: "",
          description: "",
          activityType: "",
          priority: null,
          expireDate: new Date(),
          toDo: [],
          connectedUsers: [],
          comments: [],
          status: null,
          progress: null,
          attachments: [],
          gridPos: 0,
          completed: null,
          owner: {
            idUser: "",
            nameSurname: ""
          }
        })
      }
    }
  },
  // obb: function () {
  //   debugger
  //   let modulo = this.cardAccesso.getForm()
  //   if (!modulo.isValid()) {
  //     Ext.Msg.show({
  //       title: Locale.t('global.attenzione'),
  //       msg: Locale.t('global.form.validation.modulo'),
  //       buttons: Ext.Msg.OK,
  //       icon: Ext.MessageBox.ERROR
  //     });
  //     return false;
  //   }
  //   return true;
  // },

  onOpenSubActivity: function (view, rowIndex, colIndex, item, opt, record) {
    let me = this,
      itemId = record.data.id,
      tab = me.form.child('#' + itemId);

    if (tab) {
      me.onClickCard({ posizione: itemId });
      me.form.setActiveItem(tab);
      return true
    }
    // avvio apertura card completamento invio proposta
    let newOrd = {
      posizione: itemId,
      backgroundColor: "LightBlue",
      card: Ext.create("Ext.panel.Panel", {
        posizione: itemId,
        itemId: itemId,
        valori: {
          record: record.data
        }

      }),
      btn: {
        xtype: "splitbutton",
        text: record.data.titolo,
        iconCls: "fas fa-list",
        posizione: itemId,
        ui: 'green',
        handler: "onClickCardSubActivity",
        enableToggle: true,
        userCls: 'y-arrow-button-right',
        listeners: {
          arrowclick: "onClickCardSubActivityClose"
        }
      }
    }

    newOrd.card.on("closePanel", "onClickCardSubActivityClose");
    //Aggiungo cards

    me.toolBarCard.add(newOrd.btn)
    me.listForms.push(newOrd)

    me.form.add(newOrd.card);
    me.form.setActiveItem(newOrd.card);
    me.onClickCard({ posizione: itemId });
  },
  onClickCardTodo: function (btn) {
    let me = this,
      itemId = btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.setActiveItem(tab);

    me.onClickCard({
      posizione: btn['posizione'],
    });
  },
  onClickCardSubActivityClose: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      storeSubActivity = vm.getStore("storeSottoAttivita"),
      itemId = btn['posizione'],
      tab = me.form.child('#' + itemId);


    if (btn.posizione === "newOrd") {
      vm.set("disableBtnNewOrd", false);
      storeSubActivity.load();
    }
    me.form.remove(tab);
    me.toolBarCard.remove(btn)
    me.listForms = me.listForms.filter((obj) => {
      return obj.posizione !== btn.posizione;
    });

    me.onClickCard({
      posizione: "sottoAttivita",
    });
  }
});