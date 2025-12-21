const ID = require("./symptomIds");
module.exports = [
  {
    _id: ID.DEPRESSION,
    name: "depression",
    description: {
      ko: "우울해요",
      en: "",
    },
  },
  {
    _id: ID.BIPOLAR,
    name: "bipolar",
    description: {
      ko: "기분이 자주 오락가락해요",
      en: "",
    },
  },
  {
    _id: ID.ANXIETY,
    name: "anxiety",
    description: {
      ko: "자주 불안해요",
      en: "",
    },
  },
  {
    _id: ID.PANIC,
    name: "panic",
    description: {
      ko: "공황이 자주 와요",
      en: "",
    },
  },
  {
    _id: ID.ADHD,
    name: "attention deficit",
    description: {
      ko: "집중력이 부족한 것 같아요",
      en: "",
    },
  },
  {
    _id: ID.GENERAL,
    name: "GENERAL",
    description: {
      ko: "잘 모르겠지만 관리가 필요해요",
      en: "",
    },
  },
];

symptomSchema.virtual("dailyQuestions", {
  ref: "DailyQuestion",
  localField: "_id",
  foreignField: "relatedSymptoms",
});
