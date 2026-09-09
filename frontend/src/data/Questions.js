const questions = [
  {
    id: 1,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "What is 20% of 250?",
    options: ["25", "40", "50", "60"],
    answer: 2,
    explanation: "20% of 250 = (20/100) × 250 = 50."
  },

  {
    id: 2,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "A train travels 120 km in 2 hours. What is its average speed?",
    options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    answer: 2,
    explanation: "Speed = Distance / Time = 120 / 2 = 60 km/h."
  },

  {
    id: 3,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "If the cost price of an item is ₹500 and it is sold for ₹600, what is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
    explanation: "Profit = 600 - 500 = 100. Profit percentage = (100/500) × 100 = 20%."
  },

  {
    id: 4,
    category: "Quantitative Aptitude",
    difficulty: "Easy",
    question: "What is the average of 10, 20, 30, 40 and 50?",
    options: ["20", "25", "30", "35"],
    answer: 2,
    explanation: "Average = (10 + 20 + 30 + 40 + 50) / 5 = 30."
  },

  {
    id: 5,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "If 5 workers complete a task in 10 days, how many days will 10 workers take?",
    options: ["2 days", "5 days", "10 days", "20 days"],
    answer: 1,
    explanation: "Workers and days are inversely proportional. Doubling workers reduces the time by half."
  },

  {
    id: 6,
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    question: "A number is increased from 200 to 240. What is the percentage increase?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
    explanation: "Increase = 40. Percentage increase = (40/200) × 100 = 20%."
  },

  {
    id: 7,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "What comes next in the sequence: 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "36"],
    answer: 2,
    explanation: "Each number is multiplied by 2. Therefore, 16 × 2 = 32."
  },

  {
    id: 8,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "Find the odd one out.",
    options: ["Apple", "Mango", "Carrot", "Banana"],
    answer: 2,
    explanation: "Carrot is a vegetable while the others are fruits."
  },

  {
    id: 9,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "If CAT is coded as DBU, how is DOG coded?",
    options: ["EPH", "EOH", "FPH", "DPG"],
    answer: 0,
    explanation: "Each letter is shifted one position forward: D→E, O→P, G→H."
  },

  {
    id: 10,
    category: "Logical Reasoning",
    difficulty: "Easy",
    question: "Which number should replace the question mark? 3, 6, 12, 24, ?",
    options: ["36", "42", "48", "54"],
    answer: 2,
    explanation: "Each number is multiplied by 2. Therefore, 24 × 2 = 48."
  },

  {
    id: 11,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
    options: [
      "All roses are red",
      "Some roses are red",
      "All roses are flowers",
      "No roses are red"
    ],
    answer: 2,
    explanation: "The first statement directly establishes that all roses are flowers."
  },

  {
    id: 12,
    category: "Logical Reasoning",
    difficulty: "Medium",
    question: "A is taller than B. B is taller than C. Who is the shortest?",
    options: ["A", "B", "C", "Cannot be determined"],
    answer: 2,
    explanation: "Since A > B > C in height, C is the shortest."
  },

  {
    id: 13,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the synonym of 'Rapid'.",
    options: ["Slow", "Quick", "Weak", "Late"],
    answer: 1,
    explanation: "Rapid means quick or fast."
  },

  {
    id: 14,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the antonym of 'Ancient'.",
    options: ["Old", "Historic", "Modern", "Traditional"],
    answer: 2,
    explanation: "Modern is the opposite of ancient."
  },

  {
    id: 15,
    category: "Verbal Ability",
    difficulty: "Medium",
    question: "Choose the grammatically correct sentence.",
    options: [
      "She don't like coffee.",
      "She doesn't likes coffee.",
      "She doesn't like coffee.",
      "She not like coffee."
    ],
    answer: 2,
    explanation: "With 'doesn't', the main verb remains in its base form: like."
  },

  {
    id: 16,
    category: "Verbal Ability",
    difficulty: "Easy",
    question: "Choose the correctly spelled word.",
    options: [
      "Accomodation",
      "Accommodation",
      "Acommodation",
      "Accommadation"
    ],
    answer: 1,
    explanation: "The correct spelling is Accommodation."
  },

  {
    id: 17,
    category: "Data Interpretation",
    difficulty: "Easy",
    question: "A company sold 100 units in January and 150 units in February. What was the increase?",
    options: ["25 units", "40 units", "50 units", "60 units"],
    answer: 2,
    explanation: "Increase = 150 - 100 = 50 units."
  },

  {
    id: 18,
    category: "Data Interpretation",
    difficulty: "Medium",
    question: "A store's sales increased from ₹20,000 to ₹25,000. What was the percentage increase?",
    options: ["15%", "20%", "25%", "30%"],
    answer: 2,
    explanation: "Increase = ₹5,000. Percentage increase = 5000/20000 × 100 = 25%."
  },

  {
    id: 19,
    category: "Data Interpretation",
    difficulty: "Medium",
    question: "A student scored 70, 80, 90 and 60 in four subjects. What is the average score?",
    options: ["70", "75", "80", "85"],
    answer: 1,
    explanation: "Average = (70 + 80 + 90 + 60) / 4 = 75."
  },

  {
    id: 20,
    category: "Data Interpretation",
    difficulty: "Hard",
    question: "A product price is increased by 20% and then decreased by 20%. What is the overall change?",
    options: [
      "No change",
      "4% increase",
      "4% decrease",
      "2% decrease"
    ],
    answer: 2,
    explanation: "Assuming the original price is 100, it becomes 120 and then 96. Therefore, there is a 4% decrease."
  }
];

export default questions;