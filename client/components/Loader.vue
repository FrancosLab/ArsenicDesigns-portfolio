<template>
  <div class="loader" v-if='!preloadComplete'>
    <div class="loader-content">
    <div class="loading-bar">
      <div class="loading-bar-inner" :style="{width: initialLoadProgress + '%'}"></div>
    </div>
  </div>
  </div>
</template>
