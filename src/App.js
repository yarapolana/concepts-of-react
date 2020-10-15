import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    async function getRepositories() {
      await api.get('/repositories').then((response) => {
        setRepositories(response.data)
      })
    }

    getRepositories()
  } ,[])

  async function handleAddRepository() {
    try {
      await api.post('/repositories', {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      }).then((response) => {

        const repository = response.data

        setRepositories([...repositories, repository])
      })
    } catch (e) {
      console.error(e)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`).then(response => {
        setRepositories(repositories.filter((repo) => repo.id !== id))
      })

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <section>
              <p>{repository.url}</p>
              <p>{repository.techs.map(tech => (
                <span key={tech}>{tech}</span>
              ))}</p>
            </section>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
