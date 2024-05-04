import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/layouts/Login.tsx'
import Register from '../components/layouts/Register.tsx'
import Voter from '../components/candidate/Voter.tsx'
import Admin from '../components/admin/Admin.tsx'
import Candidate from '../components/candidate/Candidate.tsx'
import EditCandidate from '../components/candidate/EditCandidate.tsx'
import CandidateList from '../components/candidate/CandidateList.tsx'
import EditUser from '../components/users/EditUser.tsx'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/voter/:_id' element={<Voter/>}/>
        <Route path='/admin/:_id' element={<Admin/>}/>
        <Route path='/adminDetails/:_id' element={<CandidateList/>}/>

        {/* Candidate */}
        <Route path='/addcandidate' element={<Candidate/>}/>
        <Route path='/editcandidate/:_id' element={<EditCandidate/>}/>

        {/* User */}
        <Route path='/edituser/:_id' element={<EditUser/>}/>

    </Routes>
  )
}

export default Router