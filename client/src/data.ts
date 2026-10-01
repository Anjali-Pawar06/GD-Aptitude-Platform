export type Question = {
  id: number
  category: string
  text: string
  options: string[]
  answer: number
  explanation: string
}

export const questions: Question[] = [
  { id: 1, category: 'Quantitative', text: 'A train travels 120 km in 2 hours. What is its average speed?', options: ['40 km/h','50 km/h','60 km/h','80 km/h'], answer: 2, explanation: 'Average speed = distance / time = 120 / 2 = 60 km/h.' },
  { id: 2, category: 'Logical Reasoning', text: 'Find the next number: 2, 6, 12, 20, 30, ?', options: ['36','40','42','44'], answer: 2, explanation: 'Differences are 4, 6, 8, 10, so the next difference is 12. Answer = 42.' },
  { id: 3, category: 'Verbal Ability', text: 'Choose the word closest in meaning to “concise”.', options: ['Lengthy','Brief','Complex','Unclear'], answer: 1, explanation: 'Concise means brief and to the point.' },
  { id: 4, category: 'Quantitative', text: 'A product marked at ₹800 is sold at a 10% discount. What is the selling price?', options: ['₹700','₹720','₹740','₹760'], answer: 1, explanation: '10% of ₹800 is ₹80, so the selling price is ₹720.' },
  { id: 5, category: 'Logical Reasoning', text: 'If all roses are flowers and some flowers fade quickly, which conclusion is definitely true?', options: ['All roses fade quickly','Some roses may fade quickly','No roses fade quickly','All flowers are roses'], answer: 1, explanation: 'The statement only establishes that some flowers fade quickly; roses may be among them.' },
  { id: 6, category: 'Data Interpretation', text: 'A company has 200 employees and 25% work in engineering. How many engineers are there?', options: ['25','40','50','75'], answer: 2, explanation: '25% of 200 = 50.' }
]

export const gdTopics = [
  'Should AI replace human jobs?',
  'Is remote work better than office work?',
  'Social media: benefit or distraction?',
  'Should college education be skill-based?',
  'Will electric vehicles dominate the future?'
]

export const aiParticipants = [
  { name: 'Alex', role: 'Logical', tone: 'Builds structured arguments and asks for evidence.' },
  { name: 'Ryan', role: 'Challenging', tone: 'Challenges assumptions and presents counterpoints.' },
  { name: 'Sarah', role: 'Cooperative', tone: 'Builds on useful points and encourages balanced discussion.' }
]