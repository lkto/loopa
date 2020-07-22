/* eslint-disable no-console */
/* eslint-disable no-alert */

const url = "/";
//const url = "http://localhost/loopa/";

//Clases 
class Login {

  url = "";
  constructor(url) {
    this.url = url
  }

  getPage() {
    const divRegister = $("#content-register");
    const divContent = $("#content-page");
    divContent.css('display', 'none');

    $.ajax({
      url: this.url + "pages/login.html",
      type: 'POST',
      beforeSend: function() {
      }
    })
    .done(function(response) {
      divRegister.html(response)
      divRegister.css('display', 'block');
    })

  }

  logIn() {
    location.href = url+"#/home";
  }

  logOut() {
    location.href = url+"#/login";
  }

}

class Home {
  url = "";
  constructor(url) {
    this.url = url
  }

  getPage() {
    const divRegister = $("#content-register");
    const divContent = $("#content-page");
    const titlePage = $("#title-header");
    const divContentInfo = $("#content");
    const spinner = $("#spinner");

    divRegister.css('display', 'none');
    titlePage.html('Inicio');
    divContent.css('display', 'block');

    $.ajax({
      url: this.url + "pages/home.html",
      type: 'POST',
      beforeSend: function() {
        //spinner.toggle();
      }
    })
    .done(function(response) {
      divContentInfo.html(response)
      divContentInfo.css('display', 'block');
      //spinner.toggle();
    })

  }
}

class Router {
  routes = [];

  mode = null;

  root = '/';


  constructor(options) {
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    this.listen();
  }

  add = (path, cb) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = path => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = path =>
    path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');

  getFragment = () => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = '') => {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  listen = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  };

  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}

const router = new Router({
  mode: 'hash',
  root: '/'
});

const loginController = new Login(url);
const homeController = new Home(url);

router
  .add(/login/, () => {
    loginController.getPage();
  })
  .add(/register/, () => {
    alert('welcome in about page');
  })
  .add(/home/, () => {
    homeController.getPage();
    loadHomeCarrusel();
  })
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    alert(`products: ${id} specification: ${specification}`);
  })
  .add('', () => {
    loginController.getPage();
  });


function login() {
  loginController.logIn();
}

function logOut() {
  loginController.logOut();
}


function loadHomeCarrusel() {
  setTimeout(function() {
    $('#slide-categoris').owlCarousel({
      loop:false,
      margin:0,
      nav:false,
      autoplay:false,  
      dots:false,
      items:5
    })

    var $owl = $('#slide-item-category')
    $owl.children().each( function( index ) {
      $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
    });

    $owl.owlCarousel({
      center: true,
      loop: true,
      items: 4,
      autoWidth:true,
      dots:false,
    });

    $('#slide-item-travel').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      autoplay:false,  
      dots:false,
      items:2
    });
    
    $('#slide-categoris').css('display', 'block');
    $('#slide-item-category').css('display', 'block');
    $('#slide-item-travel').css('display', 'block');
    
  }, 500);
}