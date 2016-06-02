jQuery.sap.require("zsfmike.util.myCore");
sap.ui.define([
		"zsfmike/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"zsfmike/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/core/routing/History"
	], function (BaseController, JSONModel, formatter, Filter, FilterOperator, History) {
		"use strict";

		return BaseController.extend("zsfmike.controller.Overview", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				var oViewModel,
					iOriginalBusyDelay;
					
		

				// Put down worklist table's original value for busy indicator delay,
				// so it can be restored later on. Busy handling on the table is
				// taken care of by the table itself.

				// Model used to manipulate control states
				oViewModel = new JSONModel({
					worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
					saveAsTileTitle: this.getResourceBundle().getText("worklistViewTitle"),
					shareOnJamTitle: this.getResourceBundle().getText("worklistViewTitle"),
					shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
					shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href])
//					tableNoDataText : this.getResourceBundle().getText("tableNoDataText"),
//					tableBusyDelay : 0
				});
				this.setModel(oViewModel, "worklistView");
				var that = this;
				$( window ).resize(function() {
					 that.setBoxWidth();
				});

				var myComponent = myCore.getMyComponent(this.getView());
				
				myComponent.getRouter().attachRouteMatched(
					this._claimControl, this);
				// Make sure, busy indication is showing immediately so there is no
				// break after the busy indication for loading the view's meta data is
				// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
				/*oTable.attachEventOnce("updateFinished", function(){
					// Restore original busy indicator delay for worklist's table
					oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
				});*/
			},
	
			initVizFrame: function(){
				//      1.Get the id of the VizFrame		
				var oVizFrame = new sap.viz.ui5.controls.VizFrame({height:'100%',
																    width:'100%',
																    vizType:'pie',});
				
		//      2.Create a JSON Model and set the data
				var oModel = new sap.ui.model.json.JSONModel();
				var data = {
					'Sales' : [{
						  "DrugName": "Cranberry Cream",
						  "Revenue": "7.37"
						}, {
						  "DrugName": "Wart Remover Liquid",
						  "Revenue": "9.54"
						}, {
						  "DrugName": "Hydrochlorothiazide",
						  "Revenue": "6.57"
						}, {
						  "DrugName": "Terazosin Hydrochloride",
						  "Revenue": "5.41"
						}, {
						  "DrugName": "Topiramate",
						  "Revenue": "8.69"
						}]};
				oModel.setData(data);
				
		//      3. Create Viz dataset to feed to the data to the graph
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions : [{
					        name : 'Drug Name',
						value : "{DrugName}"}],
					               
					measures : [{
						name : 'Revenue',
						value : '{Revenue}'} ],
					             
					data : {
						path : "/Sales"
					}
				});		
				oVizFrame.setDataset(oDataset);
				oVizFrame.setModel(oModel);	
				
		//      4.Set Viz properties
				oVizFrame.setVizProperties({
					title:{
						text : "Revenue"
					},
		            plotArea: {
		            	colorPalette : d3.scale.category20().range(),
		            	drawingEffect: "glossy"
		                }});
				
				var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
				      'uid': "size",
				      'type': "Measure",
				      'values': ["Revenue"]
				    }), 
				    feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
				      'uid': "color",
				      'type': "Dimension",
				      'values': ["Drug Name"]
				    });
				oVizFrame.addFeed(feedSize);
				oVizFrame.addFeed(feedColor);
				this.getView().byId("vizTab").addContent(oVizFrame);
			},

			_claimControl: function(e) {
				var mine = e.getParameter("name") == "overview";
				
				if (mine){
					myCore.setCurrentView( this.getView() );
					this.buildPage();
				}
				
			},
			
			buildPage : function() {
				this.initVizFrame();
				this.setBoxWidth();
			},
			
			
			setBoxWidth : function() { 
				var w = window.innerWidth - 40;
				var h = window.innerHeight - 200;
				
				var sqSize = h;
				if ( w < sqSize ){
					sqSize = w; }
				
				var sqSize = Math.floor(sqSize/2);
				var sizeString = sqSize + "px"; 
				
				this.byId("redBox").setWidth(sizeString);
				this.byId("redBox").setHeight(sizeString);
				this.byId("greenBox").setWidth(sizeString);
				this.byId("greenBox").setHeight(sizeString);
				this.byId("blueBox").setWidth(sizeString);
				this.byId("blueBox").setHeight(sizeString);
				this.byId("yellowBox").setWidth(sizeString);
				this.byId("yellowBox").setHeight(sizeString);
			},
			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Triggered by the table's 'updateFinished' event: after new table
			 * data is available, this handler method updates the table counter.
			 * This should only happen if the update was successful, which is
			 * why this handler is attached to 'updateFinished' and not to the
			 * table's list binding's 'dataReceived' method.
			 * @param {sap.ui.base.Event} oEvent the update finished event
			 * @public
			 */
			onUpdateFinished : function (oEvent) {
				// update the worklist's object counter after the table update
/*				var sTitle,
					oTable = oEvent.getSource(),
					iTotalItems = oEvent.getParameter("total");
				// only update the counter if the length is final and
				// the table is not empty
				if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
					sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
				} else {
					sTitle = this.getResourceBundle().getText("worklistTableTitle");
				}
				this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);*/
			},

			/**
			 * Event handler when a table item gets pressed
			 * @param {sap.ui.base.Event} oEvent the table selectionChange event
			 * @public
			 */
			onPress : function (oEvent) {
				// The source is the list item that got pressed
				this._showObject(oEvent.getSource());
			},


			/**
			 * Event handler for navigating back.
			 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
			 * If not, it will navigate to the shell home
			 * @public
			 */
			onNavBack : function() {
				var sPreviousHash = History.getInstance().getPreviousHash(),
					oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

				if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
					history.go(-1);
				} else {
					oCrossAppNavigator.toExternal({
						target: {shellHash: "#Shell-home"}
					});
				}
			},

			/**
			 * Event handler when the share in JAM button has been clicked
			 * @public
			 */
			onShareInJamPress : function () {
				var oViewModel = this.getModel("worklistView"),
					oShareDialog = sap.ui.getCore().createComponent({
						name: "sap.collaboration.components.fiori.sharing.dialog",
						settings: {
							object:{
								id: location.href,
								share: oViewModel.getProperty("/shareOnJamTitle")
							}
						}
					});
				oShareDialog.open();
			},

			onSearch : function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {
					// Search field's 'refresh' button has been pressed.
					// This is visible if you select any master list item.
					// In this case no new search is triggered, we only
					// refresh the list binding.
					this.onRefresh();
				} else {
					var oTableSearchState = [];
					var sQuery = oEvent.getParameter("query");

					if (sQuery && sQuery.length > 0) {
						oTableSearchState = [new Filter("lastName", FilterOperator.Contains, sQuery)];
					}
					this._applySearch(oTableSearchState);
				}

			},

			/**
			 * Event handler for refresh event. Keeps filter, sort
			 * and group settings and refreshes the list binding.
			 * @public
			 */
			onRefresh : function () {
				this._oTable.getBinding("items").refresh();
			},

			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Shows the selected item on the object page
			 * On phones a additional history entry is created
			 * @param {sap.m.ObjectListItem} oItem selected Item
			 * @private
			 */
			_showObject : function (oItem) {
				this.getRouter().navTo("object", {
					objectId: oItem.getBindingContext().getProperty("userId")
				});
			},

			/**
			 * Internal helper method to apply both filter and search state together on the list binding
			 * @param {object} oTableSearchState an array of filters for the search
			 * @private
			 */
			_applySearch: function(oTableSearchState) {
				var oViewModel = this.getModel("worklistView");
				this._oTable.getBinding("items").filter(oTableSearchState, "Application");
				// changes the noDataText of the list in case there are no filter results
				if (oTableSearchState.length !== 0) {
					oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
				}
			}

		});
	}
);