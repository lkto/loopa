const $ = require('./../js/jquery-3.5.1.min');

class LoginController {

    getPage() {
        $.ajax({
            url: "./../pages/login.html",
          }).done(function() {
            console.log('funciono');
          });
    }

    logIn() {

    }

    logOut() {

    }

}
