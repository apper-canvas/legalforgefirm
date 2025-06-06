const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const legalComplianceService = {
  
  // Validate document completeness against legal requirements
  async validateDocument(templateType, answers) {
    await delay(300)
    
    const validationResults = {
      isCompliant: true,
      missingElements: [],
      warnings: [],
      recommendations: [],
      complianceScore: 0
    }
    
    // Essential elements checklist by template type
    const essentialElements = {
      nda: [
        'disclosing_party_name',
        'disclosing_party_address', 
        'receiving_party_name',
        'receiving_party_address',
        'confidentiality_period',
        'governing_law'
      ],
      rental: [
        'landlord_name',
        'landlord_address',
        'tenant_name', 
        'tenant_address',
        'property_address',
        'rent_amount',
        'lease_term',
        'security_deposit',
        'governing_state'
      ],
      partnership: [
        'partner1_name',
        'partner1_address',
        'partner2_name',
        'partner2_address', 
        'partnership_name',
        'profit_sharing_method',
        'governing_state'
      ],
      employment: [
        'employer_name',
        'employer_address',
        'employee_name',
        'employee_address',
        'job_title',
        'salary_amount',
        'employment_type',
        'governing_state'
      ]
    }
    
    const requiredElements = essentialElements[templateType] || []
    let compliantElements = 0
    
    // Check each required element
    for (const element of requiredElements) {
      const hasElement = Object.values(answers).some(answer => 
        answer && answer.toString().trim().length > 0
      )
      
      if (!hasElement) {
        validationResults.missingElements.push(element)
        validationResults.isCompliant = false
      } else {
        compliantElements++
      }
    }
    
    // Calculate compliance score
    validationResults.complianceScore = Math.round((compliantElements / requiredElements.length) * 100)
    
    // Add warnings for incomplete sections
    if (validationResults.complianceScore < 100) {
      validationResults.warnings.push('Document is missing required legal elements')
    }
    
    if (validationResults.complianceScore >= 90) {
      validationResults.recommendations.push('Document meets most legal requirements')
    } else if (validationResults.complianceScore >= 70) {
      validationResults.recommendations.push('Document needs additional information for full compliance')
    } else {
      validationResults.recommendations.push('Document requires significant additional information')
    }
    
    return validationResults
  },
  
  // Get legal requirements checklist for a template type
  async getLegalChecklist(templateType) {
    await delay(200)
    
    const checklists = {
      nda: {
        title: 'Non-Disclosure Agreement Legal Requirements',
        requirements: [
          { id: 'parties', text: 'Clear identification of all parties', required: true, category: 'Essential' },
          { id: 'addresses', text: 'Complete addresses for all parties', required: true, category: 'Essential' },
          { id: 'confidentiality_scope', text: 'Definition of confidential information', required: true, category: 'Essential' },
          { id: 'permitted_use', text: 'Permitted use restrictions', required: true, category: 'Essential' },
          { id: 'term_duration', text: 'Confidentiality period specified', required: true, category: 'Essential' },
          { id: 'governing_law', text: 'Governing law and jurisdiction', required: true, category: 'Essential' },
          { id: 'signatures', text: 'Signature blocks with dates', required: true, category: 'Essential' },
          { id: 'return_destruction', text: 'Information return/destruction clause', required: false, category: 'Recommended' },
          { id: 'injunctive_relief', text: 'Injunctive relief provisions', required: false, category: 'Recommended' }
        ]
      },
      rental: {
        title: 'Residential Lease Agreement Legal Requirements', 
        requirements: [
          { id: 'landlord_info', text: 'Landlord full legal name and address', required: true, category: 'Essential' },
          { id: 'tenant_info', text: 'Tenant full legal name and address', required: true, category: 'Essential' },
          { id: 'property_description', text: 'Complete property address and description', required: true, category: 'Essential' },
          { id: 'rent_terms', text: 'Rent amount and payment terms', required: true, category: 'Essential' },
          { id: 'lease_term', text: 'Lease duration and dates', required: true, category: 'Essential' },
          { id: 'security_deposit', text: 'Security deposit amount and terms', required: true, category: 'Essential' },
          { id: 'governing_law', text: 'Applicable state law', required: true, category: 'Essential' },
          { id: 'signatures', text: 'Signature blocks with dates', required: true, category: 'Essential' },
          { id: 'maintenance_obligations', text: 'Maintenance responsibilities', required: false, category: 'Important' },
          { id: 'termination_conditions', text: 'Early termination conditions', required: false, category: 'Important' }
        ]
      },
      partnership: {
        title: 'Partnership Agreement Legal Requirements',
        requirements: [
          { id: 'partner_identification', text: 'All partners identified with addresses', required: true, category: 'Essential' },
          { id: 'partnership_name', text: 'Official partnership name', required: true, category: 'Essential' },
          { id: 'business_purpose', text: 'Defined business purpose', required: true, category: 'Essential' },
          { id: 'profit_sharing', text: 'Profit and loss distribution method', required: true, category: 'Essential' },
          { id: 'management_authority', text: 'Management structure and authority', required: true, category: 'Essential' },
          { id: 'dissolution_terms', text: 'Partnership dissolution conditions', required: true, category: 'Essential' },
          { id: 'governing_law', text: 'Governing law and jurisdiction', required: true, category: 'Essential' },
          { id: 'signatures', text: 'All partner signatures with dates', required: true, category: 'Essential' },
          { id: 'capital_contributions', text: 'Capital contribution requirements', required: false, category: 'Important' },
          { id: 'dispute_resolution', text: 'Dispute resolution mechanism', required: false, category: 'Important' }
        ]
      },
      employment: {
        title: 'Employment Contract Legal Requirements',
        requirements: [
          { id: 'employer_info', text: 'Employer legal name and address', required: true, category: 'Essential' },
          { id: 'employee_info', text: 'Employee full name and address', required: true, category: 'Essential' },
          { id: 'job_description', text: 'Position title and duties', required: true, category: 'Essential' },
          { id: 'compensation', text: 'Salary/wage and payment terms', required: true, category: 'Essential' },
          { id: 'employment_terms', text: 'Employment classification and terms', required: true, category: 'Essential' },
          { id: 'termination_conditions', text: 'Termination conditions and notice', required: true, category: 'Essential' },
          { id: 'governing_law', text: 'Applicable employment law', required: true, category: 'Essential' },
          { id: 'signatures', text: 'Signature blocks with dates', required: true, category: 'Essential' },
          { id: 'confidentiality', text: 'Confidentiality obligations', required: false, category: 'Important' },
          { id: 'benefits', text: 'Benefits and compensation details', required: false, category: 'Recommended' }
        ]
      }
    }
    
    return checklists[templateType] || { title: 'General Legal Requirements', requirements: [] }
  },
  
  // Track template revision history
  async getRevisionHistory(templateId) {
    await delay(200)
    
    // Mock revision history - in real implementation would come from database
    const revisionHistories = {
      'nda-standard': [
        {
          version: '1.0',
          date: '2024-01-15T10:30:00Z',
          author: 'Legal Team',
          changes: 'Initial template creation with basic confidentiality clauses',
          legalReview: 'approved'
        },
        {
          version: '2.0', 
          date: '2024-01-22T10:30:00Z',
          author: 'Legal Compliance System',
          changes: 'Added comprehensive party identification, signature blocks, governing law clauses, and boilerplate language',
          legalReview: 'approved'
        }
      ],
      'rental-residential': [
        {
          version: '2.1',
          date: '2024-01-16T14:22:00Z', 
          author: 'Legal Team',
          changes: 'Updated rental payment clauses for state compliance',
          legalReview: 'approved'
        },
        {
          version: '3.0',
          date: '2024-01-22T14:22:00Z',
          author: 'Legal Compliance System', 
          changes: 'Added comprehensive party identification, signature requirements, governing law provisions, and legal compliance elements',
          legalReview: 'approved'
        }
      ]
    }
    
    return revisionHistories[templateId] || []
  },
  
  // Verify signature requirements are met
  async validateSignatureRequirements(templateType, documentData) {
    await delay(150)
    
    const signatureValidation = {
      isValid: true,
      missingSignatures: [],
      warnings: []
    }
    
    const requiredSignatures = {
      nda: ['disclosing_party', 'receiving_party'],
      rental: ['landlord', 'tenant'],
      partnership: ['partner1', 'partner2'], // Can be extended for more partners
      employment: ['employer', 'employee']
    }
    
    const required = requiredSignatures[templateType] || []
    
    // Check for signature block presence (in real implementation would verify actual signatures)
    for (const signature of required) {
      if (!documentData.signatures || !documentData.signatures[signature]) {
        signatureValidation.missingSignatures.push(signature)
        signatureValidation.isValid = false
      }
    }
    
    if (!signatureValidation.isValid) {
      signatureValidation.warnings.push('Document requires all party signatures to be legally binding')
    }
    
    return signatureValidation
  },
  
  // Generate compliance report
  async generateComplianceReport(templateType, answers, documentData) {
    await delay(400)
    
    const [validation, checklist, signatureValidation] = await Promise.all([
      this.validateDocument(templateType, answers),
      this.getLegalChecklist(templateType),
      this.validateSignatureRequirements(templateType, documentData)
    ])
    
    return {
      templateType,
      complianceScore: validation.complianceScore,
      isFullyCompliant: validation.isCompliant && signatureValidation.isValid,
      validation,
      signatureValidation, 
      checklist,
      generatedAt: new Date().toISOString(),
      recommendations: [
        ...validation.recommendations,
        ...(signatureValidation.warnings || [])
      ]
    }
  }
}

export default legalComplianceService