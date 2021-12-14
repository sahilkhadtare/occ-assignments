/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
    //-------------------------------------------------------------------
    // DEPENDENCIES
    //-------------------------------------------------------------------
    ['knockout'],
    //-------------------------------------------------------------------
    // WIDGET DEFINITION
    //-------------------------------------------------------------------
    function(ko) {
        function Generic() {
            // default constructor
        }

        Generic.prototype = (function() {
            var widgetModel;

            function init(widget) {
                widgetModel = widget;
                if (Object.keys(widgetModel.site().extensionSiteSettings).length) {
                    widgetModel.config(widgetModel.site().extensionSiteSettings);
                } else {
                    widgetModel.config(null);
                }
            }

            return {
                // Obligatory
                constructor: Generic,
                // Variables
                config: ko.observable(),

                // Generic version
                onLoad: function(widget) {
                    init(widget);

                    // ...

                    widgetModel.__run('onLoad', widget);
                },
                beforeAppear: function(page) {

                }

            };
        })();

        return new Generic();
    }
);