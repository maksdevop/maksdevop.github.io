const FilmsPage = {
  id: "main",
  title: "Главная страница",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1><strong>Главная</strong></h1>
        <div class="wrap">
          <div class="films">
            <p>Фильмы</p>
          </div>
          <div class="films-sort">      
          <button class="dropdown-left">      
              <div class="dropdown-toggle" >  
                <svg height="18" width="18" class="icon" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M8 7.1a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm0 1.4c1.259 0 2.32-.846 2.646-2H21.25a.75.75 0 0 0 0-1.5H10.646a2.751 2.751 0 0 0-5.292 0H2.75a.75.75 0 0 0 0 1.5h2.604A2.751 2.751 0 0 0 8 8.5Zm8 4.85a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm2.646-.6a2.751 2.751 0 0 1-5.293 0H2.75a.75.75 0 0 1 0-1.5h10.604a2.751 2.751 0 0 1 5.293 0h2.603a.75.75 0 0 1 0 1.5h-2.604Zm-9.296 5.5a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0Zm1.296.75a2.751 2.751 0 0 1-5.292 0H2.75a.75.75 0 0 1 0-1.5h2.604a2.751 2.751 0 0 1 5.292 0H21.25a.75.75 0 0 1 0 1.5H10.646Z" clip-rule="evenodd"></path>
                </svg>
                <span class="open-filter">Фильтры</span>
              </div>
              <div id="filter" class="dropdown-menu none">
              <ul id="filter-sort" >
                <li class="filter_main-wrap genre-filter">
                  <a href="#" <span class="genre-link">Жанр</span></a>
                  <span class="right">▶</span>
                </li>
                <li class="filter_main-wrap country-filter">
                  <a href="#" <span class="country-link">Страна</span></a>
                  <span class="right">▶</span>
                </li>
                <div class="filters-wrap">
                  <div>
                    <a href="#" <span class="filters-btn btn-clear">Сбросить</span></a>
                  </div>
                  <div>
                    <a href="#" <span class="filters-btn btn-accept">Применить</span></a>
                  </div> 
                </div> 
                </li>
              </ul>
              </div>
            </button>    
            <div class="filter-genres none "></div>
            <div class="form-list country none"></div>
            <div class="form-year year none"></div>
            <button class="dropdown-right">         
              <div class="dropdown-toggle sort" href="#" data-toggle="dropdown" aria-expanded="false">
              <svg height="18" width="18" class="icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8 17H4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2ZM14 11H4a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2ZM20 5H4a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2Z"></path>
              </svg>
              <span class="open-sort">Сортировать</span>
              </div>
            </button>
            <div id="sort" class="dropdown-menu-right none">
            <ul id="filter-sort" >
              <li class="filter_main-wrap">
                <a href="#" <span class="sort-year">По году</span></a>
              </li>
              <li class="filter_main-wrap">
                <a href="#" <span class="sort-rating">По рейтингу</span></a>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </section>
      <p class="message-favorite none">Авторизуйтесь для добавления в избранное!</p>

      <div class="app__list" id='app__list'>
            
      </div>
      <ul class="app__pagination">

      </ul>
    `;
  }
};

const CabinetPage = {
  id: "cabinet",
  title : 'Личный кабинет',
  render: (className = 'container', ...rest) => {
    return `
    <section class="${className}">
      <div class="modal-container" id="modal-container">
        <div class="form-container sign-up-container">
          <form action="#">
              <h1>Создать аккаунт</h1>
              <input class="input-name-registration" type="text" placeholder="Имя" />
              <input class="input-log-registration" type="email" placeholder="Почта" />
              <input class="input-pass-registration" type="password" placeholder="Пароль" />
              <p id="text-info">Должен включать : одна цифра , одна строчная буква , одна заглавная буква , длина не менне 6</p>
              <div id="error-reg" class="error"></div>
              <div id="successful-login" class="successful"></div>
              <button class="btn-up btn">Зарегистрироваться</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
              <h1>Авторизация</h1>
              <input class="input-log-authorization" type="email" placeholder="Почта" />
              <input class="input-pass-authorization" type="password" placeholder="Пароль" />
              <a class="password-forgot" href="#main">Забыли свой пароль ? Не беда!</a>
              <div id="error-log" class="error">
              </div>
              <button class="btn-in btn">Войти</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
              <div class="overlay-panel overlay-left">
                  <h1>Тыкни, чтобы авторизоваться</h1>
                  <p><button class="ghost btn" id="sign-in">Войти</button></p>
              </div>
              <div class="overlay-panel overlay-right">
                  <h1>Привет, Друг!</h1>
                  <p>Если у тебя еще нет своего личного кабинета , самое время это исправить!</p>
                  
                  <p><button class="ghost btn" id="sign-up">Зарегистрироваться</button></p>
              </div>
          </div>
        </div>
      </div>  
    </section>
      `;
  }
};


const FavoritePage = {
  id: "favorite",
  title: "Избранные фильмы",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>Избранное</h1>
        <p>Ну наконец ты решился посмотреть , что добавлял :)</p>
      </section>
      <div class="favorite-films" id="fav-films"></div>

    `;
  }
};

const ComingPage = {
  id: "coming",
  title: "Скоро на экранах",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>Релизы</h1>
        <p>Скоро эти фильмы появятся на экранах!</p>
      </section>
      <div class="films-future">
      </div>
    `;
  }
};

const ErrorPage = {
  id: "error",
  title: "Achtung, warning, kujdes, attenzione, pozornost...",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h1>Ошибка 404</h1>
        <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>
      </section>
    `;
  }
};
