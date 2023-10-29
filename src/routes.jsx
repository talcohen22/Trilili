import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { SurveyIndex } from './pages/SurveyIndex.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: '/workspace',
        component: <BoardIndex />,
        label: 'Workspace 🏠',
    },
    {
        path: '/board/:boardId',
        component: <BoardDetails />,
        label: 'Board',
    },
    {
        path: '/board/:boardId/:groupId/:taskId',
        component: <BoardDetails />,
        label: 'Board',
    },
]

export default routes