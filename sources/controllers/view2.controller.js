sap.ui.define(['sap/ui/core/mvc/Controller'],
    function(Controller) {
        "use strict";
        var PageController = Controller.extend("sources.controllers.view2", {
            productsDataSource : {},

            model : {},

            onInit : async function () {

                this.model = new sap.ui.model.json.JSONModel()
                await this.model.loadData("sources/data/static.json");

                this.productsDataSource = JSON.parse(this.model.getJSON());

                this.loadFromDataSource(this.productsDataSource);

            },
            loadFromDataSource: function(dataSource) {
                this.model.setData(dataSource);
                this.getView().setModel(this.model);

            },
            addInput: function () {
                console.log("clicked")
                this.addTile("bármi")
            },
            addTile: function (title, subtitle) {
                let oInput1 = new sap.m.Input();
                let genericTile = new sap.m.GenericTile({
                    header: title,
                    subheader: subtitle,
                    headerImage: 'sap-icon://goal',
                    press: function () {
                        alert();
                    },
                    layoutData: new sap.f.GridContainerItemLayoutData({
                        minRows: 2,
                        columns: 2
                    })
                });
                this._oPnl.addItem(genericTile);
            },
        })
        return PageController;
    });