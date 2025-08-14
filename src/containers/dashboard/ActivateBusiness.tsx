"use client"

import { useState } from "react"
import { Card, Progress } from "antd"
import ActivationStepsHeader from "~/components/dashboard/ActivationStepsHeader" // Updated import
import BusinessInformationForm from "~/components/dashboard/kyc-forms/BusinessInformationForm"
import AccountInformationForm from "~/components/dashboard/kyc-forms/AccountInformationForm"
import BVNInformationForm from "~/components/dashboard/kyc-forms/BVNInformationForm"
import BoardMemberInformationForm from "~/components/dashboard/kyc-forms/BoardMemberInformationForm"
import Container from "~/components/common/container"
import { DASHBOARD_PAGE } from "~/config/routes"

export default function ActivateBusinessContainer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})

  const totalSteps = 4
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  const handleFormSubmit = (values: any) => {
    setFormData((prev: any) => ({ ...prev, [currentStep]: values }))
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // All forms submitted, handle final submission
      console.log("All KYC forms submitted:", { ...formData, [currentStep]: values })
      alert("Business activation forms submitted successfully!")
      // You might want to redirect or show a success message here
    }
  }

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInformationForm onFinish={handleFormSubmit} initialValues={formData[0]} />
      case 1:
        return <AccountInformationForm onFinish={handleFormSubmit} initialValues={formData[1]} />
      case 2:
        return <BVNInformationForm onFinish={handleFormSubmit} initialValues={formData[2]} />
      case 3:
        return <BoardMemberInformationForm onFinish={handleFormSubmit} initialValues={formData[3]} />
      default:
        return null
    }
  }

  return (
    <Container
      title="Activate Business"
      description="Complete your business activation by providing the required information."
      backButton={DASHBOARD_PAGE}
      className="md:w-[80%] mx-auto dark:text-white"  >

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium dark:text-white text-gray-600">Progress: {Math.round(progressPercentage)}%</span>
        <Progress percent={progressPercentage} showInfo={false} strokeColor="#218838" className="w-1/2" />
      </div>
      <ActivationStepsHeader currentStep={currentStep} onStepClick={setCurrentStep} /> {/* New header */}
      <Card className="flex-1 rounded-lg shadow-sm bg-card text-card-foreground p-6">{renderCurrentForm()}</Card>
    </Container>
  )
}
