import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { documentService } from '@/services'
import PageLayout from '@/components/templates/PageLayout'
import HeroSection from '@/components/organisms/HeroSection'
import MainContent from '@/components/organisms/MainContent'
import FeatureGrid from '@/components/organisms/FeatureGrid'

const HomePage = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true)
      try {
        const result = await documentService.getAll()
        setDocuments(result || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load documents')
      } finally {
        setLoading(false)
      }
    }
    loadDocuments()
  }, [])

  return (
    <PageLayout>
      <HeroSection documentCount={documents.length || 0} />
      <MainContent documents={documents} loading={loading} error={error} />
      <FeatureGrid />
    </PageLayout>
  )
}

export default HomePage