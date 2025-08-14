import DashboardLayout from '~/layout/DashboardLayout'
import InvoicesContainer from '~/containers/dashboard/Invoice'

const InvoicesPage = () => {
  return (
    <DashboardLayout>
      <InvoicesContainer />
    </DashboardLayout>
  )
}

export default InvoicesPage
