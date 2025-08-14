"use client"
import { Building2, Banknote, ShieldCheck, Users } from "lucide-react"
import { classNames as cn } from "~/utils"

interface ActivationStepsHeaderProps {
  currentStep: number
  onStepClick: (step: number) => void
}

const steps = [
  { id: 0, title: "Business Information", icon: Building2 },
  { id: 1, title: "Account Information", icon: Banknote },
  { id: 2, title: "BVN Information", icon: ShieldCheck },
  { id: 3, title: "Board Member Info", icon: Users },
]

export default function ActivationStepsHeader({ currentStep, onStepClick }: ActivationStepsHeaderProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex flex-col items-center gap-2 flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 relative",
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300",
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-500")} />
              <span className="hidden sm:block">{step.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
