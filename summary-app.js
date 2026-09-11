const { createApp, watch, reactive } = Vue;
// const { createRouter, createWebHistory, useRoute, useRouter } = VueRouter;

// import linkifyHtml from 'linkify-html'


// const router = createRouter({
//   // history: createWebHistory(),
//   history: VueRouter.createWebHashHistory(),

//   routes: [
//     {
//       path: '/',
//       component: {
//         template: '<div></div>'
//       }
//     }
//   ]
// });

const app = createApp({
  setup() {
    // const route = useRoute();
    // const router = useRouter();




    // 요약 정리
    const summaries = {
      baking_labels:new Set(),
      pastry_labels:new Set(),
      baking:[],
      pastry:[],
    }
    Object.values(categories.baking.questions).forEach((el)=>{
      if(!solutions?.[el.key]?.summary) return;
      summaries.baking.push(
        {
          key:el.key,
          question:questions[el.key],
          summary:solutions[el.key].summary,
        }
      );
      
      Object.keys(solutions[el.key].summary).forEach(label => summaries.baking_labels.add(label))
      
    })
    Object.values(categories.pastry.questions).forEach((el)=>{
      if(!solutions?.[el.key]?.summary) return;
      summaries.pastry.push(
        {
          key:el.key,
          question:questions[el.key],
          summary:solutions[el.key].summary,
        }
      );
      Object.keys(solutions[el.key].summary).forEach(label => summaries.pastry_labels.add(label))
    })
    
    summaries.baking_labels = [...summaries.baking_labels]
    summaries.pastry_labels = [... ([...summaries.pastry_labels].filter(k=>k!='공정요약'))] // 공정요약만 예외 처리
    // console.log(summaries);
    
    const tempData = {
      baking_heads:summaries.baking.map((el)=>{ return `${el.question.number}. ${el.question.label}`;}),
      baking_labels:summaries.baking_labels,
      baking_values:summaries.baking_labels.map((label)=>{
        return summaries.baking.map(
          (el)=>{ 
            return (el.summary[label])??'';
          }
        )
      }),
      pastry_heads:summaries.pastry.map((el)=>{ return `${el.question.number}. ${el.question.label}`;}),
      pastry_labels:summaries.pastry_labels,
      pastry_values:summaries.pastry_labels.map((label)=>{
        // console.log(label,summaries.pastry);
        
        return summaries.pastry.map(
          (el)=>{ 
            return (el.summary[label])??'';
          }
        )
      }),
    }
    // console.log(tempData);
    const summariesData = {
      baking_head:['시험',...tempData.baking_labels],
      baking_body:[
        ... tempData.baking_heads.map((el1,idx1)=>{
          return [
            el1,
            ...tempData.baking_labels.map(
              (el2,idx2)=>{
                return tempData.baking_values[idx2][idx1]??'';
              }
            )
          ]
        })
      ],
      baking:summaries.baking,


      pastry_head:['시험',...tempData.pastry_labels],
      pastry_body:[
        ... tempData.pastry_heads.map((el1,idx1)=>{
          return [
            el1,
            ...tempData.pastry_labels.map(
              (el2,idx2)=>{
                return tempData.pastry_values[idx2][idx1]??'';
              }
            )
          ]
        })
      ],
      pastry:summaries.pastry,
      pastry_sort_by_ovens:[...summaries.pastry].sort((a,b)=>{ return a.summary.오븐 < b.summary.오븐?-1:1; }),
    }
    // console.log(summariesData);

    const data = reactive(
      {
        // ...indexData,
        questions,
        solutions,
        categories,
        summaries,
        summariesData,
        q1: '',
        q2: '',
        closedQs: JSON.parse(localStorage.getItem('bapp-closedQs') ?? '[]'),
      }
    );

    

    const linkify = function (text) {
            return linkifyHtml(text, {
                target: "_blank",
                rel: "noopener noreferrer"
            });
        }


    const closedQ = (key)=>{
      return data.closedQs.includes(key)
    }


    return {
    
      linkify,
      closedQ ,
    
      data ,
    };
  }
});

// app.use(router);
app.mount("#app");