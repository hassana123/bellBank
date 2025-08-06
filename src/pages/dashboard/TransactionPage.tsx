import DashboardLayout from '~/layout/DashboardLayout'
import TransactionsContainer from '~/containers/dashboard/Transaction'

const TransactionsPage = () => {
  return (
    <DashboardLayout>
      <TransactionsContainer />
    </DashboardLayout>
  )
}

export default TransactionsPage
