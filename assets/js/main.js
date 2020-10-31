window.addEventListener('load', function() {
    const form = window.document.getElementById('inputForm');
    const output = window.document.getElementById('outputSection');
    const button = window.document.getElementById('copyText');
    const urlParams = new URLSearchParams(window.location.search);
    const vals = new Map();

    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
    const urlFail = 'Your input must be a valid URL!';

    const fields = [
        {
            name: 'title',
            display: 'Title',
        },
        {
            name: 'author_name',
            display: 'Author',
        },
        {
            name: 'provider_name',
            display: 'Provider',
        },
        {
            name: 'theme-color',
            display: 'Color',
            type: 'color',
            test: /^#[0-9a-f]{6,6}$/,
            failure: 'Your input must be a valid HEX color!'
        },
        {
            name: 'author_url',
            display: 'Author Redirect',
            test: urlRegex,
            failure: urlFail
        },
        {
            name: 'provider_url',
            display: 'Provider Redirect',
            test: urlRegex,
            failure: urlFail
        },
        {
            name: 'url',
            display: 'Image URL',
            test: urlRegex,
            failure: urlFail
        }
    ];
    var url;
    function updateURL() {
        let str = window.location.origin + window.location.pathname + '?type=oembed';
        for(let i = 0; i < fields.length; ++i) {
            const val = vals.get(fields[i].name);
            if(val) {
                str += `&${fields[i].name}=${window.encodeURIComponent(val)}`;
            }
        }
        url = (output.value = str);
    }

    for(let i = 0; i < fields.length; ++i) {
        const item = window.document.createElement('div'),
            input = window.document.createElement('input'),
            title = window.document.createElement('h2');

        var verify = null;
        if(fields[i].test) {
            verify = window.document.createElement('div');
            verify.classList.add('unselectable', 'failed-requirement');
            verify.id = '_verify' + fields[i].name;

            const sign = window.document.createElement('span');
            sign.classList.add('signal');
            sign.innerHTML = '\u26A0';

            const tooltip = window.document.createElement('span');
            tooltip.classList.add('tooltiptext');
            tooltip.innerHTML = fields[i].failure;

            verify.appendChild(sign);
            verify.appendChild(tooltip);
        }

        item.classList.add('item');
        title.innerHTML = fields[i].display;
        title.classList.add('unselectable');
        item.appendChild(title);
        if(verify) item.appendChild(verify);

        const param = urlParams.get(fields[i].name);
        vals.set(fields[i].name, param);

        input.type = 'text';
        input.autocapitalize = false;
        input.autocomplete = false;
        input.spellcheck = false;
        input.minLength = 1;
        input.value = param;

        if('color' == fields[i].type) {
            const wrapper = window.document.createElement('div');
            const colorInput = window.document.createElement('input');
            colorInput.value = input.value;
            colorInput.type = 'color';
            wrapper.classList.add('color-input');

            colorInput.oninput = () => {
                input.value = colorInput.value.toUpperCase();
                vals.set(fields[i].name, input.value.toLowerCase());
                updateURL();
            }

            input.oninput = () => {
                const str = input.value;
                const visible = input.value && !fields[i].test.test(input.value);
                window.document.getElementById('_verify' + fields[i].name).style.visibility = visible ? 'visible' : 'hidden';
                if(!visible) colorInput.value = str.toLowerCase();
                vals.set(fields[i].name, visible ? null : str.toLowerCase());
                updateURL();
            };

            wrapper.appendChild(colorInput);
            wrapper.appendChild(input);
            item.appendChild(wrapper);
        } else {
            input.oninput = () => {
                var visible;
                if(fields[i].test) {
                    visible = input.value && !fields[i].test.test(input.value);
                    window.document.getElementById('_verify' + fields[i].name).style.visibility = visible ? 'visible' : 'hidden';
                }
                vals.set(fields[i].name, visible ? null : input.value);
                updateURL();
            }
            item.appendChild(input);
        }

        form.appendChild(item);
    }
    updateURL();

    output.oninput = () => {
        output.value = url;
    }
    output.onclick = () => {
        output.setSelectionRange(0, output.value.length);
    }
    button.onclick = () => {
        window.navigator.clipboard.writeText(url);
    };
});