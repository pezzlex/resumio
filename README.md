<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url] -->

[![MIT License][license-shield]][license-url]

<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->

<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="readme_images/resumio-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Resumio - Your online resume builder</h3>

  <!-- <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</p> -->

<!-- TABLE OF CONTENTS -->
<details open="open">
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
        <li><a href="#installation">Installation and Running</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The Resumio dashboard lets you see all the resumes you've built. You may want to maintain different resumes catering to different types of jobs.

[![Product Name Screen Shot][product-screenshot]](https://resumio.herokuapp.com/dashboard)

The create/edit resume page lets you fill in your details in a dynamic form. You can always save your progress when satisfied.

[![Product Name Screen Shot][product-screenshot2]](https://resumio.herokuapp.com/dashboard)

The Preview button lets you preview the rendered Resume. If the preview looks good, you have the option to download a PDF of this resume too!

[![Product Name Screen Shot][product-screenshot3]](https://resumio.herokuapp.com/dashboard)

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [MongoDB](https://www.mongodb.com)
- [React](https://getbootstrap.com)
- [Express](https://expressjs.com)
- [Nodejs](https://nodejs.org/en/)

### APIs Used

- [latex-online](latex-online)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Install Yarn (if not done already)
  ```sh
  yarn install
  ```

### Installation and Running

<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->

1. Clone the repo

   ```sh
    git clone https://github.com/pezzlex/resumio.git
   ```

2. Enter your secret information in `server/config.js`

   ```JS
   const config = {
       username: 'YOUR MONGO USERNAME',
       password: 'YOUR MONGO PASSWORD',
       cluster: 'YOUR MONGO CLUSTER',
       dbName: 'YOUR MONGO DBNAME',
       secret: 'YOUR JWT SECRET',
       emailPassword: 'EMAIL USERNAME (OR EMPTY STRING)',
       emailPassword: 'EMAIL PASSWORD (OR EMPTY STRING)',
   }
   module.exports = config
   ```

3. Run app in development mode
   ```sh
   yarn dev
   ```

<!-- USAGE EXAMPLES -->

## Usage

Resumio can be used to streamline the resume building, updating and maintaining process. You can choose from a selection of different templates (currently just one) and have ATS-compliant professional looking Latex resumes generated for you.

Future updates will let you share a public link to your (always up-to-date) resume to people interested.

<!-- ROADMAP -->

<!-- ## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues). -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Pezanne Khambatta - [Email](pezanne_khambatta@brown.edu) - pezanne_khambatta@brown.edu

Project Link: [https://github.com/pezzlex/resumio.git](https://github.com/pezzlex/resumio.git)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- User Management, Authentication and Registration - [cornflourblue](https://github.com/cornflourblue/node-mongo-registration-login-api)
- AntDesign React Theme - [Themeforest - ISOMORPHIC](https://preview.themeforest.net/item/isomorphic-react-redux-admin-dashboard/full_screen_preview/20262330?_ga=2.155787707.1849705934.1617508020-1543999300.1617508020)
- README template - [othneildrew](https://github.com/othneildrew/Best-README-Template)
- License - [MIT License](https://github.com/pezzlex/resumio/blob/master/LICENSE.txt)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/pezzlex/resumio/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: readme_images/resumio1.png
[product-screenshot2]: readme_images/resumio2.png
[product-screenshot3]: readme_images/resumio3.png
