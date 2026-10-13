(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    var header = document.querySelector('.site-header');

    if (toggle && nav) {
        var desktop = window.matchMedia('(min-width: 64em)');

        var open = function () {
            nav.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Chiudi il menu');
            document.body.classList.add('nav-open');
        };

        var close = function () {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Apri il menu');
            document.body.classList.remove('nav-open');
        };

        toggle.addEventListener('click', function () {
            if (nav.classList.contains('is-open')) {
                close();
            } else {
                open();
            }
        });

        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                close();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                close();
                toggle.focus();
            }
        });

        if (desktop.addEventListener) {
            desktop.addEventListener('change', function (event) {
                if (event.matches) {
                    close();
                }
            });
        }
    }

    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Modulo contatti: i campi dell'atto compaiono solo per la richiesta di copia
    var motivo = document.getElementById('motivo');
    var campiCopia = document.getElementById('campi-copia');

    if (motivo && campiCopia) {
        // Preselezione da ?motivo=... anche quando la pagina è servita statica
        if (!motivo.value) {
            var richiesto = new URLSearchParams(window.location.search).get('motivo');
            if (richiesto && motivo.querySelector('option[value="' + richiesto + '"]')) {
                motivo.value = richiesto;
            }
        }

        var aggiorna = function () {
            campiCopia.hidden = motivo.value !== 'copia';
        };
        aggiorna();
        motivo.addEventListener('change', aggiorna);
    }
})();
