jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"zsfmike/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"zsfmike/test/integration/pages/Worklist",
		"zsfmike/test/integration/pages/Object",
		"zsfmike/test/integration/pages/NotFound",
		"zsfmike/test/integration/pages/Browser",
		"zsfmike/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zsfmike.view."
	});

	sap.ui.require([
		"zsfmike/test/integration/WorklistJourney",
		"zsfmike/test/integration/ObjectJourney",
		"zsfmike/test/integration/NavigationJourney",
		"zsfmike/test/integration/NotFoundJourney",
		"zsfmike/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});
