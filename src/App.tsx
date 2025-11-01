import { useRoutes } from 'react-router-dom';
import router from "./router"



function BeforeRouterEnter(){
  const outlet = useRoutes(router)
  return outlet;
  
}

function App() {

  return (
      <div className="App">
        <BeforeRouterEnter/>
      </div>
  )
}

export default App
