import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Agora deve funcionar com os tipos corretos
const appName = import.meta.env.VITE_APP_NAME || 'Certificado Mercado Pago'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        // Garantir que o elemento esteja limpo
        while (el.firstChild) {
            el.removeChild(el.firstChild)
        }

        const root = createRoot(el)
        root.render(
            <>
                <App {...props} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        )
    },
    progress: {
        color: '#4B5563',
    },
})
