import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

import imgBg1 from "./assets/bg1.jpg";
import imgBg2 from "./assets/bg2.jpg";

function App() {
  return (
    <div className="App">
      <Header title="This is title" descr="My descr"/>
      <Layout title="one" desc="pica" urlBg={imgBg1} />
      <Layout title="two" desc="pica pica" colorBg="red" />
      <Layout title="free" desc="pica pica pica" urlBg={imgBg2} />
      <Footer />
    </div>
  );
}

export default App;
