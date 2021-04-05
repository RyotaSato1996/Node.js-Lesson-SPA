<template>
  <my-login-form @update-login-user="updateLoginUser"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MyLoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    MyLoginForm,
  },
  methods: {
    ...mapActions(
      'user',
      ['updateLoginUser'],
    ),
  },
  computed: {
    ...mapGetters(
      'user',
      ['loginUser'],
      ['isAuthenticated'],
    ),
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
