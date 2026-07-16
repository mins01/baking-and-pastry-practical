const { createApp, watch, reactive } = Vue;
const { createRouter, createWebHistory, useRoute, useRouter } = VueRouter;

// import linkifyHtml from 'linkify-html'


const router = createRouter({
  // history: createWebHistory(),
  history: VueRouter.createWebHashHistory(),

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
        // ...indexData,
        questions,
        solutions,
        categories,
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
      () => route.query,
      (query) => {
        data.q1 = query.q1 ?? '';
        data.q2 = query.q2 ?? '';
      },
      { immediate: true }
    );
    // watch(
    //   () => route.query.q1,
    //   (value) => {
    //     const newValue = value ?? '';

    //     if (data.q1 !== newValue) {
    //       data.q1 = newValue;
    //     }
    //   },
    //   { immediate: true }
    // );
    // watch(
    //   () => route.query.q2,
    //   (value) => {
    //     const newValue = value ?? '';

    //     if (data.q2 !== newValue) {
    //       data.q2 = newValue;
    //     }
    //   },
    //   { immediate: true }
    // );

    function changePage(page) {
      router.push({
        query: {
          ...route.query,
          page
        }
      });
    }

    const linkify = function (text) {
            return linkifyHtml(text, {
                target: "_blank",
                rel: "noopener noreferrer"
            });
        }


    const currentQuestion = Vue.computed(() => {
      return data.questions?.[data.q2];
    });
    const currentSolution = Vue.computed(() => {
      return data.solutions?.[data.q2];
    });
    const currentHints = Vue.computed(() => {
      // return data.hints?.[data.q2];
      const solution = data.solutions?.[data.q2];
      if(solution) return solution.hints;
      return null;
    });
    
    


    return {
      changePage , 
      currentQuestion , 
      currentSolution,
      currentHints ,
      linkify,
      data ,
    };
  }
});

app.use(router);
app.mount("#app");