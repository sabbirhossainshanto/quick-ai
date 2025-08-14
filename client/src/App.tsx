import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import WriteArticle from "./pages/WriteArticle/WriteArticle";
import BlogTitles from "./pages/BlogTitles/BlogTitles";
import GenerateImages from "./pages/GenerateImages/GenerateImages";
import RemoveObject from "./pages/RemoveObject/RemoveObject";
import RemoveBackground from "./pages/RemoveBackground/RemoveBackground";
import ReviewResume from "./pages/ReviewResume/ReviewResume";
import Community from "./pages/Community/Community";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const App = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
