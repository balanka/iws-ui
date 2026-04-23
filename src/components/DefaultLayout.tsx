import { AppContent, AppSidebar, AppFooter } from './index'
const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        {/*<AppHeader />*/}
        <div className="body flex-grow-0">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
