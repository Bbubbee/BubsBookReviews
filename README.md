
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Bbubbee/BubsBookReviews">
    <img src="./public/images/logo.png">
  </a>

<h3 align="center">Bub's Book Reviews</h3>

  <p align="center">
    This website allows users to post reviews about books and read uploaded reviews. 
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
![JavaScript Badge](https://img.shields.io/badge/JAVASCRIPT-yellow?style=for-the-badge&logo=javascript&logoColor=white)
![HTML Badge](https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html5&logoColor=white)
![CSS Badge](https://img.shields.io/badge/css-blue?style=for-the-badge&logo=css3&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project requires Node Package Manager and an SQL Database (I used pgAdmin4).

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Bbubbee/BubsBookReviews.git
   ```
2. Install all NPM packages
   ```sh
   npm install i 
   ```
3. Set up the database
  * Create a database called bookreviews
  * Create a table called book_reviews with the following columns 
  ```sql
  CREATE TABLE book_reviews (
    id SERIAL PRIMARY KEY,
    title TEXT,
    cover_url TEXT,
    rating INT,
    isbn TEXT,
    review TEXT
  )
  ```
4. Log on to PGadmin4 - change password and port to that of your own bookreviews database
  ```js
  const db = new pg.Client({
      user: "postgres",
      host: "localhost", 
      database: "bookreviews", 
      password: "booty", 
      port: 5432
  })
  db.connect(); 
  ```
5. Run the server usign nodemon.
  ```sh
  nodemon index.js
  ```
6. Connect to it on localhost:3000
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Preview

View reviewed books from the database 
<img src="./public/images/features/features.png">

Search for books by title 
<img src="./public/images/features/features2.png">

Write a new review
<img src="./public/images/features/features3.png">

View a single review. Allows you to edit or delete it
<img src="./public/images/features/features4.png">

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

My GitHub - [https://github.com/Bbubbee](https://github.com/Bbubbee) 

Project Link: [https://github.com/Bbubbee/BubsBookReviews](https://github.com/Bbubbee/BubsBookReviews)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [README Template](https://github.com/othneildrew/Best-README-Template)
* [Open Library Search API](https://openlibrary.org/dev/docs/api/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Bbubbee/BubsBookReviews.svg?style=for-the-badge
[contributors-url]: https://github.com/Bbubbee/BubsBookReviews/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Bbubbee/BubsBookReviews.svg?style=for-the-badge
[forks-url]: https://github.com/Bbubbee/BubsBookReviews/network/members
[stars-shield]: https://img.shields.io/github/stars/Bbubbee/BubsBookReviews.svg?style=for-the-badge
[stars-url]: https://github.com/Bbubbee/BubsBookReviews/stargazers
[issues-shield]: https://img.shields.io/github/issues/Bbubbee/BubsBookReviews.svg?style=for-the-badge
[issues-url]: https://github.com/Bbubbee/BubsBookReviews/issues
[license-shield]: https://img.shields.io/github/license/Bbubbee/BubsBookReviews.svg?style=for-the-badge
[license-url]: https://github.com/Bbubbee/BubsBookReviews/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
