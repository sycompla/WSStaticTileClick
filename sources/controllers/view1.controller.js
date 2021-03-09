sap.ui.define(['sap/ui/core/mvc/Controller'],
    function(Controller) {
        "use strict";
        var PageController = Controller.extend("sources.controllers.view1", {
            onInit: async function (oEvent) {

                this.model = new sap.ui.model.json.JSONModel()
                await this.model.loadData("sources/data/static.json");
                console.log(this.model.getJSON());

                this.productsDataSource = JSON.parse(this.model.getJSON());

                this.loadFromDataSource(this.productsDataSource);


                this._oPnl = this.getView().byId("grid1");
            },
            loadFromDataSource: function(dataSource) {
                this.model.setData(dataSource);
                this.getView().setModel(this.model);

            },
            addList: function(oModel){
                let list = new sap.m.List();

                list.setModel(oModel).bindItems("/data",
                    new sap.m.StandardListItem({
                        title: "{service}",
                        type: "Active"
                    }));
                this.getView().byId("grid1").addItem(list);
            },
            addInput: function () {
                console.log("clicked")
                this.addTile("bármi")
            },
            addTile: function (title) {
                let oModel = this.model;
                let container = this.getView().byId("grid1");
                let genericTile = new sap.m.GenericTile({
                    header: title,
                    subheader: '',
                    headerImage: 'sap-icon://goal',
                    press: function() {

                        let table = new sap.m.Table({
                            id: "tableId",
                            columns:[
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "service"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "threadId"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "result"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "resultMessage"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "resultDescription"
                                        })
                                    ]
                                })
                            ]
                        });

                        table.bindAggregation("items", {
                            path: "mainModel>/data",
                            template:  new sap.m.ColumnListItem({
                                cells:[
                                    new sap.m.Text({text:"{mainModel>service}"}),
                                    new sap.m.Text({text:"{mainModel>threadId}"}),
                                    new sap.m.Text({text:"{mainModel>result}"}),
                                    new sap.m.Text({text:"{mainModel>resultMessage}"}),
                                    new sap.m.Text({text:"{mainModel>resultDescription}"})
                                ]
                            })
                        });
                        table.setFixedLayout(false);
                        table.setModel(oModel, "mainModel");
                        /*
                        list.setModel(oModel).bindItems("/data",
                            new sap.m.StandardListItem({
                                title: "{service}",
                                type: "Active"
                            }));*/
                        container.addItem(table);
                    },
                    layoutData: new sap.f.GridContainerItemLayoutData({
                        minRows: 2,
                        columns: 2
                    })
                });
                this.getView().byId("grid1").addItem(genericTile);
            },
        })
        return PageController;
});