var list = {
    menu: document.querySelector('.menu'),
    list: document.querySelector('.container__list'),

    setupListener: function() {
        var __this = this;

        this.menu.addEventListener('click', function(event) {
            event.preventDefault();

            var target = event.target,
                action = target.getAttribute('data-action');

            if (action) {
                __this[action]();
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

                __this.render(__this.sort(dataArray));
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
    render: function(data) {
        var dataLength = data.length,
            i = 0,
            item = '';

        this.list.innerHTML = '';

        for (i; i < dataLength; i++) {
            item = document.createElement('li');
            item.innerText = data[i];

            this.list.appendChild(item);
        }
    },
    init: function() {
        this.setupListener();
    }
};

list.init();