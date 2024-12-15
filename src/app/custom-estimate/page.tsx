import Layout from '@/components/Layout'
import AboutHeader from '@/screens/AboutScreen/AboutHeader'
import CustomEstimate from '@/screens/CustomEstimator/CustomEstimate'
import React from 'react'

const page = () => {
  return (
    <Layout>
    <AboutHeader
      title="Custom & Budget Calculator"
      breadcrumbItems={[
        { label: "Home", link: "/" },
        { label: "Custom & Budget Calculator" },
      ]}
    /><CustomEstimate />  </Layout>
  )
}

export default page