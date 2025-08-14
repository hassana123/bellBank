"use client"
import { Building2, Banknote, ShieldCheck, Users } from "lucide-react"
import { classNames as cn } from "~/utils"

interface ActivationSidebarProps {
  currentStep: number
  onStepClick: (step: number) => void
}

const steps = [
  { id: 0, title: "Business Information", icon: Building2 },
  { id: 1, title: "Account Information", icon: Banknote },
  { id: 2, title: "BVN Information", icon: ShieldCheck },
  { id: 3, title: "Board Member Info", icon: Users },
]

export default function ActivationSidebar({ currentStep, onStepClick }: ActivationSidebarProps) {
  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-sm font-semibold text-gray-700 mb-6">Activation Sections</h2>
      <div className="space-y-2">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-gray-500")} />
              <span>{step.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
