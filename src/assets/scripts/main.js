import '../styles/style.css';
import 'cookieconsent';

if (module.hot) {
    module.hot.accept();
}

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

if(window.cookieconsent) {
    window.cookieconsent.initialise({
        container: document.getElementById("content"),
        palette:{
            popup: {background: "#fff"},
            button: {background: "#111"},
        },
        position: 'bottom-right',
        revokable:true,
        onStatusChange: function(status) {
            console.log(this.hasConsented() ?
                'enable cookies' : 'disable cookies');
        },
        law: {
            regionalLaw: false,
        },
        location: false,
        content: {
            header: 'Cookies used on the website!',
            message: 'This website uses cookies to ensure you get the best experience on our website.',
            dismiss: 'Got it!'
        }
    });
}
