const { createApp, watch, reactive } = Vue;
const { createRouter, createWebHistory, useRoute, useRouter } = VueRouter;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: '<div></div>'
      }
    }
  ]
});

const app = createApp({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const data = reactive(
      {
        ...pageData,
        q1: '',
        q2: '',
      }
    );

    watch(
      () => data.q1,
      (value, oldValue) => {
        if (value === oldValue) return;

        router.push({
          query: {
            ...route.query,
            q1: value || undefined,
            q2: undefined,
          }
        }).catch(err => {
          console.error(err);
        });
      }
    );
    watch(
      () => data.q2,
      (value, oldValue) => {
        if (value === oldValue) return;

        router.push({
          query: {
            ...route.query,
            q2: value || undefined
          }
        }).catch(err => {
          console.error(err);
        });
      }
    );

    watch(
      () => route.query.q1,
      (value) => {
        const newValue = value ?? '';

        if (data.q1 !== newValue) {
          data.q1 = newValue;
        }
      },
      { immediate: true }
    );
    watch(
      () => route.query.q2,
      (value) => {
        const newValue = value ?? '';

        if (data.q2 !== newValue) {
          data.q2 = newValue;
        }
      },
      { immediate: true }
    );

    function changePage(page) {
      router.push({
        query: {
          ...route.query,
          page
        }
      });
    }


    const currentQuestion = Vue.computed(() => {
      return data.questions?.[data.q2];
    });
    const currentHints = Vue.computed(() => {
      return data.hints?.[data.q2];
    });


    return {
      changePage , 
      currentQuestion , 
      currentHints ,
      data ,
    };
  }
});

app.use(router);
app.mount("#app");