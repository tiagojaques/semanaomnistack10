import React, { useEffect, useState } from 'react';
import api from "./services/api";
import DevItem from "./components/DevItem"
import DevForm from "./components/DevForm"

// Componente: Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente filho
// Estado: Informações mantidas pelo componente (Lembar: imutabilidade)

// CSS
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs',data)
    setDevs([response.data,...devs]);
  }

  async function handleDesDev(data) {
    await api.post('/DevDes',data)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem delete={handleDesDev} key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
