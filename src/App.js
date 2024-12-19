import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { AdminDashboard } from './Admin/AdminDashboard';
import { AdminJobPost } from './Admin/AdminJobPost';
import { EditPost } from './Admin/EditPost';
import { ManageJobs } from './Admin/ManageJobs';
import { PostCompany } from './Admin/PostCompany';
import { ManageCompany } from './Admin/ManageCompany';
import { EditCompany } from './Admin/EditCompany';
import { ManageCategory } from './Admin/ManageCategory';
import { PostCategory } from './Admin/PostCategory';
import { EditCategory } from './Admin/EditCategory';
import { Category } from './Pages/Category';
import { ViewJob } from './Pages/ViewJob';
import { PostSkill } from './Admin/PostSkill';
import { ManageSkills } from './Admin/ManageSkills';
import { EditSkill } from './Admin/EditSkill';
import { Login } from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { JobApply } from './User/JobApply';
import { ManageUser } from './Admin/ManageUser';
import { Jobs } from './Pages/Jobs';
import { UserApplications } from './User/UserApplications';
import { ManageApplications } from './Admin/ManageApplications';
import { Contact } from './Pages/Contact';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client/User Pages */}
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login/:login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/jobs' element={<Jobs />}></Route>
        <Route path='/category/:category' element={<Category />}></Route>
        <Route path='/view-job/:jobid' element={<ViewJob />}></Route>
        <Route path='/apply-job/:jobId' element={<JobApply />}></Route>
        <Route path='/user-applications' element={<UserApplications />}></Route>
        {/* Admin Pages */}
        <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
        <Route path='/admin-dashboard/job-post' element={<AdminJobPost />}></Route>
        <Route path='/admin-dashboard/manage-jobs' element={<ManageJobs />}></Route>
        <Route path='/admin-dashboard/manage-jobs/edit-post/:postid' element={<EditPost />}></Route>
        <Route path='/admin-dashboard/post-company' element={<PostCompany />}></Route>
        <Route path='/admin-dashboard/manage-company' element={<ManageCompany />}></Route>
        <Route path='/admin-dashboard/manage-company/edit-company/:companyid' element={<EditCompany />}></Route>
        <Route path='/admin-dashboard/post-skill' element={<PostSkill />}></Route>
        <Route path='/admin-dashboard/manage-skill' element={<ManageSkills />}></Route>
        <Route path='/admin-dashboard/manage-skill/edit-skill/:skillid' element={<EditSkill />}></Route>
        <Route path='/admin-dashboard/post-category' element={<PostCategory />}></Route>
        <Route path='/admin-dashboard/manage-category' element={<ManageCategory />}></Route>
        <Route path='/admin-dashboard/manage-category/edit-cat/:categoryid' element={<EditCategory />}></Route>
        <Route path='/admin-dashboard/manage-user' element={<ManageUser />}></Route>
        <Route path='/admin-dashboard/manage-application' element={<ManageApplications />}></Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
