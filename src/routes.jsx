import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { SurveyIndex } from './pages/SurveyIndex.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    // {
    //     path: '/',
    //     component: < />,
    //     label: 'Home 🏠',
    // },
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: '/workspace',
        component: <BoardIndex />,
        label: 'workspace 🏠',
    },
    

    // {
    //     path: 'survey',
    //     component: <SurveyIndex />,
    //     label: 'Take our survey'
    // },

    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes