<template>
  <div id="app">
    <transition name="component-fade">
    <div class="loading-bar" :style='{ width:  progress + "%" }' v-on:transitionend="completeLoad" v-if="!loadComplete"></div>
  </transition>

    <transition name="component-fade" appear>
    <div class="wrapper">
  			<div class="container">
  				<header>
  					<div class="logo">
  						<router-link to="/">
  						Arsenic.
            </router-link>
  					</div>


  				</header>

          <keep-alive>
          <transition name="component-fade" mode="out-in" appear>
            <router-view v-on:updateProgress="updateProgress" :resourcesNeeded="resourcesNeeded"></router-view>
          </transition>
        </keep-alive>

  </div>
</div>
</transition>
  </div>
</template>

<style src="../assets/styles/app.css"></style>


<script>

import PortfolioItems from '../assets/portfolio/items'

export default {
  data: function() {
    return {
      PortfolioItems,
      loadComplete: false,
      progress: 0,
      resourcesNeeded: [],
    }
  },
  computed: {
    currentView() {
      return this.$route.name === 'portfolio-item' ?  this.$route.params.item : 'home';
   }
  },
  watch: {
    currentView(view) {
      this.compileResources();
    }
  },
  methods: {
    compileResources() {
      const view = this.currentView;
      let resources = [];

      if(view === 'home') {
         resources =  this.PortfolioItems.map((item) => item.cover)
      }

      if(view !== 'home') {
        const viewItem = this.PortfolioItems.filter((item)=>{ return item.title.replace(/\s+/g, '-').toLowerCase() === this.$route.params.item});
        resources = viewItem[0].images;
      }
      this.resourcesNeeded = resources;
    },
    updateProgress(progress) {
      if(progress !== 100) {
        this.loadComplete = false;
      }
      this.progress = progress;
    },
    completeLoad() {
      if(this.progress === 100) {
        this.loadComplete = true;
        this.progress = 0;
      }
    }
    },
  mounted() {
    this.compileResources();

  }
}

</script>
