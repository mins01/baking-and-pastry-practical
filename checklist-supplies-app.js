const { createApp, reactive , watch  } = Vue;

const app = createApp({
  setup() {
    
    const data = reactive(
      {
        dressCodeData,
        suppliesData,
        selectedSupplies: JSON.parse(localStorage.getItem('bapp-selectedSupplies') ?? '[]'),
        selectedDressCodes: JSON.parse(localStorage.getItem('bapp-selectedDressCodes') ?? '[]'),
        closedQs: JSON.parse(localStorage.getItem('bapp-closedQs') ?? '[]'),
      }
    );

    watch(
      () => data.selectedSupplies,
      (value) => {
        localStorage.setItem('bapp-selectedSupplies', JSON.stringify(value));
        // console.log(value);        
      },
      { deep: true }
    );
    watch(
      () => data.selectedDressCodes,
      (value) => {
        localStorage.setItem('bapp-selectedDressCodes', JSON.stringify(value));
        // console.log(value);
      },
      { deep: true }
    );


    const linkify = function (text) {
            return linkifyHtml(text, {
                target: "_blank",
                rel: "noopener noreferrer"
            });
        }

    return {
      
      linkify,
      data ,
    };
  }
});

app.mount("#app");