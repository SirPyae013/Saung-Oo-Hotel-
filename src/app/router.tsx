import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import { Page } from '../components/Page'

const RoomsPage = lazy(() => import('../pages/RoomsPage'))
const RoomDetailPage = lazy(() => import('../pages/RoomDetailPage'))
const ExperiencesPage = lazy(() => import('../pages/ExperiencesPage'))
const StoryPage = lazy(() => import('../pages/StoryPage'))
const BookingPage = lazy(() => import('../pages/BookingPage'))

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <div className="empty-state">
        <h1>A little interruption.</h1>
        <p>Please reload the page and try again.</p>
        <a className="button button-dark" href="/">
          Return home
        </a>
      </div>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/rooms',
        element: (
          <Page>
            <RoomsPage />
          </Page>
        ),
      },
      {
        path: '/rooms/:slug',
        element: (
          <Page>
            <RoomDetailPage />
          </Page>
        ),
      },
      {
        path: '/experiences',
        element: (
          <Page>
            <ExperiencesPage />
          </Page>
        ),
      },
      {
        path: '/our-story',
        element: (
          <Page>
            <StoryPage />
          </Page>
        ),
      },
      {
        path: '/booking',
        element: (
          <Page>
            <BookingPage />
          </Page>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
