import { Api } from './components/Api/Api'
import { DataTypes } from './components/DataTypes/DataTypes'
import { Example1 } from './components/Example1/Example1'

function App() {
  return (
    <div className='App'>
      <h1>MyTable</h1>

      <p>Компонент для работы с таблицами</p>
      <Example1 />

      <Api />

      <DataTypes />
    </div>
  )
}

export default App
