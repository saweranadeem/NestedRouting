
import { BrowserRouter } from "react-router-dom";
import PublicPrivateRouting from "./routing/PublicPrivateRouting";
function App() {
  return (
    <>
      <BrowserRouter>
        <PublicPrivateRouting />
      </BrowserRouter>
    </>
  );
}

export default App;
