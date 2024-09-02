Ext.define("itm.forms.articolo.controller.ControllerDocs", {
  managerViewDocs: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');

    this.listImages = ['png', 'jpg', 'gif', 'jpeg']
    this.listFileEnable = ['png', 'jpg', 'gif', 'jpeg', 'pdf']
    me.updTextCardDocs()

  },
  updTextCardDocs: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');


    let qta = record.data['griddocs'].length
    const pos = Object.keys(this.toolBarCard.items.items).find(key => this.toolBarCard.items.items[key]['posizione'] === 'docs');
    if (pos !== -1) {
      this.toolBarCard.items.items[pos].setText(Locale.t("itm.forms.articolo.cards.docs.text") + ' [' + qta + ']')
    }
    const posCard = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'docs');
    if (posCard !== -1) {
      let card = this.listForms[posCard].card;
      let store = card.getViewModel().getStore('storeDocs')
      store.loadData(record.data['griddocs'], false)
      if (!readOnly) {
        store.add(Ext.create('itm.forms.articolo.component.gridDocs.ModelDocs', {
          action: 1, isnew: 1, id: me.randomString(32), type: 'img'
        })
        )
      }

    }

  },
  onOperationClickDocs: function (obj) {
    let grid = obj.up('grid'),
      store = grid.getStore();

    let record = obj.getWidgetRecord()
    if (this.listImages.includes(record.data.estensione.replace('.', ''))) {
      if (record.data.predefinito !== 1) {
        for (let row of store.data.items) {
          if (row.id !== record.data.id) {
            row.data.predefinito = 0
            let a = grid.down(`button[userCls~=pred_${row.id}]`)
            a.fireEvent('updateIcon')
          } else {
            obj.setIconCls('x-fas fa-star fa-xl y-predefinito-icon-active')
            obj.setTooltip('Predefinito')
            row.data.predefinito = 1
          }
        }
      }
    } else {
      obj.setIconCls('y-predefinito-icon')
      obj.setTooltip('Disabilitato')
    }
  },

  onAfterRenderPredefinito: function (obj) {
    let record = obj.getWidgetRecord()
    if (this.listImages.includes(record.data.estensione.replace('.', ''))) {
      if (record.data.predefinito === 0) {
        obj.setIconCls('y-predefinito-icon')
        obj.setTooltip('Setta come predefinito')
      } else {
        obj.setIconCls('x-fas fa-star fa-xl y-predefinito-icon-active')
        obj.setTooltip('Predefinito')
      }
    } else {
      obj.setIconCls('y-predefinito-icon')
      obj.setTooltip('Disabilitato')
    }
  },

  onAfterRenderSelectType: function (obj) {
    let me = this,
      vm = me.getViewModel(),
      readOnly = vm.get('readOnly');


    let widget = record = obj.getWidgetRecord();
    let id = widget.data.id


    obj.add(
      {
        xtype: 'form',
        heigth: 128,
        width: 128,
        bodyStyle: { 'background-color': "transparent" },
        layout: 'fit',
        itemId: 'SS_' + id,
        hidden: !widget.data.isnew,
        items: [
          {
            xtype: 'radiogroup',
            widget: widget,
            columns: 1,
            vertical: true,
            items: [
              {
                boxLabel: 'Immagine',
                name: 'type',
                inputValue: 'img',
                checked: true
              }, {
                boxLabel: 'pdf',
                name: 'type',
                inputValue: 'pdf',

              }, {
                boxLabel: 'Video',
                name: 'type',
                inputValue: 'video',
              }
            ],
            listeners: {
              change: function (radio, newValue, oldValue) {
                radio.widget.set('type', newValue.type)
                if (newValue.type === 'video') {
                  radio.widget.set('columnLink', true)
                } else {
                  radio.widget.set('columnLink', false)
                }

              }
            }
          }
        ],
      }

    )
  },
  onAfterRenderWidget: function (obj) {
    let me = this,
      vm = me.getViewModel(),
      readOnly = vm.get('readOnly');


    let widget = record = obj.getWidgetRecord();
    let id = widget.data.id
    let upd = null;

    if (widget.data.isnew === 1) {
      upd = Ext.create('portal.v1.view.main.global.upload.Image').on("returnRequest", "onReturnRequestAttach").on("updateImgNew", "onUpdateImgNew")
      upd.fireEvent("updateInfo", {
        url: "", src: "", thumb: true, descrizione: "", readOnly: readOnly, rif: id, type: this.listFileEnable, disableUndo: true
      });
    }

    obj.add(
      {
        xtype: 'image',
        itemId: 'I_' + id,
        hidden: widget.data.upload,
        width: 128,
        height: 128,
        alt: 'Default image',
        src: widget.data.image
      },
      {
        xtype: 'panel',
        heigth: 128,
        width: 128,
        itemId: 'S_' + id,
        hidden: !widget.data.upload,
        items: [
          upd
        ],
      }
    )

  },

  onUpdateImgNew: function (info) {
    let headers = info.response.getAllResponseHeaders()
    let blob = new Blob([info.response.responseBytes], { type: headers['content-type'] })
    let binaryImg = window.URL.createObjectURL(blob)

    const posCard = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'docs');
    if (posCard !== -1) {
      let card = this.listForms[posCard].card;
      let panel = card.down('#S_' + info.rifimg)
      panel.down('#image').setSrc(binaryImg)
    }
  },

  onReturnRequestAttach: function (res, rifimg) {
    let me = this;
    const posCard = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'docs');
    if (posCard !== -1) {
      // generazione nuova riga di inserimento immagine
      let card = this.listForms[posCard].card;
      let storeDocs = card.getViewModel().getStore('storeDocs')
      let row = storeDocs.getById(rifimg)
      row.set('res', res.valori)
      row.set("oggetto", res.valori.file)
      row.set("dimensione", me.sizeformat(res.valori.dimensione))

      let newRow = Ext.create('itm.forms.articolo.component.gridDocs.ModelDocs', {
        action: 1, isnew: 1, id: me.randomString(32), type: 'img'
      })
      storeDocs.add(newRow)
    }
  },

  onDeleteImage: function (view, rowIndex, colIndex, item, opt, record) {
    const posCard = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'docs');
    if (posCard !== -1) {
      if (record.data.isnew === 1) {
        if (record.data.dimensione !== 0) {
          record.set('hidden', true);
          let card = this.listForms[posCard].card;
          let storeDocs = card.getViewModel().getStore('storeDocs')
          let panel = card.down('#S_' + record.data.id)
          let image = panel.down('v1-global-image')
          image.fireEvent('undoImage')
        }
      } else {
        if (record.data.action === 2) {
          record.set('action', 0)
        } else {
          record.set('action', 2)
        }
      }

    }
  },

  onOpenDoc: function (view, record) {
    if (record.data.estensione === '') {
      return
    }

    let me = this,
      itemId = record.data['id'],
      tab = me.form.child('#f' + itemId);

    if (tab) {
      me.form.setActiveItem(tab);

      return true
    }
    tab = Ext.create("itm.forms.articolo.component.gridDocs.PanelPreview", {
      itemId: 'f' + itemId,
      posizione: itemId,
      title: record.data.oggetto,
      valori: record.data
    })
    this.toolBarCard.add({
      xtype: "splitbutton",
      itemId: 'f' + itemId,
      text: record.data.oggetto,
      iconCls: "icon-" + record.data.estensione.replace(".", ""),
      posizione: itemId,
      enableToggle: true,
      ui: 'ocra',
      handler: "onClickCardImage",
      userCls: 'y-arrow-button-right',
      listeners: {
        arrowclick: "onClickCardImageClose"
      }
    })

    me.form.add(tab);
    me.form.setActiveItem(tab);
    me.onClickCard({ posizione: itemId });

  },

  onClickCardImage: function (btn) {
    let me = this,
      itemId = 'f' + btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.setActiveItem(tab);
    me.onClickCard({ posizione: btn['posizione'] });
  },
  onClickCardImageClose: function (btn) {
    let me = this,
      itemId = 'f' + btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.remove(tab);
    this.toolBarCard.remove(btn)
    me.onClickCard({
      posizione: "docs",
    });
  },

  onAfterRenderPreview: function (obj) {
    if (obj.valori.estensione === '.pdf') {
      obj.add({
        xtype: "panel",
        layout: 'fit',
        items: [
          {
            xtype: 'panel',
            layout: {
              type: 'hbox',
              align: 'center',
              pack: 'center'
            },
            items: [
              { xtype: "component", html: '<span style="font-size:xx-large;">Caricamento in corso....</span>' }
            ]
          }
        ]

      });

      Ext.Ajax.request({
        url: Backend.REST_API + "forms/articolo/getpdf/",
        method: "POST",
        binary: true,
        jsonData: {
          record: obj.valori,
        },
        success: function (response) {
          let headers = response.getAllResponseHeaders();
          let blob = new Blob([response.responseBytes], { type: headers["content-type"] });
          let binarypdf = window.URL.createObjectURL(blob);

          obj.removeAll()
          obj.add({
            xtype: "component",
            layout: "fit",
            autoEl: {
              tag: "iframe",
              width: "100%",
              height: "100%",
              style: "border: none",
              src: binarypdf, //immagine binaria di ritorno
            },
          }
          );
        },
        failure: function (response) {
          let errore = Locale.t("bol.forms.documento.errore") + ": " + response.statusText;
          obj.removeAll()
          obj.add({
            xtype: "panel",
            layout: 'fit',
            items: [
              {
                xtype: 'panel',
                layout: {
                  type: 'hbox',
                  align: 'center',
                  pack: 'center'
                },
                items: [
                  { xtype: "component", html: '<span style="font-size:xx-large;color:red;">' + errore + '</span>' }
                ]
              }

            ]

          });
        },
      });

    } else {
      obj.add({
        xtype: 'image',
        flex: 1,
        style: "height: 100%; width: 100%; object-fit: contain",
        alt: 'Default image',
        src: obj.valori.image
      })
    }
  }
})
