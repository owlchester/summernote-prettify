const prettier = require("prettier");
const htmlParser = require('prettier/parser-html');

export default class SummernotePrettify {
    private options: any;
    private plugin_default_options: {};
    private editor: any;
    private editable: any;
    private context: any;
    private codable: any;
    private plugin_options: any;

    constructor(options: any) {
        this.options = $.extend({
            name: 'prettify',
            buttonLabel: '<i class="fa-sharp fa-solid fa-paint-roller"></i>',
            tooltip: 'Prettify the HTML'
        }, options);

        this.plugin_default_options = {}
    }

    createButton() {
        var _this = this;

        var button = ($ as any).summernote.ui.button({
            className: 'w-100 note-codeview-keep btn-prettify',
            contents: this.options.buttonLabel,
            tooltip: this.options.tooltip,
            click: function() {
                _this.prettify();
            }
        });

        // create jQuery object from button instance.
        return button.render();
    }

    prettierFormat(html: any) {
        return prettier.format(html, {
            parser: "html",
            plugins: {htmlParser}
        });
    }

    prettify() {
        try {
            // Turn on code view
            if (!this.editor.hasClass('codeview')) {
                this.context.invoke('codeview.toggle');
            }

            let html = this.editable.html();
            //console.log('html', html);

            let pretty = this.prettierFormat(html);

            //console.log('pretty', pretty);

            this.codable.val(pretty);
            this.editable.html(pretty);
            this.context.triggerEvent('change.codeview', this.codable.val(), this.codable);

        } catch (e) {
            console.error(e);
        }
    }
    initPrettify(context: any) {
        this.context = context;
        this.editor = this.context.layoutInfo.editor;
        this.editable = this.context.layoutInfo.editable;
        this.codable = this.context.layoutInfo.codable;
        this.plugin_options = $.extend(
            this.plugin_default_options,
            this.context.options[this.options.name] || {}
        )
    }

}