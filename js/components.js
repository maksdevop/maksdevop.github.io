const Header = {
  render: (customClass = "") => {
    return `
      <header class="header ${customClass}" id="header">
        <div class="header__wrap">
          <img class="burger" src="./img/burger.png" alt="">
          <a class="header__link" href="#main"><img src="./img/logo.jfif" alt="logo"></a>
          <h1 class="header__title">kinoMax</h1>
          <div class="search">
          <form>
            <input class="search__input none" type="text" placeholder="Поиск">
          </form>
          <div class="search__wrap">
            <img class="search__logo none " src="./img/search.webp" alt="search">
            <div class="login-form">
              <div class="user-name"></div>
              <button class="logout none">Выйти</button>
            </div>
          </div>
          </div>
        </div>
      </header>
    `;
  }
};

const NavBar = {
  render: (customClass = "") => {
    return `
      <nav class="mainmenu ${customClass}" id="mainmenu">
        <ul class="mainmenu__list">
          <div class="mainmenu__list-left">
            <li><a class="mainmenu__link link-films" href="#main">Фильмы</a></li>
            <li><a class="mainmenu__link link-coming" href="#coming">Скоро</a></li>
            <li><a class="mainmenu__link link-favorite" href="#favorite">Избранное</a></li>
            <div class="mainmenu__close">❌</div>
          </div>
          <div class="mainmenu__list-right">
            <li><a class="mainmenu__link" href="#authorization">Авторизация/Регистрация</a></li>
          </div>
        </ul>
      </nav>
    `;
  }
};

const Content = {
  render: (customClass = "") => {
    return `<div class="content ${customClass}" id="content">
    </div>`;
  }
};

const Footer = {
  render: (customClass = "") => {
    return `<footer class="footer ${customClass}">
      <p>&copy; 2024</p>
    </footer>`;
  }
};
