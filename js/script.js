const components = {
  header: Header,
  navbar: NavBar,
  content: Content,
  footer: Footer,
}

const routes = {
  main: FilmsPage,
  coming : ComingPage,
  favorite : FavoritePage,
  default: FilmsPage,
  error: ErrorPage,
  authorization : CabinetPage,
}

/* ----- spa init module --- */
const mySPA = (function () {

  /* ------- begin view -------- */
  function ModuleView() {
    let myModuleContainer = null
    let menu = null
    let contentContainer = null
    let routesObj = null
    let searchInput = null
    let API_KEY = null
    // let paginationEl = null
    this.init = function (container, routes) {
      this.isUserLogin()
      myModuleContainer = container;
      routesObj = routes
      favorites = []
      loginName = []
      menu = myModuleContainer.querySelector("#mainmenu")
      contentContainer = myModuleContainer.querySelector("#content")
      API_KEY = 'e065f89a-9759-4b39-a116-2003d164e0f4'
      searchLogo = document.querySelector('.search__logo')
      searchInput = document.querySelector('.search__input')
      // paginationEl = document.querySelector('.app__pagination') пагинация
      buttons = `
      <div class="filters-wrap">
                    <div>
                      <a href="#" <span class="filters-btn btn-clear">Сбросить</span></a>
                    </div>
                    <div>
                      <a href="#" <span class="filters-btn btn-accept">Применить</span></a>
                    </div> 
                  </div> 
      `
    }
    this.renderContent = function (hashPageName) {
      let routeName = "default";
      if (hashPageName.length > 0) {
        routeName = hashPageName in routes ? hashPageName : "error"
      }
      window.document.title = routesObj[routeName].title
      contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`)
      if (routeName === 'main' || routeName === 'default' ) {
        searchLogo.style.display = 'block'
        this.showCountry()
        this.showGenres()
      }
      else searchLogo.style.display = 'none'
      if (routeName === 'favorite') {
          this.showFavoriteFilms(loginName = sessionStorage.getItem('loginName'))
      }
      this.updateButtons(routesObj[routeName].id)
    }

    this.openSearch = function(){
      searchInput.classList.toggle('search__input-animation')
      searchInput.classList.remove('none')
    }

    this.showFilms = function (data , container ) {
      myModuleContainer.querySelector(container).innerHTML = ''
        data.films.forEach(film => {
          let rating = film.rating ? film.rating : 'Недостаточно голосов'

          if (typeof rating === 'string' && rating.endsWith('%')) {
            rating = Number(rating.slice(0, -1)) / 10
          }
          let toGenre = film.genres.map(item => Object.values(item)[0])
          let toCountry = film.countries.map(item => Object.values(item)[0])
          let genres = toGenre.toString().replace(',', ', ')
          let country = toCountry.toString().replace(',', ', ')
          myModuleContainer.querySelector(container).insertAdjacentHTML('beforeend', `          
          <li class="app__list-item">
          <article class="app__card movie-card">
            <a  target="_blank" class="movie-card__link">
              <div class="movie-card__image-wrapper">
                <img
                  src="${film.posterUrlPreview}"
                  alt="${!film.nameRu ? film.nameEn : film.nameRu}" loading="lazy" class="movie-card__image">
                <div class="movie-card__hover">
                  <div class="movie-card__id">${film.filmId}</div>
                  <div class="movie-info">
                  <div class="movie-card__rating ${film.rating == null ? 'movie-card__rating--null' : ''}">${rating}</div>
                    <div class="movie-card__genres">${genres}</div>
                  </div>
                  <a class="movie-card__favorite right" id="favorite">⭐</a>
                </div>
              </div>
              <a href="https://www.kinopoisk.ru/film/${film.filmId}/" target="_blank" class="movie-card__title">${!film.nameRu ? film.nameEn : film.nameRu}</a>
              <h4 class="movie-card__country">${country}</h4>
              <div class="movie-card__date">${film.year}</div>
            </a>
          </article>
        </li>
        `)
        })
          //   const pages = data.pagesCount         /// в будущем должна быть пагинация
      // for (let i = pages ; i >=1 ; i--){

      //     myModuleContainer.querySelector('.app__pagination').insertAdjacentHTML('afterbegin', `
      //       <li class="app__pagination-item">
      //         <a href="?page=${i}" class="app__pagination-link">${i}</a>
      //       </li>

      //     `)     
      // }
    }
    this.showFiltersFilms = function (data , container ) {
      myModuleContainer.querySelector(container).innerHTML = ''
        data.items.forEach(film => {
          if (film.rating){
            rating = film.rating.toFixed(1)
          }
          else if (!film.rating){
            rating = film.ratingKinopoisk
          }
          else rating = 'Недостаточно голосов'
          let toGenre = film.genres.map(item => Object.values(item)[0])
          let toCountry = film.countries.map(item => Object.values(item)[0])
          let genres = toGenre.toString().replace(',', ', ')
          let country = toCountry.toString().replace(',', ', ')
          myModuleContainer.querySelector(container).insertAdjacentHTML('beforeend', `          
          <li class="app__list-item">
          <article class="app__card movie-card">
            <a  target="_blank" class="movie-card__link">
              <div class="movie-card__image-wrapper">
                <img
                  src="${film.posterUrlPreview}"
                  alt="${!film.nameRu ? film.nameEn : film.nameRu}" loading="lazy" class="movie-card__image">
                <div class="movie-card__hover">
                  <div class="movie-card__id">${film.filmId}</div>
                  <div class="movie-info">
                  <div class="movie-card__rating">${rating}</div>
                    <div class="movie-card__genres">${genres}</div>
                  </div>
                  <a class="movie-card__favorite right" id="favorite">⭐</a>
                </div>
              </div>
              <a href="https://www.kinopoisk.ru/film/${film.kinopoiskId}/" target="_blank" class="movie-card__title">${!film.nameRu ? film.nameEn : film.nameRu}</a>
              <h4 class="movie-card__country">${country}</h4>
              <div class="movie-card__date">${film.year}</div>
            </a>
          </article>
        </li>
        `)
      })
      }
    this.showFutureFilms = function (data , container ) {
      myModuleContainer.querySelector(container).innerHTML = ''
          data.items.forEach(film => {
            let rating = film.rating ? film.rating : 'Недостаточно голосов'
            let toGenre = film.genres.map(item => Object.values(item)[0])
            let toCountry = film.countries.map(item => Object.values(item)[0])
            let genres = toGenre.toString().replace(',', ', ')
            let country = toCountry.toString().replace(',', ', ')
            myModuleContainer.querySelector(container).insertAdjacentHTML('beforeend', `          
            <li class="app__list-item">
            <article class="app__card movie-card">
              <a  target="_blank" class="movie-card__link">
                <div class="movie-card__image-wrapper">
                  <img
                    src="${film.posterUrlPreview}"
                    alt="${!film.nameRu ? film.nameEn : film.nameRu}" loading="lazy" class="movie-card__image">
                  <div class="movie-card__hover">
                  <div class="movie-card__id">${film.filmId}</div>
                    <div class="movie-info">
                    <div class="movie-card__rating ${film.rating == null ? 'movie-card__rating--null' : ''}">${rating}</div>
                      <div class="movie-card__genres">${genres}</div>
                    </div>
                    <a class="movie-card__favorite right" id="favorite">⭐</a>
                  </div>
                </div>
                <a href="https://www.kinopoisk.ru/film/${film.kinopoiskId}/" target="_blank" class="movie-card__title">${!film.nameRu ? film.nameEn : film.nameRu}</a>
                <h4 class="movie-card__country">${country}</h4>
                <div class="movie-card__date">Дата выхода : ${film.premiereRu}</div>
              </a>
            </article>
          </li>
          `)
        })
      }
    this.showSortFilms = function(data , container){
      myModuleContainer.querySelector('.app__list').innerHTML = ''
          data.items.forEach(film => {
            if (film.rating){
              rating = film.rating.toFixed(1)
            }
            else if (!film.rating){
              rating = film.ratingKinopoisk
            }
            else if(film.ratingKinopoisk === null){
              rating = 'Недостаточно голосов'
            }
            let toGenre = film.genres.map(item => Object.values(item)[0])
            let toCountry = film.countries.map(item => Object.values(item)[0])
            let genres = toGenre.toString().replace(',', ', ')
            let country = toCountry.toString().replace(',', ', ')
            myModuleContainer.querySelector(container).insertAdjacentHTML('beforeend', `          
            <li class="app__list-item">
            <article class="app__card movie-card">
              <a href="#"  target="_blank" class="movie-card__link">
                <div class="movie-card__image-wrapper">
                  <img
                    src="${film.posterUrlPreview}"
                    alt="${!film.nameRu ? film.nameOriginal : film.nameRu}" loading="lazy" class="movie-card__image">
                  <div class="movie-card__hover">
                  <div class="movie-card__id">${film.id}</div>
                    <div class="movie-info">
                    <div class="movie-card__rating">${rating ? rating : `Недостаточно голосов`}</div>
                      <div class="movie-card__genres">${genres}</div>
                    </div>
                    <a class="movie-card__favorite right" id="favorite">⭐</a>
                  </div>
                </div>
                <a href="https://www.kinopoisk.ru/film/${film.kinopoiskId}/" target="_blank" class="movie-card__title">${!film.nameRu ? film.nameOriginal : film.nameRu}</a>
                <h4 class="movie-card__country">${country}</h4>
                <div class="movie-card__date">${film.year}</div>
              </a>
            </article>
          </li>
          `)
        })
      }

    this.signUpAnimation = function(){
      document.querySelector('.modal-container').classList.add('right-panel-active')
    }
    this.signInAnimation = function(){
      document.querySelector('.modal-container').classList.remove('right-panel-active')
    }

    this.openFilters = function(){
      document.querySelector('.dropdown-menu').classList.toggle('none')
      document.querySelector('.dropdown-menu-right').classList.add('none')
    }
    this.openSort = function(){
      document.querySelector('.dropdown-menu-right').classList.toggle('none')
      document.querySelector('.dropdown-menu').classList.add('none')
    }
    this.toggleOptions = function(){
      document.querySelector('.dropdown-menu').classList.toggle('none')
    }
    this.openGenreLink = function(){
      document.querySelector('.filter-genres').classList.toggle('none')
    }
    this.openCountryLink = function(){
      document.querySelector('.form-list').classList.toggle('none')
    }
    this.openYearLink = function(){
      document.querySelector('.form-year').classList.toggle('none')
    }
    this.clearAllOptions = function(){
      document.querySelector('.form-year').classList.add('none')
      document.querySelector('.form-list').classList.add('none')
      document.querySelector('.filter-genres').classList.add('none')
    }
    this.closeFilter = function(){
      document.querySelector('.dropdown-menu').classList.add('none')
    }
    this.showFavoriteFilms = function(key){
        myAppDB.ref(`users/${key}`).once("value")
      .then(function(snapshot) {
        const data = snapshot.val()
        let films = data.films
        if (films){
          films.forEach((film) => {
            myModuleContainer.querySelector('.favorite-films').insertAdjacentHTML('beforeend', `          
      <li class="app__list-item">
        <article class="app__card movie-card">
          <a  target="_blank" class="movie-card__link">
            <div class="movie-card__image-wrapper">
            <img
              src="${film.photo}"
              alt="${film.title}" loading="lazy" class="movie-card__image">
            <div class="movie-card__hover">
            <div class="movie-card__id">${film.id}</div>
              <div class="movie-info">
              <div class="close right">❌</div>
            <div class="movie-card__rating ${film.rating == null ? 'movie-card__rating--null' : ''}">${film.rating}</div>
                <div class="movie-card__genres">${film.genres}</div>
            </div>
            </div>
            </div>
            <div class="movie-card__footer">
              <a href="https://www.kinopoisk.ru/film/${film.id}/" target="_blank" class="movie-card__title">${film.title}</a>
              <h4 class="movie-card__country">${film.country}</h4>
              <div class="movie-card__date">${film.year}</div>
            </div>
          </a>
        </article>
      </li>
    `) 
    })
    }
    })
    }
    this.showCountry = function(){
      const countryList = document.querySelector('.form-list')
      const popularCountriesAndID = {3:'Франция', 8:'Испания', 5:'Великобритания', 1:'США' ,21: 'Китай' ,10: 'Италия' ,4: 'Польша' ,  7:'Индия' ,34: 'Росcия' , 127:'Беларусь' }
      let output = ''
      let countryName = `
      <ul>
          <li>
            <div class="filter-title">
              <div class="prev"></div>
              <p class="country">Страна</p>
            </div>
          </li>
        </ul>
      `
      for (const property in popularCountriesAndID) {
        output += ` 
        <div class='form-check'>
          <input class="form-check-input-countries" type="checkbox" value="${property}">
          <li class="form-check-label-country" >${popularCountriesAndID[property]}</li>
        </div>
        `;
      }
      countryList.innerHTML = countryName + output + buttons
    }
      this.showGenres = function(){
        const GenresList = document.querySelector('.filter-genres')
        const popularGenresAndID = {11: 'Боевик' , 13: 'Комедия' , 17: 'Ужасы' , 4: 'Мелодрама' , 1: 'Триллер' , 6: 'Фантастика' , 12: 'Фэнтези' , 18: 'Мультфильм'}
        let output = ''
        let GenresName = `
        <ul>
          <li>
            <div class="filter-title">
              <div class="prev"></div>
              <p class="genre">Жанр</p>
            </div>
          </li>
        </ul>
        ` 
        for (const property in popularGenresAndID) {
          output += ` 
          <div class="form-check">
            <input class="form-check-input-genres" type="checkbox" value="${property}">
            <label class="form-check-label-genres">${popularGenresAndID[property]}</label>
          </div>
          `;
        }
        GenresList.innerHTML = GenresName + output + buttons
    }  
    this.openBurgerMenu = function(){
      menu.classList.add('burger-animation-open')
      menu.classList.remove('burger-animation-close')
    }
    this.closeBurgerMenu = function(){
      menu.classList.add('burger-animation-close')
      menu.classList.remove('burger-animation-open')
    }
    this.clearCheckBox = function(){
      checkboxes = document.querySelectorAll('input[type=checkbox]')
      for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false
      }
    }
    this.loginError = function (error) {
      contentContainer.querySelector("#error-log").classList.remove('none')
      contentContainer.querySelector("#error-log").innerHTML = `${error}`;
      this.deleteTextAfterThreeSeconds(contentContainer.querySelector("#error-log"))
    };
    this.registrationError = function(error){
      contentContainer.querySelector("#error-reg").classList.remove('none')
      contentContainer.querySelector("#error-reg").innerHTML = `${error}`;
      this.deleteTextAfterThreeSeconds(contentContainer.querySelector("#error-reg"))
    }
    this.closeLoginForm = function(){
      logoutBtn.classList.add('none')
      document.querySelector('.user-name').innerHTML = ''
      window.location.replace('#authorization')
    }

    this.addLoginForm = function(userEmail){
        document.querySelector('.user-name').innerHTML = userEmail
        document.querySelector('.logout').classList.remove('none')    
    }
    this.isUserLogin = function(){
      if (sessionStorage.getItem('user')){
        const user = JSON.parse(sessionStorage.getItem('user'))
        document.querySelector('.user-name').innerHTML = user.user.email
        document.querySelector('.logout').classList.remove('none')
      }
    }
    this.showMessageToAddToFavorites = function(){
      contentContainer.querySelector('.message-favorite').classList.remove('none')
      this.deleteTextAfterThreeSeconds(contentContainer.querySelector('.message-favorite'))
    }
    this.deleteTextAfterThreeSeconds = function(document){
      setTimeout(() => {
        document.classList.add('none')
    }, 3000)
    }
    this.successfullLogin = function(success){
      contentContainer.querySelector("#successful-login").classList.remove('none')
      contentContainer.querySelector("#successful-login").innerHTML = `${success}`
      this.deleteTextAfterThreeSeconds(contentContainer.querySelector("#successful-login"))
    }
    this.updateButtons = function (currentPage) {
      const menuLinks = menu.querySelectorAll(".mainmenu__link")
      for (let link of menuLinks) {
        currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active")
      }
    }
    this.changeHistoryBack = function(){
      history.back()
    }

    this.showTooltipMessage = function(){
      document.getElementById('text-info').style.opacity = '1'
    }
    this.hideTooltipMessage = function(){
      document.getElementById('text-info').style.opacity = '0'

    }
  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModuleModel() {
    let myModuleView = null
    let API_KEY = null
    this.init = function (view) {
      myModuleView = view
      loginName = []
      API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
      API_KEY = 'e065f89a-9759-4b39-a116-2003d164e0f4'
      this.getFilms(API_URL_POPULAR)
    }
    this.updateState = function (pageName) {
      myModuleView.renderContent(pageName)
    }

    this.openSearch = function(){
      myModuleView.openSearch()
    }
    this.openBurgerMenu = function(){
      myModuleView.openBurgerMenu()
    }

    this.closeBurgerMenu = function(){
      myModuleView.closeBurgerMenu()
    }
    this.searchFilm = function(){
      myModuleView.searchFilm()
    }
    this.signUpAnimation = function(){
      myModuleView.signUpAnimation()
    } 
    this.signInAnimation = function(){
      myModuleView.signInAnimation()
    }
    this.openFilter = function(){
      myModuleView.openFilters()
    }        
    this.openSort = function(){
      myModuleView.openSort()
    }
    this.getGenresLink = function(e){
      e.preventDefault()
      myModuleView.openGenreLink()
      myModuleView.toggleOptions()
    }    
    this.getCountryLink = function(e){               
      e.preventDefault()
      myModuleView.openCountryLink() 
      myModuleView.toggleOptions()
    }       
    this.getYearLink = function(e) {                
      e.preventDefault()
      myModuleView.openYearLink()
      myModuleView.toggleOptions()
    }       
    this.backToMenu = function(){
      myModuleView.clearAllOptions()
      myModuleView.toggleOptions()
    }
    this.closeOptions = function(){
      myModuleView.closeFilter()
      myModuleView.clearAllOptions()
    }
    this.putFavoriteFilmsInLocalStorage = function(e){
      if (sessionStorage.getItem('user')){
        const parent = e.target.parentElement.parentElement.parentElement.parentElement 
        data = {
          photo : parent.querySelector('img').getAttribute('src'),
          title : parent.querySelector('.movie-card__title').textContent,
          rating : parent.querySelector('.movie-card__rating').textContent,
          genres : parent.querySelector('.movie-card__genres').textContent,
          country : parent.querySelector('.movie-card__country').textContent,
          year : parent.querySelector('.movie-card__date').textContent,
          id : parent.querySelector('.movie-card__id').textContent,
        } 
      const filmFirebase = JSON.parse(sessionStorage.getItem('film-firebase'))
      if (filmFirebase){
        filmFirebase.forEach(film => {
          favorites.push(film)
  
        })
      }
      favorites.push(data)
      sessionStorage.setItem('film' , JSON.stringify(favorites)) 
      sessionStorage.removeItem('film-firebase')
      myAppDB.ref("users").once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.email === document.querySelector('.user-name').textContent) {
            myAppDB
            .ref(`users/${childKey}/films`)  
            .set(favorites)
            myModuleView.showFavoriteFilms(childKey)
          } 
        });
      });
      e.preventDefault()
      }
      else {
        myModuleView.showMessageToAddToFavorites()
      }
    }
    this.deleteFavoriteFilms = function(e){
      const filmId = e.target.parentElement.parentElement.querySelector('.movie-card__id').textContent
      const filmWrap = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = ''
      sessionStorage.removeItem('film-firebase')
      myAppDB.ref("users").once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {   
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()
          const childDataFilms = childData.films
          if (childData.email === document.querySelector('.user-name').textContent) {
            childDataFilms.forEach((film , index) => {
              if (film.id === filmId) {
                myAppDB.ref('users/' + childKey + '/films/' + index).remove()     // Удаление фильма
                favorites = []
              }
            })
          } 
        });
      });
    }
    this.sortYear = function(url){
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        }
      })   
        .then((response) => response.json())
        .then(data => myModuleView.showSortFilms(data , '.app__list'))

    }
    this.sortRating = function(url){
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        }
      })  
        .then((response) => response.json())
        .then(data => myModuleView.showSortFilms(data , '.app__list'))
    }
    this.getFavoriteFilms = function(e){
        myModuleView.showFavoriteFilms(e)
    }
    this.getGenres = function(){
      myModuleView.showGenres()
    }
    this.getCountry = function(){
      myModuleView.showCountry()
    }
    this.getFilms = function(url){
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        }
      }) 
        .then((response) => response.json())
        .then(data => myModuleView.showFilms(data , '.app__list'))
    }
    this.getFutureFilms = function(url){
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        }
      })  
        .then((response) => response.json())
        .then(data => myModuleView.showFutureFilms(data , '.films-future'))
    }
    this.getFiltersFilm = function(url){
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
        }
      }) 
        .then((response) => response.json())
        .then(data => myModuleView.showFiltersFilms(data , '.app__list'))
    }
    this.clearFilters = function(){
      myModuleView.clearCheckBox()
    }
    this.validateEmail = function(email){
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(String(email).toLowerCase())
    }
    this.validatePassword = function(password){
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
      return reg.test(password)
    }
    this.addUser = function (username, useremail) {
      if (username && this.validateEmail(useremail)){      
        myAppDB
          .ref("users/" + `user_${username.replace(/\s/g, "").toLowerCase()}`)
          .set({
            username: `${username}`,
            email: `${useremail}`,
          })
          .then(function () {
            console.log("Пользователь добавлен в коллецию users")
          })
          .catch(function (error) {
            console.error("Ошибка добавления пользователя: ", error)
        });
      }
    };
    this.login = function(userEmail, userPass){
      if (userEmail && userPass) {
        auth
          .signInWithEmailAndPassword(userEmail, userPass)
          .then((userCredential) => {
            const user = userCredential.user
            if (user) {
              myAppDB.ref("users").once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  const childKey = childSnapshot.key
                  const childData = childSnapshot.val()
                  if (childData.email === document.querySelector('.user-name').textContent) {
                    loginName = childKey
                    sessionStorage.setItem('loginName', loginName)
                  myAppDB
                    .ref(`users/${childKey}/films`)
                    .once('value')
                    .then(snapshot => {
                        const favorites = Object.values(snapshot.val())
                        sessionStorage.setItem('film-firebase' , JSON.stringify(favorites))
                    })
                  }
                })
              })
              window.location.replace('#main')
              this.getFilms(API_URL_POPULAR , '.app__list')
              myModuleView.addLoginForm(userEmail)
              const userData = {
                user: user,
                page: document.location.hash || "#main",
              };
              sessionStorage.setItem("user", JSON.stringify(userData))
            } else {
              sessionStorage.removeItem("user")
            }
          })
          .catch(() => {
            myModuleView.loginError("Неверный email или пароль. Введите корректные данные.")
          })
      } else {
        myModuleView.loginError("Пустое поле Email или Password. Введите данные в указанные поля.")
      }
    }
    this.logout = function () {
      auth.signOut().then(() => {
        myModuleView.closeLoginForm()
        sessionStorage.clear()
        favorites = []
      });
    };

    this.registration = function(userEmail , userPassword){
      if (this.validateEmail(userEmail) && this.validatePassword(userPassword)) {
      auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        myModuleView.successfullLogin('Вы успешно зарегистрировались! Войдите в систему :)')
        contentContainer.querySelector('.input-name-registration').value = ''
        contentContainer.querySelector('.input-log-registration').value = ''
        contentContainer.querySelector('.input-pass-registration').value = ''
      })
      .catch(() => {
        myModuleView.registrationError("Неверный email или пароль. Введите корректные данные. Пароль не менее 6 символов")
      }); 
  } else {
    myModuleView.registrationError("Пустое поле Email или Password или неверный формат записи. Введите корректные данные.")
  }
    }
  this.chekingCheckBoxGenres = function(e){
    const checkbox = e.target.closest('.form-check').querySelector('input[type=checkbox]')
    checkbox.checked = !checkbox.checked
    genresId.push(checkbox.value)

  }
  this.chekingCheckBoxCountry = function(e){
    const checkbox = e.target.closest('.form-check').querySelector('input[type=checkbox]')
    checkbox.checked = !checkbox.checked
    countriesId.push(checkbox.value)

  }

  this.showTooltip = function(){
    myModuleView.showTooltipMessage()
  }
  this.hideTooltip = function(){
    myModuleView.hideTooltipMessage()
  }

  this.getHistoryBackKey = function(e){
    var keyCode = e.keyCode

    if (keyCode === 90 && e.ctrlKey){
      myModuleView.changeHistoryBack()
    }
  }
  }
  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ModuleController() {
    let myModuleContainer = null
    let myModuleModel = null
    let search = null
    let form = null
    this.init = function (container, model) {
      API_URL_FUTURE = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=JANUARY'
      apiSortYear = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?order=YEAR&type=FILM&ratingFrom=4&ratingTo=10&yearFrom=1924&yearTo=2023&page=1'
      apiSortRating = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=FILM&ratingFrom=4&ratingTo=10&yearFrom=1924&yearTo=2024&page=1'
      searchUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
      countriesId = []
      genresId = []
      searchInput = document.querySelector('.search__input')
      myModuleContainer = container
      myModuleModel = model
      contentContainer = myModuleContainer.querySelector("#content");
      burgerMenuOpen = document.querySelector('.burger')
      burgerMenuClose = document.querySelector('.mainmenu__close')
      search = document.querySelector('.search__logo')
      form = document.querySelector('form')
      logoutBtn = document.querySelector('.logout')
      logoutBtn.addEventListener('click' , this.closeLoginForm)
      contentContainer.addEventListener('click' , this.clickEventTarget)
      contentContainer.addEventListener('mouseover' , this.focusEventTarget)
      contentContainer.addEventListener('mouseout' , this.hideTooltipMessage)
      burgerMenuOpen.addEventListener('click' , this.openBurgerMenu)
      burgerMenuClose.addEventListener('click' , this.closeBurgerMenu)
      window.addEventListener("hashchange", this.updateState);
      search.addEventListener('click' , this.openSearch)
      form.addEventListener('submit' , this.searchFilm)
      document.addEventListener('DOMContentLoaded' , this.searchCountry)
      document.addEventListener('keydown' , this.historyBack)

      this.updateState() 
    }


    this.EventFavoriteFilms = function(e){
      myModuleModel.getFavoriteFilms(e)
    }
    this.closeLoginForm = function(){
      myModuleModel.logout()
    }
    this.focusEventTarget = function(e){
      switch (e.target.className){
        case 'input-pass-registration' :
          myModuleModel.showTooltip()
      }
    }

    this.hideTooltipMessage = function(e){
      switch (e.target.className){
        case 'input-pass-registration':
          myModuleModel.hideTooltip()

      }
    }

    this.clickEventTarget = function(e){
      switch (e.target.className){
        case 'sort-rating' :
          myModuleModel.sortRating(apiSortRating)
          break
        case 'sort-year' :
          myModuleModel.sortYear(apiSortYear)
          break
        case 'close right':
          myModuleModel.deleteFavoriteFilms(e)
          break
        case 'movie-card__favorite right':
          myModuleModel.putFavoriteFilmsInLocalStorage(e) 
          break
        case 'prev':
          myModuleModel.backToMenu()
          break   
        case 'year-link':
          myModuleModel.getYearLink(e)
          break  
        case 'filter_main-wrap country-filter':
          myModuleModel.getCountryLink(e)
          break
        case 'country-link':
          myModuleModel.getCountryLink(e)
          break
        case 'filter_main-wrap genre-filter':
          myModuleModel.getGenresLink(e)
          break
        case 'genre-link':
          myModuleModel.getGenresLink(e)
          break
        case 'open-sort':
          myModuleModel.openSort()
          break
        case 'open-filter':
          myModuleModel.openFilter()
          break
        case 'main-page' :
          myModuleModel.closeOptions()
          break
        case  'app__list' :
          myModuleModel.closeOptions()
          break
        case 'form-check-label-country':
          myModuleModel.chekingCheckBoxCountry(e)
          break  
        case 'form-check-label-genres':
          myModuleModel.chekingCheckBoxGenres(e)
          break 
        case 'form-check-input-genres':
          genresId.push(e.target.value)
          break
        case 'form-check-input-countries':
          countriesId.push(e.target.value)
          break
        case 'filters-btn btn-accept':
         
          if(countriesId.length === 0){
            genresId.forEach(idGenre =>{
              countriesAndGenres = `https://kinopoiskapiunofficial.tech/api/v2.2/films?&genres=${idGenre ? idGenre : ''}&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`
            })
          }
          else if(genresId.length === 0){
            countriesId.forEach(idCountry =>{
              countriesAndGenres = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${idCountry ? idCountry : ''}&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`
            })
          }
          else  {
            countriesId.forEach(idCountry =>{
              genresId.forEach(idGenre =>{
                countriesAndGenres = `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${idCountry ? idCountry : ''}&genres=${idGenre ? idGenre : ''}&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`
              })
            })
          }
          myModuleModel.getFiltersFilm(countriesAndGenres)          
          break 
        case 'filters-btn btn-clear':
          myModuleModel.clearFilters()
          break 
        case 'btn-in btn' :
          e.preventDefault()
          e.stopPropagation()
          
          myModuleModel.login(
            contentContainer.querySelector(".input-log-authorization").value,
            contentContainer.querySelector(".input-pass-authorization").value
          );  
          break 
        case 'logout':
          e.preventDefault();
          e.stopPropagation();
          myModuleModel.logout();
          break 
        case 'btn-up btn':
          e.preventDefault();
          e.stopPropagation();
          myModuleModel.addUser(
            contentContainer.querySelector(".input-name-registration").value,
            contentContainer.querySelector(".input-log-registration").value
            )
          myModuleModel.registration(
            contentContainer.querySelector('.input-log-registration').value ,
            contentContainer.querySelector('.input-pass-registration').value
          )
      }
      switch (e.target.id){
        case 'sign-in':
          myModuleModel.signInAnimation()
          break 
        case 'sign-up':
          myModuleModel.signUpAnimation()
          break 
      }
    }
    this.searchFilm = function(e){
      const apiSearchUrl = `${searchUrl}${searchInput.value}`
      if (searchInput){ 
        myModuleModel.getFilms(apiSearchUrl)
        searchInput.value = ''
        searchInput.classList.add('none')
        searchInput.classList.remove('search__input-animation')
      }
      e.preventDefault()
    }
    this.openBurgerMenu = function(){
      myModuleModel.openBurgerMenu()
    }
    this.closeBurgerMenu = function(){
      myModuleModel.closeBurgerMenu()
    }
    this.openSearch = function(){
      myModuleModel.openSearch()
    }
    this.searchCountry = function(){
      myModuleModel.getCountry()
      myModuleModel.getGenres()
    }
    this.updateState = function () {
      const hashPageName = location.hash.slice(1).toLowerCase();
      myModuleModel.updateState(hashPageName);
      if (window.location.hash === ('#main') ){
        myModuleModel.getFilms(API_URL_POPULAR)
      }
      if(window.location.hash === '#coming'){
        myModuleModel.getFutureFilms(API_URL_FUTURE)
      }
    }

    this.historyBack = function(e){
      myModuleModel.getHistoryBackKey(e)
    }
  };
  /* ------ end controller ----- */

  return {
    init: function ({ container, routes, components }) {
      this.renderComponents(container, components)

      const view = new ModuleView()
      const model = new ModuleModel()
      const controller = new ModuleController()

      view.init(document.getElementById(container), routes)
      model.init(view)
      controller.init(document.getElementById(container), model)
    },

    renderComponents: function (container, components) {
      const root = document.getElementById(container)
      const componentsList = Object.keys(components)
      for (let item of componentsList) {
        root.innerHTML += components[item].render("component")
      }
    },
  }

}())
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init({
  container: "app",
  routes: routes,
  components: components
}))





