import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import GoogleAuthWrapper from '../components/GoogleAuthWrapper/GoogleAuthWrapper'; //google sign up
import { getAdmin } from '../api/userapis';
import Loader from '../components/Loader/Loader';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const Home = lazy(() => import('../pages/Home/Home'));
const Almanac = lazy(() => import('../pages/Almanac/Almanac'));
const Events = lazy(() => import('../pages/Events/Events'));
const Merchandise = lazy(() => import('../pages/Merchandise/Merchandise'));
const Team = lazy(() => import('../pages/Team/Team'));
const About = lazy(() => import('../pages/About/About'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const ArtSubmition = lazy(() => import('../pages/ArtSubmition/ArtSubmition'));
const PoemSubmition = lazy(() => import('../pages/PoemSubmition/PoemSubmition'));
const PhotoSubmition = lazy(() => import('../pages/PhotoSubmition/PhotoSubmition'));
const AlmanacForm = lazy(() => import('../pages/AlmanacForm/AlmanacForm'));
const MatchesScores = lazy(() => import('../pages/MatchesScores/MatchesScores'));
// const RecruitmentPage = lazy(() => import('../pages/RecruitmentForm/RecruitmentPage'));

// admin pages
const AdminProfile = lazy(() => import('../admin/pages/profile/AdminProfile'));
const AdminEvents = lazy(() => import('../admin/pages/events/AdminEvent'));
const Scorecard = lazy(() => import('../admin/pages/scorecard/Scorecard'));
const AdminAlmanac = lazy(() => import('../admin/pages/almanac/AdminAlmanac'));
const AdminHome = lazy(() => import('../admin/pages/homepagePoster/AdminHome'));
const UsersData = lazy(() => import('../admin/pages/users/UsersData'));

function Routers() {

  const [isAdmin, setIsAdmin] = useState(false);

  //check the user is admin or not
  useEffect(() => {
    const isAdminOrNot = async () => {
      const userData = JSON.parse(localStorage.getItem('user-info'));
      const token = userData?.token;
      if (userData) {
        const result = await getAdmin(token);
        setIsAdmin(result?.data?.isAdmin);
      }
    }

    isAdminOrNot();
  }, [isAdmin]);

  return (
    <Suspense fallback={<Loader/>}>
      <ScrollToTop />
      <Routes>
        <Route path='/sign-up' element={<GoogleAuthWrapper />} />
        {/* <Route path='/log-in' element={<LoginPage />} /> */}

        {/* user and admin both access */}
        <Route path='/' element={<Home />} />
        <Route path='/almanac' element={<Almanac />} />
        <Route path='/events' element={<Events />} />
        <Route path='/merchandise' element={<Merchandise />} />
        <Route path='/team' element={<Team />} />
        <Route path='/about' element={<About />} />
        <Route path='/scorecards' element={<MatchesScores />} />
        {/* <Route path='/recruitment' element={<RecruitmentPage />} /> */}

        {/* almanac form pages */}
        <Route path='/almanac/almanac-form' element={<AlmanacForm />} />
        <Route path='/almanac/almanac-form/artwork-form-submit' element={<ArtSubmition />} />
        <Route path='/almanac/almanac-form/photo-form-submit' element={<PhotoSubmition />} />
        <Route path='/almanac/almanac-form/poem-form-submit' element={<PoemSubmition />} />

        {/* unique one for profile */}
        <Route path='/profile' element={isAdmin ? <AdminProfile /> : <Profile />} />

        {/* protected admin routes */}
        <Route
          path='/admin/events'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminEvents />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/matches-scorecard'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <Scorecard />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/almanac'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminAlmanac />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/add-poster'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminHome />
            </AdminRoute>
          }
        />

        <Route
          path='/admin/users-sent-data'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <UsersData />
            </AdminRoute>
          }
        />

        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </Suspense>

  )
}
export default Routers