var list = {
    container: document.querySelector('.container'),
    list: document.querySelector('.container__list'),
    input: document.querySelector('.field__input'),
    data: [],
    dataLength: 0,

    setupListener: function() {
        var __this = this;

        this.input.addEventListener('keyup', function(event) {
            var value = event.target.value;

            if (value.length > 1) {
                __this.render(value);
            } else {
                __this.clearList();
            }
        });
    },
    load: function() {
        var __this = this,
            request = this.request('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

        request.then(
            function(responseText) {
                var data = JSON.parse(responseText),
                    dataArray = [];

                for (key in data) {
                    dataArray.push(data[key].name);
                }

                __this.data = __this.sort(dataArray);
                __this.dataLength = __this.data.length;
            },
            function() {
                console.log('Ошибка');
            }
        )
    },
    request: function(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();

            xhr.addEventListener('load', function() {
                resolve(xhr.responseText);
            });

            xhr.addEventListener('error', function() {
                reject();
            });
        });
    },
    sort: function(data) {
        return data.sort();
    },
    render: function(currentValue) {
        var i = 0,
            n = 0,
            renderData = [],
            renderDataLength = 0,
            item = '';

        for (i; i < this.dataLength; i++) {

            if (this.data[i].toLowerCase().indexOf(currentValue.toLowerCase()) !== -1) {

                renderData.push(this.data[i]);

            }

        }

        renderDataLength = renderData.length;

        this.list.innerHTML = '';

        if (renderDataLength > 0) {

            for (n; n < renderDataLength; n++) {

                item = document.createElement('li');
                item.innerText = renderData[n];
                this.list.appendChild(item);

            }

            this.container.classList.add('active');

        }
    },
    clearList: function() {
        this.container.classList.remove('active');
    },
    init: function() {
        this.load();
        this.setupListener();
    }
};

list.init();