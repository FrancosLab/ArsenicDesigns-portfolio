# Arsenic Designs Portfolio
###### A completely client side portfolio site for arsenic designs.

Prerequisites:

- NodeJS
- Yarn Package Manager - [Install](https://yarnpkg.com/en/docs/install)


To start:

```bash
$ yarn install
```

To develop:

```bash
$ yarn run dev
```

To build for production:

(Builds out to /dist)

```bash
$ yarn run build
```


## Structure

- ```/build``` - contains webpack configs for dev and production
- ```/client``` - Main Source Code
- ```/dist``` - created upon Production build -- Entry:  ```index.html```

## App Views

###### A main app component ```app.vue```

- ```/client/views/Portfolio.vue``` -- Main Landing Content
- ```/client/views/Results.vue``` -- Single Portfolio Page


## Adding portfolio items

##### Create a folder for each portfolio item needed to be added in

```/client/assets/portfolio/``` - contains portfolio items along side a ```items.js``` file

##### Each portfolio-item directory must contain an image folder and a config file

```
/* Example Item.js */

const item = {
  title: 'Void',
  type: 'logo',
  description: 'An enjoyable personal project of mine. Keeping space-esque colors in mind, I applied a purple gradient to the logo to really give it a void/black hole appeal.',
  cover: require('./images/void.png'),
  images: [
    require('./images/void.png'),
    require('./images/void-mockup.jpg')
  ]
}

export default item

```

##### require the newly created config file in the global items.js file and add it to the portfolio array

Example:

```
import AFL from './afl/item.js'

const portfolio = [CreedEsports, DailyUI, HealthyHabits, Void, AFL]
```






## Todo

- Finish Cleaning up code (currently each component is responsible for downloading their own assets, which creates a few lines of dupe logic, not a big deal but meh)

- Dynamically import portfolio items, to remove the need of the ```items.js``` config file.

- Move component state into a singleton store, and manage commit state changes through vuex.

- (optional) Aysncronously Load components to lessen initial download size.

- (optional) Add image compression upon webpack build
