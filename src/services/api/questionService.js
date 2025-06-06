import questionsData from '../mockData/questions.json'

let questions = [...questionsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const questionService = {
  async getAll() {
    await delay(250)
    return [...questions]
  },

  async getById(id) {
    await delay(200)
    const question = questions.find(q => q.id === id)
    return question ? { ...question } : null
  },

  async create(questionData) {
    await delay(350)
    const newQuestion = {
      id: Date.now().toString(),
      ...questionData
    }
    questions.push(newQuestion)
    return { ...newQuestion }
  },

  async update(id, updates) {
    await delay(300)
    const index = questions.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error('Question not found')
    }
    questions[index] = { ...questions[index], ...updates }
    return { ...questions[index] }
  },

  async delete(id) {
    await delay(250)
    const index = questions.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error('Question not found')
    }
    const deleted = questions.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default questionService