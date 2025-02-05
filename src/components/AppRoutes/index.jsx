import { Routes, Route } from 'react-router-dom';
import Layout from '../Layouts';
import Home from '../Home';
import AboutUs from '../AboutUs';
import Teams from '../Teams';
import AddTeam from '../Teams/Add';
import EditTeam from '../Teams/Edit';
import Blogs from '../Blogs';
import AddBlog from '../Blogs/Add';
import EditBlog from '../Blogs/Edit';
import Properties from '../Properties';
import AddProperty from '../Properties/Add';
import BlogCategories from '../BlogCategories';
import Amenities from '../Amenities';
import PropertyTypes from '../PropertyTypes';
import Partners from '../Partners';
import Departments from '../Departments';
import Locations from '../Locations';
import Languages from '../Languages';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/teams/add" element={<AddTeam />}></Route>
        <Route path="/teams/:id" element={<EditTeam />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blogs/add" element={<AddBlog />}></Route>
        <Route path="/blogs/:id" element={<EditBlog />}></Route>
        <Route path="/properties" element={<Properties />}></Route>
        <Route path="/properties/add" element={<AddProperty />}></Route>
        <Route path="/blog-categories" element={<BlogCategories />}></Route>
        <Route path="/amenities" element={<Amenities />}></Route>
        <Route path="/property-types" element={<PropertyTypes />}></Route>
        <Route path="/partners" element={<Partners />}></Route>
        <Route path="/departments" element={<Departments />}></Route>
        <Route path="/locations" element={<Locations />}></Route>
        <Route path="/languages" element={<Languages />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
