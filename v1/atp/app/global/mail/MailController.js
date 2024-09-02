/**
 * Created by fabrizio on 20/01/2024.
 */
Ext.define("atp.global.mail.MailController", {
  onSendNewEmail: function () {
    let me = this,
      vm = me.getViewModel(),
      email = vm.get("email"),
      record = vm.get("record");

    email.mailto = record.data.mailto;
    const mailto = email.mailto && email.mailto.length > 0 ? email.mailto : false;

    // const mailto = email.mailto && email.mailto.length > 0 ? email.mailto : false;
    // email.corpo = email.corpo || "";
    // email.attach = email.attach && email.attach.length > 0 ? email.attach : [];

    if (!mailto) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        message: Locale.t("global.form.validation.form") + " " + Locale.t("atp.forms.attivita.cards.mail.fields.mailto"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return false;
    }
    me.view.el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      method: "POST",
      jsonData: { record: record.data, email: email },
      url: Backend.REST_API + "functions/form/sendsingle/",
      success: function (response) {
        me.onSuccessSendMail(response);
      },
      failure: function () {
        me.view.el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          message: '_Problemi durante l\'invio della email',
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR,
        });
      }
    });
  },

  onSuccessSendMail: function (response) {
    try {
      let me = this,
        vm = me.getViewModel(),
        storeMail = vm.getStore("storeMail"),
        r = Ext.decode(response.responseText);

      me.view.el.unmask();

      storeMail.add(r.sendMessage);

      // Abilito card info
      me.onClickCard({ posizione: 'info' });

      // Svuoto i valori della email
      vm.set('email', {
        corpo: "",
        mailto: [],
        mailfrom: "",
        listAttach: [],
      });

      // Avviso invio email con successo
      Ext.toast({
        html: '_Email inviata con successo',
        closable: false,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
      });
    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },
  onUploadAttach: function (field, value) {
    if (!value) {
      return; //ho annullato
    }

    this.onDrop(null, field.fileInputEl.dom);


  },
  afterRenderNewEmail: function (view) {
    let body = view.body;

    if (window.File && window.FileList && window.FileReader) {
      this.target = new Ext.drag.Target({
        element: body,
        listeners: {
          scope: this,
          dragenter: this.onDragEnter,
          dragleave: this.onDragLeave,
          drop: this.onDrop
        }
      });
    } else {
      body.down('.drag-file-label').setHtml(
        'File dragging is not supported by your browser'
      );
      body.el.addCls('nosupport');
    }
  },

  onDragEnter: function () {
    const b = this.getView().down("#v1-atp-dragattach");
    b.body.addCls('dd-active');
  },

  onDragLeave: function () {
    const b = this.getView().down("#v1-atp-dragattach");
    b.body.removeCls('dd-active');
  },
  onDrop: function (target, info) {
    let me = this,
      vm = me.getViewModel(),
      view = me.getView(),
      progress = view.down("progress"),
      panelDrop = view.down("#v1-atp-dragattach"),
      tagAttach = view.down('v1-atp-tagattach-combo'),
      files, len, s;

    files = info.files;
    len = files.length;

    if (len > 1) {
      s = '_Dropped ' + len + ' files.';
    } else {
      s = '_Dropped ' + files[0].name;
    }

    panelDrop.body.removeCls('dd-active');
    let formData = new FormData();
    for (let file of files) {
      formData.append('multi-files', file, file.name);
    }

    let oReq = new XMLHttpRequest();
    oReq.responseType = 'json';
    oReq.open("post", Backend.REST_API + 'uploadfiles/', true);
    oReq.setRequestHeader("token", Ext.global.Vars.infoUser.token); //autorizzazione chiamata

    oReq.upload.addEventListener("progress", function (oEvent) {
      if (oEvent.lengthComputable) {
        panelDrop.hide();
        progress.setHeight(24);
        let p = oEvent.loaded / oEvent.total;
        progress.setValue(p);
        progress.setText(Locale.t('global.upload.message.progress') + ' ' + (p * 100).toFixed(0) + '%');
      }
    });

    oReq.addEventListener("loadend", function (e) {
      if (e.currentTarget.status === 200) {
        let email = vm.get('email');
        for (let valore of e.currentTarget.response.valori) {
          let checkDup = email.listAttach.filter(val => val.file.toLowerCase() !== valore.file.toLowerCase());
          email.listAttach = [valore, ...checkDup];
          tagAttach.addValue(valore.file);
        }
      } else {
        s = "Errore caricamento file, operazione annullata!";
      }
      progress.setHeight(0);
      panelDrop.show();
      Ext.toast({
        html: s,
        closable: false,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
      });
    });

    oReq.addEventListener("error", function () {
      Ext.toast({
        html: 'Errore caricamento file',
        closable: false,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
      });
    });
    oReq.send(formData);
  },

});
