import { useRoutes } from 'react-router-dom';
import router from "./router"


import { ConfigProvider } from 'antd';

function BeforeRouterEnter(){
  const outlet = useRoutes(router)
  return outlet;
  
}


function App() {

  return (
      <ConfigProvider
          theme={{
              components: {
                  Radio: {
                      colorPrimary: '#862e9c',
                  },
                  Checkbox:{
                      colorPrimary: '#862e9c',
                  }
              },
          }}
      >
      <div className="App">
        <BeforeRouterEnter/>
      </div>
      </ConfigProvider>
  )
}

export default App
