import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light:
      {
        primary: colors.purple.base,
        secondary: colors.blue.base,
        accent: colors.lightGreen.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.cyan.base,
        success: colors.green.base
      },
    },
  }
});
