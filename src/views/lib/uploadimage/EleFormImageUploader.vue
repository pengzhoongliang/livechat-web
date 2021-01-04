<template>
  <ele-upload-image
    :class="desc.class"
    :style="desc.style"
    style="line-height: 1"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvents"
  />
</template>

<script>
import EleUploadImage from 'vue-ele-upload-image'
import formMixin from 'vue-ele-form/lib/mixins/formMixin'

export default {
  name: 'EleFormImage',
  mixins: [formMixin],
  components: {
    EleUploadImage
  },
  data () {
    return {
      isUploadMixin: true
    }
  }
}
</script>
