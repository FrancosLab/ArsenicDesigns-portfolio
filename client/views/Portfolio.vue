<template>
  <div>
  <div class="page-title">
    <div class="row">
      <div class="col-md-9 col-xs-12">
        <h1><b>The element of design.</b></h1>
      </div>
    </div>
  </div>

<transition name="component-fade" mode="out-in" appear>
<div class="portfolio" v-if="preloaded">
  <div class="filters">
    <span>Filters :</span>
    <ul id="filters">
      <li :class="{active: activeFilter === 'all' }" @click="filter('all')">All</li>
      <li :class="{active: activeFilter === 'abstract' }" @click="filter('abstract')">Abstract</li>
      <li :class="{active: activeFilter === 'ui' }" @click="filter('ui')">UI</li>
      <li :class="{active: activeFilter === 'logo' }" @click="filter('logo')">Logo</li>
    </ul>
  </div>

  <isotope ref="portfolio" class="row portfolio-masonry" id="root_isotope1" :item-selector="'element-item'" :list="list" :options='option' @filter="filterOption=arguments[0]" @sort="sortOption=arguments[0]" @layout="currentLayout=arguments[0]">
    <div v-for="(element, index) in list" :class='[element.type]' class="col-md-4 col-sm-6 col-xs-12">
      <router-link :to="`/${element.title.replace(/\s+/g, '-').toLowerCase()}`">
        <div class="item">
          <div class="overlay">
            <div class="inner-overlay">
              <h3>{{ element.title }}</h3>
              <span>{{ element.type }}</span>
            </div>
          </div>
          <img :src="element.cover" alt="">
        </div>
      </router-link>
    </div>
  </isotope>

  <Contact></Contact>





</div>
</transition>

</div>
</template>


<script>

import Vueisotope from 'vueisotope'
import PortfolioItems from '../assets/portfolio/items'
import Contact from '../components/Footer.vue'



export default {
  name: 'Portfolio',
  props: ['resourcesNeeded'],
  components: {
    isotope: Vueisotope,
    Contact
  },
  data: function() {

    return {
    resourcesLoaded: 0,
    list: PortfolioItems,
    selected: null,
    activeFilter: 'all',
    option: {
      getFilterData: {
        all: function() {
          return true;
        },
        abstract: function(el) {
          return el.type === "abstract";
        },
        ui: function(el) {
          return el.type === "ui";
        },
        logo: function(el) {
          return el.type === "logo";
        }
      },
      getSortData: {
        name: "title"
      }
    }
  }
},
computed: {
    preloaded: function() {
      return this.resourcesLoaded === this.resourcesNeeded.length;
    },
    loadProgress:function() {
      return (this.resourcesLoaded / this.resourcesNeeded.length) * 100 ;
    }
  },
  watch: {
    loadProgress() {
        this.$emit('updateProgress', this.loadProgress);
    }
  },
  methods: {
  filter: function(key) {
    this.activeFilter = key;
    this.$refs.portfolio.filter(key);
  }
},
mounted: function() {
  for (var i = 0; i < this.list.length; i++) {
      const resource = new Image;
      resource.onload = () => this.resourcesLoaded += 1;
      resource.src = this.list[i].cover;
  }
}
}
</script>

<style>

</style>
