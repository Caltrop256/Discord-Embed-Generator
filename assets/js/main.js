window.addEventListener('load', function() {
    const form = window.document.getElementById('inputForm');
    const output = window.document.getElementById('outputSection');
    const button = window.document.getElementById('copyText');
    const urlParams = new URLSearchParams(window.location.search);
    const vals = new Map();
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
            type: 'color'
        },
        {
            name: 'author_url',
            display: 'Author Redirect',
        },
        {
            name: 'provider_url',
            display: 'Provider Redirect',
        },
        {
            name: 'url',
            display: 'Image URL',
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

        item.classList.add('item');
        title.innerHTML = fields[i].display;
        title.classList.add('unselectable');
        item.appendChild(title);

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
                let str = input.value;
                if(str.charAt(0) != '#') str = '#' + str;
                str = str.substring(0, 7);
                str.replace(/[^0-9A-F#]+/gi, '');
                while(str.length < 7) str += '0';
                input.value = str.toUpperCase();
                colorInput.value = str.toLowerCase();
                vals.set(fields[i].name, str.toLowerCase());
                updateURL();
            };

            wrapper.appendChild(colorInput);
            wrapper.appendChild(input);
            item.appendChild(wrapper);
        } else {
            input.oninput = () => {
                vals.set(fields[i].name, input.value);
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