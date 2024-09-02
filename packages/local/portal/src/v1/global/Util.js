/**
 * Created by fabrizio on 28/01/21.
 */
let msgCt;
Ext.define('portal.v1.global.Util', {

  requires: [
    'Ext.dom.Helper',
    'Ext.layout.container.VBox',
    'Ext.panel.Panel',
    'Ext.window.Window',
    'portal.util.Locale'
  ],
  /* ---------------------------------------------------------------------------------
* setConfMod:
* ---------------------------------------------------------------------------------*/
  setConfMod: function () {
    this.setConfModRun++;
    let count = this.setConfModRun,
      task = new Ext.util.DelayedTask(function (count) {
        if (count === this.setConfModRun) {
          Ext.Ajax.request({
            method: 'POST',
            params: {
              'data': Ext.encode(Ext.global.Vars.confMod)
            },
            url: Backend.REST_API + 'setconfmod'
          });
        }
      }, this, [count]);
    task.delay(3000);
  },

  randomString: function (len) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
      randomstring = '';
    for (let i = 0; i < len; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  },
  //scarico file
  onDownloadFile: function (token) {
    let me = this
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      url: Backend.REST_VERSION + 'downloadfile',method:'PUT',binary:true,timeout:900000,
      params: {
        'token': token
      },
      success: function (response) {
        me.getView().el.unmask()
        let headers = response.getAllResponseHeaders()
        let filename=token //default
        //recupero filename dalla risposta
        let disposition = response.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        let blob = new Blob([response.responseBytes], {type: headers['content-type']})
        //creo area temporale per il download
        let a = document.createElement('a')
        document.body.appendChild(a)
        let url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = filename
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 0)
      },
      failure: function (response) {
        me.getView().el.unmask()
        let msg = response.getResponseHeader('messaggio');
        if (msg) {
          Ext.Msg.show({
            title: Locale.t('global.errore'),
            msg: 'Error: '+msg,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    })
  },
  //creazione record mongo x scarico allegato
  onGetAttach: function (grid, rowIndex) {
    let rec = grid.getStore().getAt(rowIndex);
    let me = this
    if (rec.data.isnew === 1) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.download.newattach'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING
      });
      return false
    }
    me.getView().el.mask(Locale.t("global.actions.incorso"));
    Ext.Ajax.request({
      url: Backend.REST_VERSION + 'getattach', method: 'POST',
      jsonData: {data:rec .data,iduser:Ext.global.Vars.infoUser.id,username:Ext.global.Vars.infoUser.email,tag:Ext.global.Vars.infoApp.version.tagapp},
      success: function (response) {
        me.getView().el.unmask()
        let resp = Ext.decode(response.responseText);
        me.onDownloadFile(resp['token'])
      },
      failure: function (response) {
        me.getView().el.unmask()
        let resp = Ext.decode(response.responseText);
        let errore = Locale.t('global.attach.errordownload') + ': ' + resp['msg']
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: errore,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      }
    })
  },
  //creazione record mongo x scarico immagine
  onGetAttachImage: function (grid, rowIndex) {
    let rec = grid.getStore().getAt(rowIndex)
    let me = this
    if (rec.data.isnew===1) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.download.newattach'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING
      });
      return false
    }
    Ext.Ajax.request({
      url: Backend.REST_VERSION + 'getattachimage', method: 'POST',
      jsonData: {data:rec .data,iduser:Ext.global.Vars.infoUser.id,username:Ext.global.Vars.infoUser.email,tag:Ext.global.Vars.infoApp.version.tagapp},
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        me.onDownloadImage(resp['token'])
      },
      failure: function (response) {
        let resp = Ext.decode(response.responseText);
        let errore = Locale.t('global.attach.errordownload') + ': ' + resp['msg']
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: errore,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });
      }
    })
  },
  onDownloadImage: function (token) {
    Ext.Ajax.request({
      url: Backend.REST_VERSION + 'downloadimage',method:'PUT',binary:true,
      params: {
        'token': token
      },
      success: function (response) {
        let headers = response.getAllResponseHeaders()
        let filename=token //default
        //recupero filename dalla risposta
        let disposition = response.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        let blob = new Blob([response.responseBytes], {type: headers['content-type']})
        //creo area temporale per il download
        let a = document.createElement('a')
        document.body.appendChild(a)
        let url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = filename
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 0)
      },
      failure: function (response) {
        let msg = response.getResponseHeader('messaggio');
        if (msg) {
          Ext.Msg.show({
            title: Locale.t('global.errore'),
            msg: 'Error: '+msg,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    })
  },
  onOpenImage: function (grid, rowIndex) {
    //verifico estensioni abilitate
    let allowedExt = ['.jpg','.jpeg','.png','.gif','.tiff']
    let rec = grid.getStore().getAt(rowIndex);
    if (rec.data.isnew===1) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.download.newattach'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING
      });
      return false
    }
    let me = this, estensione = rec.data.estensione
    if (allowedExt.indexOf(estensione.toLowerCase()) > -1) {
      me.getView().el.mask(Locale.t("global.actions.incorso"));
      Ext.Ajax.request({
        url: Backend.REST_VERSION + 'openimage', method: 'POST',binary: true,
        jsonData: {data:rec .data,iduser:Ext.global.Vars.infoUser.id,username:Ext.global.Vars.infoUser.email,tag:Ext.global.Vars.infoApp.version.tagapp},
        success: function (response) {
          me.getView().el.unmask()
          let headers = response.getAllResponseHeaders()
          let blob = new Blob([response.responseBytes], {type: headers['content-type']})
          let binaryimg = window.URL.createObjectURL(blob)
          me.winImage = Ext.create('Ext.Window',{
            scope:me, title:Locale.t('global.images.wintitle')+' <b>', width:700, height:600,
            resizable: true,scrollable:true,modal:true,
            layout: {type: 'vbox', align: 'center', pack: 'center'},
            items:[
              {xtype:'panel', cls:'srcImage', width:800, height:700, bodyStyle:{
                  'background-image':'url('+binaryimg+')',
                  'background-repeat': 'no-repeat',
                  'background-size':'contain'}
              }
            ]
          }).show();
        },
        failure: function (response) {
          me.getView().el.unmask()
          let resp = Ext.decode(response.responseText);
          let errore = Locale.t('global.attach.errordownload') + ': ' + resp['msg']
          Ext.Msg.show({
            title: Locale.t('global.errore'),
            msg: errore,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      })
    }
  },
  checkRuoli: function (ruoli) {
    if (!Ext.global.Vars.infoApp && !Ext.global.Vars.infoApp.ruoli) return false
    for (let r of Ext.global.Vars.infoApp.ruoli) {
      if (ruoli.filter(el => el === r.valore).length > 0) {
        return true
      }
    }
    return false
  },
  checkRuoliWidget: function (ruoli, wdg) {
    for (let r of wdg.ruoli) {
      if (ruoli.filter(el => el === r.valore).length > 0) {
        return true
      }
    }
    return false
  },
  zeroPad: function (nr, base) {
    let len = (String(base).length - String(nr).length) + 1;
    return len > 0 ? new Array(len).join('0') + nr : nr;
  },
  sizeformat: function (filesize) {
    if (filesize >= 1073741824) {
      filesize = this.numberFormat(filesize / 1073741824, 2, '.', '') + ' Gb';
    } else {
      if (filesize >= 1048576) {
        filesize = this.numberFormat(filesize / 1048576, 2, '.', '') + ' Mb';
      } else {
        if (filesize >= 1024) {
          filesize = this.numberFormat(filesize / 1024, 0) + ' Kb';
        } else {
          filesize = this.numberFormat(filesize, 0) + ' bytes';
        }
      }
    }
    return filesize;
  },
  numberFormat: function (number, decimals, dec_point, thousands_sep) {

    let n = number
    let c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    let d = dec_point === undefined ? "," : dec_point;
    let t = thousands_sep === undefined ? "." : thousands_sep
    let s = n < 0 ? "-" : "";
    let i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
    let ja = i.length > 3 ? j % 3 : 0;
    return s + (ja ? i.substr(0, ja) + t : "") + i.substr(ja).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  },
  checkMounth: function (n) {
    switch (n) {
      case 1:
        return Locale.t('global.calendar.mese.01');
      case 2:
        return Locale.t('global.calendar.mese.02');
      case 3:
        return Locale.t('global.calendar.mese.03');
      case 4:
        return Locale.t('global.calendar.mese.04');
      case 5:
        return Locale.t('global.calendar.mese.05');
      case 6:
        return Locale.t('global.calendar.mese.06');
      case 7:
        return Locale.t('global.calendar.mese.07');
      case 8:
        return Locale.t('global.calendar.mese.08');
      case 9:
        return Locale.t('global.calendar.mese.09');
      case 10:
        return Locale.t('global.calendar.mese.10');
      case 11:
        return Locale.t('global.calendar.mese.11');
      case 12:
        return Locale.t('global.calendar.mese.12');
    }

  },
  tipsHome: function () {


    function createBox(t, s, i) {
      if (i === '' || i == null) {
        i = 'fas fa-home  fa-size-64';
      }
      return '<div class="msg">' +
        '   <table style="border-collapse: collapse;">' +
        '       <tr>' +
        '           <td rowspan="2" style="width: 70px;height: 64px;"><span style="display:block;width: 64px;height: 64px;" class="x-btn-icon-el x-btn-icon-el-default-toolbar-large ' + i + '"></span></td>' +
        '           <td><h3>' + t + '</h3></td>' +
        '       </tr>' +
        '       <tr>' +
        '           <td>' + s + '</td>' +
        '       </tr>' +
        '   </table>' +
        '</div>';
    }

    return {
      msg: function (title, format, i) {
        if (!msgCt) {
          msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
        }
        let s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        let m = Ext.DomHelper.append(msgCt, createBox(title, s, i), true);
        m.hide();
        m.slideIn('t').ghost("t", { delay: 3000, remove: true });
      },
      init: function () {
        if (!msgCt) {
          msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
        }
      }
    };
  }()
});
