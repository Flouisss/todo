import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';

function App() {
  return (
    <div className='container border border-primary rounder mt-5 '
    style={{
      background: `url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwNzItMDM3LWMta3ZoaDA4bXAuanBn.jpg)`,
      backgroundSize: 'cover'
    }}
    >
      <Todo/>
    </div>
  );
}

export default App;
