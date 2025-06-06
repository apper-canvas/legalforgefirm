import documentsData from '../mockData/documents.json'

let documents = [...documentsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const documentService = {
  async getAll() {
    await delay(300)
    return [...documents]
  },

  async getById(id) {
    await delay(200)
    const document = documents.find(doc => doc.id === id)
    return document ? { ...document } : null
  },

  async create(documentData) {
    await delay(400)
    const newDocument = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'draft',
      ...documentData
    }
    documents.push(newDocument)
    return { ...newDocument }
  },

  async update(id, updates) {
    await delay(300)
    const index = documents.findIndex(doc => doc.id === id)
    if (index === -1) {
      throw new Error('Document not found')
    }
    documents[index] = { ...documents[index], ...updates }
    return { ...documents[index] }
  },

  async delete(id) {
    await delay(250)
    const index = documents.findIndex(doc => doc.id === id)
    if (index === -1) {
      throw new Error('Document not found')
    }
    const deleted = documents.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default documentService