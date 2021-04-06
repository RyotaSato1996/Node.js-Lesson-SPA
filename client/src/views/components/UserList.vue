<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.username }}</li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {
    this.getAllUser();
  },
  computed: {
    ...mapGetters(
      'user',
      [
        'users',
      ],
    ),
  },
  methods: {
    ...mapActions(
      'user',
      [
        'getAllUser',
      ],
    ),
  },
};
</script>
