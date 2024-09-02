/**
 * Created by fabrizio on 14/09/16.
 */
Ext.define("home.view.imp.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.impostazioni",

  requires: [
    "Ext.button.Button",
    "Ext.form.Panel",
    "Ext.form.field.Text",
    "Ext.layout.container.HBox",
    "Ext.menu.Menu",
    "Ext.panel.Panel",
    "Ext.toolbar.Toolbar",
    "Ext.window.Window",
    "home.view.imp.cards.ChangePassword",
    "home.view.imp.cards.Images",
    "home.view.imp.cards.InfoUser",
    "home.view.imp.cards.upload.WindowUpload",
  ],
  init: function () {
    let vm = this.getViewModel();
    //imposto campi profilo utente
    vm.set(
      "nominativo",
      Ext.global.Vars.infoUser.nome + " " + Ext.global.Vars.infoUser.cognome
    );
    vm.set("userlogin", Ext.global.Vars.infoUser.user);
    vm.set("ubicazione", Ext.global.Vars.infoUser.filiale.ubicazione);
    this.infoUser = Ext.create("home.view.imp.cards.InfoUser", {
      hidden: false,
    });
    this.images = Ext.create("home.view.imp.cards.Images", {
      hidden: true,
    });
    this.changePassword = Ext.create("home.view.imp.cards.ChangePassword", {
      hidden: true,
    });
    this.info = Ext.create("Ext.panel.Panel", {
      layout: {
        type: "hbox",
        align: "center",
        pack: "center",
      },
      bodyStyle: {
        "background-color": "transparent",
      },
      items: [this.infoUser, this.images, this.changePassword],
    });
    this.getView().add(this.info);
  },
  clearAll: function () {
    let view = this.getView();
    view.down("#oldpsw").setValue("");
    view.down("#pswr").setValue("");
    view.down("#psw").setValue("");
    view.down("#msgerror").update("");
    view.down("#match").update("");
    view.down("#changePanel").show();
    view.down("#completePanel").hide();
    const progress = view.down("#psw-progress");
    const progress1 = view.down("#pswr-progress");
    if (progress) {
      progress.el.child(".x-progress-bar", true).style.backgroundColor = "red";
      progress.setValue(0);
    }
    if (progress1) {
      progress1.el.child(".x-progress-bar", true).style.backgroundColor = "red";
      progress1.setValue(0);
    }
  },
  onChangePsw: function () {
    let view = this.getView();

    view.down("#msgerror").update("");
    const psw = view.down("#psw").value;
    const oldpsw = view.down("#oldpsw").value;
    const msgerror = view.down("#msgerror");
    const id = this.userId;
    view.el.mask("Richiesta inviata...");
    Ext.Ajax.request({
      method: "POST",
      params: {
        newpsw: psw,
        oldpsw: oldpsw,
      },
      url: Backend.REST_API + "forms/imp/changepsw/",
      success: function (response) {
        view.el.unmask();
        view.down("#changePanel").hide();
        view.down("#completePanel").show();
      },
      failure: function (response, opts) {
        view.el.unmask();
        if (response) {
          try {
            let res = Ext.decode(response.responseText);
            if (res["msg"]) {
              msgerror.update('<b style="color:red">' + res["msg"] + "</b>");
              return;
            }
            msgerror.update(
              '<b style="color:red">' + Locale.t("global.psw.error") + "</b>"
            );
          } catch (err) {
            msgerror.update(
              '<b style="color:red">' + Locale.t("global.psw.error") + "</b>"
            );
          }
        }
      },
    });
  },
  checkPsw: function (field) {
    let view = this.getView();
    view.down("#msgerror").update("");
    const savPassword = view.down("#savPassword");
    const oldpsw = view.down("#oldpsw").value;
    const psw = view.down("#psw").value;
    const pswr = view.down("#pswr").value;
    const progress = view.down("#" + field.itemId + "-progress");
    const match = view.down("#match");
    let password = field.getValue();

    let color = "red";

    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!()]+/)) {
      //TODO verificare tiuti caratteri speciali consigliati
      strength += 1;
    }
    if (password.length > 7) {
      strength += 1;
    }
    if (strength > 3) {
      color = "orange";
    }
    if (strength > 4) {
      color = "green";
    }
    let savepsw = 0,
        pswok = 0;
    if (psw !== pswr || strength<5) {
      if (strength < 5) {
        match.update(
            '<b style="color: red;">Requisiti password non soddisfatti</b>'
        );
        savPassword.disable();
      } else {
        match.update('<b style="color: red;">Le password sono differenti</b>');
        savPassword.disable();
      }
    } else {
      if (oldpsw === "") {
        match.update('<b style="color: red;">Inserire la password attuale</b>');
        savPassword.disable();
      } else {
        if (psw !== "" && pswr !== "") {
          pswok = 1;
          match.update('<b style="color: green">Le password coincidono</b>');
        }
      }
    }
    if (oldpsw !== "" && psw !== "" && pswr !== "" && pswok === 1) {
      savepsw = 1;
    }
    if (savepsw === 1) {
      savPassword.enable();
    }
    if (progress) {
      progress.el.child(".x-progress-bar", true).style.backgroundColor = color;
      progress.setValue(strength / 5);
    }
  },

  goToChangePassword: function () {
    this.images.hide();
    this.infoUser.hide();
    this.changePassword.show();

    this.clearAll();
  },
  goToImages: function () {
    this.images.show();
    this.infoUser.hide();
    this.changePassword.hide();
  },
  goToInfo: function () {
    this.images.hide();
    this.infoUser.show();
    this.changePassword.hide();
  },
  onCloseImpostazioni: function () {
    this.getView().fireEvent("close", this);
  },

  onImagesItemclick: function (view, recordImg) {
    let me = this;
    let record = this.getView().record;

    if (recordImg.data.isnew === 1) {
      let windowAttach = Ext.create("home.view.imp.cards.upload.WindowUpload", {
        itemId: "a" + recordImg.data["id"],
        attachName: true, //true se obbligatorio titolo
        accept: ["jpg", "jpeg", "png", "gif"], //[] se no restrizione
        valori: {
          record: record,
          id: recordImg.id,
        },
      }).show();
      windowAttach.on("closeWindowAttach", this.onCloseWindowAttach, this);
    }
    if (recordImg.data.action === 0) {
      Ext.Ajax.request({
        scope: me,
        method: "PUT",
        url: Backend.REST_API + "forms/imp/setwallpaper/" + recordImg.data.id,
        success: function () {
          me.getView().fireEvent("setImageImp", recordImg.data.id);
        },
        failure(record, esito) {
          try {
            let rest = esito.error.response.responseJson;
            Ext.Msg.show({
              title: Locale.t("global.errore"),
              msg: rest["msg"],
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.ERROR,
            });
          } catch (e) {
            Ext.Msg.show({
              title: Locale.t("global.errore"),
              msg: Locale.t("global.error.server"),
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.ERROR,
            });
          }
        },
      });
    }
  },
  onCloseWindowAttach: function (window, valoriattach) {
    if (valoriattach["id"]) {
      let view = this.getView().down("viewimp");
      view.loadImages();
    }
  },
  onImagesItemcontextmenu: function (view, recordImg, item, index, e) {
    if (recordImg.data["isnew"] === 0 && recordImg.data["id"] !== "NULL") {
      let me = this,
        position = e.getXY(),
        menu = Ext.create("Ext.menu.Menu", {
          items: [
            {
              scope: me,
              text: "Rimuovi...",
              iconCls: "fas fa-trash",
              img: recordImg,
              view: view,
              handler: "removeImage",
            },
            {
              scope: me,
              text: "Rinomina...",
              iconCls: "fas fa-edit",
              img: recordImg,
              view: view,
              handler: "renameImage",
            },
          ],
        });
      menu.showAt(position);
    }
    e.stopEvent();
  },

  removeImage: function (recordImg) {
    let view = recordImg.view;
    let id = recordImg.img.data["id"],
      store = recordImg.view.getStore();
    Ext.Msg.show({
      iconCls: "fas fa-trash",
      title: Locale.t("home.impostazioni.titleremove"),
      msg: Locale.t("home.impostazioni.remove"),
      buttons: Ext.Msg.YESNO,
      fn: function (btn) {
        if (btn === "yes") {
          Ext.Ajax.request({
            url: Backend.REST_API + "forms/imp/delwallpaper/" + id,
            method: "DELETE",
            scope: this,
            success: function (response) {
              recordImg.view.loadImages();
            }, //TODO FAULIRE
          });
        }
      },
    });
  },
  renameImage: function (recordImg) {
    let me = this;
    this.winImage = Ext.create("Ext.Window", {
      scope: me,
      title: Locale.t("home.impostazioni.rename"),
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              xtype: "button",
              iconCls: "fas fa-backspace",
              action: "close",
              text: Locale.t("global.btn.close.text"),
              scope: me,
              handler: "onImagesItemclose",
            },
            {
              xtype: "button",
              iconCls: "fas fa-save",
              recordImg: recordImg,
              text: Locale.t("home.impostazioni.savetext"),
              scope: me,
              handler: "onImagesItemclose",
            },
          ],
        },
      ],
      items: [
        {
          xtype: "form",
          padding: 15,
          width: 350,
          items: [
            {
              fieldLabel: Locale.t("home.impostazioni.titolo"),
              xtype: "textfield",
              value: recordImg.img.data["titolo"],
            },
          ],
        },
      ],
    }).show();
  },
  onImagesItemclose: function (btn) {
    let me = this;
    if (btn.action !== "close") {
      let titolo = this.winImage.down("textfield").getValue();
      if (btn.recordImg.img.data["titolo"] !== titolo) {
        let id = btn.recordImg.img.data["id"],
          store = btn.recordImg.view.getStore(),
          rec = store.findRecord("id", btn.recordImg.img.data["id"]);
        rec.data["titolo"] = titolo;
        Ext.Ajax.request({
          method: "PUT",
          scope: me,
          params: { titolo: titolo },
          url: Backend.REST_API + "forms/imp/renamewallpaper/" + id,
        });
        btn.recordImg.view.refresh();
      }
    }
    this.winImage.destroy();
  },
});
