# 질문 작성하기

```
_id: "",

questionText: { ko: "string", en: "string" },

category: "daily" / "as_needed",

questionType: "boolean" / "single" / "multiple" / "scale"

// For Single or Multiple questions:

options: ["string array"],

// For Scale questions:

scaleConfig: {
    min: int,
    max: int,
    minLabel: string
    maxLabel: string
}

relatedSymptoms: [
ID.DEPRESSION / ID.BIPOLAR / ID.ANXIETY / ID.PANIC / ID.ADHD / ID.GENERAL
],

orderPriority: int
```
