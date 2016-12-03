<template>

<div>
        <div class="project-single">
					<div class="row">
						<div class="col-md-5">
							<div class="single-info">
								<div class="project-description">
									<h3>{{ title }}</h3>
									<span>{{ type }}</span>
									<p>{{ description }}</p>
								</div>

								<div class="project-services project-share">
									<h4>Share</h4>
									<ul>
										<li><a href="https://www.facebook.com/ArsenicDesignsInc/">Facebook</a></li>
										<li><a href="https://twitter.com/ArsenicDesigns">Twitter</a></li>
										<li><a href="https://www.instagram.com/arsenicdesigns/">Instagram</a></li>
										<li><a href="https://dribbble.com/Arsenic">Dribbble</a></li>
									</ul>
								</div>
                <Contact></Contact>
							</div>
						</div>
						<div class="col-md-6 col-md-offset-1 project-photos">
              <transition-group name="slide-fade" appear>

              <template v-if="preloaded" v-for="(image, index) in resourcesNeeded">
                 <img :src="image" alt="" v-bind:key="index">
              </template>
            </transition-group>


						</div>
					</div>
				</div>

</div>

</template>

<script>

import PortfolioItems from '../assets/portfolio/items'
import Contact from '../components/Footer.vue'

export default {
  props: ['resourcesNeeded'],
  components: {
    Contact
  },
  data: function() {
    return {
      title: '',
      type: '',
      description: '',
      services: '',
      images: [],
      loadedImages: [],
      PortfolioItems,
      resourcesLoaded: 0
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
  beforeMount() {
    for (var i = 0; i < this.PortfolioItems.length; i++) {
      if(PortfolioItems[i].title.replace(/\s+/g, '-').toLowerCase() === this.$route.params.item) {
        this.title = PortfolioItems[i].title;
        this.type = PortfolioItems[i].type;
        this.description  = PortfolioItems[i].description;
        this.services = PortfolioItems[i].services;
        this.images = PortfolioItems[i].images.map((image) => ({ src: image, loaded: false, display: false}));
        break;
      }
    }
  },
  mounted() {




    for (let i = 0; i < this.images.length; i++) {
      const resource = new Image;
      resource.onload = () => {
          this.resourcesLoaded += 1;
          this.images[i].loaded = true
          this.loadedImages.push({src: this.images[i].src, display: true});
      };
      resource.src = this.images[i].src;

    }
  }
}
</script>
