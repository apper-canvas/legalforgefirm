import clausesData from '../mockData/clauses.json'

let clauses = [...clausesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const clauseService = {
  async getAll() {
    await delay(300)
    return [...clauses]
  },

  async getById(id) {
    await delay(200)
    const clause = clauses.find(c => c.id === id)
    return clause ? { ...clause } : null
  },

  async create(clauseData) {
    await delay(400)
    const newClause = {
      id: Date.now().toString(),
      ...clauseData
    }
    clauses.push(newClause)
    return { ...newClause }
  },

  async update(id, updates) {
    await delay(300)
    const index = clauses.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error('Clause not found')
    }
    clauses[index] = { ...clauses[index], ...updates }
    return { ...clauses[index] }
  },

  async delete(id) {
    await delay(250)
    const index = clauses.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error('Clause not found')
    }
    const deleted = clauses.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default clauseService