<template>
  <svg style="display: none" class="container">
    <defs>
      <filter
        id="error"
        color-interpolation-filters="linearRGB"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="val.x + ' ' + val.y"
          numOctaves="2"
          seed="2"
          stitchTiles="stitch"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="turbulence1" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="35"
          xChannelSelector="R"
          yChannelSelector="B"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="displacementMap" />
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { gsap } from 'gsap';
const tl = new gsap.timeline();
const val = reactive({
  x: 0,
  y: 0,
});
tl.to(val, {
  x: 0.045,
  y: 0.107,
  duration: 0.3,
});
tl.to(val, {
  x: 0,
  y: 0,
  duration: 0.3,
});
</script>
<script lang="ts">
export default {
  name: 'Error',
};
</script>
<style scoped lang="scss">
svg {
  padding: 0;
  margin: 0;
}
</style>
