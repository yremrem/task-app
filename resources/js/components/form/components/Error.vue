<template>
  <div class="alert alert-danger" v-if="form.errors.any()">
    <button v-if="dismissible" type="button" class="close" aria-label="Close" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>
    <div v-if="form.errors.has('error')" v-html="form.errors.get('error')"></div>
    <div v-else v-html="message"></div>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  extends: Alert,

  name: 'alert-error',

  props: {
    message: {
      type: String,
      default: 'There were some problems with your input.'
    }
  }
}
</script>
