import AITools from "../../components/modules/Home/AITools";
import Footer from "../../components/modules/Home/Footer";
import Hero from "../../components/modules/Home/Hero";
import Plan from "../../components/modules/Home/Plan";
import Testimonials from "../../components/modules/Home/Testimonials";
import Navbar from "../../components/UI/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AITools />
      <Testimonials />
      <Plan />
      <Footer />
    </>
  );
};

export default Home;
