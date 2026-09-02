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
        closedQs: JSON.parse(localStorage.getItem('closedQs') ?? '[]'),
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

    watch(
      () => data.closedQs,
      (value) => {
        localStorage.setItem('closedQs', JSON.stringify(value));
        // console.log(value);        
      },
      { deep: true }
    );


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
    const currentKey = Vue.computed(() => {
      return data.q2
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
    
    const convertYoutubeToEmbed = (url)=>{
      if (!url) return null;
      let v = null;
      try {
        v = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${v}`;
      } catch {
        return null;  
      }
      return null;
    }
    


    return {
      changePage , 
      currentKey ,
      currentQuestion , 
      currentSolution,
      currentHints ,
      linkify,
      convertYoutubeToEmbed,
      data ,
    };
  }
});

app.use(router);
globalThis.vapp = app.mount("#app");