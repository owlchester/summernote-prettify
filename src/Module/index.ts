import SummernotePrettify from './SummernotePrettify'

export default class PrettifyPlugin {
    protected summernote_prettify: any
    constructor(options: any) {
        this.summernote_prettify = new SummernotePrettify(options);
    }

    getPlugin() {
        let plugin = {};
        let _this = this;
        let options = this.summernote_prettify.options

        // @ts-ignore
        plugin[options.name] = function(context) {

            let sgOptions = context.options[options.name] || {}
            let buttonLabel = sgOptions.buttonLabel || _this.summernote_prettify.options.buttonLabel

            _this.summernote_prettify.options.buttonLabel = buttonLabel

            context.memo('button.' + options.name, _this.createButton());

            /*this.events = {
                'summernote.keyup': function(we: any, e: any)
                {
                    _this.summernote_prettify.saveLastFocusedElement();
                }
            };*/

            this.initialize = function() {
                _this.summernote_prettify.initPrettify(context);
            };
        }

        return plugin;
    }

    createButton() {
        return this.summernote_prettify.createButton();
    }
}