<template>
  <div>
    <mavon-editor v-model="value" :codeStyle="codeStyle"/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      value: '# test123',
      codeStyle:'dark'
    }
  }
}
</script>
