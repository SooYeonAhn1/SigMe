const ID = require("./symptomIds");

// _id: https://observablehq.com/@hugodf/mongodb-objectid-generator

module.exports = [
  // {
  //   _id: "",
  //   questionText: { ko: "", en: "" },
  //   category: "daily",
  //   questionType: "single",
  //   relatedSymptoms: [],
  //   orderPriority: 0,
  // },

  // General questions:
  {
    _id: "6947d467de01a2d265bbc9a1",
    questionText: {
      ko: "낮에 졸거나 피로했나요?",
      en: "Did you feel sleepy or tired during the day?",
    },
    category: "daily",
    questionType: "single",
    options: ["NONE", "MILD", "SEVERE"],
    relatedSymptoms: [ID.GENERAL],
    orderPriority: 0,
  },
  {
    _id: "6947d73305dbb74155f55d51",
    questionText: {
      ko: "가족이나 친구에게 연락을 취했나요?",
      en: "Have you got in touch with your family or friends?",
    },
    category: "daily",
    questionType: "boolean",
    relatedSymptoms: [ID.GENERAL],
    orderPriority: 1,
  },

  // Depression:
  {
    _id: "6947d788e0affbfc0711f66d",
    questionText: {
      ko: "오늘 하루 동안 자해 충동이나 자살 생각을 가진 적이 있나요?",
      en: "Have you had any thoughts of self-harm or suicide today?",
    },
    category: "daily",
    questionType: "boolean",
    relatedSymptoms: [ID.DEPRESSION],
    orderPriority: 0,
  },
  {
    _id: "6947dd3f41c09b789f1b02ea",
    questionText: {
      ko: "일과에 집중할 수 있었나요?",
      en: "Were you able to concentrate on your work?",
    },
    category: "daily",
    questionType: "single",
    options: ["NONE", "MILD", "SEVERE"],
    relatedSymptoms: [ID.DEPRESSION, ID.ADHD],
    orderPriority: 0,
  },
];
