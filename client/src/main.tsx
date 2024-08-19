
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import {RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </>
)
