const categories = {
  baking: {
    label: '제빵',
    questions: Object.entries(questions).filter(([key, question]) => key.startsWith('baking_') ).map(([key, question]) => {
      return { key, number: question.number, label: question.label, };
    }),
  },
  pastry: {
    label: '제과',
    questions: Object.entries(questions).filter(([key, question]) => key.startsWith('pastry_') ).map(([key, question]) => {
      return { key, number: question.number, label: question.label, };
    }),
  },
  
}
