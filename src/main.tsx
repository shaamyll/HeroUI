import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './providers';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <Providers>
        <main className="text-foreground bg-gray-200 p-2">
				<App />
			</main>
    </Providers>
   </BrowserRouter>
  </StrictMode>,
)
